const { District, Division } = require("../../models/modelExporter");


const districts = {
    'Dhaka': ['Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj', 'Madaripur', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Rajbari', 'Shariatpur', 'Tangail'],
    'Chittagong': ['Bandarban', 'Brahmanbaria', 'Chandpur', 'Chittagong', 'Comilla', 'Cox\'s Bazar', 'Feni', 'Khagrachari', 'Lakshmipur', 'Noakhali', 'Rangamati'],
    'Rajshahi': ['Bogra', 'Joypurhat', 'Naogaon', 'Natore', 'Chapainawabganj', 'Pabna', 'Rajshahi', 'Sirajganj'],
    'Khulna': ['Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Khulna', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira'],
    'Barisal': ['Barguna', 'Barisal', 'Bhola', 'Jhalokathi', 'Patuakhali', 'Pirojpur'],
    'Sylhet': ['Habiganj', 'Moulvibazar', 'Sunamganj', 'Sylhet'],
    'Rangpur': ['Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon'],
    'Mymensingh': ['Jamalpur', 'Mymensingh', 'Netrokona', 'Sherpur']
  };


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