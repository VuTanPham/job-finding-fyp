const nodemailer = require("nodemailer");
const { EmployeeProfile, CompanyProfile } = require("../models");
const { emailTem } = require("../assets/email");

const sendMail = async (employeeId, companyId, companyAddress) => {
  try {
    const employee = await EmployeeProfile.findById(employeeId).populate(
      "account"
    );
    const company = await CompanyProfile.findById(companyId).populate(
      "account"
    );

    const account = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    await transporter.sendMail({
      from: account.user,
      to: employee.account.email,
      subject: "Congratulation from PTV Platform",
      html: emailTem(employee.name, company.name, companyAddress),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {sendMail};
