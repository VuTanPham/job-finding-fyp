const { Conservation, Message, User } = require("../models/index");

const createConservation = async (company, employee) => {
  const conservation = new Conservation({
    members: [company, employee],
    messages: [],
  });
  return await conservation.save();
};

const getAllJoinCOnservations = async (userId) => {
  const conservations = await Conservation.find({ members: userId }, null, {
    populate: [
      { path: "members" },
      { path: "messages", populate: { path: "sender" } },
    ],
    sort: { createdAt: 1 },
  });
  return conservations;
};

const getSingleConservation = async (conservationId) => {
  const conservation = await Conservation.findById(conservationId, null, {
    populate: [
      { path: "members" },
      { path: "messages", populate: { path: "sender" } },
    ],
    sort: { createdAt: 1 },
  });
  return conservation;
};

const sendNewMessage = async (conservationId, userId, message) => {
  const conservation = await Conservation.findById(conservationId, null, {
    populate: [
      { path: "members" },
      { path: "messages", populate: { path: "sender" } },
    ],
    sort: { createdAt: 1 },
  });
  const user = await User.findById(userId);
  const newMessage = new Message({ sender: user, content: message });
  await newMessage.save();
  conservation.messages.push(newMessage);
  await conservation.save();
  return conservation;
};

const readConservation = async (conservationId, userId) => {
    const user = await User.findById(userId);
    const conservation = await Conservation.findById(conservationId);
    conservation.readBy.push(user);
    await conservation.save();
}

module.exports = {
  createConservation,
  getAllJoinCOnservations,
  getSingleConservation,
  sendNewMessage,
  readConservation
};
