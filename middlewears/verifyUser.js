const jwt = require('jsonwebtoken');

const verifyUser = (req,res,next) => {

    if(req.headers.authorization)
    {
        const {authorization} = req.headers;
        const token = authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            const { username, userId, admin } = decoded;
            req.username = username;
            req.userId = userId;
            req.admin = admin;
            // console.log("verify user admin"+req.admin);
            next();
        } catch (error) {
            next(error);
        }
    }else
    {
        var err = new Error('authentication needed');
        next(err);
    }
}
module.exports = verifyUser;    