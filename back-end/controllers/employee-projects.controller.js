const {addNewProject, updateProject, removeProject} = require('../services/employee-profile.service');

const addOne = async (req, res) => {
    try {
        await addNewProject(req.user.userId, req.body);
        res.status(200).json({message: 'Added'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const removeOne = async (req, res) => {
    try {
        await removeProject(req.user.userId, req.params.pjId);
        res.status(204).json({message: 'Removed'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateOne = async (req, res) => {
    try {
        await updateProject(req.pjId.expId, req.body)
        res.status(204).json();
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports = {addOne, removeOne, updateOne};