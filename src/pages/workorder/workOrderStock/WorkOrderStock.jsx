import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../../layout/Layout'
import MUIDataTable from 'mui-datatables';
import BASE_URL from '../../../base/BaseUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ContextPanel } from '../../../utils/ContextPanel';
import moment from 'moment';

const WorkOrderStock = () => {
    const [factoryData, setFactoryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const {isPanelUp,userType} = useContext(ContextPanel)
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchFactoryData = async () => {
        try {
        
          setLoading(true);
          const token = localStorage.getItem("token");
          const response = await axios.get(`${BASE_URL}/api/fetch-work-order-stock-list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setFactoryData(response.data?.finishedStock);
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
        name: "finished_stock_work",
        label: "Inward Date",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value) => {
            return moment(value).format("DD-MM-YYYY");
          },
        },
      },
      {
        name: "finished_stock_barcode",
        label: "T Code",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "finished_stock_total",
        label: "Total",
        options: {
          filter: true,
          sort: false,
        },
      },
     
      {
        name: "work_order_sub_brand",
        label: "Brand",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "work_order_sub_length",
        label: "Length",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "work_order_sub_rate",
        label: "Rate",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "finished_stock_status",
        label: "Status",
        options: {
          filter: true,
          sort: false,
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
      print: true,
      
    };
  return (
    <Layout>
    <div className="mt-5">
        <MUIDataTable
        title='Work Order Stock List'
          data={factoryData ? factoryData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  )
}

export default WorkOrderStock