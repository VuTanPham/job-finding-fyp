const IndustryFields = require("../models/industry-fields.model");

const seedData = async () => {
  try {
    const count = await IndustryFields.estimatedDocumentCount();
    console.log(count);
    if (!count) {
      await IndustryFields.insertMany([
        { name: "Information Technology" },
        { name: "Marketing" },
        { name: "Digital Design" },
      ]);
      console.log("seeded");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = seedData;
