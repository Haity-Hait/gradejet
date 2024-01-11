import { useState } from "react";
import "./sidebaradmin.css"
import { Link } from "react-router-dom";
import { CONTROL, Calendar, Chart, Chart_fill, Chat, Folder,  User } from "../../Super Admin/Dashboard/Navbar/assets/Images";
import { BiLogOut } from "react-icons/bi";
import { Icon } from '@iconify/react';
import Modal from "../Modal/Modal";
// import { LuLogOut } from "react-icons/lu";
const SidebarAdmin = ({ ADMINLOGO, SCHOOLNAME, LOGOUT }) => {
  const [wakeLogout, setWakeLogOut] = useState(false)
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: Chart_fill, to: "/admin/dashboard" },
    { title: "Notice", src: Chart, to: "/admin/notice" },
    { title: "Teachers", gap: true, src: User, to: "/admin/generate/teacher" },
    { title: "Students", src: User, to: "/admin/generate/student" },
    // { title: "", src: Chat, gap: true, to: "" },
    // { title: "Notification", src: Chat, gap: true, to: "" },
    { title: "Courses ", gap: true, src: Chart_fill, to: "/admin/courses" },
    { title: "Department", gap: false, src: Chart_fill, to: "/admin/department" },
    { title: "Files ", gap: true, src: Folder, to: "" },
  ];
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="flex kk">
      <div
        className={` ${open ? "w-20" : "w-72"
          } bg-dark-purple pros   p-4  pt-8  duration-300`}
      >
        <img
          src={CONTROL}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center hover:bg-light-white iop">
          <img
            src={ADMINLOGO}
            className={`cursor-pointer w-14 rounded-lg duration-500 ${open && "rotate-[360deg] "
              }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${open && "scale-0"
              }`}
          >
            {SCHOOLNAME}
          </h1>
        </div>
        <ul className="pt-5">
          {Menus.map((Menu, index) => (
            <Link
              to={Menu.to}
              id="kik"
              key={index}
              className={`flex papi rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"}`}
            >
              {
                Menu.icon ? Menu.icon : " "
              }
              {
                <img className="" src={Menu.src} /> ? <img className="" src={Menu.src} /> : " "
              }
              <span className={`${open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </Link>
          ))}
          <button onClick={toggleVisibility}>
            <div className={`flex papi rounded-md pll absolute bottom-0 p-1 py-3 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4`}>
              <BiLogOut className="hh" />
              <span className={`${open && "hidden"} origin-left duration-200`}>
                Log Out
              </span>
            </div>
          </button>
          {isVisible && <Modal Content="This action will end your current session and require you to sign in again to access your account."  Myclick={LOGOUT} header="Log out of GradeJet?" funBtn="Log Out" />}
        </ul>
      </div>
    </div>
  );
};
export default SidebarAdmin;
