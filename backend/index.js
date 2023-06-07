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

// Super Admin

// Generate Schools
const GenerateSchoolSchema = mongoose.Schema({
    schoolName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    Zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    classMode: {
        type: String,
        required: true
    },
    image: String,
    Year: String,
    Month: String
})
const GenerateSchools = mongoose.models.schools || mongoose.model("schools", GenerateSchoolSchema)
app.post("/generate/school", (req, res, next) => {
    let SchoolName = req.body.schoolName
    let email = req.body.email
    let data = req.body
    try {
        GenerateSchools.find({ email: email }).then((result) => {
            if (result.length > 0) {
                res.status(409).send({ message: "Email already exists.", status: false })
            } else {
                let form = new GenerateSchools(req.body)
                form.save().then((result2) => {
                    console.log(result2)
                    res.status(201).send({ message: `${SchoolName} account has been created successfully`, status: true })
                    
                    const template = `
                        <h3>Wow Congratulations 🎉✨ ${data.schoolName},</h3>
                        <br />
                        <p>Your school has been approved by GradeJet Management System.</p>
                        <p>Here's Your Login Details to the website.</p>
                        <p>Password: ${data.password}</p>
                        <code>Signed by management.</code>
                    `
                    // Send Mail
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

                }).catch((error) => {
                    console.log(error)
                    res.status(401).json({ status: 401, error })
                })
            }
        })
    } catch (error) {
        next(error)
    }
})

app.get("/get/school", (req, res) => {
    GenerateSchools.find().then((result) => {
        res.status(201).send({ result })
    }).catch((err) => {
        console.log(err);
        res.status(401).send({ err })
    })
})
// Dynamic Router
app.get("/get/school/:id", (req, res) => {
    let id = req.params.id
    GenerateSchools.findOne({_id:id}).then((result) => {
        res.status(201).send({ result })
    }).catch((err) => {
        console.log(err);
        res.status(401).send({ err })
    })
})

// Notice 
const noticeSchema = mongoose.Schema({
    to: String,
    from: String,
    notice: {
        type: String,
        required: true
    }
})
const noticeModel = mongoose.models.notices || mongoose.model("notices", noticeSchema)
app.post("/superadmin/notice", (req, res) => {
    let data = req.body
    let form = new noticeModel(data)
    try {
        form.save().then((result) => {
            res.status(201).send({ message: result })
        }).catch((err) => {
            res.status(401).send({ message: "Validation Failed" })
        })
    } catch (error) {
        console.log(error);
    }
})

















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