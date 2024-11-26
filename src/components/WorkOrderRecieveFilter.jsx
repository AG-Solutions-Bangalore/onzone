import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const WorkOrderRecieveFilter = () => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const buttons = [
        {
          label: "Work Order Received",
          path: "/work-order-receive",
          color: "from-pink-500 to-orange-400",
        },
      
        {
          label: "Work Order Sales",
          path: "/work-order-sales",
          color: "from-blue-500 to-cyan-400",
        },
        {
          label: "Work Order Final Stock",
          path: "/work-order-final-stock",
          color: "from-red-500 to-purple-400",
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

export default WorkOrderRecieveFilter