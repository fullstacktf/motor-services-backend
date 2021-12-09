import { getLogin } from "../services/login.services.js";

const login = async (req,res) => {
    const userEmail = req.body.email;
    const plainPassword = req.body.password_key;
    try {
        const loginData = await getLogin(userEmail, plainPassword);
        res.cookie('jwt', loginData.token, loginData.cookieOptions)
        res.status(200)
        res.send("Inicio de sesión correcto")
    } catch(error) {
        console.error("Error al iniciar sesion en controller");
        res.status(500).json(String(error));
    }  
}

const logout = async (req, res) => {
    res.clearCookie('jwt');
    res.send("Sesión terminada")
}

export default {login, logout}