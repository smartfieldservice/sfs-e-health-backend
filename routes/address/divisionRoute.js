const { divisionController } = require('../../controllers/controllerExporter');

//@external modeule
const divisionRoute = require('express').Router();

divisionRoute
        .route("/")
        .post(divisionController.seedDivisions)

//@exports
module.exports = divisionRoute;