import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../base/BaseUrl";
import axios from "axios";

export const ContextPanel = createContext();

const AppProvider = ({ children }) => {
  const [isPanelUp, setIsPanelUp] = useState(true);

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const userType = localStorage.getItem("user-type");

  const checkPanelStatus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/check-status`);
      const datas = await response.data;
      setIsPanelUp(datas);
      if (datas?.success) {
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentPath = location.pathname;

    if (error) {
      localStorage.clear();
      navigate("/maintenance");
    } else if (isPanelUp?.success) {
      if (token) {
        const allowedPaths = [
        
          "/profile",
        "/ratio",
        "/style",
        "/add-style",
        "/brand",
        "/factory",
        "/add-factory",
        "/width",
        "/add-width",
        "/half-ratio",
        "/add-halfratio",
        "/branch-edit",
        "/style-edit",
        "/factory-edit",
        "/change-password",
        "/width-edit",
        "/halfRatio-edit",
        "/work-order",
        "/add-work-order",
        "/work-order-view",
        "/work-view",
        "/work-order-edit",
        "/add-ratio",
        "/view-ratio-list"
        ];
        const isAllowedPath = allowedPaths.some((path) =>
          currentPath.startsWith(path)
        );
        if (
          isAllowedPath
        ) {
          navigate(currentPath);
        } else {
          navigate("/brand");
        }
      } else {
        if (
          currentPath === "/" ||
          currentPath === "/register" ||
          currentPath === "/forget-password"
        ) {
          navigate(currentPath);
        } else {
          navigate("/"); // Redirect to login if no token
        }
      }
    }
  }, [error, navigate, isPanelUp, location.pathname]);

  useEffect(() => {
    checkPanelStatus();
    const intervalId = setInterval(checkPanelStatus, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ContextPanel.Provider value={{ isPanelUp, setIsPanelUp,userType }}>
      {children}
    </ContextPanel.Provider>
  );
};

export default AppProvider;
