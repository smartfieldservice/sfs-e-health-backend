//@internal module
const userRoute = require("./user/userRoute");
const doctorRoute = require("./doctor/doctorRoute");
const reviewRoute = require("./doctor/reviewRoute");
const ratingRoute = require("./doctor/ratingRoute");
const specialistRoute = require("./dashboard/specialistRoute");
const divisionRoute = require("./dashboard/address/divisionRoute");
const districtRoute = require("./dashboard/address/districtRoute");
const adminRoute = require("./dashboard/admin/adminRoutes");

//@exports
module.exports = {  userRoute,
                    doctorRoute,
                    ratingRoute,
                    reviewRoute,
                    specialistRoute,
                    divisionRoute,
                    districtRoute,
                    adminRoute
                }