//@external modules
const doctorRoute = require("express").Router();

//@internal modules
const { doctorController,
        reviewController } =require("../../controllers/controllerExporter");
const { doctorValidation, 
        validation } = require('../../middlewares/middlewareExporter');
const { doctorImageUpload } = require("../../utilities/utilityExporter");

doctorRoute
        .route("/")
        .get(doctorController.getDoctors)
        .post(doctorImageUpload.doctorImage, doctorValidation.validationRules, validation.validate, doctorController.createDoctor)
        .put(doctorController.editDoctor)
        .delete(doctorController.deleteDoctor)

doctorRoute
        .route("/search/:clue")
        .get(doctorController.searchDoctors)

doctorRoute
        .route("/details/")
        .get(doctorController.getDoctorDetails, reviewController.getReviews)
    
module.exports = doctorRoute;