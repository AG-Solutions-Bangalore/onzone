import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Input, 
  Button 
} from "@material-tailwind/react";
import { 
  FormControl, 
  InputLabel, 
  Select as MUISelect, 
  MenuItem, 
  TextField
} from "@mui/material";
import axios from 'axios';
import { useParams } from 'react-router-dom'
import WorkOrderRecieveFilter from '../../../components/WorkOrderRecieveFilter'
import Layout from '../../../layout/Layout'
import BASE_URL from '../../../base/BaseUrl';
import { toast } from 'react-toastify';

const EditOrderSales = () => {
    const {id} = useParams()
    const navigate = useNavigate();
  
    const [loading, setLoading] = useState(false);
    const [workorder, setWorkOrderSales] = useState({
      work_order_sa_date: "",
      work_order_sa_retailer_id: "",
      work_order_sa_dc_no: "",
      work_order_sa_dc_date: "",
      work_order_sa_retailer_name: "",
      work_order_sa_box: "",
      work_order_sa_pcs: "",
      work_order_sa_fabric_sale: "",
      work_order_sa_count: "",
      work_order_sa_remarks: "",
    });
  
    const useTemplate = { id: "", work_order_sa_sub_barcode: "" };
    const [users, setUsers] = useState([useTemplate]);
  
    const validateOnlyDigits = (inputtxt) => {
      const phoneno = /^\d+$/;
      return phoneno.test(inputtxt) || inputtxt.length === 0;
    };
  
    const onInputChange = (e) => {
      const { name, value } = e.target;
      
      if (name === "work_order_sa_box" || name === "work_order_sa_pcs") {
        if (validateOnlyDigits(value)) {
          setWorkOrderSales(prev => ({
            ...prev,
            [name]: value,
          }));
        }
      } else {
        setWorkOrderSales(prev => ({
          ...prev,
          [name]: value,
        }));
      }
    };
  
    const onChange = (e, index) => {
      const { name, value } = e.target;
      setUsers(prev => 
        prev.map((user, i) => 
          i === index 
            ? { ...user, [name]: value }
            : user
        )
      );
    };


    useEffect(() => {
        const fetchEditSales = async () => {
          try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/api/fetch-work-order-sales-by-id/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            setWorkOrderSales(response.data.workordersales || []);
            setUsers(response.data.workordersalessub || []);
          } catch (error) {
            console.error("Error fetching edit sales data", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchEditSales();
      }, []);
  
      
const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
        work_order_sa_dc_no: workorder.work_order_sa_dc_no ,
        work_order_sa_dc_date: workorder.work_order_sa_dc_date,
        work_order_sa_box: workorder.work_order_sa_box,
        work_order_sa_pcs: workorder.work_order_sa_pcs,
        work_order_sa_fabric_sale: workorder.work_order_sa_fabric_sale,
        work_order_sa_remarks:workorder.work_order_sa_remarks,
        workorder_sub_sa_data: users,
        work_order_sa_count:workorder.work_order_sa_count,
    };
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/update-work-orders-sales/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.code == "200") {
        toast.success("Work Order Sales Updated Sucessfully");
        navigate("/work-order-sales");
      } else {
        toast.error("error while edit Sales order");
      }
    } catch (error) {
      console.error("error getting onsumbit add order received",error);
      toast.error("Api Error");
    } finally {
      setLoading(false);
    }

  };
    
  return (
    <Layout>
           
            
             <div >
     
      <div className="flex mb-4 flex-col md:flex-row justify-between items-center bg-white  p-2 rounded-lg space-y-4 md:space-y-0">
          <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Update Work Order Sales
          </h3>
          
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Retailers"
            disabled
            name="work_order_sa_retailer_name"
            value={workorder.work_order_sa_retailer_name}
            onChange={onInputChange}
            labelProps={{className:'!text-gray-700'}}
          />
          
          <Input
            type="date"
            label="Sales Date"
            disabled
            name="work_order_sa_date"
            labelProps={{className:'!text-gray-700'}}
            value={workorder.work_order_sa_date}
            onChange={onInputChange}
          />
          
          <Input
            label="DC No"
            name="work_order_sa_dc_no"
            value={workorder.work_order_sa_dc_no}
            onChange={onInputChange}
          />
          
          <Input
            type="date"
            label="DC Date"
            name="work_order_sa_dc_date"
            value={workorder.work_order_sa_dc_date}
            onChange={onInputChange}
          />
          
         <div className='hidden'>
         <Input
            label="No of Box"
            name="work_order_sa_box"
            value={workorder.work_order_sa_box}
            onChange={onInputChange}
          />
         </div>
          
          <Input
            label="Total No of Pcs"
            name="work_order_sa_pcs"
            value={workorder.work_order_sa_pcs}
            onChange={onInputChange}
          />
          <Input
          label="Fabric Sales"
          name="work_order_sa_fabric_sale"
          value={workorder.work_order_sa_fabric_sale}
          onChange={onInputChange}
          />
          
         
         <div className=' lg:col-span-3'>
             
          <Input
            label="Remarks"
            name="work_order_sa_remarks"
            value={workorder.work_order_sa_remarks}
            onChange={onInputChange}
            className="col-span-full"
          />
         </div>
        </div>

        <hr className="my-4" />

        {users.map((user, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <TextField
              hidden
            sx={{
                display:'none'
            }}
              name="id"
              value={user.id}
              onChange={(e) => onChange(e, index)}
            />
            <Input
              label="T Code"
              name="work_order_sa_sub_barcode"
              value={user.work_order_sa_sub_barcode}
              onChange={(e) => onChange(e, index)}
            />
          </div>
        ))}

        <div className="flex justify-center space-x-4 mt-6">
          <Button type="submit" color="blue">
            Update
          </Button>
          <Button color="green" onClick={() => navigate("/work-order-sales")}>
            Back
          </Button>
        </div>
      </form>
      </div>
    </div>
    </Layout>
 
  )
}

export default EditOrderSales




  