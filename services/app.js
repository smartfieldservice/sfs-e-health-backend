//@internal module
const express = require("express");
const cors = require("cors");
const logger = require('morgan');
const dotenv = require('dotenv').config();

//@external module
const { doctorRoute, 
        specialistRoute, 
        reviewRoute,
        ratingRoute,
        userRoute, 
        divisionRoute, 
        districtRoute } = require("../routes/routeExporter");

module.exports = async(app) => {

    app
        .use(cors())
        .use(express.json({ limit : '50mb' }))
        .use(express.urlencoded({ extended : false }));

    app
        .use("/user", userRoute)
        .use("/doctor", doctorRoute)
        .use("/specialist", specialistRoute)
        .use("/review", reviewRoute )
        .use("/rating", ratingRoute )
        .use("/seed-division", divisionRoute)
        .use("/seed-district", districtRoute)

    if(process.env.NODE_ENV === "development"){
        app.use(logger("dev"));
    }
};