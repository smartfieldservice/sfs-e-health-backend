const { getSpecialists, 
        createSpecialist, 
        editSpecialist, 
        deleteSpecialist } = require("../controllers/specialistController");

//@external module
const specialistRoute = require("express").Router();

specialistRoute
            .route("/")
            //@specialist?page=1&limit=5
            .get(getSpecialists)
            //@specialist
            .post(createSpecialist)
            //@specialist?id=<>
            .put(editSpecialist)
            .delete(deleteSpecialist)

//@exports
module.exports = specialistRoute;