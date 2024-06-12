const { Review } = require("../../models/modelExporter");

const addReview = async(req, res) => {
    try {

        const { doctorId, review } = req.body;

        console.log(req.body);

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

module.exports = { addReview }