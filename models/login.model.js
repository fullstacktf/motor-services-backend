import { execQuery } from '../database/database.js'

let data;
let queryExec = '';
const bodyIsEmpty = (body) => Object.keys(body).length === 0;
import bcrypt from 'bcrypt';
const saltRounds = 10;
import jwt from 'jsonwebtoken';
//import keys from '../settings/keys';
let sessionData;

export class LoginModel {
    async logIn(req,res){
        try{
            const userEmail =req.body.email;
            const plainPassword = req.body.password_key;

            if(!userEmail || !plainPassword){
                res.send("Introduzca usuario y contraseña.")
            } else {
                data = await execQuery(`select * from User where email='${userEmail}';`);
                if (data.length == 0 || ! (await bcrypt.compare(plainPassword, data[0].password_key))){
                    res.send("Usuario o contraseña incorrectos.")
                } else {
                    const id = data[0].DNI;
                    const token = jwt.sign({id:id}, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRESIN
                    });
                    console.log(token)

                    const cookieOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
                        //httpOnly: true
                    };
                    res.cookie('jwt', token, cookieOptions)
                    res.send("Inicio de sesión correcto.")
                }
            }
        } catch {
            console.log("Error")
        }
    }

    async logOut(req, res){
        res.clearCookie('jwt');
        res.send("Sesión terminada")
    }

    async isAuthenticated(req, res, next){
        if(req.cookies.jwt){
            try{
                jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, verifiedJWT) => {
                    if (err) {
                        res.send('Ha habido un error de autenticación')
                    } else {
                        res.send(verifiedJWT)
                    }
                })
            } catch (error){
                console.log(error);
                return next()
            }
        } else{
            res.send("Fallo de autenticacion.")
        }
    }

    async checkCookie(req, res) {
        res.send(this.isAuthenticated(req,res,next).id)
    }
}
