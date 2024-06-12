const { Rating } = require("../../models/modelExporter");

const addRating = async(req, res) => {

    try {

        const { doctorId, rating } = req.body;

        const rate = new Rating({
            doctorId,
            rating
        });

        await rate.save();

        res.status(201).json({ message : "Rating added Successfully !", data : rate })

    } catch (error) {
        res.status(400).json({ message : error })
    }
}

module.exports = { addRating }