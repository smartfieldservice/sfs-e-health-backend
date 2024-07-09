const { Division, District } = require("../../../models/modelExporter");

//@seed division data
const divisions = process.env.DIVISIONS.split(',');

const seedDivisions = async(req, res) => {

    try {

        //@clear existing data
        await Promise.all([
            Division.deleteMany({}),
            District.deleteMany({})
        ]);
        
        const divisionPromises = divisions.map(division => {
            return new Division({ name: division }).save();
        });
        
        await Promise.all(divisionPromises);
        
        res.status(200).json({ message : "Division added successfully !" });
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

module.exports = { seedDivisions }