const {addNewExperience, removeExperience, updateExperience} = require('../services/employee-profile.service')

const addOne = async (req, res) => {
    try {
        await addNewExperience(req.user._id, req.body);
        res.status(201).json({message: 'Added'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const removeOne = async (req, res) => {
    try {
        await removeExperience(req.user.userId, req.params.expId);
        res.status(204).json({message: 'Removed'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateOne = async (req, res) => {
    try {
        await updateExperience(req.params.expId, req.body)
        res.status(204).json();
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {addOne, removeOne, updateOne}