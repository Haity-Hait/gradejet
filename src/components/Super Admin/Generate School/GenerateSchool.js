import React, { useState } from "react";
import MainLayouts from "../../../layouts/Super Admin Layouts/MainLayouts";
import { LuSchool, LuSchool2 } from "react-icons/lu";
import "./generate.css";
import axios from "axios";
const GenerateSchool = () => {
    const [schoolName, setSchoolName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [Zip, setZip] = useState("")
    const [country, setCountry] = useState("")
    const [phone, setPhone] = useState("")
    const [classMode, setClassMode] = useState("")
    let image = "https://u-static.fotor.com/images/text-to-image/result/PRO-e11aad76d1a44986b5288d35605d8547.jpg@1200w_1200h_1s.src"
    let data = { schoolName, email, password, address, city, Zip, country, phone, image, classMode }
    const add = (e) => {
        e.preventDefault()

        axios.post("http://localhost:1516/generate/school", data).then((res) => {
            alert(res.data.message)
        }).catch((err) => {
            // console.log(err.response.data.message._message)
            alert(err.response.data.message)

        })
        console.log(data);
    }
    return (
        <div>
            <MainLayouts>
                <main className="cc px-5">
                    <div className="fex">
                        <LuSchool2 className="icon" />
                        <h3>Generate School</h3>
                    </div>

                    <form>
                        <div className="form mt-8">
                            <div className="pile">
                                <p className="detail">
                                    School Name <span>*</span>
                                </p>
                                <input onChange={(e) => setSchoolName(e.target.value)} required placeholder="School Name" type="text" className="password" />
                            </div>
                            <div className="plex">
                                <div className="pile">
                                    <p className="detail">
                                        Email Address <span>*</span>
                                    </p>
                                    <input onChange={(e) => setEmail(e.target.value)} required placeholder="Email Address" type="email" className="form-control" />
                                </div>
                                <div className="pile">
                                    <p className="detail">
                                        Password <span>*</span>
                                    </p>
                                    <input onChange={(e) => setPassword(e.target.value)} required placeholder="Password" type="password" className="form-control" />
                                </div>
                            </div>
                            <div className="pile">
                                <p className="detail">
                                    Address <span>*</span>
                                </p>
                                <input onChange={(e) => setAddress(e.target.value)} required placeholder="Address" type="text" className="form-control" />
                            </div>
                            <div className="plex">
                                <div className="pile">
                                    <p className="detail">
                                        City <span>*</span>
                                    </p>
                                    <input onChange={(e) => setCity(e.target.value)} required placeholder="City" type="text" className="form-control" />
                                </div>
                                <div className="pile">
                                    <p className="detail">
                                        Zip <span>*</span>
                                    </p>
                                    <input onChange={(e) => setZip(e.target.value)} required placeholder="Zip" type="number" className="form-control" />
                                </div>
                                <div className="pile">
                                    <p className="detail">
                                        Phone <span>*</span>
                                    </p>
                                    <input onChange={(e) => setPhone(e.target.value)} required placeholder="+999 02..." type="number" className="form-control" />
                                </div>
                            </div>
                            <div className="plex">
                                <div className="pile">
                                    <p className="detail">
                                        Country <span>*</span>
                                    </p>
                                    <input onChange={(e) => setCountry(e.target.value)} required placeholder="Ghana" type="text" className="form-control" />
                                </div>
                                <div className="pile">
                                    <p className="detail">
                                        Class Mode <span>*</span>
                                    </p>
                                    <select className="form-control" onChange={(e) => setClassMode(e.target.value)}>
                                        <option value="Physical">Physical</option>
                                        <option value="Virtual">Virtual</option>
                                    </select>
                                </div>
                            </div>
                            <div className="">
                                <button onClick={(e) => add(e)} className="btn-primary set">Generate</button>
                            </div>
                        </div>
                    </form>
                </main>
            </MainLayouts>
        </div>
    );
};

export default GenerateSchool;
