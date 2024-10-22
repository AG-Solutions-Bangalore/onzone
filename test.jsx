// dashboard navbar 

import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import Logout from "./Logout";
import { useState } from "react";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";

const DashboardNavbar = ({ openSideNav, setOpenSideNav,setShrinkSideNav,shrinkSideNav }) => {
  const { pathname } = useLocation();

  const [openModal, setOpenModal] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleOpenLogout = () => setOpenModal(!openModal);

  const pathSegments = pathname.split("/").filter((el) => el !== "");

  const breadcrumbs = [
    { name: "Home", link: "/home" },
    ...pathSegments.map((segment, index) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      link: `/${pathSegments.slice(0, index + 1).join("/")}`,
    })),
  ];

  const pageTitle =
    pathSegments.length === 0
      ? "Home"
      : pathSegments[pathSegments.length - 1]?.charAt(0).toUpperCase() +
        pathSegments[pathSegments.length - 1]?.slice(1);

  // Hardcode fixedNavbar to true
  const fixedNavbar = true;

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 bg-blue-200  text-white   "
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex  justify-between gap-6 flex-row md:items-center">
        <div className="capitalize flex gap-2">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
          
              <Link to='/brand' >
                <Typography
                  
                  color="black"
                  className="font-bold opacity-50  transition-all hover:text-red-500 hover:opacity-100"
                >
                 Home
                </Typography>
              </Link>
         
          </Breadcrumbs>

          <IconButton
            variant="text"
            color="red"
            className="hidden xl:block lg:block"
            onClick={() => setShrinkSideNav(!shrinkSideNav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-red-600" />
          </IconButton>
          
        </div>

        <div className="flex items-center">
          {/* Search and other elements can be added here */}

          {/* Sidebar toggle button for mobile view */}
          <IconButton
            variant="text"
            color="white"
            className="grid xl:hidden"
            onClick={() => setOpenSideNav(!openSideNav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-white" />
          </IconButton>
          {/* profile icon  */}
          <Menu
            open={profileMenuOpen}
            handler={setProfileMenuOpen}
            placement="bottom-end"
          >
            <MenuHandler>
              <IconButton variant="text" color="blue">
                <UserCircleIcon className="h-5 w-5 text-red" />
              </IconButton>
            </MenuHandler>
            <MenuList className="bg-green-200">
            <Link to="/profile" className="text-black">
              <MenuItem>
               
                  Profile
              
              </MenuItem>
              </Link>
              <Link to="/change-password" className="text-black">
              <MenuItem>
               
                  Change Password
           
              </MenuItem>
              </Link>
            </MenuList>
          </Menu>
          {/* Settings icon */}
          <IconButton variant="text" color="red" onClick={handleOpenLogout}>
            <HiArrowRightStartOnRectangle className="h-5 w-5 text-red" />
          </IconButton>
        </div>
      </div>
      <Logout open={openModal} handleOpen={handleOpenLogout} />
    </Navbar>
  );
};

export default DashboardNavbar;


// sidebar

import { Link, NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  TableCellsIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useRef } from "react";
import { FaRegUser } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
const SideNav = ({ openSideNav, setOpenSideNav ,setShrinkSideNav,shrinkSideNav}) => {
  const sidenavRef = useRef(null);
  const { pathname } = useLocation();

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
    <>
    <aside
      ref={sidenavRef}
      className={`${sidenavTypes[sidenavType]} ${
        openSideNav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-[272px] lg:hidden rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
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
        <ul className="mb-4 flex flex-col gap-1">
         

          <li>
            <NavLink to="/brand">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex items-center gap-4 px-4 capitalize"
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
     
          <li>
            <NavLink to="/ratio">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <LuUsers className="w-5 h-5 text-black" />
                  <Typography
                    color="black"
                    className="font-medium capitalize"
                  >
                    Attribute
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/work-order">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex items-center gap-4 px-4 capitalize"
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

          
        </ul>
      </div>
      <div className=" fixed bottom-5 left-1/4 font-bold text-blue-gray-700 border-b border-dashed border-black   flex items-center ">Version: 1.0.4</div>
    </aside>




    {/* shrink icon sidebar */}


    <aside
      ref={sidenavRef}
      className={`${sidenavTypes[sidenavType]} ${
        openSideNav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-[85px] hidden xl:block lg:block rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link to="/brand" className="flex items-center justify-center p-3">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-14 w-14"
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
        <ul className="mb-4 flex flex-col gap-1">
         

          <li>
            <NavLink to="/brand">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <FaRegUser className="w-5 h-5 text-black" />
                  
                </Button>
              )}
            </NavLink>
          </li>
     
          <li>
            <NavLink to="/ratio">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <LuUsers className="w-5 h-5 text-black" />
                  
                </Button>
              )}
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/work-order">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="green"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <TbReportAnalytics className="w-5 h-5 text-black" />
                  
                </Button>
              )}
            </NavLink>
          </li>

          
        </ul>
      </div>
    </aside>
    </>
   
  );
};
export default SideNav;

// layout

import { useState } from "react";
import Footer from "../components/Footer";
import DashboardNavbar from "../components/DashboardNavbar";
import SideNav from "../components/SideNav";

const Layout = ({ children }) => {
  const [openSideNav, setOpenSideNav] = useState(false);
  const [shrinkSideNav, setShrinkSideNav] = useState(true);
  // xl:ml-72
  return (
    <div className="min-h-screen bg-green-50/50">
      <SideNav openSideNav={openSideNav} setOpenSideNav={setOpenSideNav}  setShrinkSideNav={setShrinkSideNav} shrinkSideNav={shrinkSideNav} />
      <div className={`p-4 ${shrinkSideNav ? "xl:ml-28" : "xl:m72"} `}>
        <DashboardNavbar
          openSideNav={openSideNav}
          setOpenSideNav={setOpenSideNav}
        />
        <div className="border border-green-900 rounded-lg p-2 mt-3">
        {children}
        </div>
        {/* <div className="text-blue-gray-600">
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default Layout;
