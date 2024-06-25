//@external module
const { isValidObjectId, default: mongoose } = require("mongoose");

//@internal module
const { Rating, Doctor } = require("../../models/modelExporter");


const addRating = async(req, res, next) => {

    try {

        const { doctorId, rating } = req.body;

        if (!isValidObjectId(doctorId)) {

            return res.status(400).json({ message: "Invalid doctor ID" });

        }else{


            let rate = await Rating.findOne({ doctorId });

            if(rate){
                console.log("i am update");

                let ratingSum = rate.ratingSum + rating;
                let ratingCount = rate.ratingCount + 1;

                console.log(ratingSum," ",ratingCount);

                rate = await Rating.findOneAndUpdate( 
                    { doctorId },
                    { 
                        ratingSum,
                        ratingCount
                    },
                    { new : true }
                );

                req.body.avgRating = (ratingSum / ratingCount).toFixed(1);

            }else{

                console.log("i am add");


                rate = await Rating.create({
                    doctorId,
                    ratingSum : rating,
                    ratingCount : 1
                });

                req.body.avgRating = rating.toFixed(1);
            }

            next();
        }
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

module.exports = { addRating }