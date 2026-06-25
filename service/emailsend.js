import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MAIL_PASS
    }
});

export const sendOtpEmail = async (email, otp) => {
   
    await transporter.sendMail({
        from: process.env.MY_EMAIL,
        to: email,
        subject: "Password Reset OTP",
        html: `<h2>Your OTP is ${otp}</h2>`
    });
};
