import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { MdSend, MdArrowBack } from "react-icons/md";
import { toast } from "react-toastify";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { Button, IconButton, Input, Textarea } from "@material-tailwind/react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { ContextPanel } from "../../utils/ContextPanel";
const EditWorkOrder = () => {
  const { id } = useParams();
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [workorder, setWorkOrder] = useState({
    work_order_factory: "",
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

  const useTemplate = {
    work_order_sub_id: "",
    work_order_sub_barcode: "",
    work_order_sub_selection_id: "",
    work_order_sub_36_h: "",
    work_order_sub_38_h: "",
    work_order_sub_40_h: "",
    work_order_sub_42_h: "",
    work_order_sub_44_h: "",
    work_order_sub_46_h: "",
    work_order_sub_48_h: "",
    work_order_sub_50_h: "",
    work_order_sub_a: "",
    work_order_sub_b: "",
    work_order_sub_c: "",
    work_order_sub_length: "",
    work_order_sub_half_shirt: "",
    work_order_sub_full_shirt: "",
  };
  const [users, setUsers] = useState([useTemplate]);

  const onChange = (e, index) => {
    const updatedUsers = users.map((user, i) =>
      index == i
        ? Object.assign(user, { [e.target.name]: e.target.value })
        : user
    );
    setUsers(updatedUsers);
  };

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

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

  const ratioValue = workorder.work_order_ratio_h;

  const HalfA = (selectedValue) => {
    const newValue = halfRatio.find((item) => item.ratio_range === ratioValue);

    if (newValue.ratio_group == "ab") {
      const tempUsers = [...users];
      const str = newValue.ratio_type;
      const firstNumber = str.charAt(8);

      tempUsers[selectedValue].work_order_sub_38_h =
        tempUsers[selectedValue].work_order_sub_a;
      tempUsers[selectedValue].work_order_sub_44_h =
        tempUsers[selectedValue].work_order_sub_a * firstNumber;
      tempUsers[selectedValue].work_order_sub_half_shirt = (
        parseInt(tempUsers[selectedValue].work_order_sub_38_h) +
        parseInt(tempUsers[selectedValue].work_order_sub_40_h) +
        parseInt(tempUsers[selectedValue].work_order_sub_42_h) +
        parseInt(tempUsers[selectedValue].work_order_sub_44_h)
      ).toFixed(2);
      tempUsers[selectedValue].work_order_sub_full_shirt = (
        tempUsers[selectedValue].work_order_sub_length -
        (parseInt(tempUsers[selectedValue].work_order_sub_38_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_40_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_42_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_44_h)) *
          workorder.work_order_ratio_h_consumption
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
    } else {
      const tempUsers = [...users];
      const str = newValue.ratio_type;
      const firstNumber = str.match(/[0-9]+/);
      const secondNumber = str.charAt(5);

      tempUsers[selectedValue].work_order_sub_38_h =
        tempUsers[selectedValue].work_order_sub_a;
      tempUsers[selectedValue].work_order_sub_40_h =
        tempUsers[selectedValue].work_order_sub_a * firstNumber;
      tempUsers[selectedValue].work_order_sub_42_h =
        tempUsers[selectedValue].work_order_sub_a * secondNumber;
      tempUsers[selectedValue].work_order_sub_44_h =
        tempUsers[selectedValue].work_order_sub_a;
      tempUsers[selectedValue].work_order_sub_half_shirt = (
        parseInt(tempUsers[selectedValue].work_order_sub_38_h) +
        parseInt(tempUsers[selectedValue].work_order_sub_40_h) +
        parseInt(tempUsers[selectedValue].work_order_sub_42_h) +
        parseInt(tempUsers[selectedValue].work_order_sub_44_h)
      ).toFixed(2);
      tempUsers[selectedValue].work_order_sub_full_shirt = (
        tempUsers[selectedValue].work_order_sub_length -
        (parseInt(tempUsers[selectedValue].work_order_sub_38_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_40_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_42_h) +
          parseInt(tempUsers[selectedValue].work_order_sub_44_h)) *
          workorder.work_order_ratio_h_consumption
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
    }
  };

  const HalfB = (selectedValue) => {
    const newValue = halfRatio.find((item) => item.ratio_range === ratioValue);
    if (newValue.ratio_group == "ab") {
      const tempUsers = [...users];
      const str = newValue.ratio_type;

      let firstNumber = str.charAt(2);
      if (!isNaN(firstNumber)) {
      } else {
        firstNumber = 1;
      }
      let secondNumber = str.charAt(5);
      if (!isNaN(secondNumber)) {
      } else {
        secondNumber = 1;
      }

      tempUsers[selectedValue].work_order_sub_40_h =
        tempUsers[selectedValue].work_order_sub_b * firstNumber;
      tempUsers[selectedValue].work_order_sub_42_h =
        tempUsers[selectedValue].work_order_sub_b * secondNumber;
      tempUsers[selectedValue].work_order_sub_half_shirt = (
        parseInt(tempUsers[selectedValue].work_order_sub_38_h) +
        parseInt(tempUsers[selectedValue].work_order_sub_40_h) +
        parseInt(tempUsers[selectedValue].work_order_sub_42_h) +
        parseInt(tempUsers[selectedValue].work_order_sub_44_h)
      ).toFixed(2);
      tempUsers[selectedValue].work_order_sub_full_shirt = (
        (tempUsers[selectedValue].work_order_sub_length -
          (parseInt(tempUsers[selectedValue].work_order_sub_38_h) +
            parseInt(tempUsers[selectedValue].work_order_sub_40_h) +
            parseInt(tempUsers[selectedValue].work_order_sub_42_h) +
            parseInt(tempUsers[selectedValue].work_order_sub_44_h)) *
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
    }
  };

  const fetchData = async () => {
    try {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/fetch-work-order-by-id/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setWorkOrder(response.data.workorder);
      setUsers(response.data.workordersub);
    } catch (error) {
      console.error(`Error fetching data from ${url}`, error);
    } finally {
      setLoading(false);
    }
  };
  const [halfRatio, setHalfRatio] = useState([]);
  const fetchRatioData = async () => {
    try {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/fetch-half-ratio`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHalfRatio(response.data.half_ratio);
    } catch (error) {
      console.error(`Error fetching data from ${url}`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchRatioData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    const data = {
        work_order_brand: workorder.work_order_brand ,
        work_order_style_type: workorder.work_order_style_type,
        work_order_width: workorder.work_order_width,
        workorder_sub_data: users,
        work_order_count:workorder.work_order_count,
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
      url: BASE_URL + "/api/update-work-orders-new/" +id,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == "200") {
        toast.success("Work Order Updated succesfull");
       
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
          Update Work Order
        </h3>
      </div>
      <div className="w-full p-4 mt-2 bg-white shadow-lg rounded-xl">
        <form id="addIndiv" autoComplete="off"  onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
            <div>
              <Input
                label="Factory"
                type="text"
                required
                disabled
                labelProps={{
                  className: "!text-gray-600   ",
                }}
                name="work_order_factory"
                value={workorder.work_order_factory}
                onChange={(e) => onInputChange(e)}
                className="w-full px-4 py-3 border border-gray-400 rounded-md  transition-all"
              />
            </div>

            <div>
              <Input
                label="Brand"
                type="text"
                required
                disabled
                labelProps={{
                  className: "!text-gray-600   ",
                }}
                name="work_order_brand"
                value={workorder.work_order_brand}
                onChange={(e) => onInputChange(e)}
                className="w-full px-4 py-3 border border-gray-400 rounded-md  transition-all"
              />
            </div>

            <div>
              <Input
                label="Style Type"
                type="text"
                required
                disabled
                labelProps={{
                  className: "!text-gray-600   ",
                }}
                name="work_order_style_type"
                value={workorder.work_order_style_type}
                onChange={(e) => onInputChange(e)}
                className="w-full px-4 py-3 border border-gray-400 rounded-md  transition-all"
              />
            </div>
            <div>
              <Input
                label="Width"
                type="text"
                required
                disabled
                labelProps={{
                  className: "!text-gray-600   ",
                }}
                name="work_order_width"
                value={workorder.work_order_width}
                onChange={(e) => onInputChange(e)}
                className="w-full px-4 py-3 border border-gray-400 rounded-md  transition-all"
              />
            </div>
            <div>
              <Input
                label="Half Ratio"
                type="text"
                required
                disabled
                labelProps={{
                  className: "!text-gray-600   ",
                }}
                name="work_order_ratio_h"
                value={workorder.work_order_ratio_h}
                onChange={(e) => onInputChange(e)}
                className="w-full px-4 py-3 border border-gray-400 rounded-md  transition-all"
              />
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
              <Input
                label="Ratio"
                type="tel"
                required
                disabled
                labelProps={{
                  className: "!text-gray-600   ",
                }}
                name="work_order_ratio"
                value={workorder.work_order_ratio}
                onChange={(e) => onInputChange(e)}
                className="w-full px-4 py-3 border border-gray-400 rounded-md  transition-all"
              />
            </div>

            <div>
              <Input
                label="Full Consumption"
                type="tel"
                required
                name="work_order_ratio_consumption"
                value={workorder.work_order_ratio_consumption}
                onChange={(e) => onInputChange(e)}
                className="w-full px-4 py-3 border border-gray-400 rounded-md  transition-all"
              />
            </div>

            {/* Remarks Field */}
            <div className="col-span-4">
              <Input
                label="Remarks"
                required
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
                        disabled
                        name="work_order_sub_barcode"
                        value={user.work_order_sub_barcode}
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
                        disabled
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
                          onChange(e, index), HalfA(index);
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
                        onChange={(e) => onChange(e, index)}
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
                        disabled
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
                        disabled
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
                </div>
              </div>
            ))}
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
                <span>{isButtonDisabled ? "Updating..." : "Update"}</span>
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

export default EditWorkOrder;
