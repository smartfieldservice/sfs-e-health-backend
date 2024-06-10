//@generate a slug from the given string
const generateSlug = (str) => {
    return str.toLowerCase().replace(/\s+/g, "-");
};

//@function for pagination
const pagination = async (pageNo,pageLimit,data)=>{

    try {
        const page = parseInt(pageNo) || 1;
        const limit = parseInt(pageLimit);
        const skip = (page - 1) * limit;

        return await data.skip(skip).limit(limit);
    
    } catch (error) {
        return error;
    }
}

//@exports
module.exports = {  generateSlug,
                    pagination
                }