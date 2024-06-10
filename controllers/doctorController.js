
const getDoctors = async(req, res) => {

    try {
        res.send("get");
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

const createDoctor = async(req, res) => {

    try {
        res.send("create");
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

const editDoctor = async(req, res) => {

    try {
        res.send("edit");
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

const deleteDoctor = async(req, res) => {

    try {
        res.send("delete");
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

module.exports = {  getDoctors,
                    createDoctor,
                    editDoctor,
                    deleteDoctor
                }