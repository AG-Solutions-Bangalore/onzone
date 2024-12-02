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

  const calculateTotals = () => {
    const totalLength = workOrderSub.reduce((sum, item) => sum + item.work_order_sub_length, 0);
    const averageLength = totalLength / workOrderSub.length;
    const totalFinishedStock = workOrderSub.reduce((sum, item) => sum + item.finished_stock_amount, 0);

    return {
      totalLength: totalLength.toFixed(2),
      averageLength: averageLength.toFixed(2),
      totalFinishedStock
    };
  };

  const totals = calculateTotals(); 
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

        {/* <div 
          ref={componentRef} 
          className="bg-white shadow-md rounded-lg p-6"
        >
          
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
        </div> */}

{/* <div ref={componentRef} className="print-container p-4 bg-white">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold text-center mb-2">Work Order Sales Invoice</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Reference No:</strong> {workOrder.work_order_sa_ref}</p>
                <p><strong>Date:</strong> {Moment(workOrder.work_order_sa_date).format('DD-MM-YYYY')}</p>
                <p><strong>Retailer Name:</strong> {workOrder.work_order_sa_retailer_name}</p>
              </div>
              <div className="text-right">
                <p><strong>DC No:</strong> {workOrder.work_order_sa_dc_no || 'N/A'}</p>
                <p><strong>DC Date:</strong> {workOrder.work_order_sa_dc_date ? Moment(workOrder.work_order_sa_dc_date).format('DD-MM-YYYY') : 'N/A'}</p>
              </div>
            </div>
          </div>

          <table className="w-full mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Brand</th>
                <th className="border p-2">Length</th>
                <th className="border p-2">Finished Stock Amount</th>
              </tr>
            </thead>
            <tbody>
              {workOrderSub.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2 text-center">{item.work_order_sub_brand}</td>
                  <td className="border p-2 text-center">{item.work_order_sub_length.toFixed(2)}</td>
                  <td className="border p-2 text-center">{item.finished_stock_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p><strong>Total Pieces:</strong> {workOrder.work_order_sa_pcs}</p>
              <p><strong>Remarks:</strong> {workOrder.work_order_sa_remarks || 'N/A'}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">Total Amount: ₹{workOrderFooter.total_amount}</p>
            </div>
          </div>

          {workOrder.customer_address && (
            <div className="mt-4 border-t pt-4">
              <h3 className="font-bold mb-2">Customer Details</h3>
              <p>{workOrder.customer_address}</p>
              <p>
                {workOrder.customer_mobile && `Mobile: ${workOrder.customer_mobile}`}
                {workOrder.customer_email && ` | Email: ${workOrder.customer_email}`}
              </p>
            </div>
          )}
        </div> */}
        {/* <div ref={componentRef} className="print-container p-6 bg-white">
     
          <div className="invoice-header border-b pb-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-700">WORK ORDER SALES INVOICE</h1>
              <p className="text-sm text-gray-600">Detailed Fabric Order Breakdown</p>
            </div>
            <div className="text-right">
              <p><strong>Invoice No:</strong> {workOrder.work_order_sa_ref}</p>
              <p><strong>Date:</strong> {Moment(workOrder.work_order_sa_date).format('DD MMMM YYYY')}</p>
            </div>
          </div>

    
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-bold mb-2">Retailer Information</h3>
              <p><strong>Name:</strong> {workOrder.work_order_sa_retailer_name}</p>
              <p><strong>Sales By:</strong> {workOrder.work_order_sa_fabric_sale}</p>
              {!workOrder.customer_address && (
                <>
                  <p><strong>Address:</strong> Spencer Plaza near vishal mega mart, siliguri</p>
                  <p><strong>Mobile:</strong> +91-9865472310</p>
                  <p><strong>Email:</strong> tomandjerry@reddit.com</p>
                  
                </>
              )}
            </div>
            <div className="text-right mt-2">
              <p><strong>DC No:</strong> {workOrder.work_order_sa_dc_no || 'N/A'}</p>
              <p><strong>DC Date:</strong> {workOrder.work_order_sa_dc_date 
                ? Moment(workOrder.work_order_sa_dc_date).format('DD MMMM YYYY') 
                : 'N/A'}</p>
            </div>
          </div>

 
          <table className="w-full mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Brand</th>
                <th className="border p-2">Length (m)</th>
                <th className="border p-2">Finished Stock</th>
              </tr>
            </thead>
            <tbody>
              {workOrderSub.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{item.work_order_sub_brand || 'N/A'}</td>
                  <td className="border p-2">{item.work_order_sub_length.toFixed(2)}</td>
                  <td className="border p-2">{item.finished_stock_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

    
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="font-bold mb-2">Order Summary</h3>
              <p><strong>Total Pieces:</strong> {workOrder.work_order_sa_pcs}</p>
              <p><strong>Total Length:</strong> {totals.totalLength} m</p>
              <p><strong>Total Finished Stock:</strong> {totals.totalFinishedStock}</p>
              <p><strong>Remarks:</strong> {workOrder.work_order_sa_remarks || 'No additional remarks'}</p>
            </div>
            <div className="text-right">
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="text-xl font-bold mb-2">Financial Summary</h3>
                <p className="text-lg"><strong>Total Amount:</strong> ₹{workOrderFooter.total_amount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Inclusive of all taxes and charges</p>
              </div>
            </div>
          </div>

          <div className="invoice-footer text-center text-sm text-gray-600 mt-4">
            <p>This is a computer-generated invoice and does not require a physical signature.</p>
            <p>Thank you for your business!</p>
          </div>
        </div> */}
        <div 
          ref={componentRef} 
          className="print-container bg-white  p-8 border border-gray-300"
        >
          {/* Invoice Header */}
          <div className="invoice-header mb-8">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h1 className="text-3xl font-extrabold text-blue-700">INVOICE</h1>
                <p className="text-gray-600">Work Order Sales Document</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Invoice Number: <span className="text-blue-600">{workOrder.work_order_sa_ref}</span></p>
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
              <p><strong>Address:</strong> {workOrder.customer_address || fallbackAddress}</p>
              <p><strong>Mobile:</strong> {workOrder.customer_mobile || fallbackMobile}</p>
              <p><strong>Email:</strong> {workOrder.customer_email || fallbackEmail}</p>
            </div>
            <div className="text-right">
              <h3 className="font-bold text-lg mb-3 border-b pb-2">Delivery Information</h3>
              <p><strong>DC No:</strong> {workOrder.work_order_sa_dc_no || 'N/A'}</p>
              <p><strong>DC Date:</strong> {workOrder.work_order_sa_dc_date 
                ? Moment(workOrder.work_order_sa_dc_date).format('DD MMMM YYYY') 
                : 'N/A'}</p>
            </div>
          </div>

          {/* Detailed Items Table */}
          <table className="w-full mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Brand</th>
                <th className="border p-2">Length (m)</th>
                <th className="border p-2">Finished Stock</th>
              </tr>
            </thead>
            <tbody>
              {workOrderSub.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{item.work_order_sub_brand || 'N/A'}</td>
                  <td className="border p-2">{item.work_order_sub_length.toFixed(2)}</td>
                  <td className="border p-2">{item.finished_stock_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary Section */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-3 border-b pb-2">Order Summary</h3>
              <div className="space-y-2">
                <p><strong>Total Pieces:</strong> {workOrder.work_order_sa_pcs}</p>
                <p><strong>Total Length:</strong> {totals.totalLength} m</p>
                <p><strong>Total Finished Stock:</strong> {totals.totalFinishedStock}</p>
                <p><strong>Remarks:</strong> {workOrder.work_order_sa_remarks || 'No additional remarks'}</p>
              </div>
            </div>
            <div>
              <div className="bg-blue-50 p-6 rounded-lg text-right">
                <h3 className="text-xl font-bold mb-4 border-b pb-2">Financial Summary</h3>
                <p className="text-2xl font-extrabold text-blue-700">
                  ₹{workOrderFooter.total_amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Amount (Incl. Taxes)</p>
              </div>
            </div>
          </div>

          {/* Invoice Footer */}
          <div className="invoice-footer mt-8 pt-4 border-t text-center text-gray-600">
            <p className="text-sm">This is a computer-generated invoice</p>
            <p className="text-sm">Thank you for your business!</p>
          </div>
        </div>
    
      </div>
   </Layout>
  )
}

export default ViewOrderSales