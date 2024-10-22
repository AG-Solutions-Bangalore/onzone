import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { ContextPanel } from '../../utils/ContextPanel';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../../base/BaseUrl';
import axios from 'axios';
import { FaArrowAltCircleRight, FaDownload, FaEdit, FaEye, FaRegFilePdf, FaStreetView } from 'react-icons/fa';
import MUIDataTable from 'mui-datatables';
import { CiEdit } from 'react-icons/ci';
import { IoDownloadOutline, IoEyeOutline } from 'react-icons/io5';
import { IoIosArrowDropright } from 'react-icons/io';
import Moment from "moment";
import { Button, IconButton } from '@mui/material';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

const WorkOrderList = () => {
    const [workOrderData, setWorkOrderData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isPanelUp } = useContext(ContextPanel);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchWorkOrderData = async () => {
        try {
          if (!isPanelUp) {
            navigate("/maintenance");
            return;
          }
          setLoading(true);
          const token = localStorage.getItem("token");
          const response = await axios.get(`${BASE_URL}/api/fetch-work-order-list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setWorkOrderData(response.data?.workorder);
        } catch (error) {
          console.error("Error fetching work order data", error);
        } finally {
          setLoading(false);
        }
      };
      fetchWorkOrderData();
      setLoading(false);
    }, []);

   const  updateData = (e,id) => {
      e.preventDefault();
      let data = {
        workorder_id:id,
      };
      axios({
        url: BASE_URL+"/api/download-work-order-barcode-report-new",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'workorder_barcode.csv');
        document.body.appendChild(link);
        link.click();
        toast.success("Excel Download Sucessfully");
        
        
        
      })
    };


    const handleDelete = async (e, id) => {
      e.preventDefault();
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios({
          url: BASE_URL + "/api/delete-half-work-order/" + id, 
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.code == "200") {
          toast.success("Work Order Deleted Succesfully")
          setWorkOrderData((prevUserListData) => 
            prevUserListData.filter((user) => user.id !== id && user.work_order_status === user.work_order_status)
          );
         
        } else {
          toast.error("Errro occur while delete the Work Order ");
        }
      } catch (error) {
        console.error("Error Work Order delete data", error);
        toast.error("Error Work Order delete data");
      } finally {
        setLoading(false);
      }
    };
  
    const columns = [
      {
        name: "slNo",
        label: "SL No",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            return tableMeta.rowIndex + 1;
          },
        },
      },
      
  
      {
        name: "work_order_no",
        label: "Work Order No",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "work_order_date",
        label: "Date",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value) => {
            return Moment(value).format("DD-MM-YYYY");
          },
        },
      },
      {
        name: "work_order_factory",
        label: "Factory",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "work_order_brand",
        label: "Brand",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "work_order_count",
        label: "Total",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "total_receive",
        label: "Receive",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "work_order_status",
        label: "Status",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "id",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (id,tableMeta) => {
            const workOrderStatus = tableMeta.rowData[7]
            return (
              <div
               
                className="flex items-center space-x-2"
              >
                <CiEdit  onClick={() => navigate(`/work-order-edit/${id}`)} title="Edit" className="h-5 w-5 cursor-pointer " />
                    <IoEyeOutline 
                    onClick={() => navigate(`/work-view/${id}`)} title="view"
                    className='h-5 w-5 cursor-pointer '/>
                    <IoDownloadOutline
                    onClick={(e) => updateData(e,id)} title="Download Barcode"
                    className='h-5 w-5 cursor-pointer '/>
                    {workOrderStatus !== "Received" && (
              <IoIosArrowDropright
                onClick={() => navigate(`/work-order-view/${id}`)}
                title="Work Order View"
                className="h-5 w-5 cursor-pointer "
              />
            )}
             <MdDeleteOutline onClick={(e) => handleDelete(e,id)} title="Delete" className="h-5 w-5 cursor-pointer hover:text-red-500" />
              </div>
            );
          },
        },
      },
    ];
    const options = {
      selectableRows: "none",
      elevation: 0,
   
      responsive: "standard",
      viewColumns: true,
      download: false,
      print: false,
      customToolbar: () => {
        return (
            <Link
          to="/add-work-order"
          title='Add Work Order'
          className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md"
        >
          + New
        </Link>
         
        );
      },
      
    };
  return (
   <Layout>
 
      <div >
        <MUIDataTable
        title=" Work Order List"
          data={workOrderData ? workOrderData : []}
          columns={columns}
          options={options}
        />
      </div>
   </Layout>
  )
}

export default WorkOrderList