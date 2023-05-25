const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/router");
const nodemailer = require("nodemailer");
const port = 1516;
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// middle ware
app.use(express.json());
app.use(cors());
app.use(router)

function connect() {
    try {
        mongoose.connect(process.env.URI).then(() => {
            console.log("Database connected successfully");
        }).catch((err) => {
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}
connect()


// TEACHER

// Teacher Signup
const teacherSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        unique: true,
        required: true,
        type: String
    },
    dob: {
        required: true,
        type: String
    },
    teacherId: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    initial: {
        required: true,
        type: String
    },
    level: {
        required: true,
        type: String
    },
    branch: {
        required: true,
        type: String
    },
    department: {
        required: true,
        type: String
    },
    image: {
        required: true,
        type: String
    }
})
const teacherModels = mongoose.models.teacherInfo || mongoose.model("teacherInfo", teacherSchema)
app.post("/teacher/generate", (req, res) => {
    let data = req.body
    try {
        teacherModels(data).save().then((result) => {
            console.log(result);
            try {
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                });
                const template = `
                <div
                style=" background-color: #f3f2ef; width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center;">
                <div
                    style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; background-color: white; width: 500px; padding: 20px; box-shadow: 2px 3px 100px rgba(0, 0, 0, 0.178); border-radius: 8px; margin: auto;">
                    <h1>Dear, ${data.name}, </h1>
                    <div style="margin-top: 30px; font-size: 20px;">
                        <p>
                            You must have been longing to have this message, We have reviewed your application and you are a yes
                            to
                            the company.
                            In a word you have been successfully appointed as a staff in one of the schools at GradeJet.
                            You are to resume after 5 working days.
                        </p>
                        <br>
                        <b>Here's your Login Details to the app.</b>
                        <br>
                        <strong>
                            Teacher ID: ${data.name}
                        </strong>
                        <br>
                        <br>
                        <strong>
                            Password: ${data.name}
                        </strong>
                    </div>
                </div>
            </div>
                `
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: data.email,
                    subject: "GradeJet School Management System",
                    html: template
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("Error" + error)
                    } else {
                        console.log("Email sent:" + info.response);
                        res.status(201).json({ status: 201, info })
                    }
                })

            } catch (error) {
                console.log("Error" + error);
                res.status(401).json({ status: 401, error })
            }

            res.status(201).send({ message: `${data.name} Account Created` })
        }).catch((err) => {
            console.log(err);
            res.status(401).send({ message: `Email exists Already` })
        })
    } catch (error) {
        res.status(401).send({ message: "Client error" })
    }
})
















app.listen(port, () => {
    console.log(`App running on port ${port}`)
})