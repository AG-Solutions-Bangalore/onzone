import React, { useState } from "react";
import Layout from "../../../layout/Layout";

import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack, MdClose, MdSend } from "react-icons/md";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { toast } from "react-toastify";
import { Button, Input } from "@material-tailwind/react";
import MasterFilter from "../../../components/MasterFilter";

const AddStyle = () => {
  const navigate = useNavigate();
  const [style, setStyle] = useState({
    style_type: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const onStyleInputChange = (e) => {
    setStyle({
      ...style,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    const data = {
      style_type: style.style_type,
    };

    axios({
      url: BASE_URL + "/api/create-style",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == "200") {
        toast.success("Style Create succesfull");
        setStyle({
          style_type: "",
        });
        navigate("/style");
      } else {
        toast.error("duplicate entry");
      }
    });
  };
  return (
    <Layout>
       <MasterFilter/>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Create Style
        </h3>
      </div>
      <div className="w-full mt-5 mx-auto p-8 bg-white shadow-lg rounded-xl">
        <form id="addIndiv" autoComplete="off" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
            {/* Brand */}
            <div className="form-group">
              <Input
                label="Enter Style Type"
                type="tel"
                name="style_type"
                value={style.style_type}
                onChange={(e) => onStyleInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  transition-all duration-300 shadow-sm"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            {/* Submit Button */}

            <Button
              type="submit"
              className="mr-2 mb-2"
              disabled={isButtonDisabled}
            >
              <div className="flex gap-1">
                <MdSend className="w-4 h-4" />
                <span>{isButtonDisabled ? "Submiting..." : "Submit"}</span>
              </div>
            </Button>

            {/* Back Button */}
            <Link to="/style">
              <Button className="mr-2 mb-2">
                <div className="flex gap-1">
                  <MdArrowBack className="w-4 h-4" />
                  <span>Back</span>
                </div>
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddStyle;
