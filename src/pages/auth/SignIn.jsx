import { Input, Button, Typography, Carousel, } from "@material-tailwind/react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { ContextPanel } from "../../utils/ContextPanel";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  const emailInputRef = useRef(null);  
  
  
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPanelUp) {
      navigate("/maintenance");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const res = await axios.post(`${BASE_URL}/api/login`, formData);
      if (res.status === 200) {
        const token = res.data.UserInfo?.token;
        const username = res.data.UserInfo?.user?.full_name
        const userType = res.data.UserInfo?.user?.user_type_id
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("username", username);
          localStorage.setItem("user-type", userType);
          navigate("/brand");
        } else {
          toast.error("Login Failed, Token not received.");
        }
      } else {
        toast.error("Login Failed, Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login.");
    }

    setLoading(false);
  };

  return (
    <>
      <Toaster
        toastOptions={{
          success: { style: { background: "green" } },
          error: { style: { background: "red" } },
        }}
        position="top-right"
        reverseOrder={false}
      />
      <section className="flex flex-col lg:flex-row h-screen">
          {/* Left Section for Carousel // h-full -add */}
          <div className="hidden lg:block lg:w-1/2 h-full">
            <Carousel autoplay loop>
              <img
                src="/img/11.png"
                alt="Slide 1"
                className="h-full w-full object-cover"
              />
              <img
                src="/img/12.png"
                alt="Slide 2"
                className="h-full w-full object-cover"
              />
              
            </Carousel>
          </div>
  
          {/* Right Section for Login Form  h-full add*/}
          <div className="flex-1 flex items-center bg-blue-50 justify-center px-4 lg:px-8 py-12 h-full lg:w-1/2">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg  shadow-blue-500 ">
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
                  <p className="text-xs mt-4 text-[#002D74]">
                    If you are already a member, easily log in
                  </p>
                </div>
                <img
                  src="/logo.png"
                  alt="RK Cylinder Logo"
                  className="h-14 w-auto rounded-lg  "
                />
              </div>
  
              <form
                onSubmit={handleSubmit}
                method="POST"
                className="mt-8 mb-2 w-full"
              >
                <div className="mb-6 flex flex-col gap-6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="-mb-3 font-medium"
                  >
                    Username
                  </Typography>
                  <Input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                    placeholder="abc"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    inputRef={emailInputRef}
                  
                  />
                  <div className="flex justify-between">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="-mb-3 font-medium"
                    >
                      Password
                    </Typography>
                    <Typography
                      variant="small"
                    
                      className=" -mb-3 font-medium hover:text-orange-600  text-gray-500 border-b border-black   "
                    >
                      <Link   tabIndex={-1} to='/forget-password' >Forgot Password</Link>
                    </Typography>
                  </div>
  
                  <Input
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    size="lg"
                    placeholder="********"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
  
                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-6 bg-blue-500 hover:bg-blue-600 text-white"
                  fullWidth
                >
                  {loading ? "Checking..." : "Sign In"}
                </Button>
  
               
              </form>
            </div>
          </div>
        </section>
    </>
  );
};

export default SignIn;
