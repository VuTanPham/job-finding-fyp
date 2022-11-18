const nodemailer = require("nodemailer");

const sendMail = async (subject, content) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: subject, // Subject line
      text: content, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
  } catch (error) {
    console.log(error);
  }
};
