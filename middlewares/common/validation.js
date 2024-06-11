const { validationResult } = require("express-validator");

//@validate
const validate = async(req, res, next) => {

    try {

        //console.log(errors)
        
        //@check the validation result
        const errors = validationResult(req);

        //console.log(errors)

        //@if errors occurs during validation
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() });
        }
        else{
            //@validation complete
            next();
        }
    } catch (error) {
        return res.status(400).json({ error,message:"Error during validation !" });
    }
}

//@exports
module.exports = { validate };