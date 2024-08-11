import React from "react";
import { NavLink } from "react-router-dom";

function SidebarItem({ icon, path, name, isOpen }) {
  return (
    <li>
      <NavLink
        to={path}
        className="flex items-center p-4 hover:bg-cyan-600 transition-colors duration-200"
        
      >
        <span className="text-2xl">{icon}</span>
        {isOpen && <span className="ml-4 text-lg">{name}</span>}
      </NavLink>
    </li>
  );
}

export default SidebarItem;
