import { getLogin, createUser } from "../services/login.services.js";
import reviewController from "./review.controller.js";

const login = async (req,res) => {
    const userEmail = req.body.email;
    const plainPassword = req.body.password_key;
    try {
        const loginData = await getLogin(userEmail, plainPassword);
        res.cookie('jwt', loginData.token, loginData.cookieOptions)
        res.status(200)
        res.send("Inicio de sesión correcto")
        console.log(req.cookies.jwt)
    } catch(error) {
        console.error("Error al iniciar sesion en controller");
        res.status(500).json(String(error));
    }  
}

const logout = (req, res) => {
    res.clearCookie('jwt');
    res.send("Sesión terminada")
}

const addUser = async (req, res) => {
    const variables = {
        ...req.body 
    }
    
    createUser(variables)
        .then((data) => res.status(200).send("Usuario añadido correctamente"))
        .catch(err => res.status(500).json({error: String(err)}));

}

export default {login, logout, addUser}