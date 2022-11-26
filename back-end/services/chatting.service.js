const {
  User,
  Conservation,
  Message,
  EmployeeProfile,
  CompanyProfile,
} = require("../models");

const getAllConservation = async (memId, accountType) => {
  const member =
    accountType === "company"
      ? await CompanyProfile.findOne({ account: memId })
      : await EmployeeProfile.findOne({ account: memId });

  return await Conservation.find(
    accountType === "company"
      ? { company: member._id }
      : { employee: member._id },
    null,
    {
      populate: [
        { path: "messages" },
        { path: "readBy" },
        { path: "company", populate: { path: "account" } },
        { path: "employee", populate: { path: "account" } },
      ],
    }
  );
};

const getConservation = async (conservationId) => {
  return await Conservation.findById(conservationId, null, {
    populate: [
      { path: "messages" },
      { path: "readBy" },
      { path: "company", populate: { path: "account" } },
      { path: "employee", populate: { path: "account" } },
    ],
  });
};

const createConservation = async (employeeId, companyId) => {
  const checkExisted = await Conservation.findOne({
    employee: employeeId,
    company: companyId,
  });

  if (checkExisted) {
    return;
  }

  const conservation = new Conservation({
    employee: employeeId,
    company: companyId,
    messages: [],
    readBy: [],
  });

  await conservation.save();
};

const sendNewMessage = async (conservationId, sendBy, content, senderId) => {
  const conservation = await Conservation.findById(conservationId);
  const newMessage = new Message(
    sendBy === "company"
      ? { sendBy, content, company: senderId }
      : { sendBy, content, employee: senderId }
  );
  conservation.messages.push(sendBy);
  await newMessage.save();
  await conservation.save();

  let receiverId;

  if(newMessage.sendBy === "company") {
    const employee = await EmployeeProfile.findById(senderId).populate('account');
    receiverId = employee.account?.socketId;
  }
  else {
    const company = await CompanyProfile.findById(senderId).populate('account');
    receiverId = company.account?.socketId
  }

  return {receiverId, newMessage};
};

const deleteConservation = async (conservationId) => {
  await Conservation.findByIdAndDelete(conservationId);
};

module.exports = {
  getAllConservation,
  getConservation,
  createConservation,
  sendNewMessage,
  deleteConservation,
};
