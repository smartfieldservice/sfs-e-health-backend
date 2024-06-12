//@external modules
const doctorRoute = require("express").Router();

//@internal modules
const { doctorController } =require("../../controllers/controllerExporter");
const { doctorValidation, 
        validation } = require('../../middlewares/middlewareExporter');
const { doctorImageUpload } = require("../../utilities/utilityExporter");

doctorRoute
        .route("/")
        .get(doctorController.getDoctors)
        .post(doctorImageUpload.doctorImage, doctorValidation.validationRules, validation.validate, doctorController.createDoctor)
        .put(doctorController.editDoctor)
        .delete(doctorController.deleteDoctor)
    
module.exports = doctorRoute;