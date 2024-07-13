const s3Upload = require("./common/s3Upload");
const validation = require("./common/validation");
const otpSent = require("./common/otpSent");
const specialistVaidation = require("./specialistVaidation");
const doctorValidation = require("./doctorValidation");
const userValidation = require("./userValidation");
const adminValidation = require("./admin/adminValidation");
const adminLoginValidation = require("./admin/adminLoginValidation");
const roleValidation = require("./common/roleValidation");
const sessionValidation = require('./common/sessionValidation');

module.exports = {  s3Upload, 
                    validation,
                    specialistVaidation,
                    doctorValidation,
                    userValidation,
                    otpSent,
                    adminValidation,
                    adminLoginValidation,
                    sessionValidation,
                    roleValidation
                }