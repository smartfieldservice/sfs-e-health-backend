const { Division } = require("../../models/modelExporter");

//@seed division data
const divisions = [
    'Dhaka',
    'Chittagong',
    'Rajshahi',
    'Khulna',
    'Barisal',
    'Sylhet',
    'Rangpur',
    'Mymensingh'
  ];

const seedDivisions = async(req, res) => {

    try {

        //@clear existing data
        await Division.deleteMany({});
        
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