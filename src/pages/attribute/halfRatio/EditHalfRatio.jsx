import React, { useEffect, useState } from 'react'
import Layout from '../../../layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { Button, Input } from "@material-tailwind/react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { Link } from "react-router-dom";
import { MdArrowBack, MdSend } from "react-icons/md";
import AttributeFilter from '../../../components/AttributeFilter';

const status = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
];

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
const EditHalfRatio = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [ratio38, setRatio38] = useState([]);
    const [ratio40, setRatio40] = useState([]);
    const [ratio42, setRatio42] = useState([]);
    const [ratio44, setRatio44] = useState([]);
    const [ratio46, setRatio46] = useState([]);
    const [ratio48, setRatio48] = useState([]);
    const [ratio50, setRatio50] = useState([]);
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
        ratio_status: "",
      });

      const onInputChange = (e) => {
        setRatioHalf({
          ...ratioHalf,
          [e.target.name]: e.target.value,
        });
      };
      useEffect(() => {
        const fetchServiceData = async () => {
          try {
            const response = await axios.get(
              `${BASE_URL}/api/fetch-half-ratio-by-id/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
              
            setRatioHalf(response.data.ratioHalf)
            const str = response.data.ratioHalf.ratio_type
            var temp = new Array();
            temp = str.split(",");
            setRatio38(temp[0]);
            setRatio40(temp[1]);
            setRatio42(temp[2]);
            setRatio44(temp[3]);
            setRatio46(temp[4]);
            setRatio48(temp[5]);
            setRatio50(temp[6]);
          
          } catch (error) {
            console.error("Error fetching half Ratio:", error);
          }
        };
    
        fetchServiceData();
      }, [id]);
    
      const onSubmit = (e) => {
        e.preventDefault();
        let data = {
            ratio_range: ratioHalf.ratio_range,
            ratio_group: ratioHalf.ratio_group,
            ratio_type38: ratio38,
            ratio_type40: ratio40,
            ratio_type42: ratio42,
            ratio_type44: ratio44,
            ratio_type46: ratio46,
            ratio_type48: ratio48,
            ratio_type50: ratio50,
            ratio_status: ratioHalf.ratio_status,
        };
    
        const form = document.getElementById("addIndiv");
        if (form.checkValidity()) {
          setIsButtonDisabled(true);
    
          axios({
            url: `${BASE_URL}/api/update-half-ratio/${id}?_method=PUT`,
            method: "POST",
            data,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => {
              if (res.data.code == "200") {
                toast.success("update succesfull");
                navigate("/half-ratio");
              } else {
                toast.error("duplicate entry");
              }
            })
            .finally(() => {
              setIsButtonDisabled(false);
            });
        }
      };
  return (
   <Layout>
     <AttributeFilter/>
     <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Edit Half Ratio
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
           
            <FormControl fullWidth>
              <InputLabel id="service-select-label">
                <span className="text-sm relative bottom-[6px]">
                  Status <span className="text-red-700">*</span>
                </span>
              </InputLabel>
              <Select
                sx={{ height: "40px", borderRadius: "5px" }}
                labelId="service-select-label"
                id="service-select"
                name="ratio_status"
                value={ratioHalf.ratio_status}
                onChange={(e) => onInputChange(e)}
                label="Status "
                required
              >
                {status.map((data) => (
                  <MenuItem key={data.value} value={String(data.value)}>
                    {data.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
        
            <div className="form-group">
              <Input
               
                type="text"
                label="Half 38"
             
                name="ratio_type38"
                value={ratio38}
                onChange={(e) => setRatio38(e.target.value)}
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
                value={ratio40}
                  onChange={(e) => setRatio40(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                label="Half 42"
                name="ratio_type42"
                value={ratio42}
                onChange={(e) => setRatio42(e.target.value)}
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
                value={ratio44}
                onChange={(e) => setRatio44(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                label="Half 46"
                name="ratio_type46"
                value={ratio46}
                onChange={(e) => setRatio46(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                label="Half 48"
                name="ratio_type48"
                value={ratio48}
                onChange={(e) => setRatio48(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                label="Half 50"
                name="ratio_type50"
                value={ratio50}
                onChange={(e) => setRatio50(e.target.value)}
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

            <Link to="/half-ratio">
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
  )
}

export default EditHalfRatio