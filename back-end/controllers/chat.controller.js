const {getAllConservation, deleteConservation, sendNewMessage, getConservation} = require('../services/chatting.service')


const getAll = async (req, res) => {
    const {_id, accountType} = req.user;
    try {
        const conversations = await getAllConservation(_id, accountType);
        res.status(200).json(conversations);
    } catch (error) {
        console.log(error)
    }
}

const getOne = async (req, res) => {
    try {
        const conversation = await getConservation(req.params.id);
        res.status(200).json(conversation);
    } catch (error) {
        console.log(error)
    }
}

const sendMessage = async (req, res) => {
    const {accountType, _id} = req.user;
    const {conservationId, content, profileId} = req.body;
    try {
        const {newMessage} = await sendNewMessage(conservationId, accountType, content, profileId);
        res.status(201).json(newMessage);
    } catch (error) {
        console.log(error);
    }
}


const deleteOne = async (req, res) => {
    try {
        await deleteConservation(req.params.id);
        req.status(200).json({message: 'Deleted'});
    } catch (error) {
        console.log(error)
    }
}



module.exports = {getAll, getOne, deleteOne, sendMessage}