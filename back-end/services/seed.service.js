const {IndustryFields, User} = require("../models");

const seedData = async () => {
  try {
    const count = await IndustryFields.estimatedDocumentCount();
    const existedAdmin = await User.findOne({username: 'admin'});
    if (!count) {
      await IndustryFields.insertMany([
        { name: "Information Technology" },
        { name: "Marketing" },
        { name: "Digital Design" },
      ]);
    }
    if(!existedAdmin) {
      const admin = new User({
        username: 'admin',
        password: 'admin',
        accountType: 'admin'
      })
      await admin.save();
    }
    console.log('seeded')
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = seedData;
