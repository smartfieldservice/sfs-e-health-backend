const jwt = require("jsonwebtoken");

const isLogin = async(req, res, next) => {
    
    try {

        //@get the authToken from Bearer Token
        let authToken = req.get('Authorization');

        if(authToken){

            authToken = authToken.split(' ')[1];
            authToken = jwt.verify( authToken, process.env.JWT_SECRET);

            if(authToken){
                req.account = authToken;
                next();
            }
            else {
                res.status(401).json({ message : "Invalid token !"});
            }
        }else{
            res.status(401).json({ message : "Please login !"});
        }
    } catch (error) {
        res.status(400).json({ errors : error.message });
    }
}

const isLogout = async(req,res,next) => {

    try {
        
        //@get authToken from the BearerToken
        let authToken = req.get('Authorization');

        if(!authToken){
            next();
        }else{

            authToken = authToken.split(' ')[1];
            authToken = jwt.verify( authToken, process.env.JWT_SECRET);

            if(!authToken){
                next();
            }else{
                res.status(401).json({ message : "Already logged in !"});
            }
        }
    } catch (error) {
        responseHandler.errorResponse(error,res);
    }
}

//@exports
module.exports = {  isLogin,
                    isLogout
                }