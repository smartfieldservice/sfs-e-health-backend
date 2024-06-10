//@external module
const mongoose = require("mongoose");

//@exports
module.exports = async() => {
    mongoose.connect(process.env.MONGO_URI,{})
    .then(() => console.log(`Database connection established to ${process.env.MONGO_URI}`))
    .catch((error) => console.log(`Database not connected due to -> ${error}`))
}