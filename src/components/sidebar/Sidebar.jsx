import React,{useState} from "react";
import {
  MdOutlineDashboard,
  MdOutlinePedalBike,
  MdOutlinePeopleAlt,
} from "react-icons/md";
import { FaHandHoldingUsd, FaSignOutAlt  } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { AiOutlineMenu } from "react-icons/ai";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const navItems = [
    { name: "Dashboard", path: "/", icon: <MdOutlineDashboard />,},
    { name: "Apply Loans", path: "/applyLoan", icon: <FaHandHoldingUsd />},
    { name: "All Customers", path: "/allLoans", icon: <MdOutlinePeopleAlt />,},
    { name: "EMI Calculate", path: "/emiCalculator", icon: <MdOutlinePedalBike />,},
    { name: "Collect Payments", path: "/paymentCollection", icon:<FaHandHoldingUsd/>},
    { name: "Reports", path: "/reports", icon: <HiDocumentReport />, },
  ];

  return (
    <div
      className={`flex flex-col h-full bg-cyan-700 text-white transition-width duration-300 ease-in-out ${
        isOpen ? "w-full" : "w-16"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-cyan-600">
        <span className="text-xl font-bold">
          {isOpen ? "Auto Loan" : "AL "}
        </span>
        <button
          onClick={toggleSidebar}
          className="text-xl hover:text-cyan-300 focus:outline-none"
        >
          <AiOutlineMenu />
        </button>
      </div>

      <ul className="flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <SidebarItem
            key={item.name}
            name={isOpen ? item.name : ""}
            path={item.path}
            icon={item.icon}
            isOpen={isOpen}
          />
        ))}
      </ul>

      <ul className="p-2 border-t border-cyan-600">
        <SidebarItem
          name={isOpen ? "Logout" : ""}
          path="/logout"
          icon={<FaSignOutAlt />}
          isOpen={isOpen}
        />
      </ul>
    </div>
  );
}

export default Sidebar;
