import { getLogin } from "../services/login.services.js";

const login = async (req,res) => {
    const userEmail = req.body.email;
    const plainPassword = req.body.password_key;
    try {
        const loginData = await getLogin(userEmail, plainPassword);
        res.status(200)
       // res.cookies('jwt', loginData.token, loginData.cookieOptions)
        //res.send("Usuario añadido correctamente")
        res.send(loginData)
    } catch(error) {
        console.error("Error al iniciar sesion", await getLogin(userEmail, plainPassword));
        res.status(500).json(error);
    }  
}

const logout = async (req, res) => {
    res.clearCookie('jwt');
    res.send("Sesión terminada")
}

export default {login, logout}