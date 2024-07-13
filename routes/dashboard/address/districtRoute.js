//@external modeule
const districtRoute = require('express').Router();

//@internal module
const { districtController } = require('../../../controllers/controllerExporter');
const { sessionValidation, 
        roleValidation } = require('../../../middlewares/middlewareExporter');

districtRoute
        .use(sessionValidation.isLogin, roleValidation.requiredRole([process.env.SUPER_ADMIN, process.env.ADMIN]))

districtRoute
        .route("/")
        .post(districtController.seedDistrict)

//@exports
module.exports = districtRoute;