//@external module
const ratingRoute = require('express').Router();

//@internal module
const { ratingController, doctorController } = require('../../controllers/controllerExporter');

ratingRoute
        .route("/")
        .post(ratingController.addRating, doctorController.addAverageRating)

//@exports
module.exports = ratingRoute;
