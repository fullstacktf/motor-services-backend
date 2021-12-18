import LoginRepository from "../repositories/login.repository.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const loginRepository = new LoginRepository();

export const getLogin = async (user_email, plainPassword) => {
    const userData = await loginRepository.findUserByEmail(user_email);

    if (userData.length == 0 || ! (await bcrypt.compare(plainPassword, userData[0].password_key))){
        console.error("Usuario o contraseña incorrectos.")
    } else {
        const id = userData[0].DNI;
        const rol = userData[0].id_rol;
        const token = jwt.sign({id: id, role: rol}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRESIN
        });

        const cookieOptions = {
            expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
            httpOnly: true
        };
        console.log("Inicio de sesión correcto, token creado", token)
        return {token, cookieOptions}
    }
};

export const createUser = (variables) => {
    const plainPassword = variables.password_key;
    variables.password_key = bcrypt.hashSync(plainPassword, salt);
    return loginRepository.create(variables);
}
