const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const lodash = require("lodash")
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
    likes: String,
    schoolLink: String
})
const GenerateSchools = mongoose.models.schools || mongoose.model("schools", GenerateSchoolSchema)
app.post("/generate/school", (req, res, next) => {
    let SchoolName = req.body.schoolName
    let email = req.body.email
    let data = req.body
    try {
        if (!email || !data.password || !data.classMode || !data.phone) {
            return res.status(400).json({ message: " Empty field detected. Please provide the required information." });
        }
        GenerateSchools.find({ email: email }).then((result) => {
            if (result.length > 0) {
                res.status(409).send({ message: "Email already exists.", status: false })
            } else {
                let form = new GenerateSchools(req.body)
                form.save().then((result2) => {
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
                            // console.log("Error" + error)
                        } else {
                            // console.log("Email sent:" + info.response);
                            res.status(201).json({ status: 201, info })
                        }
                    })

                }).catch((error) => {
                    // console.log(error)
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
        // console.log(err);
        res.status(401).send({ err })
    })
})

// Get One School || Signin Admin
app.post("/get/school/v1", (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if (!email || !password) {
        return res.status(400).json({ message: " Empty field detected. Please provide the required information." });
    }
    GenerateSchools.findOne({ email: email }).then((result) => {
        if (result == null) {
            res.status(409).send({ message: "You do not have an account with us" })
        } else {
            if (password == result.password) {
                const token = jsonwebtoken.sign({ email }, SECRET, { expiresIn: "1d" })
                // console.log(token);
                res.status(201).send({ admin: result, status: true, message: "Valid Authentication", token: token })
            } else {
                res.status(401).send({ status: false, message: "Invalid Password" })
            }
        }
    }).catch((err) => {
        res.status(401).send({ message: "Internal Server Error" })
        // console.log(err)
    })
})
// Verify Token
app.get("/verifytoken", (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    // console.log(token)
    jsonwebtoken.verify(token, SECRET, (error, decoded) => {
        if (error) {
            res.status(401).send({ message: "Session Over. You will be logged out right now.", status: false })
            // console.log(error)
        } else {
            // console.log(decoded)
            let email = decoded.email
            if (decoded != undefined) {
                GenerateSchools.findOne({ email: email }).then((result) => {
                    // console.log(result)
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
        // console.log(err);
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
    time: String,
    sender: String
})
const noticeModel = mongoose.models.notices || mongoose.model("notices", noticeSchema)
// Notice to all
app.post("/notice", (req, res) => {
    let data = req.body
    let form = new noticeModel(data)
    try {
        if (!data.to || !data.from || !data.date || !data.notice || !data.time) {
            return res.status(400).json({ message: " Empty field detected. Please provide the required information." });
        }
        form.save().then((result) => {
            res.status(201).send({ message: result })
        }).catch((err) => {
            res.status(401).send({ message: "Validation Failed" })
        })
    } catch (error) {
        // console.log(error);
    }
})


// Get Admins Notice
app.get("/get/admin/notice", (req, res) => {
    noticeModel.find({ to: "admins" }).then((result) => {
        // console.log(result);
        res.status(201).send({ notice: result, status: true })
    }).catch((error) => {
        res.status(401).send({ error: error, status: false })
        // console.log(error);
    })
})


// Courses
const courseSchema = mongoose.Schema({
    courseName: String,
    courseTimePerDay: String,
    courseType: String,
    schoolName: String,
    courseDuration: String
})
const CourseModel = mongoose.models.courses || mongoose.model("courses", courseSchema)

app.post("/courses", async (req, res, next) => {
    const schoolName = req.body.schoolName;
    const data = req.body;
    const courseName = data.courseName;
    const form = CourseModel(data);
    try {
        if (!courseName || !data.courseTimePerDay || !data.courseType || !data.courseDuration) {
            return res.status(400).json({ message: " Empty field detected. Please provide the required information." });
        }
        const result = await CourseModel.find({ schoolName: schoolName });
        if (result && result.length > 0) {
            let courseExists = false;
            lodash.filter(result, (val) => {
                let courseGangan = val.courseName;
                if (courseName === courseGangan) {
                    courseExists = true;
                    return;
                }
            });

            if (courseExists) {
                return res.status(401).send({ message: `${courseName} already exists in the school.` });
            }
        }
        if(!courseName){
            // console.log("Weeee");
        }
        form.save().then((result3) => {
            // console.log(result3);
            res.status(200).send({ message: `${courseName} added successfully.` });
        }).catch((err) => {
            res.status(401).send({ message: `${courseName} failed to be added.` });
        })
    } catch (err) {
        // Handle any errors that might occur during database operations
        console.error(err);
        res.status(500).send({ message: "An error occurred while processing your request." });
    }
});

// Get courses for a school
app.get("/get/courses", async (req, res, next) => {
    const schoolName = req.query.schoolName; // Extract 'schoolName' property from the request body
    await CourseModel.find({ schoolName: schoolName })
      .then((result) => {
        res.status(200).send({ message: result });
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).send({ message: "An error occurred while fetching courses." });
      });
});
  


// STUDENT GENERATE
const studentSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    dob: String,
    studentId: String,
    password: String,
    gender: String,
    image: String,
    schoolEmail: String,
    schoolName: String,
    courses: [],
    payments: [],
    documents: [],
    stateOfOrigin: String,
    schoolLink: String
})

const studentModel = mongoose.models.students || mongoose.model("students", studentSchema)

app.post("/generate/student", (req, res) => {
    let data = req.body
    let email = data.email
    let form = studentModel(data)
    if (!email || !data.stateOfOrigin || !data.gender || !data.name || !data.dob) {
        return res.status(400).json({ message: " Empty field detected. Please provide the required information." });
    }
    studentModel.find({ email: email }).then((result) => {
        if (result.length > 0) {
            res.status(401).send({ message: "Email already exist." })
        } else {
            form.save().then((result) => {
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                });
                const template = `
                    <strong>Dear ${data.name}</strong>,
                    <br/>
                    <br/>
                    On behalf of the entire ${data.schoolName} community, I am thrilled to extend a warm welcome to you! Congratulations on your admission to ${data.schoolName} for the ${data.academicYear} term. We believe you have what it takes to make a significant impact on our campus, and we cannot wait to witness your growth and achievements.
                    <br/>
                    <br/>
                    As a newly admitted student, we understand that starting a new chapter in your academic journey can be both exciting and a little nerve-wracking. Rest assured, we are here to support and guide you every step of the way. ${data.schoolName} takes pride in fostering a vibrant and inclusive learning environment where all students can thrive.
                    <br/>
                    <br/>
                    Here are a few important next steps to help you prepare for the upcoming academic year:
                    <br/>
                    <br/>
                    1. Confirm Your Admission: To secure your spot at ${data.schoolName}, kindly follow the instructions in the attached acceptance package or visit our online portal at <a href="${data.schoolLink}">${data.schoolLink}</a> to officially confirm your admission.
                    <br/>
                    1. Usage of GradeJet Portal: ${data.schoolName} uses a school management system <a href="">gradejet.com</a> for :
                        <br/>
                        (i) Student Information Management: The system maintain a comprehensive database of student information, including personal details, academic records, attendance, and disciplinary history.
                            <br/>
                        (ii) Enrollment and Admissions: The system facilitates the enrollment and admissions process, making it easier to track and manage student applications and registrations.
                        <br/>
                        (iii) Grade Management: Teachers can record and manage students' grades, assignments, and assessments using the system, which can then be accessed by students for progress tracking.
                        <br/>
                        (iv) Communication with Others: The system enables efficient communication between teachers and student and other students through messaging features, notifications, and access to students' academic progress.
                        <br/>
                        (v) Financial Management: The system assists in managing financial operations, including fee collection, invoicing, and tracking payments.
                        <br/>
                        (vi) Library Management: The system can maintain a catalog of library resources, enabling students and staff to search for and borrow books easily (coming soon).
                        <br/>
                        (vii) Learning Management System (LMS) Integration: In some cases, the system may integrate a Learning Management System (LMS) to facilitate online learning and course delivery if your school takes virtual learning.
                    <br/>
                    2. Connect with Your Classmates: Join our official GradeJet Chats on the School Management System (GradeJet) to start connecting with your present and future classmates and from other schools. This is a great way to make new friends and build a supportive network.
                    <br/>
                    3. Review Course Catalog and Requirements: Take some time to explore our course catalog and academic requirements for your chosen program. Familiarizing yourself with the curriculum will prepare you for your academic journey at ${data.schoolName}.
                    <br/>
                    4. Health and Wellness: Ensure you have completed all required health forms and vaccinations. The well-being of our students is a top priority at ${data.schoolName}.
                    <br/>
                    <br/>
                    We encourage you to reach out to our Admissions Office if you have any questions or need further assistance. We are here to help make your transition to ${data.schoolName} as seamless as possible.
                    <br/>
                    <br/>
                    Once again, congratulations on your admission to ${data.schoolName}. We are delighted to have you join our diverse and vibrant community. Your unique perspectives and talents will undoubtedly enrich our campus, and we cannot wait to see the positive impact you will make during your time here.
                    <br/>
                    <br/>
                    Welcome to the ${data.schoolName} family! Your journey towards academic excellence and personal growth starts now.
                    <br/>
                    <br/>
                    Best regards,
                    <br/>
                    <br/>
                    <strong><i>GradeJet School Management System</i></strong>
                `
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: data.email,
                    subject: `Welcome to ${data.schoolName}: Your Next Chapter Begins!`,
                    html: template

                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.status(401).send({ status: 401, error })
                    } else {
                        res.status(201).send({ status: 201, info })
                    }
                })
                res.status(201).send({ message: `${data.name} Account Created.` })
            }).catch((err) => {
                res.status(401).send({ message: err })
            })
        }
    })
})

// GET STUDENT
app.get("/get/students", async (req, res, next) => {
    const schoolName = req.query.schoolName; // Extract 'schoolName' property from the request body
    // console.log(schoolName);
    await studentModel.find({ schoolName: schoolName }).then((result) => {
        console.log(result);
        res.status(200).send({ message: result })
    }).catch((err) => {
        res.status(500).send({ message: "An error occurred while fetching courses." })
    })
});

// TEACHER
// GET ALL TEACHER

// Teacher GENERATE
const teacherSchema = mongoose.Schema({
    name: String,
    email: {
        unique: true,
        required: true,
        type: String
    },
    dob: String,
    teacherId: String,
    password: String,
    initial: String,
    course: String,
    image: String,
    schoolEmail: String,
    schoolName: String
})
const teacherModels = mongoose.models.teachers || mongoose.model("teachers", teacherSchema)
app.post("/generate/teacher", (req, res) => {
    let data = req.body
    let email = data.email
    let form = teacherModels(data)
    if (!email || !data.password || !data.dob || !data.course || !data.name) {
        return res.status(400).json({ message: " Empty field detected. Please provide the required information." });
    }
    teacherModels.find({ email: email }).then((resultss) => {
        if (resultss.length > 0) {
            res.status(401).send({ message: "Teacher's email already exist." })
        } else {
            form.save().then((result) => {
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
                            <h1>Dear, ${data.initial} ${data.name}, </h1>
                            <div style="margin-top: 30px; font-size: 20px;">
                                <p>
                                    You must have been longing to have this message, Well we have reviewed your application and you are one of the eligible applicant for this role.
                                    <br/>
                                    In a word you have been successfully appointed as a staff in ${data.schoolName}.
                                    <br/>
                                    As a school we make use of a school management system which is ,<a href="#">Gradejet.com</a> for online interactions and grading of our students .
                                </p>
                                <br>
                                <b>Here's your Login Details to the grading system website.</b>
                                <br>
                                <strong>
                                    Teacher ID: ${data.teacherId}
                                </strong>
                                <br>
                                <br>
                                <strong>
                                    Password: ${data.password}
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
                            res.status(401).send({ status: 401, error })
                        } else {
                            res.status(201).send({ status: 201, info })
                        }
                    })

                } catch (error) {
                    res.status(401).send({ status: 401, error })
                }
                console.log(result);
                res.status(201).send({ message: `${data.name} Account Created`, status: 201 })
            }).catch((err) => {
                console.log(err);
                res.status(401).send({ message: `Validation Error` })
            })
        }
    }).catch((err) => {
        console.log(err);
    })
    // res.status(401).send({ message: "Internal server error" })
})


// GET TEACHERS

app.get("/get/teachers", async (req, res, next) => {
    const schoolName = req.query.schoolName; // Extract 'schoolName' property from the request body
    console.log(schoolName);
    await teacherModels.find({ schoolName: schoolName }).then((result) => {
        console.log(result);
        res.status(200).send({ message: result })
    }).catch((err) => {
        res.status(500).send({ message: "An error occurred while fetching courses." })
    })
});




// GET SCHOOL DATA

app.get("/get/schoolData", (req, res) => {
    const schoolName = req.query.schoolName;
    
})




app.listen(port, () => {
    console.log(`App running on port ${port}`)
})