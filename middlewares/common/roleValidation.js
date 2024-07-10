const requiredRole = function( roleArray ){
    
    try {
        return function(req, res, next){

            //@check if the role is valid to access the route
            if(req.account && roleArray.includes(req.account.role)){
                next();
            }else{
                res.status(401).json({ message : "Permission not allowed !"});
            }
        }
    } catch (error) {
        res.status(400).json({ errors : error.message });
    }
}

//@exports
module.exports = { requiredRole }