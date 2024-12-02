import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../layout/Layout";
import WorkOrderRecieveFilter from "../../../components/WorkOrderRecieveFilter";
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
import dateyear from "../../../utils/DateYear";
import todayBack from "../../../utils/TodayBack";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { toast } from "react-toastify";
const AddWorkOrderSales = () => {
  const inputRefs = useRef([]);
  const navigate = useNavigate()
  const [retailer, setRetailer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [workorder, setWorkorder] = useState({
    work_order_sa_year: dateyear || "",
    work_order_sa_date: todayBack || "",
    work_order_sa_retailer_id: "",
    work_order_sa_dc_no: "",
    work_order_sa_dc_date: todayBack || "",
    work_order_sa_box: "",
    work_order_sa_pcs: "",
    work_order_sa_fabric_sale: "",
    work_order_sa_count: "",
    work_order_sa_remarks: "",
    workorder_sub_sa_data: "",
  });
  const [work_order_count, setCount] = useState(1);

  const [users, setUsers] = useState([{ work_order_sa_sub_barcode: "" }]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onInputChange = (e) => {
    setWorkorder({
      ...workorder,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "work_order_sa_pcs") {
      const boxCount = parseInt(value) || 0;

      if (users.length > boxCount) {
        const truncatedUsers = users.slice(0, boxCount);
        setUsers(truncatedUsers);
        setCount(truncatedUsers.length);
      }
    }
  };

  const onChange = (e, index) => {
    const newUsers = [...users];
    newUsers[index].work_order_sa_sub_barcode = e.target.value.toUpperCase();;
    setUsers(newUsers);
  };

  useEffect(() => {
    const fetchRetailer = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/fetch-customer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRetailer(response.data?.customer || []);
      } catch (error) {
        console.error("Error fetching retailer data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRetailer();
  }, []);

  const addItem = (e) => {
    e.preventDefault();
  
    const boxCount = parseInt(workorder.work_order_sa_pcs) || 0;
    if (users.length < boxCount) {
      const newUsers = [...users, { work_order_sa_sub_barcode: "" }];
      setUsers(newUsers);
      setCount(work_order_count + 1);
      
      // Focus on the newly added input
      const newIndex = newUsers.length - 1;
      if (inputRefs.current[newIndex]) {
        inputRefs.current[newIndex].focus();
      }
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
      work_order_sa_year: dateyear,
      work_order_sa_date: workorder.work_order_sa_date,
      work_order_sa_retailer_id: workorder.work_order_sa_retailer_id,
      work_order_sa_dc_no: workorder.work_order_sa_dc_no,
      work_order_sa_dc_date: workorder.work_order_sa_dc_date,
      work_order_sa_box: workorder.work_order_sa_box,
      work_order_sa_pcs: workorder.work_order_sa_pcs,
      work_order_sa_fabric_sale: workorder.work_order_sa_fabric_sale,
      work_order_sa_count: work_order_count,
      work_order_sa_remarks: workorder.work_order_sa_remarks,
      workorder_sub_sa_data: users,
    };
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/create-work-order-sales`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.code == "200") {
        toast.success("Created Sales order Successfully");
        navigate("/work-order-sales");
      } else {
        toast.error("error while Creating Sales order");
      }
    } catch (error) {
      console.error("error getting onsumbit add order received",error);
      toast.error("Api Error");
    } finally {
      setLoading(false);
    }
    console.log("Form submitted:", { workorder, users });
  };

  const CheckBarcode = async (e, index) => {
    const barcodeId = e.target.value;
    if (barcodeId.length === 6) {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/fetch-work-order-receive-check/${barcodeId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.code == "200") {
        if (work_order_count < parseInt(workorder.work_order_sa_pcs)) {
          const newUsers = [...users, { work_order_sa_sub_barcode: "" }];
          setUsers(newUsers);
          setCount(work_order_count + 1);
          toast.success("Barcode Found");
          setTimeout(() => {
            const nextIndex = index + 1;
            if (inputRefs.current[nextIndex]) {
              inputRefs.current[nextIndex].focus();
            }
          }, 0);
        }
      } else {
        toast.error("Barcode Not Found");
      }
    }
  };
  return (
    <Layout>
     
      <div >
        <div className="flex mb-4 flex-col md:flex-row justify-between items-center bg-white p-2 rounded-lg space-y-4 md:space-y-0">
          <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
            Create Work Order Sales
          </h3>
          
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <form id="addIndiv" autoComplete="off" className="space-y-6">
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div>
             <FormControl fullWidth >
                <InputLabel id="service-select-label">
                  <span className="text-sm relative bottom-[6px]">
                    Retailers <span className="text-red-700">*</span>
                  </span>
                </InputLabel>
                <Select
                  required
                  sx={{ height: "40px", borderRadius: "5px" }}
                  labelId="service-select-label"
                  id="service-select"
                  name="work_order_sa_retailer_id"
                  value={workorder.work_order_sa_retailer_id}
                  onChange={onInputChange}
                  label="Retailers"
                >
                  {retailer.map((retailers, key) => (
                    <MenuItem key={key} value={retailers.id}>
                      {retailers.customer_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
             </div>

              <div className="w-full">
                <Input
                  type="date"
                  label="Sales Date"
                  name="work_order_sa_date"
                  value={workorder.work_order_sa_date}
                  onChange={onInputChange}
                  className="w-full"
                />
              </div>

              <div className="w-full">
                <Input
                  required
                  label="Total No of Pcs"
                  name="work_order_sa_pcs"
                  value={workorder.work_order_sa_pcs}
                  onChange={onInputChange}
                  className="w-full"
                />
              </div>

              <div className="w-full">
                <Input
                  label="DC No"
                  name="work_order_sa_dc_no"
                  value={workorder.work_order_sa_dc_no}
                  onChange={onInputChange}
                  className="w-full"
                />
              </div>

              <div className="w-full">
                <Input
                  type="date"
                  label="DC Date"
                  name="work_order_sa_dc_date"
                  value={workorder.work_order_sa_dc_date}
                  onChange={onInputChange}
                  className="w-full"
                />
              </div>

              <div className="w-full hidden">
                <Input
                
                  label="No of Box"
                  name="work_order_sa_box"
                  value={workorder.work_order_sa_box}
                  onChange={onInputChange}
                  className="w-full"
                />
              </div>

              

              <div className="w-full">
                <Input
                 
                  label="Fabric Sales"
                  name="work_order_sa_fabric_sale"
                  value={workorder.work_order_sa_fabric_sale}
                  onChange={onInputChange}
                  className="w-full"
                />
              </div>

              <div className=" lg:col-span-3">
                <Input
                  label="Remarks"
                  name="work_order_sa_remarks"
                  value={workorder.work_order_sa_remarks}
                  onChange={onInputChange}
                  className="w-full"
                />
              </div>
            </div>

            <hr className="my-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {users.map((user, index) => (
              <div key={index} className="flex flex-row justify-start w-48 gap-4 items-center">
                <div className="flex-1">
                  <Input
                    required
                    inputRef={(ref) => (inputRefs.current[index] = ref)}
                    label="T Code"
                    name="work_order_sa_sub_barcode"
                    value={user.work_order_sa_sub_barcode}
                    onChange={(e) => {
                      onChange(e, index);
                      CheckBarcode(e, index);
                    }}
                    className="w-full"
                  />
                </div>
                <IconButton
                  onClick={() => removeUser(index)}
                  className="flex-shrink-0"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
</div>
            <div className="mt-6">
              <Button
                variant="contained"
                color="primary"
                className="w-36"
                onClick={addItem}
                disabled={
                  !workorder.work_order_sa_pcs ||
                  users.length >= (parseInt(workorder.work_order_sa_pcs) || 0)
                }
              >
                +T Code
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
            <Link to="/work-order-sales">
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

export default AddWorkOrderSales;
