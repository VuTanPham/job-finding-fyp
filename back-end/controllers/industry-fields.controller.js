const {getAll, getOne, create, update, remove} = require('../services/industry-service');


const getAllIndustryFields = async (req, res) => {
    try {
        const result = await getAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getIndustryFieldById = async (req, res) => {
    try {
        const result = await getOne(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createIndustryField = async (req, res) => {
    try {
        const result = await create(req.body);
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateIndustryField = async (req, res) => {
    try {
        const result = await update(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const removeIndustryField = async (req, res) => {
    try {
        const result = await remove(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllIndustryFields,
    getIndustryFieldById,
    createIndustryField,
    updateIndustryField,
    removeIndustryField
}