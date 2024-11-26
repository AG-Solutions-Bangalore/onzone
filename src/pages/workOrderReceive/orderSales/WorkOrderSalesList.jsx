import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../../layout/Layout';
import WorkOrderRecieveFilter from '../../../components/WorkOrderRecieveFilter';
import MUIDataTable from 'mui-datatables';
import { Link, useNavigate } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { FaEye } from 'react-icons/fa';
import { ContextPanel } from '../../../utils/ContextPanel';
import axios from 'axios';
import BASE_URL from '../../../base/BaseUrl';
import moment from 'moment';

const WorkOrderSalesList = () => {
    const [orderReceivedData, setOrderReceivedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const {isPanelUp,userType} = useContext(ContextPanel)
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchFactoryData = async () => {
        try {
        
          setLoading(true);
          const token = localStorage.getItem("token");
          const response = await axios.get(`${BASE_URL}/api/fetch-work-order-sales-list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setOrderReceivedData(response.data?.workordersales);
        } catch (error) {
          console.error("Error fetching Factory data", error);
        } finally {
          setLoading(false);
        }
      };
      fetchFactoryData();
      setLoading(false);
    }, []);
  
  
   
  
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
        name: "work_order_sa_no",
        label: "Work Order Sales No",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "work_order_sa_date",
        label: "Date",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value) => {
            return moment(value).format("DD-MM-YYYY");
          },
        },
      },
      {
        name: "work_order_sa_retailer_name",
        label: "Retailer",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "work_order_sa_dc_no",
        label: "Dc No",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "work_order_sa_status",
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
          customBodyRender: (id) => {
            return (
              <div className="flex gap-2">
              <div 
              onClick={()=>navigate(`/edit-order-sales/${id}`)}
              className="flex items-center space-x-2">
                <CiEdit title="Edit" className="h-5 w-5 cursor-pointer" />
              </div>
          
              <div 
              onClick={()=>navigate(`/view-order-sales/${id}`)}
              className="flex items-center space-x-2">
                <FaEye title="view" className="h-5 w-5 cursor-pointer hover:text-red-500" />
              </div>
             
              </div>
            );
          },
        },
      },
    ];

    const options = {
        selectableRows: "none",
        elevation: 0,
        // rowsPerPage: 5,
        // rowsPerPageOptions: [5, 10, 25],
        responsive: "standard",
        viewColumns: true,
        download: false,
        print: false,
        customToolbar: () => {
          return (
            <Link
            to="/add-order-sales"
            className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md"
          >
            + Order Sales
          </Link>
           
          );
        },
      };
  return (
    <Layout>
              <WorkOrderRecieveFilter/>
              <div className="mt-5">
        <MUIDataTable
        title='Work Order Sales List'
          data={orderReceivedData ? orderReceivedData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  )
}

export default WorkOrderSalesList