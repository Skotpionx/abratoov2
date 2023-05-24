const jwt = require('jsonwebtoken');

exports.verifyAdmin = (req, res, next) => {
    const { access_token }  = req.cookies;
    console.log("Access_token => " + access_token) 
    // if(!accessToken) return res.status(401).json( { message : 'Acceso no autorizado'});
    if(!access_token) return console.log(req.cookies);
    
    try{
        const decodedToken = jwt.verify(access_token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.admin; 

        if(!isAdmin){
            return res.status(403).json( { message : 'Acceso prohibido'})
        }

        next();
    }catch ( error ){
        return res.status(401).json( { message: 'Acceso no autorizado'})
    }
}