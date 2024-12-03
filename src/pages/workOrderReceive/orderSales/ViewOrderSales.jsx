import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import Moment from 'moment';
import WorkOrderRecieveFilter from '../../../components/WorkOrderRecieveFilter'
import Layout from '../../../layout/Layout'
import { useParams } from 'react-router-dom'
import BASE_URL from '../../../base/BaseUrl';
import Loader from '../../../components/Loader';


// const printStyles = `
// @media print {
//   body {
//     font-size: 10pt;
//     line-height: 1.2;
//     margin: 0;
//     padding: 0;
//   }
//   @page {
//     size: A4 landscape;
//     margin: 2mm;
    
//   }
//   .print-container {
//     width: 100%;
//     max-width: 297mm;
//     margin: 0 auto;
//   }
//   table {
//     width: 100%;
//     border-collapse: collapse;
//     page-break-inside: avoid;
//     margin-bottom: 10px;
//     font-size: 9pt;
//   }
//   table, th {
//     border: 0.1px solid #000;
//     border-width: 0.1px;
//   }
//   th, td {
//     padding: 3px 5px;
//     line-height: 1.1;
//     vertical-align: middle;
//   }
//   thead {
//     background-color: #f0f0f0 !important;
//     -webkit-print-color-adjust: exact;
//   }
//   .font-semibold {
//     font-weight: 600;
//   }
//   h3 {
//     font-size: 14pt;
//     margin-bottom: 10px;
//   }
//   * {
//     -webkit-print-color-adjust: exact !important;
//     color-adjust: exact !important;
//   }
// }
// `;

const printStyles = `
@media print {
  body {
    font-size: 10pt;
    line-height: 1.2;
    margin: 0;
    padding: 0;
  }
  @page {
    size: A4 landscape;
    margin: 2mm;
  }
  .print-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 297mm; /* A4 landscape width */
    margin: 0 auto;
  }
  .copy {
    width: 48%; /* Ensure two copies fit side-by-side with some spacing */
    border: 0.1px solid #000; /* Optional: Add borders for clarity */
    padding: 5mm; /* Add some padding */
    box-sizing: border-box;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
    font-size: 9pt;
  }
  table, th, td {
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

  const fallbackMobile = '+91-9865472310';
  const fallbackEmail = 'tomandjerry@reddit.com';
  const fallbackAddress = 'Spencer Plaza near vishal mega mart, siliguri';
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
          className="print-container bg-white  p-8 border border-gray-300"
        >

          <div className="copy relative h-[90vh]">
          {/* Invoice Header */}
          <div className="invoice-header mb-8">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h1 className="text-xl font-extrabold text-blue-700">Packing List</h1>
                <p className="text-gray-600">For Sales</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Ref Number: <span className="text-blue-600">{workOrder.work_order_sa_ref}</span></p>
                <p>Date: {Moment(workOrder.work_order_sa_date).format('DD MMMM YYYY')}</p>
              </div>
            </div>
          </div>

          {/* Customer & Order Details */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-3 border-b pb-2">Customer Details</h3>
              <p><strong>Name:</strong> {workOrder.work_order_sa_retailer_name}</p>
              <p><strong>Sales By:</strong> {workOrder.work_order_sa_fabric_sale}</p>
              
              <p><strong>Mobile:</strong> {workOrder.customer_mobile || fallbackMobile}</p>
              <p><strong>Email:</strong> {workOrder.customer_email || fallbackEmail}</p>
            </div>
            <div className=" text-right">
              <h3 className="font-bold  text-lg mb-3 border-b pb-2">Delivery Information</h3>
              <p  ><strong>DC No:</strong> {workOrder.work_order_sa_dc_no || 'N/A'}</p>
              <p  ><strong>DC Date:</strong> {workOrder.work_order_sa_dc_date 
                ? Moment(workOrder.work_order_sa_dc_date).format('DD MMMM YYYY') 
                : 'N/A'}</p>
                <p  ><strong>Address:</strong> {workOrder.customer_address || fallbackAddress}</p>
            </div>
          </div>

          {/* Detailed Items Table */}
          <table className="w-full mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Brand</th>
                <th className="border p-2">No of Pieces</th>
                <th className="border p-2">Mrp (₹)</th>
               
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {workOrderSub.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{item.work_order_sub_brand || 'N/A'}</td>
                  <td className="border p-2">{item.count}</td>
                  <td className="border p-2">{item.finished_stock_amount}</td>
            
                  <td className="border p-2">  {(item.finished_stock_amount * item.count).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary Section */}
          <div className=" absolute bottom-2 right-2 left-2 grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-3 border-b pb-2">Order Summary</h3>
              <div className="space-y-2">
                <p><strong>Total Pieces:</strong> {workOrder.work_order_sa_pcs}</p>
                <p><strong>Remarks:</strong> {workOrder.work_order_sa_remarks || 'No additional remarks'}</p>
              </div>
            </div>
            <div>
              <div className="bg-blue-50 p-6 rounded-lg text-right">
                <h3 className="text-xl font-bold mb-4 border-b pb-2">Grand Total</h3>
                <p className="text-2xl font-extrabold text-blue-700">
                  ₹{workOrderFooter.total_amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

         
          </div>
          <div className="copy relative h-[90vh]">
             {/* Invoice Header */}
          <div className="invoice-header mb-8">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h1 className="text-xl font-extrabold text-blue-700">Packing List</h1>
                <p className="text-gray-600">For Sales</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Ref Number: <span className="text-blue-600">{workOrder.work_order_sa_ref}</span></p>
                <p>Date: {Moment(workOrder.work_order_sa_date).format('DD MMMM YYYY')}</p>
              </div>
            </div>
          </div>

          {/* Customer & Order Details */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-3 border-b pb-2">Customer Details</h3>
              <p><strong>Name:</strong> {workOrder.work_order_sa_retailer_name}</p>
              <p><strong>Sales By:</strong> {workOrder.work_order_sa_fabric_sale}</p>
              
              <p><strong>Mobile:</strong>{workOrder.customer_mobile || fallbackMobile}</p>
              <p><strong>Email:</strong> {workOrder.customer_email || fallbackEmail}</p>
            </div>
            <div className=" text-right">
              <h3 className="font-bold  text-lg mb-3 border-b pb-2">Delivery Information</h3>
              <p  ><strong>DC No:</strong> {workOrder.work_order_sa_dc_no || 'N/A'}</p>
              <p  ><strong>DC Date:</strong> {workOrder.work_order_sa_dc_date 
                ? Moment(workOrder.work_order_sa_dc_date).format('DD MMMM YYYY') 
                : 'N/A'}</p>
                <p ><strong>Address:</strong> {workOrder.customer_address || fallbackAddress}</p>
            </div>
          </div>

          {/* Detailed Items Table */}
          <table className="w-full mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Brand</th>
                <th className="border p-2">No of Pieces</th>
                <th className="border p-2">Mrp (₹)</th>
         
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {workOrderSub.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{item.work_order_sub_brand || 'N/A'}</td>
                  <td className="border p-2">{item.count}</td>
                  <td className="border p-2">{item.finished_stock_amount}</td>
            
                  <td className="border p-2">  {(item.finished_stock_amount * item.count).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
         
          {/* Summary Section */}
          <div className="grid grid-cols-2 gap-6 absolute bottom-2 right-2 left-2 ">
            <div>
              <h3 className="font-bold text-lg mb-3 border-b pb-2">Order Summary</h3>
              <div className="space-y-2">
                <p><strong>Total Pieces:</strong> {workOrder.work_order_sa_pcs}</p>
                <p><strong>Remarks:</strong> {workOrder.work_order_sa_remarks || 'No additional remarks'}</p>
              </div>
            </div>
            <div>
              <div className="bg-blue-50 p-6 rounded-lg text-right">
                <h3 className="text-xl font-bold mb-4 border-b pb-2">Grand Total</h3>
                <p className="text-2xl font-extrabold text-blue-700">
                  ₹{workOrderFooter.total_amount.toLocaleString()}
                </p>
                {/* <p className="text-sm text-gray-600">Total Amount (Incl. Taxes)</p> */}
              </div>
            </div>
          </div>

          
          </div>
        </div>
    
      </div>
   </Layout>
  )
}

export default ViewOrderSales