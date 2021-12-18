import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
    if(req.cookies.jwt){
        try{
            jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, verifiedJWT) => {
                if (err) {
                    res.send('Ha habido un error de autenticación');
                    return next();
                } else {
                    req.userDNI=verifiedJWT.id
                    req.rol=verifiedJWT.role
                    return next()
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

//falta .env