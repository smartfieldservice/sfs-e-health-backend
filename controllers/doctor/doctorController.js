const { Doctor } = require("../../models/modelExporter");
const { functions } = require("../../utilities/utilityExporter");

const getDoctors = async(req, res) => {

    try {

        const { page, limit, sort, speciality, rating } = req.query;

        const queryObject = { };

        if(speciality != 'all'){
            queryObject.speciality = speciality;
        }

        if(rating != 'all'){
            queryObject.rating = rating;
        }

        console.log(queryObject)

        let doctors = Doctor.find( queryObject );

        let sortBy = "-updatedAt";
        if(sort){
            sortBy = sort.replace(","," ");
        }

        doctors = doctors.sort(sortBy);

        doctors = await functions.pagination(page, limit, doctors);
        
        res.status(200).json({ message : `${doctors.length} fields found` , data : doctors });

    } catch (error) {
        res.status(400).json({ message : error })
    }
}

const createDoctor = async(req, res) => {

    try {

        const { name, institute, fees, specialist, availableFromDay, availableToDay, availableFromTime, availableToTime, experience, biography  } = req.body;

        const slug = functions.generateSlug(name);

        let doctor = await Doctor.findOne({ slug });

        if(doctor){
            res.status(400).json("Already Exist");

            //@delete the uploaded photo if exist

        }else{

            doctor = new Doctor({
                name,
                institute,
                image : req.file ? req.file.location : "Image not available",
                fees,
                specialist,
                availableFromDay,
                availableToDay,
                availableFromTime,
                availableToTime,
                experience,
                biography,
                slug
            });

            await doctor.save();

            res.status(201).json({ message : "New Doctor Created Successfully !", data : doctor });
        }

    } catch (error) {
        res.status(400).json({ message : error })
    }
}

const editDoctor = async(req, res) => {

    try {

        if(!isValidObjectId(req.query.id)){
            //@invalid objectId
            res.status(400).json({message : "Invalid Id"});
        }else{

             let doctor = await Doctor.findById({ _id : req.query.id });

             if(!doctor){
                res.status(404).json({message : "Not Found"});
             }else{

                const { name, institute, fees, specialist, availableTime, experience } = req.body;

                doctor = await Doctor.findByIdAndUpdate({
                    _id : req.query.id
                },{
                    name,
                    institute,
                    fees,
                    specialist,
                    availableTime,
                    experience,
                    slug : functions.generateSlug(name)
                }, {
                    new : true
                })

                res.status(201).json({ message : "Doctor Updated Successfully !", data : doctor })
            }
        }
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

const deleteDoctor = async(req, res) => {

    try {
        if(!isValidObjectId(req.query.id)){
            //@invalid objectId
            res.status(400).json({message : "Invalid Id"});
        }else{

             let doctor = await Doctor.findById({ _id : req.query.id });
             
             if(!doctor){
                res.status(404).json({message : "Not Found"});
             }else{
                doctor = await Doctor.findByIdAndDelete({ _id : req.query.id });
                res.status(201).json({ message : "Doctor Deleted Successfully !", data : doctor})
            }
        }
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

const searchDoctors = async(req,res) => {
    try {
        
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

module.exports = {  getDoctors,
                    createDoctor,
                    editDoctor,
                    deleteDoctor,
                    searchDoctors
                }