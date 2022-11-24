const { HiringPost, CompanyProfile, EmployeeProfile } = require("../models");

const LIMIT = 5;

const getOwnHiringPosts = async (userId, page = 1, searchParam = "") => {
  const company = await CompanyProfile.findOne({ account: userId });
  const ownHiringPosts = await HiringPost.find({
    $or: [
      { title: new RegExp(searchParam, "i") },
      { description: new RegExp(searchParam, "i") },
    ],
    $and: [{ createdBy: company._id }],
  });
  const totalPages = Math.ceil(ownHiringPosts.length / LIMIT);
  return {
    data: await HiringPost.find(
      {
        $or: [
          { title: new RegExp(searchParam, "i") },
          { description: new RegExp(searchParam, "i") },
        ],
        $and: [{ createdBy: company._id }],
      },
      null,
      { populate: { path: "createdBy", populate: { path: "account" } } }
    )
      .skip((page - 1) * LIMIT)
      .limit(LIMIT),
    totalPages,
  };
};

const getAppliedPosts = async (userId, page = 1) => {
  const employee = await EmployeeProfile.findOne({ account: userId });
  console.log(employee);
  const ownHiringPosts = await HiringPost.find({
    appliedCandidate: employee._id
  });
  const totalPages = Math.ceil(ownHiringPosts.length / LIMIT);
  return {
    data: await HiringPost.find(
      {
        appliedCandidate: employee._id
      },
      null,
      { populate: { path: "createdBy", populate: { path: "account" } } }
    )
      .skip((page - 1) * LIMIT)
      .limit(LIMIT),
    totalPages,
  };
};

const getAllHiringPostInSystem = async (page = 1, searchParam = "") => {
  const allPosts = await HiringPost.find({
    $or: [
      { title: new RegExp(searchParam, "i") },
      { description: new RegExp(searchParam, "i") },
    ],
  });
  const totalPages = Math.ceil(allPosts.length / LIMIT);
  return {
    data: await HiringPost.find(
      {
        $or: [
          { title: new RegExp(searchParam, "i") },
          { description: new RegExp(searchParam, "i") },
        ],
      },
      null,
      { populate: { path: "createdBy", populate: { path: "account" } } }
    )
      .skip((page - 1) * LIMIT)
      .limit(LIMIT),
    totalPages,
  };
};

const getHiringPostById = async (id) => {
  return await HiringPost.findById(id, null, {
    populate: { path: "createdBy", populate: { path: "account" } },
  });
};

const createHiringPost = async (userId, body) => {
  const company = await CompanyProfile.findOne({ account: userId });
  const newHiringPost = new HiringPost({
    ...body,
    createdBy: company,
  });
  await newHiringPost.save();
  return { data: newHiringPost };
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

const undoApplied = async (userId, postId) => {
  const candidate = await EmployeeProfile.findOne({ account: userId });
  const hiringPost = await HiringPost.findById(postId);
  if (!hiringPost.appliedCandidate.includes(candidate._id)) {
    throw new Error("You had not applied this job yet");
  } else {
    hiringPost.appliedCandidate = hiringPost.appliedCandidate.filter(item => item.toString() != candidate._id?.toString());
    await hiringPost.save();
    return hiringPost;
  }
}

module.exports = {
  getAllHiringPostInSystem,
  getHiringPostById,
  getOwnHiringPosts,
  createHiringPost,
  updateHiringPost,
  removeHiringPost,
  applyToHiringPost,
  getAppliedPosts,
  undoApplied
};
