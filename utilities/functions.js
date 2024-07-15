const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@function for create an Authentication token for an account using jwt
const authToken = ({ id, email, role, phone}) => {
    
    let tokenObj = {};

    if(id){
        tokenObj.id = id;
    }
    if(email){
        tokenObj.email = email;
    }
    if(role){
        tokenObj.role = role;
    }
    if(phone){
        tokenObj.phone = phone;
    }
    return jwt.sign(tokenObj, process.env.JWT_SECRET, { expiresIn: "14d" });
}   

//@function for verify Authentication token of an account using jwt
const verifyAuthToken = (authToken) => {
    return jwt.verify( authToken, process.env.JWT_SECRET);
}

//@generate a slug from the given string
const generateSlug = (str) => {
    return str.toLowerCase().replace(/\s+/g, "-");
};

//@function for pagination
const pagination = async (pageNo, pageLimit, data)=>{

    try {
        const page = parseInt(pageNo) || 1;
        const limit = parseInt(pageLimit);
        const skip = (page - 1) * limit;

        return await data.skip(skip).limit(limit);
    
    } catch (error) {
        return error;
    }
}

//@function for regular expression string
const escapeString = function(str){
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"); 
};

//@function for generate OTP
const generateOTP = function (){
    return Math.floor(100000 + Math.random() * 900000).toString(); 
}

//@function for generate OTP
const generateRandomNumber = function (){
    return Math.floor(100000 + Math.random() * 900000).toString();
}

//@function for hash the password
const hashedPassword = async(password) => {
    
    try {
        return await bcrypt.hash(password,10);
    } catch (error) {
        return error;
    }
}

//@function for verify password
const verifyPassword = async(inputPassword, hashPassword) => {
    try {
        return await bcrypt.compare(inputPassword, hashPassword);
    } catch (error) {
        return error;
    }
}

//@exports
module.exports = {  generateSlug,
                    pagination,
                    escapeString,
                    generateOTP,
                    generateRandomNumber,
                    hashedPassword,
                    verifyPassword,
                    verifyAuthToken,
                    authToken
                }