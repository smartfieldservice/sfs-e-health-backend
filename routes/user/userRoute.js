//@external module
const userRoute = require("express").Router();

//@internal module
const { userController } = require("../../controllers/controllerExporter");
const { userValidation, validation } = require("../../middlewares/middlewareExporter");

userRoute
        .route("/send-otp")
        .post(userValidation.validationRules, validation.validate, userController.otpRequest)

userRoute
        .route("/verify-otp")
        .post(userValidation.validationRules, validation.validate, userController.otpVerify)

//@exports
module.exports = userRoute;