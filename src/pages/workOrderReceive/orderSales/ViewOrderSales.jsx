import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import Moment from 'moment';
import WorkOrderRecieveFilter from '../../../components/WorkOrderRecieveFilter'
import Layout from '../../../layout/Layout'
import { useParams } from 'react-router-dom'
import BASE_URL from '../../../base/BaseUrl';
import Loader from '../../../components/Loader';


const printStyles = `
@media print {
  body {
    font-size: 10pt;
    line-height: 1.2;
    margin: 0;
    padding: 0;
  }
  @page {
    size: A4;
    margin: 15mm;
  }
  .print-container {
    width: 100%;
    max-width: 210mm;
    margin: 0 auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    page-break-inside: avoid;
    margin-bottom: 10px;
    font-size: 9pt;
  }
  table, th {
    border: 0.1px solid #000;
    border-width: 0.1px;
  }
  th, td {
    padding: 3px 5px;
    line-height: 1.1;
    vertical-align: middle;
  }
  thead {
    background-color: #f0f0f0 !important;
    -webkit-print-color-adjust: exact;
  }
  .font-semibold {
    font-weight: 600;
  }
  h3 {
    font-size: 14pt;
    margin-bottom: 10px;
  }
  * {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
}
`;
const ViewOrderSales = () => {
    const {id} = useParams()
    const [workOrder, setWorkOrder] = useState({});
  const [workOrderSub, setWorkOrderSub] = useState([]);
  const [workOrderFooter, setWorkOrderFooter] = useState({});
  const [loading, setLoading] = useState(true);

  const componentRef = useRef(null);

  useEffect(() => {
    // Add print styles to document head
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = printStyles;
    document.head.appendChild(styleSheet);
    
    // Cleanup on unmount
    return () => {
      document.head.removeChild(styleSheet);
    }
  }, []);

  useEffect(() => {
    const fetchWorkOrderSales = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/fetch-work-order-sales-view-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setWorkOrder(response.data.workordersales);
        setWorkOrderSub(response.data.workordersalessub);
        setWorkOrderFooter(response.data.workordersalesfooter);
      } catch (error) {
        console.error("Error fetching Work Order Sales data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkOrderSales();
  }, [id]);

  if (loading) {
    return <Loader />;
  }
  return (
   <Layout>
   
     <div >
        <div className="flex mb-4 flex-col md:flex-row justify-between items-center bg-white mt-2 p-2 rounded-lg space-y-4 md:space-y-0">
          <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
            Work Order Sales View
          </h3>
          <div>
            <ReactToPrint
              trigger={() => (
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Print
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>

        <div 
          ref={componentRef} 
          className="bg-white shadow-md rounded-lg p-6"
        >
          {/* Main Details Table */}
          <table className="w-full mb-1 border-collapse text-sm">
            <tbody>
              <tr className="border-b">
                <td className="font-semibold p-1 w-[8rem]">Retailer</td>
                <td className="p-1 w-[16rem]">: {workOrder.work_order_sa_retailer_name}</td>
                <td className="font-semibold p-1 w-[6rem] text-right">Date</td>
                <td className="p-1 w-[8rem]">: {Moment(workOrder.work_order_sa_date).format('DD-MM-YYYY')}</td>
                <td className="font-semibold p-1 w-[6rem] text-right">DC No</td>
                <td className="p-1 w-[8rem]">: {workOrder.work_order_sa_dc_no}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold p-1 w-[8rem]">Total Pcs</td>
                <td className="p-1 w-[16rem]">: {workOrder.work_order_sa_pcs}</td>
             
                <td className="font-semibold p-1 w-[8rem] text-right">Sales By</td>
                <td className="p-1 w-[16rem]">: {workOrder.work_order_sa_fabric_sale}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold p-1 w-[8rem]">Address</td>
                <td colSpan="5" className="p-1 break-words">: {workOrder.customer_address}</td>
              </tr>
              <tr>
                <td className="font-semibold p-1 w-[8rem]">Remarks</td>
                <td colSpan="5" className="p-1 break-words">: {workOrder.work_order_sa_remarks}</td>
              </tr>
            </tbody>
          </table>

          {/* Sub Items Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="p-2 border border-black text-center">Description</th>
                <th className="p-2 border border-black text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              {workOrderSub.map((item, index) => (
                <tr key={index} className="border">
                  <td className="p-2 border border-black">
                    {[
                      item.work_order_sub_color,
                      item.work_order_sub_design,
                      item.work_order_sub_type,
                      item.work_order_sub_color_theme,
                      item.work_order_sub_occasion
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </td>
                  <td className="p-2 border border-black text-center">
                    {item.finished_stock_amount}
                  </td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-100">
                <td className="p-2 border border-black text-center">Total</td>
                <td className="p-2 border border-black text-center">
                  {workOrderFooter.total_amount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
   </Layout>
  )
}

export default ViewOrderSales