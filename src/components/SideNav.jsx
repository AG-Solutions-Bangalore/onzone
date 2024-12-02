import { Link, NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  TableCellsIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useContext, useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { Collapse } from "@material-tailwind/react";
import { TbReport, TbReportAnalytics } from "react-icons/tb";
import { BsShopWindow } from "react-icons/bs";
import { ContextPanel } from "../utils/ContextPanel";
import { IoReaderOutline } from "react-icons/io5";
import { RiFolderReceivedLine } from "react-icons/ri";
const SideNav = ({ openSideNav, setOpenSideNav }) => {
  const sidenavRef = useRef(null);
  const { pathname } = useLocation();
  const [openReports, setOpenReports] = useState(false);
  const { userType } = useContext(ContextPanel);

  // Hardcoded sidenavType to "dark"
  const sidenavType = "dark";

  const sidenavTypes = {
    dark: "bg-blue-200",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  // close sidebar when clicking outside

  useEffect(() => {
    function handClickOutside(e) {
      if (sidenavRef.current && !sidenavRef.current.contains(e.target)) {
        setOpenSideNav(false);
      }
    }

    document.addEventListener("mousedown", handClickOutside);
    return () => {
      document.removeEventListener("mousedown", handClickOutside);
    };
  }, [setOpenSideNav]);

  // Close sidebar on route change
  useEffect(() => {
    setOpenSideNav(false);
  }, [pathname, setOpenSideNav]);




  return (
    <aside
      ref={sidenavRef}
      className={`${sidenavTypes[sidenavType]} ${
        openSideNav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-[255px] rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link to="/brand" className="flex items-center justify-center p-3">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-14 w-auto"
            />
            
          </div>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSideNav(false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="mb-2 flex flex-col     overflow-y-auto lg:h-[calc(100vh-200px)]    md:h-[calc(100vh-200px)] h-[calc(100vh-200px)] custom-scroll  ">
       
 


        {userType == 1 || userType == 2 ? (
            <>
          <li>
            <NavLink to="/brand">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex   items-center gap-4 px-4 p-2 capitalize"
                  fullWidth
                >
                  <FaRegUser className="w-5 h-5 text-black" />
                  <Typography
                    color="black"
                    className="font-medium capitalize"
                  >
                    Master
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          </>
          ) : null}









          <li>
            <NavLink to="/work-order"
            
            >
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex  items-center gap-4 px-4 p-2 capitalize"
                  fullWidth
                >
                  <TbReportAnalytics className="w-5 h-5 text-black" />
                  <Typography
                    color="black"
                    className="font-medium capitalize"
                  >
                    Work Order
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>

          


          <li>
            <NavLink to="/work-order-receive"
            className={({ isActive }) => 
              isActive || 
              ['/work-order-receive', '/add-order-received', '/edit-order-received','/dc-receipt','/view-order-received']
                .some(route => location.pathname.startsWith(route)) 
                ? "active" : ""
            }
            >
              {({ isActive }) => (
                <Button
                variant={
                  isActive || 
                  ['/work-order-receive', '/add-order-received', '/edit-order-received','/dc-receipt','/view-order-received']
                    .some(route => location.pathname.startsWith(route)) 
                    ? "gradient" 
                    : "text"
                }
                  color="green"
                  className="flex items-center gap-4 px-4 p-2 capitalize"
                  fullWidth
                >
                  <RiFolderReceivedLine  className="w-5 h-5 text-black" />
                  <Typography
                    color="black"
                    className="font-medium capitalize"
                  >
                    Order Receive
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>

          {userType == 1 || userType == 2 ? (
            <>
          <li>
            <NavLink to="/work-order-sales"
             className={({ isActive }) => 
              isActive || 
              ['/work-order-sales', '/add-order-sales', '/edit-order-sales','/view-order-sales']
                .some(route => location.pathname.startsWith(route)) 
                ? "active" : ""
            }
            >
              {({ isActive }) => (
                <Button
                variant={
                  isActive || 
                  ['/work-order-sales', '/add-order-sales', '/edit-order-sales','/view-order-sales']
                    .some(route => location.pathname.startsWith(route)) 
                    ? "gradient" 
                    : "text"
                }
                  color="green"
                  className="flex items-center gap-4 px-4 p-2 capitalize"
                  fullWidth
                >
                  <IoReaderOutline  className="w-5 h-5 text-black" />
                  <Typography
                    color="black"
                    className="font-medium capitalize"
                  >
                    Sales
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/work-order-final-stock">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex items-center gap-4 px-4 p-2 capitalize"
                  fullWidth
                >
                  <IoReaderOutline  className="w-5 h-5 text-black" />
                  <Typography
                    color="black"
                    className="font-medium capitalize"
                  >
                    Finished Stock
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          </>
          ) : null}

              {/* report start  */}

              <hr className="border-b border-dashed border-green-500 mb-1" />
          {/* <li>
            <NavLink to="/retailer-report">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex items-center gap-4 px-4 p-2 capitalize"
                  fullWidth
                >
                  <TbReport  className="w-5 h-5 text-black" />
                  <Typography
                    color="black"
                    className="font-medium capitalize"
                  >
                    Retailer Report
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
        
          <li>
            <NavLink to="/work-order-report">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex items-center gap-4 px-4 p-2 capitalize"
                  fullWidth
                >
                  <TbReport  className="w-5 h-5 text-black" />
                  <Typography
                    color="black"
                    className="font-medium capitalize"
                  >
                   Work Order Report
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
        
          <li>
            <NavLink to="/received-report">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex items-center gap-4 px-4 p-2 capitalize"
                  fullWidth
                >
                  <TbReport  className="w-5 h-5 text-black" />
                  <Typography
                    color="black"
                    className="font-medium capitalize"
                  >
                    Received Report
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
        
          <li>
            <NavLink to="/sales-report">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex items-center gap-4 px-4 p-2 capitalize"
                  fullWidth
                >
                  <TbReport  className="w-5 h-5 text-black" />
                  <Typography
                    color="black"
                    className="font-medium capitalize"
                  >
                    Sales Report
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li> */}

<li>
  <Button
    variant={
      [
        '/retailer-report', 
        '/work-order-report', 
        '/received-report', 
        '/sales-report'
      ].some(route => pathname.startsWith(route)) 
        ? "gradient" 
        : "text"
    }
    color="green"
    className="flex items-center gap-4 px-4 p-2 capitalize"
    fullWidth
    onClick={() => setOpenReports(!openReports)}
  >
    <TbReport className="w-5 h-5 text-black" />
    <Typography
      color="black"
      className="font-medium capitalize"
    >
      Reports
    </Typography>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className={`h-4 w-4 transition-transform ml-auto ${openReports ? 'rotate-180' : ''}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  </Button>

  <Collapse open={openReports}>
    <ul className="pl-4">
      <li>
        <NavLink 
          to="/retailer-report"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            setOpenReports(true); // Force dropdown to stay open
          }}
          
        >
          {({ isActive }) => (
            <Button
              variant={isActive ? "gradient" : "text"}
              color="green"
              className="flex items-center gap-4 px-4 p-2 capitalize"
              fullWidth
            >
              <Typography
                color="black"
                className="font-medium capitalize"
              >
                Retailer Report
              </Typography>
            </Button>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink 
          to="/work-order-report"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            setOpenReports(true); // Force dropdown to stay open
          }}
        >
          {({ isActive }) => (
            <Button
              variant={isActive ? "gradient" : "text"}
              color="green"
              className="flex items-center gap-4 px-4 p-2 capitalize"
              fullWidth
            >
              <Typography
                color="black"
                className="font-medium capitalize"
              >
                Work Order Report
              </Typography>
            </Button>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink 
          to="/received-report"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            setOpenReports(true); // Force dropdown to stay open
          }}
        >
          {({ isActive }) => (
            <Button
              variant={isActive ? "gradient" : "text"}
              color="green"
              className="flex items-center gap-4 px-4 p-2 capitalize"
              fullWidth
            >
              <Typography
                color="black"
                className="font-medium capitalize"
              >
                Received Report
              </Typography>
            </Button>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink 
          to="/sales-report"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            setOpenReports(true); // Force dropdown to stay open
          }}
        >
          {({ isActive }) => (
            <Button
              variant={isActive ? "gradient" : "text"}
              color="green"
              className="flex items-center gap-4 px-4 p-2 capitalize"
              fullWidth
            >
              <Typography
                color="black"
                className="font-medium capitalize"
              >
                Sales Report
              </Typography>
            </Button>
          )}
        </NavLink>
      </li>
    </ul>
  </Collapse>
</li>
        
       
          
        </ul>
      </div>
      <div className=" fixed bottom-5 left-1/4 font-bold text-blue-gray-700 border-b border-dashed border-black   flex items-center ">Version: 1.2.9</div>
    </aside>
   
  );
};
export default SideNav;
