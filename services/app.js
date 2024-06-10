//@internal module
const express = require("express");
const path = require("path");
const cors = require("cors");
const logger = require('morgan');
const dotenv = require('dotenv').config();

//@external module
const { doctorRoute } = require("../routes/routeExporter");

module.exports = async(app) => {

    app
        .use(cors())
        .use(express.json({ limit : '50mb' }))
        .use(express.urlencoded({ extended : false }));

    app
        .use("/doctor", doctorRoute)

    if(process.env.NODE_ENV === "development"){
        app.use(logger("dev"));
    }
};