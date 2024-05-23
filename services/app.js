const express = require("express");
const path = require("path");
const cors = require("cors");
const logger = require('morgan');
const dotenv = require('dotenv').config();

module.exports = async(app) => {

    app
        .use(cors())
        .use(express.json({ limit : '50mb' }))
        .use(express.urlencoded({ extended : false }));

    if(process.env.NODE_ENV === "development"){
        app.use(logger("dev"));
    }

};