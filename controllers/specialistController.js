//@external module
const { isValidObjectId } = require("mongoose");

//@internal modules
const { Specialist } = require("../models/modelExporter");
const { functions } = require("../utilities/utilityExporter");


const getSpecialists = async(req, res) => {

    try {
        
        let specialists = Specialist.find({ });

        let sortBy = "-updatedAt";
        if(req.query.sort){
            sortBy = req.query.sort.replace(","," ");
        }

        specialists = specialists.sort(sortBy);

        specialists = await functions.pagination(req.query.page, req.query.limit, specialists);

        res.status(200).json({ message : `${specialists.length} speciality found` , data : specialists });

    } catch (error) {
        res.status(400).json({ message : error })
    }
}

const createSpecialist = async(req, res) => {

    try {
        
        const { speciality } = req.body;

        const slug = functions.generateSlug(speciality);

        let specialist = await Specialist.findOne({ slug });

        if(specialist){
            res.status(400).json("Already Exist");
        }else{

            specialist = new Specialist({
                speciality,
                slug
            });

            await specialist.save();

            res.status(201).json({ message : "New Specialist Created Successfully !", data : specialist})
        }
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

const editSpecialist = async(req, res) => {

    try {

        if(!isValidObjectId(req.query.id)){
            //@invalid objectId
            res.status(400).json({message : "Invalid Id"});
        }else{

             let specialist = await Specialist.findById({ _id : req.query.id });

             if(!specialist){
                res.status(404).json({message : "Not Found"});
             }else{

                const { field } = req.body;

                specialist = await Specialist.findByIdAndUpdate({
                    _id : req.query.id
                },{
                    field,
                    slug : functions.generateSlug(field)
                }, {
                    new : true
                })

                res.status(201).json({ message : "Specialist Updated Successfully !", data : specialist})
            }
        }
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

const deleteSpecialist = async(req, res) => {

    try {
        if(!isValidObjectId(req.query.id)){
            //@invalid objectId
            res.status(400).json({message : "Invalid Id"});
        }else{

             let specialist = await Specialist.findById({ _id : req.query.id });
             
             if(!specialist){
                res.status(404).json({message : "Not Found"});
             }else{
                specialist = await Specialist.findByIdAndDelete({ _id : req.query.id });
                res.status(201).json({ message : "Specialist Deleted Successfully !", data : specialist})
            }
        }
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

module.exports = {  getSpecialists,
                    createSpecialist,
                    editSpecialist,
                    deleteSpecialist
                }