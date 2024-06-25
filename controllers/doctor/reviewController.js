const { Review } = require("../../models/modelExporter");

const addReview = async(req, res) => {
    try {

        const { doctorId, review } = req.body;

        const reviews = new Review({
            doctorId,
            review
        });
        await reviews.save();

        res.status(201).json({ message : "Review added Successfully !", data : reviews })

    } catch (error) {
        res.status(400).json({ message : error })
    }
}

const getReviews = async(req, res) => {

    try {
        
        const doctorId = req.body.details._id;

        const reviews = await Review.find({ doctorId });

        res.status(200).json({ data : req.body.details, reviews});

    } catch (error) {
        res.status(400).json({ message : error })
    }
}

module.exports = {  addReview,
                    getReviews
                }