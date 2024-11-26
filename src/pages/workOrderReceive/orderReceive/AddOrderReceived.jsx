import React, { useState, useRef, useEffect } from 'react'
import Layout from '../../../layout/Layout'
import WorkOrderRecieveFilter from '../../../components/WorkOrderRecieveFilter'
import { Link } from 'react-router-dom';
import { Input } from "@material-tailwind/react";
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Button,
  IconButton 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import BASE_URL from '../../../base/BaseUrl';
const AddOrderReceived = () => {
    const inputRefs = useRef([]);

  
  const work_receive = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  const [workorder, setWorkorder] = useState({
    work_order_rc_factory_no: '',
    work_order_rc_id: '',
    work_order_rc_date: '',
    work_order_rc_dc_no: '',
    work_order_rc_dc_date: '',
    work_order_rc_brand: '',
    work_order_rc_box: '',
    work_order_rc_pcs: '',
    work_order_rc_received_by: '',
    work_order_rc_fabric_received: '',
    work_order_rc_remarks: ''
  });

  const [brand, setBrand] = useState({
    work_order_brand: ''
  });

  const [users, setUsers] = useState([
    { work_order_rc_sub_barcode: '' }
  ]);
  const [factory, setFactory] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  const fetchFactory = async () => {
    try {
    
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/fetch-factory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFactory(response.data?.factory);
    } catch (error) {
      console.error("Error fetching Factory data", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchWorkOrders = async () => {
    try {
    
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/fetch-work-order/${workorder.work_order_rc_factory_no}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWorkOrders(response.data?.workorder);
    } catch (error) {
      console.error("Error fetching Factory data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchFactory()
    fetchWorkOrders()
  },[])



  const onInputChange = (e) => {
    setWorkorder({
      ...workorder,
      [e.target.name]: e.target.value
    });
  };

  const onChange = (e, index) => {
    const newUsers = [...users];
    newUsers[index].work_order_rc_sub_barcode = e.target.value;
    setUsers(newUsers);
  };

  const addItem = (e) => {
    e.preventDefault();
    setUsers([...users, { work_order_rc_sub_barcode: '' }]);
  };

  const removeUser = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
    console.log('Form submitted:', { workorder, users });
  };

  const CheckBarcode = (e, index) => {
    // Add your barcode checking logic here
    console.log('Checking barcode:', e.target.value, 'at index:', index);
  };
  return (
    <Layout>
        <WorkOrderRecieveFilter/>
        <div className="p-6">
   
      <div className="flex mb-4 flex-col md:flex-row justify-between items-center bg-white mt-2 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
        Create Work Order Receive
        </h3>
        <div className="flex gap-4 mb-6">
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          disabled={isButtonDisabled}
          className="px-6 py-2"
        >
          Submit
        </Button>
        <Link to="listing">
          <Button variant="contained" color="success" className="px-6 py-2">
            Cancel
          </Button>
        </Link>
      </div>
      </div>
      

      <div className="bg-white rounded-lg shadow-lg p-6">
        <form id="addIndiv" autoComplete="off" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormControl fullWidth >
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
                label="Brand"
                name="work_order_rc_brand"
                value={brand.work_order_brand}
                onChange={onInputChange}
                className="w-full"
              />
            </div>

            <div className="w-full">
              <Input
                required
                label="No of Box"
                name="work_order_rc_box"
                value={workorder.work_order_rc_box}
                onChange={onInputChange}
                className="w-full"
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

            <div className="w-full">
              <Input
                required
                label="Fabric Received By"
                name="work_order_rc_received_by"
                value={workorder.work_order_rc_received_by}
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

            <div className="col-span-2">
              <Input
                label="Remarks"
                name="work_order_rc_remarks"
                value={workorder.work_order_rc_remarks}
                onChange={onInputChange}
                className="w-full"
              />
            </div>
          </div>

          <hr className="my-6" />

          {users.map((user, index) => (
            <div key={index} className="flex gap-4 items-center">
              <div className="flex-1">
                <Input
                  required
                  inputRef={(ref) => (inputRefs.current[index] = ref)}
                  label="T Code"
                  name="work_order_rc_sub_barcode"
                  value={user.work_order_rc_sub_barcode}
                  onChange={(e) => {
                    onChange(e, index);
                    CheckBarcode(e, index);
                  }}
                  className="w-full"
                />
              </div>
              <IconButton onClick={() => removeUser(index)} className="flex-shrink-0">
                <DeleteIcon />
              </IconButton>
            </div>
          ))}

          <div className="mt-6">
            <Button
              variant="contained"
              color="primary"
              className="w-24"
              onClick={addItem}
            >
              Add More
            </Button>
          </div>
        </form>
      </div>
    </div>
    </Layout>
  )
}

export default AddOrderReceived