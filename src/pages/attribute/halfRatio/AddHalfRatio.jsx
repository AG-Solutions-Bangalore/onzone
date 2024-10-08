import React, { useState } from "react";
import Layout from "../../../layout/Layout";
import { toast } from "react-toastify";
import { Button, Input } from "@material-tailwind/react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack, MdSend } from "react-icons/md";
import AttributeFilter from "../../../components/AttributeFilter";
const ratioGroup = [
  {
    value: "a",
    label: "a",
  },
  {
    value: "ab",
    label: "ab",
  },
  {
    value: "abc",
    label: "abc",
  },
];
const AddHalfRatio = () => {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [ratioHalf, setRatioHalf] = useState({
    ratio_range: "",
    ratio_group: "",
    ratio_type38: "",
    ratio_type40: "",
    ratio_type42: "",
    ratio_type44: "",
    ratio_type46: "",
    ratio_type48: "",
    ratio_type50: "",
  });
  
  const onInputChange = (e) => {
    setRatioHalf({
      ...ratioHalf,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    let data = {
      ratio_range: ratioHalf.ratio_range,
      ratio_group: ratioHalf.ratio_group,
      ratio_type38: ratioHalf.ratio_type38,
      ratio_type40: ratioHalf.ratio_type40,
      ratio_type42: ratioHalf.ratio_type42,
      ratio_type44: ratioHalf.ratio_type44,
      ratio_type46: ratioHalf.ratio_type46,
      ratio_type48: ratioHalf.ratio_type48,
      ratio_type50: ratioHalf.ratio_type50,
    };

    axios({
      url: BASE_URL + "/api/create-half-ratio",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == "200") {
        toast.success("Half Ratio Create succesfull");

        setRatioHalf({
          ratio_range: "",
          ratio_group: "",
          ratio_type38: "",
          ratio_type40: "",
          ratio_type42: "",
          ratio_type44: "",
          ratio_type46: "",
          ratio_type48: "",
          ratio_type50: "",
        });
        navigate("/half-ratio");
      } else {
        toast.error("Duplicate Entry");
      }
    });
  };
  return (
    <Layout>
      <AttributeFilter/>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Create Half Ratio
        </h3>
      </div>
      <div className="w-full mt-5 p-4 bg-white shadow-lg rounded-xl">
        <form id="addIndiv" autoComplete="off" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            <div className="form-group">
              <Input
                label="Ratio Range"
                type="text"
                name="ratio_range"
                value={ratioHalf.ratio_range}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <FormControl fullWidth>
              <InputLabel id="service-select-label">
                <span className="text-sm relative bottom-[6px]">
                  Ratio Group <span className="text-red-700">*</span>
                </span>
              </InputLabel>
              <Select
                sx={{ height: "40px", borderRadius: "5px" }}
                labelId="service-select-label"
                id="service-select"
                name="ratio_group"
                label="Ratio Group"
                value={ratioHalf.ratio_group}
                onChange={(e) => onInputChange(e)}
                required
              >
                {ratioGroup.map((option) => (
                  <MenuItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="form-group">
              <Input
                label="Half 38"
                type="text"
                name="ratio_type38"
                value={ratioHalf.ratio_type38}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="form-group">
              <Input
                type="text"
                label="Half 40"
                name="ratio_type40"
                value={ratioHalf.ratio_type40}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                label="Half 42"
                name="ratio_type42"
                value={ratioHalf.ratio_type42}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            {/* Service Rate Field */}

            <div className="form-group">
              <Input
                type="text"
                label="Half 44"
                name="ratio_type44"
                value={ratioHalf.ratio_type44}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                label="Half 46"
                name="ratio_type46"
                value={ratioHalf.ratio_type46}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                label="Half 48"
                name="ratio_type48"
                value={ratioHalf.ratio_type48}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                label="Half 50"
                name="ratio_type50"
                value={ratioHalf.ratio_type50}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
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

            <Link to="/factory">
              <Button className="mr-2 mb-2">
                <div className="flex gap-1">
                  <MdArrowBack className="w-5 h-5" />
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

export default AddHalfRatio;
