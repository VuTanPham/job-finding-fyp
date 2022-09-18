const { HiringPost, CompanyProfile, EmployeeProfile } = require("../models");

const LIMIT = 10;

const getOwnHiringPosts = async (userId, page = 1) => {
  const company = await CompanyProfile.findOne({ account: userId });
  const ownHiringPosts = await HiringPost.find({ createBy: company._id });
  const totalPages = Math.ceil(ownHiringPosts.length / LIMIT);
  return {
    data: await HiringPost.find({ createBy: company._id })
    .skip((page - 1) * LIMIT)
    .limit(LIMIT),
    totalPages
  };
};

const getAllHiringPostInSystem = async (page = 1) => {
  const allPosts = await HiringPost.find();
  const totalPages = Math.ceil(allPosts.length / LIMIT);
  return {
    data: await HiringPost.find().skip((page - 1) * LIMIT).limit(LIMIT),
    totalPages
  };
};

const getHiringPostById = async (id) => {
  return await HiringPost.findById(id);
};

const createHiringPost = async (userId, body) => {
  const company = await CompanyProfile.findOne({ account: userId });
  const newHiringPost = new HiringPost({
    ...body,
    createdBy: company,
  });
  await newHiringPost.save();
  return {data: newHiringPost};
};

const updateHiringPost = async (id, body) => {
  await HiringPost.findByIdAndUpdate(id, { ...body });
};

const removeHiringPost = async (id) => {
  await HiringPost.findByIdAndDelete(id);
};

const applyToHiringPost = async (userId, postId) => {
  const candidate = await EmployeeProfile.findOne({ account: userId });
  const hiringPost = await HiringPost.findById(postId);
  if (hiringPost.appliedCandidate.includes(candidate._id)) {
    throw new Error("You had applied this job before");
  } else {
    hiringPost.appliedCandidate.push(candidate);
    await hiringPost.save();
    return hiringPost;
  }
};

module.exports = {
  getAllHiringPostInSystem,
  getHiringPostById,
  getOwnHiringPosts,
  createHiringPost,
  updateHiringPost,
  removeHiringPost,
  applyToHiringPost,
};
