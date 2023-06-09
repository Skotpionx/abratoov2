const jwt = require('jsonwebtoken');


exports.verifyAdmin = (req, res, next) => {
    const { access_token } = req.cookies;
    if (!access_token) return res.status(401).json({ message: 'Acceso no autorizado' });

    try {
        const decodedToken = jwt.verify(access_token, process.env.JWT_SECRET);
        const isAdmin = decodedToken.admin;
        if (!isAdmin) {
            return res.status(403).json({ message: 'Acceso prohibido' })
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Acceso no autorizado', error: error })
    }
}

exports.clientVerifyUser = async (req,res) => {
    try{
        const { access_token } = req.cookies;
        if(!access_token){
            return res.status(200).json({ isAuthenticated: false});
        }
        jwt.verify(access_token, process.env.JWT_SECRET, (err, user) => {
            if(user){
                return res.status(200).json( { isAuthenticated: true});
            }
            if(err){
                return res.status(200).json({ isAuthenticated: false});
            }
        })
    }catch(error){
        return res.status(500).json({ message: 'Error interno del servidor', error: error});
    }
}

exports.serverVerifyUser = async (req,res, next) => {
    try{
        const { access_token } = req.cookies;
            if (!access_token) return res.status(401).json({ message: 'No está autenticado', isAuthenticated: false });
    
            const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
            if (!decoded) {
                return res.status(401).json({ message: 'No está autenticado', isAuthenticated: false });
            }
            next();
    }catch(error){
        return res.status(500).json({ message: 'Error interno del servidor', error: error});
    }
}

exports.verifyTatuador = (req, res, next) => {
    const { access_token } = req.cookies;
    if (!access_token) return res.status(401).json({ message: 'Acceso no autorizado' });

    try {
        const decodedToken = jwt.verify(access_token, process.env.JWT_SECRET);
        const isTatuador = decodedToken.esTatuador;
        if (!isTatuador) {
            return res.status(403).json({ message: 'Acceso prohibido' })
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Acceso no autorizado', error: error })
    }
}
