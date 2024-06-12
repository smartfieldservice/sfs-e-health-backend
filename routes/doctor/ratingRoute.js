//@external module
const ratingRoute = require('express').Router();

//@internal module
const { ratingController } = require('../../controllers/controllerExporter');

ratingRoute
        .route("/")
        .post(ratingController.addRating)

//@exports
module.exports = ratingRoute;
