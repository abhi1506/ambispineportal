const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user:process.env.SMTP_USER,
                pass:process.env.SMTP_PASS 
            },
        });

        const mailOptions = {
            from:process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${options.email}`);
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw new Error("Email could not be sent. Please try again later.");
    }
};

module.exports = sendEmail;
