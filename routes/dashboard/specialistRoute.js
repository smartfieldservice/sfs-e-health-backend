//@external module
const specialistRoute = require("express").Router();

//@internal module
const { getSpecialists, 
        createSpecialist, 
        editSpecialist, 
        deleteSpecialist } = require("../../controllers/dashboard/specialistController");
const { specialistVaidation, 
        validation, 
        sessionValidation,
        roleValidation } = require("../../middlewares/middlewareExporter");

specialistRoute
        .use(sessionValidation.isLogin, roleValidation.requiredRole([process.env.SUPER_ADMIN, process.env.ADMIN]))

specialistRoute
            .route("/")
            //@specialist?page=1&limit=5
            .get(getSpecialists)
            //@specialist
            .post(specialistVaidation.validationRules, validation.validate, createSpecialist)
            //@specialist?id=<>
            .put(editSpecialist)
            .delete(deleteSpecialist)

//@exports
module.exports = specialistRoute;