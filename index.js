const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/register", (req, res) => {
  const { name, surname, phone, email } = req.body;

  const successMessage =
    "Registration successful. Check your email for confirmation.";

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "nodejsservertesting@gmail.com",
      pass: "xghh jgji nhpu soni",
    },
  });

  const confirmationLink = `http://localhost:${port}/confirm?email=${email}`;
  const mailOptions = {
    from: "nodejsservertesting@gmail.com",
    to: email,
    subject: "Email Confirmation",
    text: `Thank you for registering. Please confirm your email by clicking this link: ${confirmationLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Email sending failed:", error);
    } else {
      console.log("Email sent:", info.response);
      res.send(successMessage);
    }
  });
});

app.get("/confirm", (req, res) => {
  const email = req.query.email;

  const confirmedEmails = {};

  if (confirmedEmails[email]) {
    res.send("Email already confirmed.");
  } else {
    confirmedEmails[email] = true;
    res.send("Confirmation successful");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
