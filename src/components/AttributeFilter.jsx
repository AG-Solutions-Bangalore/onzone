import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const AttributeFilter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
 
      {
        label: "Ratio",
        path: "/ratio",
        color: "from-red-500 to-purple-400",
      },
      {
        label: "Half Ratio",
        path: "/half-ratio",
        color: "from-blue-500 to-green-400",
      },
    ];

  const handleButtonClick = (path) => {
    navigate(path);
  };
  return (
    <div className="flex flex-wrap justify-between  gap-4">
    {buttons.map((button, index) => (
      <button
        key={index}
        className={`w-full md:w-auto flex-1 py-2 px-4 text-white rounded-lg transition-all ${
          location.pathname === button.path
            ? `bg-gradient-to-r ${button.color} shadow-lg transform -translate-y-1`
            : "bg-blue-200"
        }`}
        onClick={() => handleButtonClick(button.path)}
      >
        {button.label}
      </button>
    ))}
  </div>
  )
}

export default AttributeFilter