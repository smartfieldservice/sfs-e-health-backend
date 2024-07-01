//@internal module
const { District, Division } = require("../../models/modelExporter");
const districts = JSON.parse(process.env.DISTRICTS);

const seedDistrict = async(req, res) => {

    try {

        //@clear existing data
        await District.deleteMany({});

        //@find all division
        const divisions = await Division.find({});

        for( const [divisionName, districtNames] of Object.entries(districts)){

            const division = divisions.find(div => div.name === divisionName);

            if(division){

                for(const districtName of districtNames){

                    await District.create({
                        name : districtName,
                        divisionId : division._id
                    });
                }
            }
        }
        res.status(200).json({ message : "District added successfully !" });
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

//@exports
module.exports = { seedDistrict }