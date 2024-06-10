const { getDoctors, 
        createDoctor, 
        editDoctors, 
        deleteDoctor } = require("../controllers/doctorController");

const doctorRoute = require("express").Router();

doctorRoute
        .route("/")
        .get(getDoctors)
        .post(createDoctor)
        .put(editDoctors)
        .delete(deleteDoctor)
    
module.exports = doctorRoute;