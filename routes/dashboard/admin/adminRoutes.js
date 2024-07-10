//@external module
const adminRoute = require("express").Router();

const { adminController } = require("../../../controllers/controllerExporter");
const { adminValidation, 
        validation, 
        adminLoginValidation, 
        adminSession, 
        roleValidation } = require("../../../middlewares/middlewareExporter");
const { uploadAnyImage } = require("../../../utilities/utilityExporter");

adminRoute
        .route("/login")
        .post(adminSession.isLogout, adminLoginValidation.validationRules, validation.validate, adminController.loginAdmin)

adminRoute
        .use(adminSession.isLogin)

adminRoute
        .use(roleValidation.requiredRole([process.env.SUPER_ADMIN]))

adminRoute
        .route("/")
        .get( adminController.getAdmins)
        .post(uploadAnyImage.imageUpload, adminValidation.validationRules, validation.validate, adminController.registerAdmin)

//@exports
module.exports = adminRoute;