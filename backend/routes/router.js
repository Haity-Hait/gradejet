const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");

// router.post("/data", (req, res) => {
//     const data = req.body
//     console.log(data);
// })
// send mail, 
router.post("/register",  (req, res) => {
    // const { email } = req.body;
    const data = req.body
    console.log(data);
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: data.email,
            subject: "Easy Links School Management System",
            html: `<h1>Congratulations, ${data.name} You have been admitted to <span>Easy Links </span></h1> <br /> <p>You have been successfully admitted to Easy Links. Here's your login details <br /> <strong>Student ID: ${data.studentId}</strong> <br/> <strong>Password: ${data.password}</strong> <br/> Thank you for Choosing Us.</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error" + error)
            } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({status:201,info})
            }
        })

    } catch (error) {
        console.log("Error" + error);
        res.status(401).json({status:401,error})
    }
});


module.exports = router;