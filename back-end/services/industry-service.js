const { IndustryFields } = require("../models");

const getAll = async () => {
  return {
    data: await IndustryFields.find(),
  };
};

const getOne = async (id) => {
  return {
    data: await IndustryFields.findById(id),
  };
};

const create = async (body) => {
  const newOne = new IndustryFields({ ...body });
  await newOne.save();
  return { data: newOne, message: 'created' };
};

const update = async (id, body) => {
  return {
    data: await IndustryFields.findByIdAndUpdate(id, { ...body }),
    message: 'updated'
  };
};

const remove = async (id) => {
  await IndustryFields.findByIdAndDelete(id);
  return {
    message: 'deleted'
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
