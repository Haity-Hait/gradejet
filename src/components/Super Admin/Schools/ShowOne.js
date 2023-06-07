import React, { useEffect, useState } from "react";
import UseAxios from "./UseAxios";
import { useParams } from "react-router-dom";
import MainLayouts from "../../../layouts/Super Admin Layouts/MainLayouts";
import { Calendar } from "../Dashboard/Navbar/assets/Images";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

const ShowOne = () => {
    const [one, setOne] = useState(null);
    const { id } = useParams();
    const { data } = UseAxios(`http://localhost:1516/get/school/${id}`);
    useEffect(() => {
        if (data) {
            setOne(data.result);
            console.log(one);
        }
    });

    return (
        <MainLayouts>
            <div className="phew cc">
                {!one ? (
                    <div className="kili">
                        <div class="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                ) : (
                    <div>
                        {
                            <div>
                                <div className=" py-20">
                                    <div className="flex items-center justify-between">
                                        {!one.image ? (
                                            <div className="prof  text-center flex items-center justify-center px-4 font-bold">
                                                <p>School Has No Image</p>
                                            </div>
                                        ) : (
                                            <img className="prof" src={one.image} alt="" />
                                        )}
                                        <button className="bbo">Delete Account</button>
                                    </div>
                                    <div>
                                        <h1 className="same">{one.schoolName}</h1>
                                        <p className="address">Address: {one.address}</p>
                                        <p className="address ff">Email: {one.email}</p>
                                        <div className="flex gap-1 mt-2">
                                            <CalendarDaysIcon className=" w-5" />
                                            <p className="vc">Joined {one.Month} {one.Year}</p>
                                        </div>
                                        <p className="vc">Class Mode: {one.classMode}</p>
                                        
                                        <div className="flex gap-3">
                                            <p className="mt-3">{0} Followers</p>
                                            <p className="mt-3">{0} Likes</p>
                                        </div>
                                    </div>
                                    <div className="mt-7">
                                        <h4 className="dod">Updates</h4>
                                        {}
                                    </div>
                                    <div className="flex gap-3">
                                            <p className="mt-3">{0} Teachers</p>
                                            <p className="mt-3">{0} Students</p>
                                        </div>
                                </div>
                            </div>
                        }
                    </div>
                )}
            </div>
        </MainLayouts>
    );
};

export default ShowOne;
