const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/router");
const nodemailer = require("nodemailer");
const port = 1516;
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
const SECRET = process.env.JWT_SECRET
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
    Month: String,
    folllower: String,
    likes: String
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

// Get One School || Signin Admin
app.post("/get/school/v1", (req, res) => {
    let email = req.body.email
    let password = req.body.password
    GenerateSchools.findOne({ email: email }).then((result) => {
        if (result == null) {
            res.status(409).send({ message: "You do not have an account with us" })
        } else {
            if (password == result.password) {
                const token = jsonwebtoken.sign({ email }, SECRET, { expiresIn: "1440m" })
                console.log(token);
                res.status(201).send({ admin: result, status: true, message: "Valid Authentication", token: token })
            } else {
                res.status(401).send({ status: false, message: "Invalid Password" })
            }
        }
    }).catch((err) => {
        res.status(401).send({ message: "Internal Server Error" })
        console.log(err)
    })
})
// Verify Token
app.get("/verifytoken", (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    jsonwebtoken.verify(token, SECRET, (error, decoded) => {
        if (error) {
            res.status(401).send({ message: "Session Over. You will be logged out right now.", status: false })
            console.log(error)
        } else {
            console.log(decoded)
            let email = decoded.email
            if (decoded != undefined) {
                GenerateSchools.findOne({ email: email }).then((result) => {
                    console.log(result)
                    res.status(200).send({ status: true, data: result })
                })
            } else {
                res.status(401).send({ message: "Unauthorized", status: false })
            }
        }
    })
})




// Dynamic Router
app.get("/get/school/:id", (req, res) => {
    let id = req.params.id
    GenerateSchools.findOne({ _id: id }).then((result) => {
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
    },
    date: String,
    time: String
})
const noticeModel = mongoose.models.notices || mongoose.model("notices", noticeSchema)
app.post("/notice", (req, res) => {
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
// Notice To Admins
app.get("/get/admin/notice", (req, res) => {
    noticeModel.find({ to: "admins" }).then((result) => {
        console.log(result);
        res.status(201).send({ notice: result, status: true })
    }).catch((error) => {
        res.status(401).send({ error: error, status: false })
        console.log(error);
    })
})


// ADMIN
// Courses
const courseSchema = mongoose.Schema({
    adminEmail: {
        unique: true,
        type: String,
    },
    courseDetails: [
        {
            courseName: {
                type: String,
                unique: true
            },
            courseType: String
        }
    ]
})
const CourseModel = mongoose.models.courses || mongoose.model("courses", courseSchema)
app.post("/courses", async (req, res, next) => {
    let data = req.body
    let courseName = data.courseName
    let courseType = data.courseType
    let adminEmail = data.adminEmail
    let form = new CourseModel(data)

    try {
        CourseModel.find({ adminEmail: adminEmail }).then((result) => {
            console.log(result);
            form.save().then((result) => {
                console.log(result);
                CourseModel.updateOne({ adminEmail: adminEmail }, { $push: { courseDetails: { courseName: courseName, courseType: courseType } } }).then((resui) => {
                    console.log(resui)
                    return res.status(201).send({ message: `${courseName} has been Created.` })
                })
            }).catch((err) => {
                console.log(err);
                next()
                return res.status(401).send({ message: `${courseName} has not been Created` })
            })
            // if(!result){

            // }
            // if (result) {
            //     result.map((item, index) => {
            //         let Mapped = item.courseDetails
            //         Mapped.map((items, index) => {
            //             let mappedCourseName = items.courseName
            //             if (courseName == mappedCourseName) {
            //                 return res.status(401).send({ message: `${courseName} has been offered in the school already` })
            //             }
            //             CourseModel.findOneAndUpdate({ adminEmail: adminEmail }, { $push: { courseDetails: { courseName: courseName, courseType: courseType } } }).then((resui) => {
            //                 return res.status(201).send({ message: `${courseName} has been Created.` })
            //             })
            //                 .catch((err) => {
            //                     console.log(err);
            //                     next()
            //                     return res.status(401).send({ message: `${courseName} has not been Created.` })
            //                 })

            //         })

            //     })
            // }
            
        })
    } catch (error) {
        next()
        return res.status(401).send({ message: `${courseName} has not been Created Due to an Internal Server Error` })
    }
})

// Get Courses

app.post("/get/each/courses", (req, res) => {
    let adminEmail = req.body.adminEmail
    CourseModel.find({ adminEmail: adminEmail }).then((result) => {
        console.log(result);
        result.map((item) => {
            let dee = item.courseDetails

            res.status(201).send({ message: dee, status: true })
            console.log();
        })
    }).catch((error) => {
        console.log(error);
        res.status(401).send({ message: error, status: false })
    })
})

// Delete Course
app.delete("/delete/course/:id", async (req, res) => {
    // let id = req.body.id
    let id = req.params.id
    try {
        await CourseModel.findByIdAndDelete(id).then((resu) => {
            console.log("Deleted");
            res.status(201).send({ message: "Deleted Successfully" })
        }).catch((err) => {
            res.status(401).send({ message: "Deleted gone wrong" })
            console.log("Not Deleted");
        })
    } catch (error) {

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