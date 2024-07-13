//@external modules
const doctorRoute = require("express").Router();

//@internal modules
const { doctorController,
        reviewController } =require("../../controllers/controllerExporter");
const { doctorValidation, 
        validation, 
        sessionValidation,
        roleValidation } = require('../../middlewares/middlewareExporter');
const { uploadAnyImage } = require("../../utilities/utilityExporter");

doctorRoute
        .route("/")
        .get(doctorController.getDoctors)

doctorRoute
        .route("/search/:clue")
        .get(doctorController.searchDoctors)

doctorRoute
        .route("/details/")
        .get(doctorController.getDoctorDetails, reviewController.getReviews)


doctorRoute
        .use(sessionValidation.isLogin, roleValidation.requiredRole([process.env.SUPER_ADMIN, process.env.ADMIN]))

doctorRoute
        .route("/")
        .post(uploadAnyImage.imageUpload, doctorValidation.validationRules, validation.validate, doctorController.createDoctor)
        .put(uploadAnyImage.imageUpload, doctorValidation.validationRules, validation.validate, doctorController.editDoctor)
        .delete(doctorController.deleteDoctor)
    
module.exports = doctorRoute;