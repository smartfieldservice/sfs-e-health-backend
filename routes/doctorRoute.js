//@external modules
const doctorRoute = require("express").Router();
const multer = require("multer");

//@internal modules
const { getDoctors, 
        createDoctor, 
        editDoctor, 
        deleteDoctor } = require("../controllers/doctorController");
const { s3Upload } = require('../middlewares/middlewareExporter')

//@create an upload instance
const upload = multer({
        storage : s3Upload.storageConfig
});

doctorRoute
        .route("/")
        .get(getDoctors)
        .post(createDoctor)
        .put(editDoctor)
        .delete(deleteDoctor)
    
module.exports = doctorRoute;