const {updateUserProfile, getAllUsers, getUserDetail, changeUserBanStatus} = require('../services/user.service');

const getAll = async (req, res) => {
    try {
        const userList = await getAllUsers(req.query.page);
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getOne = async (req, res) => {
    try {
        const user = await getUserDetail(req.params.userId);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateOne = async (req, res) => {
    try {
        await updateUserProfile(req.params.userId, req.body);
        res.status(204).json({message: 'Account Updated'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateUserBanStatus = async (req, res) => {
    try {
        await changeUserBanStatus(req.params.userId, req.body.status);
        res.status(204).json({message: 'Account Updated'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {getOne, updateOne, getAll, updateUserBanStatus}

