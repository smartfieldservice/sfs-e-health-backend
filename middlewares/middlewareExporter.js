const s3Upload = require("./common/s3Upload");
const validation = require("./common/validation");
const specialistVaidation = require("./specialistVaidation");
const doctorValidation = require("./doctorValidation");

module.exports = {  s3Upload, 
                    validation,
                    specialistVaidation,
                    doctorValidation
                }