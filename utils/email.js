import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "localhost",
      port: 1025,
      auth: {
        user: "project.1",
        pass: "secret.1",
      },
    });
    await transporter.sendMail({
      from: "Optimistic Blog",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log(error, "error email");
  }
};

export default sendEmail;
