import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ContextPanel } from '../utils/ContextPanel';

const WorkOrderRecieveFilter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {userType} = useContext(ContextPanel)
  
    const allButtons = [
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

      const buttons = userType == 4 
    ? []  // Only show Work Order Received for userType 4
    : (userType == 1 || userType == 2)
      ? allButtons     // Show all buttons for userType 1 or 2
      : [];            // Show no buttons for other user types

  
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