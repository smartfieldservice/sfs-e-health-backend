//@external module
const reviewRoute = require('express').Router();

//@internal module
const { reviewController } = require('../../controllers/controllerExporter');

reviewRoute
        .route("/")
        .post(reviewController.addReview)

//@exports
module.exports = reviewRoute;