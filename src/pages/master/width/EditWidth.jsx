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
import { FaBuilding } from 'react-icons/fa';
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

const EditWidth = () => {
    const {id} = useParams()
    const [widths, setWidth] = useState({
        width_mea: "",
        width_status: ""
    });
    
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    const navigate = useNavigate()
    const onInputChange = (e) => {

        setWidth({
        ...widths,
        [e.target.name]: e.target.value,
        });
    
    };
    
      useEffect(() => {
        const fetchServiceData = async () => {
          try {
            const response = await axios.get(
              `${BASE_URL}/api/fetch-width-by-Id/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
              
            setWidth(response.data.width);
          } catch (error) {
            console.error("Error fetching Width:", error);
          }
        };
    
        fetchServiceData();
      }, [id]);
    
      const onSubmit = (e) => {
        e.preventDefault();
    
        let data = {
            width_mea: widths.width_mea,
            width_status: widths.width_status,
            
        };
    
        const form = document.getElementById("addIndiv");
        if (form.checkValidity()) {
          setIsButtonDisabled(true);
    
          axios({
            url: `${BASE_URL}/api/update-width/${id}?_method=PUT`,
            method: "POST",
            data,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => {
              if (res.data.code == "200") {
                toast.success("update succesfull");
                navigate("/width");
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
        <div className="container mx-auto px-4">
        {/* Page Title */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Edit Width
        </h3>
      </div>

        <Card className="p-6 mt-6">
          <form id="addIndiv" autoComplete="off" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Branch Name */}
              <div className="form-group">
                <Input
                 
                  type="text"
                  label="Width"
                
                  name="width_mea"
                  value={widths.width_mea}
                  onChange={(e) => onInputChange(e)}
                  required
                 
                />
              </div>

              {/* Branch Status */}

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
                  name="width_status"
                  value={widths.width_status}
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

            {/* Buttons */}
            <div className="text-center mt-6">
              <Button
                type="submit"
                className="mr-2 mb-2"
               
                disabled={isButtonDisabled}
              >
                <div className="flex gap-1">
                  <MdSend className="w-4 h-4" />
                  <span>{isButtonDisabled ? "Updating..." : "Update"}</span>
                </div>
              </Button>

              <Link to="/width">
                <Button className="mr-2 mb-2" >
                  <div className="flex gap-1">
                    <MdArrowBack className="w-4 h-4" />
                    <span>Back</span>
                  </div>
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  )
}

export default EditWidth