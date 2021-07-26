import config from './config';
import jwt from 'jsonwebtoken';


const getToken = (user) => {
    return jwt.sign(
        {
            _id:      user._id,
            name:     user.name,
            email:    user.email,
            isAdmin:  user.isAdmin,
        },
        config.JWT_SECRET,
        {
            expiresIn: '24h',
        }
    );
};
const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        const auxToken = token.slice(7, token.length);
        jwt.verify(auxToken, config.JWT_SECRET,(err, decode) => {
            if(err){
                return res.status(401).send({msg: "Token invalido"});
            }
            req.user = token;
            next();
            return

        } )
    } else{
        return res.status(401).send({msg: "Token refutado"});
    }

}
const isAdmin = (req, res, next) => {
    if(req.user){
        if(req.user.IsAdmin){
            return next();
        }else{
            return res.status(401).send({msg: "Não é admin"});
        }
    }

}

export { getToken, isAuth, isAdmin};