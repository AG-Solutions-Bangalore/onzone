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
const EditStyle = () => {
    const {id} = useParams()
    const [style, setStyle] = useState({
        style_type: "",
        style_status: "",
    });

      const navigate = useNavigate();
    
      const [isButtonDisabled, setIsButtonDisabled] = useState(false);
      
    
      const onStyleInputChange = (e) => {
        
        setStyle({
             ...style,
            [e.target.name]: e.target.value,
        });
        
    };
    
      useEffect(() => {
        const fetchServiceData = async () => {
          try {
            const response = await axios.get(
              `${BASE_URL}/api/fetch-style-by-Id/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
              
            setStyle(response.data.style);
          } catch (error) {
            console.error("Error fetching brand:", error);
          }
        };
    
        fetchServiceData();
      }, [id]);
    
      const onSubmit = (e) => {
        e.preventDefault();
    
        let data = {
            style_type: style.style_type,
            style_status: style.style_status,
        };
    
        const form = document.getElementById("addIndiv");
        if (form.checkValidity()) {
          setIsButtonDisabled(true);
    
          axios({
            url: `${BASE_URL}/api/update-style/${id}?_method=PUT`,
            method: "POST",
            data,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => {
              if (res.data.code == "200") {
                toast.success("update succesfull");
                navigate("/style");
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
        <div className="textfields-wrapper">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Edit Style
        </h3>
      </div>
  <Card className="p-6 mt-6">
    <form
      id="addIndiv"
      autoComplete="off"
      onSubmit={onSubmit}
      className="p-4"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Service Fields */}
        <div className="flex-1">
          <div className="mb-6">
            <Input
              type="text"
              autoComplete="Name"
              label="Enter Style Type"
              required
              name="style_type"
              value={style.style_type}
              onChange={(e) => onStyleInputChange(e)}
            />
          </div>
          <div className="mb-4">
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
                name="style_status"
                value={style.style_status}
                onChange={(e) => onStyleInputChange(e)}
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
      </div>
      {/* Buttons */}
      <div className="text-center mt-6">
        <Button
          type="submit"
          className="mr-2 mb-2"
          color="primary"
          disabled={isButtonDisabled}
        >
          <div className="flex gap-1">
            <MdSend className="w-4 h-4" />
            <span>{isButtonDisabled ? "Updating..." : "Update"}</span>
          </div>
        </Button>

        <Link to="/style">
          <Button className="mr-2 mb-2" color="primary">
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

export default EditStyle