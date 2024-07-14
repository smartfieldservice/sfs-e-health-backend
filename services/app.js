//@internal module
const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const dashboardRouter = express.Router();

//@external module
const { doctorRoute, 
        specialistRoute, 
        reviewRoute,
        ratingRoute,
        userRoute, 
        divisionRoute, 
        districtRoute, 
        adminRoute } = require("../routes/routeExporter");

module.exports = async(app) => {

    app
        .use(cors())
        .use(express.json({ limit : '50mb' }))
        .use(express.urlencoded({ extended : false }));

    if (process.env.NODE_ENV === "development") {
        app.use(morgan("dev"));
    }

    app
        .use("/user", userRoute)
        .use("/doctor", doctorRoute)
        .use("/review", reviewRoute )
        .use("/rating", ratingRoute )
        .use("/admin", adminRoute)
        .use("/get-specialist", specialistRoute)

    app
        .use("/dashboard", dashboardRouter);

    dashboardRouter
        .use("/specialist", specialistRoute)
        .use("/division", divisionRoute)
        .use("/district", districtRoute);

};