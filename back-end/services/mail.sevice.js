const nodemailer = require("nodemailer");
const { EmployeeProfile, CompanyProfile } = require("../models");
const { emailTem } = require("../assets/email");
const { OAuth2Client } =  require('google-auth-library');



const sendMail = async (employeeId, companyId, companyAddress) => {
  const myOAuth2Client = new OAuth2Client(
    process.env.GOOGLE_MAILER_CLIENT_ID,
    process.env.GOOGLE_MAILER_CLIENT_SECRET
  )
  
  myOAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN
  })

  const myAccessTokenObject = await myOAuth2Client.getAccessToken();
  const token = myAccessTokenObject?.token;
  try {
    const employee = await EmployeeProfile.findById(employeeId).populate(
      "account"
    );
    const company = await CompanyProfile.findById(companyId).populate(
      "account"
    );

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: "ptv.dejavu@gmail.com",
        clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
        clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: token
      }
    });

    await transporter.sendMail({
      from: "ptv.dejavu@gmail.com",
      to: employee?.account?.email,
      subject: "Congratulation from PTV Platform",
      html: emailTem(employee.name, company.name, companyAddress),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {sendMail};
