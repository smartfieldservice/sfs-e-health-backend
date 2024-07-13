const { isValidObjectId } = require("mongoose");
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

        let doctors = Doctor.find( queryObject )
                        .populate({ path : 'specialityId', select : 'speciality'});

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

        const { name, institute, fees, specialityId, availableFromDay, availableToDay, availableFromTime, availableToTime, experience, biography  } = req.body;

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
                specialityId,
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

                const { name, institute, fees, specialityId, availableFromDay, availableToDay, 
                    availableFromTime, availableToTime, experience, biography  } = req.body;

                doctor = await Doctor.findByIdAndUpdate({
                    _id : req.query.id
                },{
                    name,
                    institute,
                    image : req.file ? req.file.location : "Image not available",
                    fees,
                    specialityId,
                    availableFromDay,
                    availableToDay,
                    availableFromTime,
                    availableToTime,
                    experience,
                    biography,
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
        
        if(req.params.clue !== ""){

            const searchQuery = new RegExp( functions.escapeString(req.params.clue), "i");
            
            const doctors = await Doctor.find({
                $or : [
                    { name : searchQuery }
                ]
            });
            res.status(200).json({ message : `${doctors.length} result found !`, data : doctors });  
        }
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

const addAverageRating = async(req, res) => {
    try {
        console.log("i am in doctor")
        const avgRating = await Doctor.findByIdAndUpdate(
            { _id : req.body.doctorId }, 
            { avgRating : req.body.avgRating }, 
            { new : true }
        );

        res.status(201).json({ message : "Rating added successfully !", data : avgRating });
        
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

const getDoctorDetails = async(req, res, next) => {
    
    try {
        
        let { id , slug } = req.query;
        
        let doctor;

        if(slug){

            doctor = await Doctor.findOne({ slug })
                        .populate({ path : 'specialityId', select : 'speciality'});
            
            if(doctor){
                id = doctor._id;
            }
        }
        if(id){
            
            if(!isValidObjectId(id)){

                res.status(400).json({ message : "Not Found!" });

            }else{

                if(!doctor){
                    doctor = await Doctor.findById({ _id : id })
                                .populate({ path : 'specialityId', select : 'speciality'});
                }

                if(!doctor){

                    res.status(404).json({ message : "Not Found!" });

                }else{
                    req.body.details = doctor;
                    next();
                }
            }
        }else{
            res.status(404).json({ message : "Not Found!"});
        }
    } catch (error) {
        res.status(400).json({ message : error });
    }
}

module.exports = {  getDoctors,
                    createDoctor,
                    editDoctor,
                    deleteDoctor,
                    searchDoctors,
                    addAverageRating,
                    getDoctorDetails
                }