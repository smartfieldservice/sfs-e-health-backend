//@external module
const userRoute = require("express").Router();

//@internal module
const { userController } = require("../../controllers/controllerExporter");
const { userValidation, 
        validation, 
        otpSent } = require("../../middlewares/middlewareExporter");

userRoute
        .use(userValidation.validationRules, validation.validate);

userRoute
        .route("/send-otp")
        .post( otpSent.OTP, userController.otpRequest)

userRoute
        .route("/verify-otp")
        .post( userController.otpVerify)

//@exports
module.exports = userRoute;