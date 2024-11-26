import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../../layout/Layout'
import WorkOrderRecieveFilter from '../../../components/WorkOrderRecieveFilter'
import MUIDataTable from 'mui-datatables';
import { ContextPanel } from '../../../utils/ContextPanel';
import { useNavigate } from 'react-router-dom';

const WorkOrderFinalStockList = () => {
    const [orderReceivedData, setOrderReceivedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const {isPanelUp,userType} = useContext(ContextPanel)
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchFactoryData = async () => {
        try {
        
          setLoading(true);
          const token = localStorage.getItem("token");
          const response = await axios.get(`${BASE_URL}/api/fetch-work-order-final-stock-list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setOrderReceivedData(response.data?.finalStock);
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
        name: "work_order_rc_sub_barcode",
        label: "T Code",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "work_order_sub_name",
        label: "P Code",
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
        name: "work_order_sub_color",
        label: "Attribute",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "work_order_sub_shrinkage",
        label: "Shrinkage",
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
        name: "total_received",
        label: "Received",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "total_sales",
        label: "Sales",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "total_received",
        label: "Balance",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "finished_stock_amount",
        label: "Amount",
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
        print: false,
        
      };
  return (
   <Layout>
    <WorkOrderRecieveFilter/>
    <div className="mt-5">
        <MUIDataTable
        title='Work Order Final Stock'
          data={orderReceivedData ? orderReceivedData : []}
          columns={columns}
          options={options}
        />
      </div>
   </Layout>
  )
}

export default WorkOrderFinalStockList