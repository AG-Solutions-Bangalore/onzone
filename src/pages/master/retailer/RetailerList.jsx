import MUIDataTable from 'mui-datatables';
import React, { useContext, useEffect, useState } from 'react'
import MasterFilter from '../../../components/MasterFilter';
import Layout from '../../../layout/Layout';
import { ContextPanel } from '../../../utils/ContextPanel';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../../base/BaseUrl';
import { CiEdit } from 'react-icons/ci';

const RetailerList = () => {
  const [factoryData, setFactoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const {isPanelUp,userType} = useContext(ContextPanel)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFactoryData = async () => {
      try {
      
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/fetch-customer-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFactoryData(response.data?.customer);
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
      name: "customer_name",
      label: "Retailer",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "customer_type",
      label: "Type",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "customer_mobile",
      label: "Mobile",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "customer_email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    
    {
      name: "customer_status",
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
            onClick={() => navigate(`/retailer-edit/${id}`)}
            className="flex items-center space-x-2">
              <CiEdit title="Edit" className="h-5 w-5 cursor-pointer" />
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
        to="/add-retailer"
        className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md"
      >
        + Retailer
      </Link>
       
      );
    },
  };
  return (
    <Layout>
   
   <div className="mt-5">
     <MUIDataTable
     title='Retailer List'
       data={factoryData ? factoryData : []}
       columns={columns}
       options={options}
     />
   </div>
 </Layout>
  )
}

export default RetailerList