//@external module
const adminRoute = require("express").Router();

const { adminController } = require("../../../controllers/controllerExporter");
const { adminValidation, 
        validation, 
        adminLoginValidation, 
        sessionValidation, 
        roleValidation } = require("../../../middlewares/middlewareExporter");
const { uploadAnyImage } = require("../../../utilities/utilityExporter");

adminRoute
        .route("/login")
        .post(sessionValidation.isLogout, adminLoginValidation.validationRules, validation.validate, adminController.loginAdmin)

adminRoute
        .use(sessionValidation.isLogin)

/* route access by both admin & super-admin */


/* route access by super-admin */
adminRoute
        .use(roleValidation.requiredRole([process.env.SUPER_ADMIN]))

adminRoute
        .route("/registration")
        .post(uploadAnyImage.imageUpload, adminValidation.validationRules, validation.validate, adminController.registerAdmin)

adminRoute
        .route("/")
        .get( adminController.getAdmins)

//@exports
module.exports = adminRoute;