const {HiringPost, CompanyProfile, EmployeeProfile} = require('../models');


const getOwnHiringPosts = async (userId) => {
    const company = await CompanyProfile.findOne({account: userId});
    return await HiringPost.findAll({createBy: company._id});
}

const getALlHiringPostInSystem = async () => {
    return await HiringPost.findAll();
}

const getHiringPostById = async (id) => {
    return await HiringPost.findById(id);
}

const createHiringPost = async (userId, body) => {
    const company = await CompanyProfile.findOne({account: userId});
    const newHiringPost = new HiringPost({
        ...body,
        createdBy: company
    });
    await newHiringPost.save();
    return newHiringPost;
}

const updateHiringPost = async (id, body) => {
    await HiringPost.findByIdAndUpdate(id, {...body});
}

const removeHiringPost = async (id) => {
    await HiringPost.findByIdAndDelete(id);
}

const applyToHiringPost = async (userId, postId) => {
    const candidate = await EmployeeProfile.findOne({account: userId});
    const hiringPost = await HiringPost.findById(postId);
    if(hiringPost.appliedCandidate.includes(candidate._id)) {
        throw new Error('You had applied this job before')
    }
    else {
        hiringPost.appliedCandidate.push(candidate);
        await hiringPost.save();
        return hiringPost;
    }
}

module.exports = {
    getALlHiringPostInSystem,
    getHiringPostById,
    getOwnHiringPosts,
    createHiringPost,
    updateHiringPost,
    removeHiringPost,
    applyToHiringPost
}