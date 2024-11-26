import React, { useEffect, useState } from 'react'
import Layout from '../../../layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { MdArrowBack, MdSend } from "react-icons/md";
import { Button, Card, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import BASE_URL from '../../../base/BaseUrl';
import MasterFilter from '../../../components/MasterFilter';
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
const EditFactory = () => {
    const {id} = useParams()
    const [factory, setFactory] = useState({
        factory_name: "",
        factory_address: "",
        factory_gstin: "",
        factory_contact_name: "",
        factory_contact_mobile: "",
        factory_status: "",
        factory_contact_email:"",
    });

      const navigate = useNavigate();
    
      const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

      const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
          return true;
        }else{
          return false;
        }
      }
      
      const validateOnlyText = (inputtxt) => {

        var re = /^[A-Za-z ]+$/;
        if(inputtxt === "" || re.test(inputtxt)){
          return true;
        }else{
          return false;
        }
      }
  

      const onInputChange = (e) => {

        if(e.target.name=="factory_contact_mobile"){
          if(validateOnlyDigits(e.target.value)){
            setFactory({
              ...factory,
              [e.target.name]: e.target.value,
            });
          }
        }else if(e.target.name=="factory_contact_name"){
          if(validateOnlyText(e.target.value)){
            setFactory({
              ...factory,
              [e.target.name]: e.target.value,
            });
          }
        }else{
          setFactory({
          ...factory,
          [e.target.name]: e.target.value,
          });
        }
      };
    
      useEffect(() => {
        const fetchServiceData = async () => {
          try {
            const response = await axios.get(
              `${BASE_URL}/api/fetch-factory-by-id/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
              
            setFactory(response.data.factory);
          } catch (error) {
            console.error("Error fetching brand:", error);
          }
        };
    
        fetchServiceData();
      }, [id]);
    
      const onSubmit = (e) => {
        e.preventDefault();
        if((factory.factory_contact_mobile.length !== 10)){
            toast.error("Mobile Number allow only 10 Digits");
            return false;
          }
    
        let data = {
            factory_name: factory.factory_name,
            factory_address: factory.factory_address,
            factory_gstin: factory.factory_gstin ,
            factory_contact_name: factory.factory_contact_name,
            factory_contact_mobile: factory.factory_contact_mobile,
            factory_status: factory.factory_status,
            factory_contact_email: factory.factory_contact_email,
          };
    
        const form = document.getElementById("addIndiv");
        if (form.checkValidity()) {
          setIsButtonDisabled(true);
    
          axios({
            url: `${BASE_URL}/api/update-factory/${id}?_method=PUT`,
            method: "POST",
            data,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => {
              if (res.data.code == "200") {
                toast.success("update succesfull");
                navigate("/factory");
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
       <MasterFilter/>
        <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Edit Factory 
        </h3>
      </div>
      <div className="w-full mt-5 p-4 bg-white shadow-lg rounded-xl">
        <form id="addIndiv" autoComplete="off" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="form-group">
              <Input
                label="Factory Name"
                type="text"
                name="factory_name"
                value={factory?.factory_name}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="form-group">
              <Input
                label="Email"
                type="text"
                name="factory_contact_email"
                value={factory?.factory_contact_email}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="form-group">
              <Input
                label="Address"
                type="text"
                name="factory_address"
                value={factory?.factory_address}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="form-group">
              <Input
                label="GSTIN"
                type="text"
                name="factory_gstin"
                value={factory?.factory_gstin}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            <div className="form-group">
              <Input
                label="Contact Name"
                type="text"
                name="factory_contact_name"
                value={factory?.factory_contact_name}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            {/* Service Rate Field */}

            <div className="form-group">
              <Input
                label="Mobile"
                type="text"
                name="factory_contact_mobile"
                maxLength={10}
                minLength={10}
                value={factory?.factory_contact_mobile}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            <div className="form-group">
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
               
                name="factory_status"
                value={factory?.factory_status}
                onChange={(e) => onInputChange(e)}
                label="Status *"
                required
              >
                {status.map((data) => (
                  <MenuItem key={data.value} value={String(data.value)}>
                    {data.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
  )
}

export default EditFactory