//@internal module
const userRoute = require("./user/userRoute");
const doctorRoute = require("./doctor/doctorRoute");
const reviewRoute = require("./doctor/reviewRoute");
const ratingRoute = require("./doctor/ratingRoute");
const specialistRoute = require("./specialistRoute");
const divisionRoute = require("./address/divisionRoute");

//@exports
module.exports = {  userRoute,
                    doctorRoute,
                    ratingRoute,
                    reviewRoute,
                    specialistRoute,
                    divisionRoute
                }