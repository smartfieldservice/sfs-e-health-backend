const { Admin } = require("../../../models/modelExporter");
const { functions } = require("../../../utilities/utilityExporter");


const registerAdmin = async(req, res) => {

    try {

        const { name, email, password, address, phone } = req.body;

        let admin = await Admin.findOne({ email });

        if(admin){
            res.status(400).json("Already Exist");

            //@delete the uploaded photo if exist

        }else{ 

            const hashedPassword = await functions.hashedPassword( password );

            admin = await Admin.create({
                name,
                email,
                image : req.file ? req.file.location : "Image not available",
                password : hashedPassword,
                address,
                phone
            });

            res.status(201).json({ message : "New admin Created Successfully !", data : admin });
        }
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

const loginAdmin = async(req,res) => {

    try {

        const { email , password } = req.body;
        
        //@check admin exist or not
        const admin = await Admin.findOne({ email });

        if(!admin){ 
            //@not found
            return res.status(400).json({ message: 'Credential not matched !' });
        }
        else if(!(await functions.verifyPassword( password, admin.password ))){
            //@not matched password
            return res.status(400).json({ message: 'Credential not matched !' });
        }
        else{
           //@send the response
           res.status(200).json({  message: 'Login successfull', 
                id : admin.id, 
                email : admin.email,
                token : functions.generateAuthToken(admin.id, email, admin.role)
            });
        }
    } catch (error) {
        res.status(400).json({ errors : error.message });
    }
}

const getAdmins = async(req, res) => {

    try {

        const { page, limit, sort , role } = req.query;

        const queryObject = { };

        if(role){
            queryObject.role = role;
        }

        let admins = Admin.find( queryObject );

        let sortBy = "-updatedAt";
        if(sort){
            sortBy = sort.replace(","," ");
        }

        admins = admins.sort(sortBy);

        admins = await functions.pagination(page, limit, admins);
        
        res.status(200).json({ message : `${admins.length} fields found` , data : admins });

    } catch (error) {
        res.status(400).json({ message : error })
    }
}

//@exports
module.exports = {  getAdmins,
                    registerAdmin,
                    loginAdmin
                }
