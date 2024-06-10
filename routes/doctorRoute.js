const { getDoctors, 
        createDoctor, 
        editDoctor, 
        deleteDoctor } = require("../controllers/doctorController");

const doctorRoute = require("express").Router();

doctorRoute
        .route("/")
        .get(getDoctors)
        .post(createDoctor)
        .put(editDoctor)
        .delete(deleteDoctor)
    
module.exports = doctorRoute;