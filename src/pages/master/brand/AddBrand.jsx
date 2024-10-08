import React, { useState } from "react";
import Layout from "../../../layout/Layout";
import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { toast } from "react-toastify";
import { MdArrowBack, MdSend } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import MasterFilter from "../../../components/MasterFilter";

const AddBrand = () => {
  const [brand, setBrand] = useState({
    fabric_brand_brands: "",
    fabric_brand_images: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const validateOnlyText = (inputtxt) => {
    var re = /^[A-Za-z ]+$/;
    if (inputtxt === "" || re.test(inputtxt)) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "fabric_brand_brands") {
      if (validateOnlyText(e.target.value)) {
        setBrand({
          ...brand,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setBrand({
        ...brand,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    const data = new FormData();
    data.append("fabric_brand_brands", brand.fabric_brand_brands);
    data.append("fabric_brand_images", selectedFile);

    axios({
      url: BASE_URL + "/api/create-brand",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == "200") {
        toast.success("Brand Create succesfull");

        navigate("/brand");
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
          Create Brand
        </h3>
      </div>
      <div className="w-full mt-5 mx-auto p-8 bg-white shadow-lg rounded-xl">
        <form id="addIndiv" autoComplete="off" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            {/* Brand */}
            <div className="form-group">
              <Input
                label="Brand"
                type="tel"
                name="fabric_brand_brands"
                value={brand.fabric_brand_brands}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  transition-all duration-300 shadow-sm"
              />
            </div>

            {/* File Upload Field */}
            <div className="form-group">
              <Input
                label="Image"
                type="file"
                name="fabric_brand_images"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full px-4 pb-2 border border-gray-300 rounded-md focus:outline-none  transition-all duration-300 shadow-sm"
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
            <Link to="/brand">
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

export default AddBrand;
