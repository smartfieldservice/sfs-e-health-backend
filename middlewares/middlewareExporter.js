const s3Upload = require("./common/s3Upload");
const validation = require("./common/validation");
const otpSent = require("./common/otpSent");
const specialistVaidation = require("./specialistVaidation");
const doctorValidation = require("./doctorValidation");
const userValidation = require("./userValidation");

module.exports = {  s3Upload, 
                    validation,
                    specialistVaidation,
                    doctorValidation,
                    userValidation,
                    otpSent
                }