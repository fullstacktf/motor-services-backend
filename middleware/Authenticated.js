export const isAuthenticated = async (req, res, next) => {
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