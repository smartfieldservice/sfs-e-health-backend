//@external module
const adminRoute = require("express").Router();

const { adminController } = require("../../../controllers/controllerExporter");
const { adminValidation, 
        validation, 
        adminLoginValidation } = require("../../../middlewares/middlewareExporter");
const { uploadAnyImage } = require("../../../utilities/utilityExporter");

adminRoute
        .route("/")
        .get(adminController.getAdmins)
        .post(uploadAnyImage.imageUpload, adminValidation.validationRules, validation.validate, adminController.registerAdmin)

adminRoute
        .route("/login")
        .post(adminLoginValidation.validationRules, validation.validate, adminController.loginAdmin);

//@exports
module.exports = adminRoute;