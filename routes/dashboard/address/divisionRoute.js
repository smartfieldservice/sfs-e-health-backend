//@external modeule
const divisionRoute = require('express').Router();

//@internal module
const { divisionController } = require('../../../controllers/controllerExporter');
const { sessionValidation, 
        roleValidation } = require('../../../middlewares/middlewareExporter');

divisionRoute
        .use(sessionValidation.isLogin, roleValidation.requiredRole([process.env.SUPER_ADMIN, process.env.ADMIN]))

divisionRoute
        .route("/")
        .post(divisionController.seedDivisions)

//@exports
module.exports = divisionRoute;