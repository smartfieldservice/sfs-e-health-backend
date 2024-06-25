//@external module
const { isValidObjectId } = require("mongoose");

//@internal module
const { Rating } = require("../../models/modelExporter");

const addRating = async(req, res, next) => {

    try {

        const { doctorId, rating } = req.body;

        if (!isValidObjectId(doctorId)) {
            return res.status(400).json({ message: "Invalid doctor ID" });
        }else{

            let rate = await Rating.findOne({ doctorId });

            if(rate){

                let ratingSum = rate.ratingSum + rating;
                let ratingCount = rate.ratingCount + 1;

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