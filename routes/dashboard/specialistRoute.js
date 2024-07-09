const { getSpecialists, 
        createSpecialist, 
        editSpecialist, 
        deleteSpecialist } = require("../../controllers/dashboard/specialistController");
const { specialistVaidation, 
        validation } = require("../../middlewares/middlewareExporter");

//@external module
const specialistRoute = require("express").Router();

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