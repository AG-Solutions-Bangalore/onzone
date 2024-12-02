import React, { useState, useRef, useEffect, useCallback } from "react";
import Layout from "../../../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import dateyear from "../../../utils/DateYear";
import todayBack from "../../../utils/TodayBack";
import { toast } from "react-toastify";

const AddOrderReceived = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const work_receive = [
    {
      value: "Yes",
      label: "Yes",
    },
    {
      value: "No",
      label: "No",
    },
  ];

  const [workorder, setWorkorder] = useState({
    work_order_rc_year: dateyear || "",
    work_order_rc_date: todayBack || "",
    work_order_rc_factory_no: "",
    work_order_rc_id: "",
    work_order_rc_dc_no: "",
    work_order_rc_dc_date: todayBack || "",
    work_order_rc_brand: "",
    work_order_rc_box: "",
    work_order_rc_pcs: "",
    work_order_rc_received_by: "",
    work_order_rc_fabric_received: "",
    work_order_rc_fabric_count: "",
    work_order_rc_remarks: "",
    work_order_count: "",
  });
  const [work_order_count, setCount] = useState(1);
  const [brand, setBrand] = useState({
    work_order_brand: "",
  });

  const [users, setUsers] = useState([
    { work_order_rc_sub_barcode: "", work_order_rc_sub_box: "" },
  ]);
  const [factory, setFactory] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchFactory = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/fetch-factory`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFactory(response.data?.factory || []);
      } catch (error) {
        console.error("Error fetching Factory data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFactory();
  }, []);

  const fetchWorkOrders = useCallback(async () => {
    if (!workorder.work_order_rc_factory_no) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/fetch-work-order/${workorder?.work_order_rc_factory_no}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWorkOrders(response.data?.workorder || []);
    } catch (error) {
      console.error("Error fetching work order data", error);
    } finally {
      setLoading(false);
    }
  }, [workorder?.work_order_rc_factory_no]);

  useEffect(() => {
    fetchWorkOrders();
  }, [workorder.work_order_rc_factory_no, fetchWorkOrders]);

  const fetchBrand = useCallback(async () => {
    if (!workorder.work_order_rc_id) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/fetch-work-order-brand/${workorder?.work_order_rc_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBrand(response.data?.workorderbrand || []);
    } catch (error) {
      console.error("Error fetching brand in work order data", error);
    } finally {
      setLoading(false);
    }
  }, [workorder?.work_order_rc_id]);
  useEffect(() => {
    fetchBrand();
  }, [workorder.work_order_rc_id, fetchBrand]);



  const onInputChange = (e) => {
    setWorkorder({
      ...workorder,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "work_order_rc_box") {
      const boxCount = parseInt(e.target.value) || 0;

      if (users.length > boxCount) {
        const truncatedUsers = users.slice(0, boxCount);
        setUsers(truncatedUsers);
        setCount(truncatedUsers.length);
      }
    }
  };

  const onChange = (e, index) => {
    const newUsers = [...users];
    newUsers[index].work_order_rc_sub_barcode = e.target.value;
    setUsers(newUsers);
    console.log("onchange", newUsers);
  };

  const addItem = (e) => {
    e.preventDefault();
    const boxCount = parseInt(workorder.work_order_rc_box) || 0;
    if (users.length < boxCount) {
      setUsers([
        ...users,
        { work_order_rc_sub_barcode: "", work_order_rc_sub_box: "" },
      ]);
      setCount(work_order_count + 1);
    }
  };

  const removeUser = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
    setCount(work_order_count - 1);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
  if (!form.checkValidity()) {
    toast.error("Please fill out all required fields correctly.");
    return;
  }
    const data = {
      work_order_rc_year: dateyear,
      work_order_rc_date: workorder.work_order_rc_date,
      work_order_rc_factory_no: workorder.work_order_rc_factory_no,
      work_order_rc_id: workorder.work_order_rc_id,
      work_order_rc_brand: brand.work_order_brand,
      work_order_rc_dc_no: workorder.work_order_rc_dc_no,
      work_order_rc_dc_date: workorder.work_order_rc_dc_date,
      work_order_rc_box: workorder.work_order_rc_box,
      work_order_rc_pcs: workorder.work_order_rc_pcs,
      work_order_rc_fabric_received: workorder.work_order_rc_fabric_received,
      work_order_rc_received_by: workorder.work_order_rc_received_by,
      work_order_rc_fabric_count: workorder.work_order_rc_fabric_count,
      work_order_rc_count: work_order_count,
      work_order_rc_remarks: workorder.work_order_rc_remarks,
      workorder_sub_rc_data: users,
    };
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/create-work-order-received`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.code == "200") {
        toast.success("Add Order Received Successfully");
        navigate("/work-order-receive");
      } else {
        toast.err("error while Creating Order Received")
      }
    } catch (error) {
      console.error("error getting onsumbit add order received".error);
      toast.error("Api Error");
    } finally {
      setLoading(false);
    }
    console.log("Form submitted:", { workorder, users });
  };


  const CheckBarcode = async (e, index) => {
    const inputValue = e.target.value;
  
    
    const cleanedInput = inputValue.replace(/,/g, ""); 
    const formattedInput = cleanedInput.match(/.{1,6}/g)?.join(",") || "";
    const barcodes = formattedInput.split(","); 
    const lastBarcode = barcodes[barcodes.length - 1]; 
  
    if (lastBarcode.length === 6) {
      const workId = workorder.work_order_rc_id;
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${BASE_URL}/api/fetch-work-order-finish-check/${workId}/${lastBarcode}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response?.data?.code == "200") {
          toast.success("Barcode Found");
          const newUsers = [...users];
          newUsers[index].work_order_rc_sub_barcode = formattedInput; 
          setUsers(newUsers);
          const nextIndex = index + 1;
          if (inputRefs.current[nextIndex]) {
            inputRefs.current[nextIndex].focus();
          }
        } else {
          toast.error("Barcode Not Found");
        }
      } catch (error) {
        console.error("Error validating barcode:", error);
        toast.error("Error validating barcode");
      }
    }
    const newUsers = [...users];
    newUsers[index].work_order_rc_sub_barcode = formattedInput; 
    setUsers(newUsers);
  };
  
  
  return (
    <Layout>
      <div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form id="addIndiv" autoComplete="off" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FormControl fullWidth>
                <InputLabel id="service-select-label">
                  <span className="text-sm relative bottom-[6px]">
                    Factory <span className="text-red-700">*</span>
                  </span>
                </InputLabel>
                <Select
                  required
                  sx={{ height: "40px", borderRadius: "5px" }}
                  id="service-select"
                  labelId="service-select-label"
                  name="work_order_rc_factory_no"
                  value={workorder.work_order_rc_factory_no}
                  onChange={onInputChange}
                  label="Factory"
                >
                  {factory.map((factorys, key) => (
                    <MenuItem key={key} value={factorys.factory_no}>
                      {factorys.factory_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="service-select-label">
                  <span className="text-sm relative bottom-[6px]">
                    Work Order ID <span className="text-red-700">*</span>
                  </span>
                </InputLabel>
                <Select
                  required
                  sx={{ height: "40px", borderRadius: "5px" }}
                  labelId="service-select-label"
                  id="service-select"
                  name="work_order_rc_id"
                  value={workorder.work_order_rc_id}
                  onChange={onInputChange}
                  label="Work Order ID"
                >
                  {workOrders.map((workOrder, key) => (
                    <MenuItem key={key} value={workOrder.work_order_no}>
                      {workOrder.work_order_no}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div className="w-full">
                <Input
                  type="date"
                  label="Receive Date"
                  name="work_order_rc_date"
                  value={workorder.work_order_rc_date}
                  onChange={onInputChange}
                  className="w-full"
                />
              </div>

              <div className="w-full">
                <Input
                  label="DC No"
                  name="work_order_rc_dc_no"
                  value={workorder.work_order_rc_dc_no}
                  onChange={onInputChange}
                  className="w-full"
                />
              </div>

              <div className="w-full">
                <Input
                  type="date"
                  label="DC Date"
                  name="work_order_rc_dc_date"
                  value={workorder.work_order_rc_dc_date}
                  onChange={onInputChange}
                  className="w-full"
                />
              </div>

              <div className="w-full">
                <Input
                  disabled
                  required
                  labelProps={{
                    className:"!text-gray-700"
                  }}
                  label="Brand"
                  name="work_order_rc_brand"
                  value={brand.work_order_brand || ""}
                  onChange={onInputChange}
                  className="w-full"
                />
              </div>

              <div className="w-full">
                <Input
                  required
                  type="number"
                  label="No of Box"
                  name="work_order_rc_box"
                  value={workorder.work_order_rc_box}
                  onChange={onInputChange}
                  className="w-full"
                  min={0}
                  step={1}
                />
              </div>

              <div className="w-full">
                <Input
                  required
                  label="Total No of Pcs"
                  name="work_order_rc_pcs"
                  value={workorder.work_order_rc_pcs}
                  onChange={onInputChange}
                  className="w-full"
                />
              </div>

              <FormControl fullWidth>
                <InputLabel id="service-select-label">
                  <span className="text-sm relative bottom-[6px]">
                    Fabric Received <span className="text-red-700">*</span>
                  </span>
                </InputLabel>
                <Select
                  required
                  sx={{ height: "40px", borderRadius: "5px" }}
                  labelId="service-select-label"
                  id="service-select"
                  name="work_order_rc_fabric_received"
                  value={workorder.work_order_rc_fabric_received}
                  onChange={onInputChange}
                  label="Fabric Received"
                >
                  {work_receive.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {workorder.work_order_rc_fabric_received == "Yes" && (
                <div className="w-full">
                  <Input
                    label="Fabric Received By"
                    name="work_order_rc_received_by"
                    value={workorder.work_order_rc_received_by}
                    onChange={onInputChange}
                    className="w-full"
                  />
                </div>
              )}

              <div
                className={`w-full  ${
                  workorder.work_order_rc_fabric_received === "Yes"
                    ? "lg:col-span-2"
                    : "lg:col-span-1"
                } `}
              >
                <Input
                  
                  label="Fabric Leftover"
                  name="work_order_rc_fabric_count"
                  value={workorder.work_order_rc_fabric_count}
                  onChange={onInputChange}
                  className="w-full"
                />
              </div>

              <div
                className={`lg:col-span-2 ${
                  workorder.work_order_rc_fabric_received === "Yes"
                    ? "lg:col-span-4"
                    : "lg:col-span-2"
                }`}
              >
                <Input
                  label="Remarks"
                  name="work_order_rc_remarks"
                  value={workorder.work_order_rc_remarks}
                  onChange={onInputChange}
                  className="w-full"
                />
              </div>
            </div>

            <hr className="my-2" />
            <p className="text-sm">Total Barcode Count:</p>
            {users.map((user, index) => (
              <div key={index} className="flex gap-4 items-center">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="col-span-1">
                    <Input
                      required
                      label="Box"
                      name="work_order_rc_sub_box"
                      value={user.work_order_rc_sub_box}
                      onChange={(e) => {
                        const newUsers = [...users];
                        newUsers[index].work_order_rc_sub_box = e.target.value; 
                        setUsers(newUsers)
                      }}
                    />
                  </div>

                  <div className="flex flex-row col-span-3 ">
                    <Input
                      required
                      inputRef={(ref) => {
                        inputRefs.current[index] = ref;
                      }}
                      label="T Code"
                      name="work_order_rc_sub_barcode"
                      value={user.work_order_rc_sub_barcode}
                      onChange={(e) => {
                        onChange(e, index);
                        CheckBarcode(e, index);
                      }}
                    />
                  </div>
                </div>
                <IconButton
                  onClick={() => removeUser(index)}
                  className="flex-shrink-0"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}

            <div className="mt-6">
              <Button
                variant="contained"
                color="primary"
                className="w-36"
                onClick={addItem}
                disabled={
                  !workorder.work_order_rc_box ||
                  users.length >= (parseInt(workorder.work_order_rc_box) || 0)
                }
              >
                + New Box
              </Button>
            </div>
          </form>
          <div className="flex gap-4 mt-5">
            <Button
              onClick={onSubmit}
              variant="contained"
              color="primary"
              disabled={isButtonDisabled}
              className="px-6 py-2"
            >
              Submit
            </Button>
            <Link to="/work-order-receive">
              <Button variant="contained" color="success" className="px-6 py-2">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddOrderReceived;
