const { districtController } = require('../../../controllers/controllerExporter');

//@external modeule
const divisionRoute = require('express').Router();

divisionRoute
        .route("/")
        .post(districtController.seedDistrict)

//@exports
module.exports = divisionRoute;