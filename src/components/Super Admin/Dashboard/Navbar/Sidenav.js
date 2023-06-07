import { useState } from "react";
import { CONTROL, Calendar, Chart, Chart_fill, Chat, Folder, LOGO, Search, Setting, User } from "./assets/Images";
import "./sidebar.css"
import { Link } from "react-router-dom";
// import { Favicon } from "../../../../assets/Images";
const Sidenav = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: Chart_fill, to: "/superadmin/dashboard" },
    { title: "Notice",  src: Chart, to: "/superadmin/notices" },
    { title: "Schools", src: Chat, gap: true, to: "/superadmin/school/list"},
    { title: "Generate Schools", src: User,  to: "/superadmin/generate/school" },
    { title: "Schedule ", gap: true, src:Calendar, to: "" },
    { title: "Files ", src: Folder,  to: "" },
  ];
  
  
  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-20" : "w-72"
        } bg-dark-purple pros  p-4  pt-3 relative duration-300`}
      >
        <img
          src={CONTROL}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={LOGO}
            className={`cursor-pointer w-10 duration-500 ${
              open && "rotate-[360deg] "
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              open && "scale-0"
            }`}
          >
            GradeJet System
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
              <img src={Menu.src} />
              <span className={`${open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Sidenav;
