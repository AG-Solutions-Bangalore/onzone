import React, { useEffect, useState } from 'react'
import Layout from "../../../layout/Layout"
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
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import BASE_URL from '../../../base/BaseUrl';
import MasterFilter from '../../../components/MasterFilter';
const statusOptions = [
    {
        value: "Active",
        label: "Active",
      },
      {
        value: "Inactive",
        label: "Inactive",
      },
  ];
const EditBrand = () => {
    const {id} = useParams()
    const [brand, setBrand] = useState({
        fabric_brand_brands: "",
        fabric_brand_status: "",
        fabric_brand_images: ""
    });

      const navigate = useNavigate();
    
      const [isButtonDisabled, setIsButtonDisabled] = useState(false);
      const [selectedFile, setSelectedFile] = useState(null);
    
      const validateOnlyText = (inputtxt) => {

        var re = /^[A-Za-z ]+$/;
        if(inputtxt === "" || re.test(inputtxt)){
          return true;
        }else{
          return false;
        }
      }
  
  
      const onInputChange = (e) => {
  
        if(e.target.name=="fabric_brand_brands"){
  
          if(validateOnlyText(e.target.value)){
            setBrand({
              ...brand,
              [e.target.name]: e.target.value,
            });  
          }
        }else{
          setBrand({
            ...brand,
            [e.target.name]: e.target.value,
          });  
        }
      };
    
      useEffect(() => {
        const fetchServiceData = async () => {
          try {
            const response = await axios.get(
              `${BASE_URL}/api/fetch-brand-by-Id/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
              
            setBrand(response.data?.brand)
          } catch (error) {
            console.error("Error fetching brand:", error);
          }
        };
    
        fetchServiceData();
      }, [id]);
    
      const onSubmit = (e) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append("fabric_brand_brands",brand.fabric_brand_brands);
        data.append("fabric_brand_images",selectedFile);
        data.append("fabric_brand_status",brand.fabric_brand_status);
    
        const form = document.getElementById("addIndiv");
        if (form.checkValidity()) {
          setIsButtonDisabled(true);
    
          axios({
            url: `${BASE_URL}/api/update-brand/${id}?_method=PUT`,
            method: "POST",
            data,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => {
              if (res.data.code == "200") {
                toast.success("update succesfull");
                navigate("/brand");
              } else {
                toast.error("duplicate entry");
              }
            })
            .finally(() => {
              setIsButtonDisabled(false);
            });
        }
      };
    
      const imageUrl = brand.fabric_brand_images
        ? `https://houseofonzone.com/admin/storage/app/public/Brands/${brand.fabric_brand_images}`
        : "https://houseofonzone.com/admin/storage/app/public/no_image.jpg";
    
  return (
 <Layout>
   <MasterFilter/>
       <div className="textfields-wrapper">
       <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Edit Brand
        </h3>
      </div>
        <Card className="p-6 mt-6">
          <form
            id="addIndiv"
            autoComplete="off"
            onSubmit={onSubmit}
            className="p-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Service Image */}
              <div className="flex justify-center items-center  rounded-lg shadow-lg shadow-blue-400">
                <img src={imageUrl} alt="Service" className="w-52 h-52" />
              </div>
              {/* Service Fields */}
              <div className=" rounded-lg shadow-lg shadow-orange-400 p-2 ">
                <div className="mb-6">
                  <Input
                    
                    type="text"
                    label="Brand"
                    autoComplete="Name"
                    name="fabric_brand_brands"
                    value={brand.fabric_brand_brands}
                    onChange={(e) => onInputChange(e)}
                    required
                  
                  />
                </div>
               
                <div className="mb-6">
                  <Input
                    label="Image"
                    type="file"
                    name="fabric_brand_images"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="w-full border border-gray-700 rounded-md"
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
                      name="fabric_brand_status"
                      value={brand.fabric_brand_status}
                      onChange={(e) => onInputChange(e)}
                      label="Status *"
                      required
                    >
                      {statusOptions.map((data) => (
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

              <Link to="/brand">
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

export default EditBrand