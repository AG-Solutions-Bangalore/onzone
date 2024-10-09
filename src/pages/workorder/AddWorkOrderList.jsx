import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdSend, MdArrowBack } from "react-icons/md";
import Layout from "../../layout/Layout";
import { Button, IconButton, Input, Textarea } from "@material-tailwind/react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import dateyear from "../../utils/DateYear";
import { ContextPanel } from "../../utils/ContextPanel";
import { Delete } from "@mui/icons-material";
const AddWorkOrderList = () => {
  const navigate=useNavigate()
  const [workorder, setWorkOrder] = useState({
    work_order_year: dateyear,
    work_order_factory_no: "",
    work_order_brand: "",
    work_order_style_type: "",
    work_order_width: "",
    work_order_count: "",
    work_order_remarks: "",
    workorder_sub_data: "",
    work_order_ratio: "",
    work_order_ratio_consumption: "",
    work_order_ratio_h: "",
    work_order_ratio_h_consumption: "",
  });
  const [work_order_count, setCount] = useState(1);
  const [ratioValue, setRatioValue] = useState({});
  const useTemplate = {
    work_order_sub_selection_id: "",
    work_order_sub_36_h: "0",
    work_order_sub_38_h: "0",
    work_order_sub_40_h: "0",
    work_order_sub_42_h: "0",
    work_order_sub_44_h: "0",
    work_order_sub_46_h: "0",
    work_order_sub_48_h: "0",
    work_order_sub_50_h: "0",
    work_order_sub_a: "",
    work_order_sub_b: "",
    work_order_sub_c: "",
    work_order_sub_length: "",
    work_order_sub_half_shirt: "",
    work_order_sub_full_shirt: "",
    work_order_sub_amount: "",
  };
  const [users, setUsers] = useState([useTemplate]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [factory, setFactory] = useState([]);
  const [halfRatio, setHalfRatio] = useState([]);
  const [ratio, setRatio] = useState([]);
  const [style, setStyle] = useState([]);
  const [width, setWidth] = useState([]);
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);

  const addItem = () => {
    const tempUsers = [...users];
    const selectedValue = tempUsers.length;
    console.log("debug", selectedValue);
    console.log(
      "debugs",
      tempUsers[parseInt(selectedValue - 1)].work_order_sub_selection_id
    );

    if (selectedValue > 0) {
      console.log(
        "debugs",
        tempUsers[selectedValue - 1].work_order_sub_selection_id
      );

      tempUsers.push({
        ...useTemplate,
        work_order_sub_selection_id:
          parseInt(tempUsers[selectedValue - 1].work_order_sub_selection_id) +
          1,
      });
    } else {
      tempUsers.push({
        ...useTemplate,
        work_order_sub_selection_id: 1,
      });
    }

    setUsers(tempUsers);
    setCount(work_order_count + 1);
  };

  const onChange = (e, index) => {
    const updatedUsers = users.map((user, i) =>
      index == i
        ? Object.assign(user, { [e.target.name]: e.target.value })
        : user
    );
    setUsers(updatedUsers);
  };

  const removeUser = (index) => {
    const filteredUsers = [...users];
    filteredUsers.splice(index, 1);
    setUsers(filteredUsers);
    setCount(work_order_count - 1);
  };
  const HalfA1 = (selectedValue) => {
    const newValue = halfRatio.find((item) => item.ratio_range === ratioValue);

    const tempUsers = [...users];
    const str = newValue.ratio_type;
    const parts = newValue.ratio_type.split(",");
    if (parts[0][1] == "a") {
      tempUsers[selectedValue].work_order_sub_38_h =
        tempUsers[selectedValue].work_order_sub_a * parts[0].replace(/\D/g, "");
    }

    if (parts[1][1] == "a") {
      tempUsers[selectedValue].work_order_sub_40_h =
        tempUsers[selectedValue].work_order_sub_a * parts[1].replace(/\D/g, "");
    }

    if (parts[2][1] == "a") {
      tempUsers[selectedValue].work_order_sub_42_h =
        tempUsers[selectedValue].work_order_sub_a * parts[2].replace(/\D/g, "");
    }
    if (parts[3][1] == "a") {
      tempUsers[selectedValue].work_order_sub_44_h =
        tempUsers[selectedValue].work_order_sub_a * parts[3].replace(/\D/g, "");
    }
    if (parts[4][1] == "a") {
      tempUsers[selectedValue].work_order_sub_46_h =
        tempUsers[selectedValue].work_order_sub_a * parts[4].replace(/\D/g, "");
    }
    if (parts[5][1] == "a") {
      tempUsers[selectedValue].work_order_sub_48_h =
        tempUsers[selectedValue].work_order_sub_a * parts[5].replace(/\D/g, "");
    }
    if (parts[6][1] == "a") {
      tempUsers[selectedValue].work_order_sub_50_h =
        tempUsers[selectedValue].work_order_sub_a * parts[6].replace(/\D/g, "");
    }
    tempUsers[selectedValue].work_order_sub_half_shirt = (
      parseInt(tempUsers[selectedValue].work_order_sub_38_h) +
      parseInt(tempUsers[selectedValue].work_order_sub_40_h) +
      parseInt(tempUsers[selectedValue].work_order_sub_42_h) +
      parseInt(tempUsers[selectedValue].work_order_sub_44_h) +
      +parseInt(tempUsers[selectedValue].work_order_sub_46_h) +
      +parseInt(tempUsers[selectedValue].work_order_sub_48_h) +
      +parseInt(tempUsers[selectedValue].work_order_sub_50_h)
    ).toFixed(2);
    tempUsers[selectedValue].work_order_sub_full_shirt = (
      (tempUsers[selectedValue].work_order_sub_length -
        (parseInt(tempUsers[selectedValue].work_order_sub_38_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_40_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_42_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_44_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_46_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_48_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_50_h)) *
          workorder.work_order_ratio_h_consumption) /
      workorder.work_order_ratio_consumption
    ).toFixed(2);
    setUsers(tempUsers);
    for (var i = 0; i < work_order_count; i++) {
      if (Math.sign(tempUsers[i].work_order_sub_full_shirt) == -1) {
        setIsButtonDisabled(true);
        toast.error("Shortage of Cloth");
        break;
      } else {
        setIsButtonDisabled(false);
      }
    }
  };

  const HalfB1 = (selectedValue) => {
    const newValue = halfRatio.find((item) => item.ratio_range === ratioValue);

    const tempUsers = [...users];
    const str = newValue.ratio_type;
    const parts = newValue.ratio_type.split(",");
    if (parts[0][1] == "b") {
      tempUsers[selectedValue].work_order_sub_38_h =
        tempUsers[selectedValue].work_order_sub_b * parts[0].replace(/\D/g, "");
    }

    if (parts[1][1] == "b") {
      tempUsers[selectedValue].work_order_sub_40_h =
        tempUsers[selectedValue].work_order_sub_b * parts[1].replace(/\D/g, "");
    }

    if (parts[2][1] == "b") {
      tempUsers[selectedValue].work_order_sub_42_h =
        tempUsers[selectedValue].work_order_sub_b * parts[2].replace(/\D/g, "");
    }
    if (parts[3][1] == "b") {
      tempUsers[selectedValue].work_order_sub_44_h =
        tempUsers[selectedValue].work_order_sub_b * parts[3].replace(/\D/g, "");
    }
    if (parts[4][1] == "b") {
      tempUsers[selectedValue].work_order_sub_46_h =
        tempUsers[selectedValue].work_order_sub_b * parts[4].replace(/\D/g, "");
    }
    if (parts[5][1] == "b") {
      tempUsers[selectedValue].work_order_sub_48_h =
        tempUsers[selectedValue].work_order_sub_b * parts[5].replace(/\D/g, "");
    }
    if (parts[6][1] == "b") {
      tempUsers[selectedValue].work_order_sub_50_h =
        tempUsers[selectedValue].work_order_sub_b * parts[6].replace(/\D/g, "");
    }
    tempUsers[selectedValue].work_order_sub_half_shirt = (
      parseInt(tempUsers[selectedValue].work_order_sub_38_h) +
      parseInt(tempUsers[selectedValue].work_order_sub_40_h) +
      parseInt(tempUsers[selectedValue].work_order_sub_42_h) +
      parseInt(tempUsers[selectedValue].work_order_sub_44_h) +
      +parseInt(tempUsers[selectedValue].work_order_sub_46_h) +
      +parseInt(tempUsers[selectedValue].work_order_sub_48_h) +
      +parseInt(tempUsers[selectedValue].work_order_sub_50_h)
    ).toFixed(2);
    tempUsers[selectedValue].work_order_sub_full_shirt = (
      (tempUsers[selectedValue].work_order_sub_length -
        (parseInt(tempUsers[selectedValue].work_order_sub_38_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_40_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_42_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_44_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_46_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_48_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_50_h)) *
          workorder.work_order_ratio_h_consumption) /
      workorder.work_order_ratio_consumption
    ).toFixed(2);
    setUsers(tempUsers);
    for (var i = 0; i < work_order_count; i++) {
      if (Math.sign(tempUsers[i].work_order_sub_full_shirt) == -1) {
        setIsButtonDisabled(true);
        toast.error("Shortage of Cloth");
        break;
      } else {
        setIsButtonDisabled(false);
      }
    }
  };

  const HalfC1 = (selectedValue) => {
    const newValue = halfRatio.find((item) => item.ratio_range === ratioValue);

    const tempUsers = [...users];
    const str = newValue.ratio_type;
    const parts = newValue.ratio_type.split(",");
    if (parts[0][1] == "c") {
      tempUsers[selectedValue].work_order_sub_38_h =
        tempUsers[selectedValue].work_order_sub_c * parts[0].replace(/\D/g, "");
    }

    if (parts[1][1] == "c") {
      tempUsers[selectedValue].work_order_sub_40_h =
        tempUsers[selectedValue].work_order_sub_c * parts[1].replace(/\D/g, "");
    }

    if (parts[2][1] == "c") {
      tempUsers[selectedValue].work_order_sub_42_h =
        tempUsers[selectedValue].work_order_sub_c * parts[2].replace(/\D/g, "");
    }
    if (parts[3][1] == "c") {
      tempUsers[selectedValue].work_order_sub_44_h =
        tempUsers[selectedValue].work_order_sub_c * parts[3].replace(/\D/g, "");
    }
    if (parts[4][1] == "c") {
      tempUsers[selectedValue].work_order_sub_46_h =
        tempUsers[selectedValue].work_order_sub_c * parts[4].replace(/\D/g, "");
    }
    if (parts[5][1] == "c") {
      tempUsers[selectedValue].work_order_sub_48_h =
        tempUsers[selectedValue].work_order_sub_c * parts[5].replace(/\D/g, "");
    }
    if (parts[6][1] == "c") {
      tempUsers[selectedValue].work_order_sub_50_h =
        tempUsers[selectedValue].work_order_sub_c * parts[6].replace(/\D/g, "");
    }
    tempUsers[selectedValue].work_order_sub_half_shirt = (
      parseInt(tempUsers[selectedValue].work_order_sub_38_h) +
      parseInt(tempUsers[selectedValue].work_order_sub_40_h) +
      parseInt(tempUsers[selectedValue].work_order_sub_42_h) +
      parseInt(tempUsers[selectedValue].work_order_sub_44_h) +
      +parseInt(tempUsers[selectedValue].work_order_sub_46_h) +
      +parseInt(tempUsers[selectedValue].work_order_sub_48_h) +
      +parseInt(tempUsers[selectedValue].work_order_sub_50_h)
    ).toFixed(2);
    tempUsers[selectedValue].work_order_sub_full_shirt = (
      (tempUsers[selectedValue].work_order_sub_length -
        (parseInt(tempUsers[selectedValue].work_order_sub_38_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_40_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_42_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_44_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_46_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_48_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_50_h)) *
          workorder.work_order_ratio_h_consumption) /
      workorder.work_order_ratio_consumption
    ).toFixed(2);
    setUsers(tempUsers);
    for (var i = 0; i < work_order_count; i++) {
      if (Math.sign(tempUsers[i].work_order_sub_full_shirt) == -1) {
        setIsButtonDisabled(true);
        toast.error("Shortage of Cloth");
        break;
      } else {
        setIsButtonDisabled(false);
      }
    }
  };

  const validateOnlyNumber = (inputtxt) => {
    var phoneno = /^\d*\.?\d*$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };
  const onInputChange = (e) => {
    if (e.target.name == "work_order_ratio_consumption") {
      if (validateOnlyNumber(e.target.value)) {
        setWorkOrder({
          ...workorder,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "work_order_ratio_h_consumption") {
      if (validateOnlyNumber(e.target.value)) {
        setWorkOrder({
          ...workorder,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setWorkOrder({
        ...workorder,
        [e.target.name]: e.target.value,
      });
    }
  };

  const fetchData = async (url, setData) => {
    try {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching data from ${url}`, error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrandData = () =>
    fetchData(`${BASE_URL}/api/fetch-brand`, (data) => setBrand(data.brand));
  const fetchWidthData = () =>
    fetchData(`${BASE_URL}/api/fetch-width`, (data) => setWidth(data.width));
  const fetchStyleData = () =>
    fetchData(`${BASE_URL}/api/fetch-style`, (data) => setStyle(data.style));
  const fetchRatioData = () =>
    fetchData(`${BASE_URL}/api/fetch-ratio`, (data) => setRatio(data.ratio));
  const fetchHalfRatioData = () =>
    fetchData(`${BASE_URL}/api/fetch-half-ratio`, (data) =>
      setHalfRatio(data.half_ratio)
    );
  const fetchFactoryData = () =>
    fetchData(`${BASE_URL}/api/fetch-factory`, (data) =>
      setFactory(data.factory)
    );

  useEffect(() => {
    fetchBrandData();
    fetchWidthData();
    fetchStyleData();
    fetchRatioData();
    fetchHalfRatioData();
    fetchFactoryData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    const data = {
      work_order_year: dateyear,
      work_order_factory_no: workorder.work_order_factory_no,
      work_order_brand: workorder.work_order_brand ,
      work_order_style_type: workorder.work_order_style_type,
      work_order_width: workorder.work_order_width,
      workorder_sub_data: users,
      work_order_count:work_order_count,
      work_order_remarks:workorder.work_order_remarks,
      work_order_ratio: workorder.work_order_ratio,
      work_order_ratio_consumption: workorder.work_order_ratio_consumption,
      work_order_ratio_h: workorder.work_order_ratio_h,
      work_order_ratio_h_consumption: workorder.work_order_ratio_h_consumption,
  };
  const form = document.getElementById("addIndiv");
  if(!form.checkValidity()){
    toast.error("Fill all required")
    return
  }

    axios({
      url: BASE_URL + "/api/create-work-order-new",
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
        navigate("/work-order");
      } else {
        toast.error("duplicate entry");
      }
    });
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Create Field Team
        </h3>
      </div>
      <div className="w-full p-4 mt-2 bg-white shadow-lg rounded-xl">
        <form id="addIndiv" autoComplete="off" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
            <div>
              <FormControl fullWidth>
                <InputLabel id="service-select-label">
                  <span className="text-sm relative bottom-[6px]">
                    Factory <span className="text-red-700">*</span>
                  </span>
                </InputLabel>
                <Select
                  sx={{ height: "40px", borderRadius: "5px" }}
                  labelId="service-select-label"
                  id="service-select"
                  name="work_order_factory_no"
                  value={workorder.work_order_factory_no}
                  onChange={(e) => onInputChange(e)}
                  label="Factory *"
                  required
                >
                  {factory.map((factorys) => (
                    <MenuItem
                      key={factorys.factory_no}
                      value={String(factorys.factory_no)}
                    >
                      {factorys.factory_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl fullWidth>
                <InputLabel id="service-select-label">
                  <span className="text-sm relative bottom-[6px]">
                    Brand <span className="text-red-700">*</span>
                  </span>
                </InputLabel>
                <Select
                  sx={{ height: "40px", borderRadius: "5px" }}
                  labelId="service-select-label"
                  id="service-select"
                  name="work_order_brand"
                  value={workorder.work_order_brand}
                  onChange={(e) => onInputChange(e)}
                  label="Brand *"
                  required
                >
                  {brand.map((fabric) => (
                    <MenuItem
                      key={fabric.fabric_brand_brands}
                      value={String(fabric.fabric_brand_brands)}
                    >
                      {fabric.fabric_brand_brands}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl fullWidth>
                <InputLabel id="service-select-label">
                  <span className="text-sm relative bottom-[6px]">
                    Style Type <span className="text-red-700">*</span>
                  </span>
                </InputLabel>
                <Select
                  sx={{ height: "40px", borderRadius: "5px" }}
                  labelId="service-select-label"
                  id="service-select"
                  name="work_order_style_type"
                  value={workorder.work_order_style_type}
                  onChange={(e) => onInputChange(e)}
                  label="Style Type *"
                  required
                >
                  {style.map((fabric) => (
                    <MenuItem
                      key={fabric.style_type}
                      value={String(fabric.style_type)}
                    >
                      {fabric.style_type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth>
                <InputLabel id="service-select-label">
                  <span className="text-sm relative bottom-[6px]">
                    Width <span className="text-red-700">*</span>
                  </span>
                </InputLabel>
                <Select
                  sx={{ height: "40px", borderRadius: "5px" }}
                  labelId="service-select-label"
                  id="service-select"
                  name="work_order_width"
                  value={workorder.work_order_width}
                  onChange={(e) => onInputChange(e)}
                  label="Width *"
                  required
                >
                  {width.map((fabric) => (
                    <MenuItem
                      key={fabric.width_mea}
                      value={String(fabric.width_mea)}
                    >
                      {fabric.width_mea}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth>
                <InputLabel id="service-select-label">
                  <span className="text-sm relative bottom-[6px]">
                    Half Ratio <span className="text-red-700">*</span>
                  </span>
                </InputLabel>
                <Select
                  sx={{ height: "40px", borderRadius: "5px" }}
                  labelId="service-select-label"
                  id="service-select"
                  name="work_order_ratio_h"
                  value={workorder.work_order_ratio_h}
                  onChange={(e) => {onInputChange(e), setRatioValue(e.target.value)}}
                  label="Half Ratio *"
                  required
                >
                  {halfRatio.map((hr, key) => (
                    <MenuItem key={key} value={String(hr.ratio_range)}>
                      {hr.ratio_range}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <Input
                label="Half Consumption"
                type="tel"
                required
                name="work_order_ratio_h_consumption"
                value={workorder.work_order_ratio_h_consumption}
                onChange={(e) => onInputChange(e)}
                className="w-full px-4 py-3 border border-gray-400 rounded-md  transition-all"
              />
            </div>

            <div>
              <FormControl fullWidth>
                <InputLabel id="service-select-label">
                  <span className="text-sm relative bottom-[6px]">
                    Full Ratio <span className="text-red-700">*</span>
                  </span>
                </InputLabel>
                <Select
                  sx={{ height: "40px", borderRadius: "5px" }}
                  labelId="service-select-label"
                  id="service-select"
                  name="work_order_ratio"
                  value={workorder.work_order_ratio}
                  onChange={(e) => onInputChange(e)}
                  label="Full Ratio *"
                  required
                >
                  {ratio.map((ratios) => (
                    <MenuItem
                      key={ratios.ratio_range}
                      value={String(ratios.ratio_range)}
                    >
                      {ratios.ratio_range}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <Input
                label="Full Consumption"
                type="tel"
                required
                name="work_order_ratio_consumption"
                value={workorder.work_order_ratio_consumption}
                onChange={(e) => onInputChange(e)}
                maxLength={12}
                className="w-full px-4 py-3 border border-gray-400 rounded-md  transition-all"
              />
            </div>

            {/* Remarks Field */}
            <div className="col-span-4">
              <Input
                label="Remarks"
                name="work_order_remarks"
                value={workorder.work_order_remarks}
                onChange={(e) => onInputChange(e)}
                className="w-full px-4 py-3 border border-gray-400 rounded-md  transition-all"
              ></Input>
            </div>
          </div>

          <hr className="border-b bg-black mb-4" />
          <div className="flex flex-col">
            {users.map((user, index) => (
              <>
              <div key={index} className="mb-4">
                {/* First Row */}
                <div className="flex flex-wrap justify-between gap-1 mb-2">
                  {/* T Code */}
                  <div className="w-1/2 lg:w-1/12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="T Code"
                        required
                        inputProps={{
                          sx: {
                            height: "0.35rem",
                          },
                        }}
                        name="work_order_sub_selection_id"
                        value={user.work_order_sub_selection_id}
                        onChange={(e) => onChange(e, index)}
                      />
                    </div>
                  </div>
                  {/* Length */}
                  <div className="w-1/2 lg:w-1/12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Length"
                        required
                        inputProps={{
                          sx: {
                            height: "0.35rem",
                          },
                        }}
                        name="work_order_sub_length"
                        value={user.work_order_sub_length}
                        onChange={(e) => onChange(e, index)}
                      />
                    </div>
                  </div>
                  {/* A */}
                  <div className="w-1/2 lg:w-1/12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="A"
                        required
                        inputProps={{
                          sx: {
                            height: "0.35rem",
                          },
                        }}
                        name="work_order_sub_a"
                        value={user.work_order_sub_a}
                        onChange={(e) => {
                          onChange(e, index);
                          HalfA1(index);
                        }}
                      />
                    </div>
                  </div>
                  {/* B */}
                  <div className="w-1/2 lg:w-1/12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        inputProps={{
                          sx: {
                            height: "0.35rem",
                          },
                        }}
                        label="B"
                        name="work_order_sub_b"
                        value={user.work_order_sub_b}
                        onChange={(e) => {
                          onChange(e, index);
                          HalfB1(index);
                        }}
                      />
                    </div>
                  </div>
                  {/* C */}
                  <div className="w-1/2 lg:w-1/12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        inputProps={{
                          sx: {
                            height: "0.35rem",
                          },
                        }}
                        label="C"
                        name="work_order_sub_c"
                        value={user.work_order_sub_c}
                        onChange={(e) => {
                          onChange(e, index);
                          HalfC1(index);
                        }}
                      />
                    </div>
                  </div>
                  {/* Half 38 */}
                  <div className="w-1/2 lg:w-1/12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Half 38"
                        inputProps={{
                          sx: {
                            height: "0.35rem",
                          },
                        }}
                        required
                        name="work_order_sub_38_h"
                        value={user.work_order_sub_38_h}
                        onChange={(e) => onChange(e, index)}
                      />
                    </div>
                  </div>
                  {/* Half 40 */}
                  <div className="w-1/2 lg:w-1/12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Half 40"
                        inputProps={{
                          sx: {
                            height: "0.35rem",
                          },
                        }}
                        required
                        name="work_order_sub_40_h"
                        value={user.work_order_sub_40_h}
                        onChange={(e) => onChange(e, index)}
                      />
                    </div>
                  </div>
                  {/* Half 42 */}
                  <div className="w-1/2 lg:w-1/12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Half 42"
                        inputProps={{
                          sx: {
                            height: "0.35rem",
                          },
                        }}
                        required
                        name="work_order_sub_42_h"
                        value={user.work_order_sub_42_h}
                        onChange={(e) => onChange(e, index)}
                      />
                    </div>
                  </div>
                  {/* Half 44 */}
                  <div className="w-1/2 lg:w-1/12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Half 44"
                        inputProps={{
                          sx: {
                            height: "0.35rem",
                          },
                        }}
                        required
                        name="work_order_sub_44_h"
                        value={user.work_order_sub_44_h}
                        onChange={(e) => onChange(e, index)}
                      />
                    </div>
                  </div>
                  {/* Half 46 */}
                  <div className="w-1/2 lg:w-1/12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Half 46"
                        inputProps={{
                          sx: {
                            height: "0.35rem",
                          },
                        }}
                        required
                        name="work_order_sub_46_h"
                        value={user.work_order_sub_46_h}
                        onChange={(e) => onChange(e, index)}
                      />
                    </div>
                  </div>
                  {/* Half 48 */}
                  <div className="w-1/2 lg:w-1/12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Half 48"
                        inputProps={{
                          sx: {
                            height: "0.35rem",
                          },
                        }}
                        required
                        name="work_order_sub_48_h"
                        value={user.work_order_sub_48_h}
                        onChange={(e) => onChange(e, index)}
                      />
                    </div>
                  </div>
                </div>

                {/* Second Row */}
                <div className="flex flex-wrap justify-start gap-4 mb-4">
                  {/* Half 50 */}
                  <div className="w-1/2  lg:w-1/12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Half 50"
                        inputProps={{
                          sx: {
                            height: "0.35rem",
                          },
                        }}
                        required
                        name="work_order_sub_50_h"
                        value={user.work_order_sub_50_h}
                        onChange={(e) => onChange(e, index)}
                      />
                    </div>
                  </div>
                  {/* Half Shirt */}
                  <div className="w-1/2 lg:w-1/12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Half Shirt"
                        required
                        inputProps={{
                          sx: {
                            height: "0.35rem",
                          },
                        }}
                        name="work_order_sub_half_shirt"
                        value={user.work_order_sub_half_shirt}
                        onChange={(e) => onChange(e, index)}
                      />
                    </div>
                  </div>
                  {/* Full Shirt */}
                  <div className="w-1/2 lg:w-1/12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Full Shirt"
                        required
                        inputProps={{
                          sx: {
                            height: "0.35rem",
                          },
                        }}
                        name="work_order_sub_full_shirt"
                        value={user.work_order_sub_full_shirt}
                        onChange={(e) => onChange(e, index)}
                      />
                    </div>
                  </div>
                  {/* MRP */}
                  <div className="w-1/2 lg:w-1/12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="MRP"
                        required
                        inputProps={{
                          sx: {
                            height: "0.35rem",
                          },
                        }}
                        name="work_order_sub_amount"
                        value={user.work_order_sub_amount}
                        onChange={(e) => onChange(e, index)}
                      />
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="w-1/2 py-1   lg:w-1/6">
                    <IconButton
                      className="w-8 h-8"
                      onClick={() => removeUser(index)}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </div>
                {/* Add More Button */}
                
              </div>
              
            </>
            ))}
            <div className="flex justify-start mt-4">
              <Button
                className="mr-2 mb-2"
                style={{ width: "100px" }}
             
                onClick={(e) => addItem(e)}
              >
                <span>add</span>
              </Button>
             
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            {/* Submit Button */}

            <Button
              type="submit"
              className="mr-2 mb-2"
              // disabled={isButtonDisabled}
              // disabled
            >
              <div className="flex gap-1">
                <MdSend className="w-4 h-4" />
                <span>{isButtonDisabled ? "Submiting..." : "Submit"}</span>
              </div>
            </Button>

            {/* Back Button */}

            <Link to="/work-order">
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

export default AddWorkOrderList;
