//@internal module
const doctorRoute = require("./doctor/doctorRoute");
const reviewRoute = require("./doctor/reviewRoute");
const ratingRoute = require("./doctor/ratingRoute");
const specialistRoute = require("./specialistRoute");

//@exports
module.exports = {  doctorRoute,
                    ratingRoute,
                    reviewRoute,
                    specialistRoute
                }