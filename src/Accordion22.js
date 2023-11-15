import React, { useState } from "react";
import { RxCaretDown } from "react-icons/rx";
const Accordion22 = (props) => {
    const [data, setData] = useState(props.datas);

    const handleToggleActive = () => {
        let activeNew = data.active === 1 ? 0 : 1;
        setData({ ...data, active: activeNew });
    }

    return (
        <div className={` bfr p-5 bg-[#e9e9e9] border cursor-pointer border-[#c9c6c655] rounded-md mb-5 duration-500 group ${data.active === 1 ? 'is-active bg-white' : ''}`} onClick={handleToggleActive}
        >
            <div className="flex gap-5 items-center">
                <div className="w-full flex items-center justify-between lol group-[.is-active]:font-bold">
                    <p className="from">{data.sender} ({data.from})</p>
                    <p className="date">{data.date}</p>
                </div>
                <div className="text-xl  cursor-pointer duration-500 group-[.is-active]:rotate-[180deg]" >
                    <RxCaretDown />
                </div>
            </div>
            <div className="overflow-hidden duration-500 max-h-0 group-[.is-active]:max-h-[100px]">
                <p className="noticee">{data.notice}</p>
                <p className="time">{data.time}</p>
            </div>
        </div>
    );
}
export default Accordion22;