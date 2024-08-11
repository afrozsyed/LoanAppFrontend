import React from "react";

function Card({ title, value, description,className ="", onClick }) {
  return (
    <div
      className={`bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg p-5 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <h3 className="text-xl font-bold text-gray-700">{title}</h3>
      <p className="text-2xl font-semibold text-cyan-500 mt-2">{value}</p>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
}

export default Card;
