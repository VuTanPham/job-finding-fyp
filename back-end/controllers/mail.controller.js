const { sendMail } = require("../services/mail.sevice");


const sendMailToEmployee = async (req, res) => {
    const {employeeId, companyId, companyAddress} = req.body;
    try {
        await sendMail(employeeId, companyId, companyAddress);
        res.status(200).json({message: 'mail sent'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}

module.exports = {sendMailToEmployee};