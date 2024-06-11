const { Doctor } = require("../models/modelExporter");
const { functions } = require("../utilities/utilityExporter");

const getDoctors = async(req, res) => {

    try {
        let doctors = Doctor.find({ });

        doctors = await functions.pagination(req.query.page, req.query.limit, doctors);
        
        res.status(200).json({ message : `${doctors.length} fields found` , data : doctors });

    } catch (error) {
        res.status(400).json({ message : error })
    }
}

const createDoctor = async(req, res) => {

    try {

        const { name, institute, fees, specialist, availableTime, experience } = req.body;

        const slug = functions.generateSlug(name);

        let doctor = await Doctor.findOne({ slug });

        if(doctor){
            res.status(400).json("Already Exist");
        }else{

            doctor = new Doctor({
                name,
                institute,
                fees,
                specialist,
                availableTime,
                experience,
                slug
            });

            await doctor.save();

            res.status(201).json({ message : "New Doctor Created Successfully !", data : doctor })
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

module.exports = {  getDoctors,
                    createDoctor,
                    editDoctor,
                    deleteDoctor
                }