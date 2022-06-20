const express = require("express");
const cors = require("cors");
const PORT = 3000;
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();

app.use(cors({ origin: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static folder
app.use(express.static("public"));

app.post('/sendEmail', (req, res) => {
//   res.set('Content-Type', 'application/json');
//   res.set("Access-Control-Allow-Origin", "*");
//   res.set("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
//   res.set("Access-Control-Allow-Headers", "*");


  // if (req.method == "OPTIONS") {
  //   res.end();
  // } else {
  //   if (
  //     (req.body.name != null &&
  //       req.body.phone != null &&
  //       req.body.time != null &&
  //       req.body.date != null &&
  //       req.body.message != null) ||
  //     (req.body.name != undefined &&
  //       req.body.phone != undefined &&
  //       req.body.time != undefined &&
  //       req.body.date != undefined &&
  //       req.body.message != undefined)
  //   ) {
      const container = `text-align-last: center;
      text-align: center;
        padding: 10px;
        background-color: #e9e9e9;
        color: #2e2e2e;`;
      const h3Style = `font-size: 20px;`;
      const bodyStyle = `font-size: 15px;`;
      const output = `
      <p>Hi Manager,</p>
      <p>The system has received a new appointment below:</p>
      <div style='${container}'>
        <h3 style='${h3Style}'>&#129321; New Appointment &#129321;</h3>
        <div style='${bodyStyle}'>
        <p><strong>Name:</strong> <span>${req.body.name}</span></p>
        <p><strong>Phone number:</strong> <span><a href="tel:${req.body.phone}"> ${req.body.phone}</a></span></p>
        <p><strong>Time:</strong> <span>${req.body.time}</span></p>
        <p><strong>Date:</strong> <span>${req.body.date}</span></p>
        <p><strong>Message:</strong> <span>${req.body.message}</span></p>
        </div>
      </div>
      `;

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "ohlalanailsyyc@gmail.com", // generated ethereal user
          pass: "khmtdgpksozkrykd", // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // send mail with defined transport object
      let mailOptions = {
        from: '"OhLaLa Nails & Spa" <ohlalanailsyyc@gmail.com>', // sender address
        to: "tienluat6197@gmail.com", // list of receivers
        subject: "NEW APPOINTMENT FROM " + req.body.name, // Subject line
        text: "", // plain text body
        html: output, // html body
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log(err);
        }
        res.render("main", { msg: "Email is sent successfully" });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
      res.json({
        msg: "Email is sent successfully"
      });
    //   res.status(200).send(req);
      // res.status(200).send(req);
    // }
  // }

//   res.end();
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

