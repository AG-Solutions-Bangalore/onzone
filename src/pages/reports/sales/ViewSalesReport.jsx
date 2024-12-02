import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../layout/Layout'
import Loader from '../../../components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../../base/BaseUrl';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@material-tailwind/react';
import moment from 'moment';

const ViewSalesReport = () => {
    const [workOrders, setWorkOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation()
    const navigate = useNavigate();
    const printRef = useRef();
    // const searchParams = {
    //   work_order_sa_from_date: localStorage.getItem("work_order_sa_from_date"),
    //   work_order_sa_to_date: localStorage.getItem("work_order_sa_to_date"),
    //   work_order_sa_retailer_id: localStorage.getItem("work_order_sa_retailer_id"),
    // };
    const searchParams = location.state || {
      work_order_sa_from_date: "2024-01-01",
      work_order_sa_to_date: moment().format("YYYY-MM-DD"),
      work_order_sa_retailer_id: ""
    }
  
  
    useEffect(() => {
      const fetchWorkOrderReport = async () => {
        try {
          // Retrieve search parameters from localStorage
          
  
          // Get authentication token
          const token = localStorage.getItem("token");
  
          // Make API call to fetch work order report
          const response = await axios.post(
            `${BASE_URL}/api/fetch-work-order-sales-report`, 
            searchParams,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          // Set work orders in state
          setWorkOrders(response.data?.workordersales || []);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching work order sales report:", error);
          setLoading(false);
        }
      };
  
      fetchWorkOrderReport();
    }, []);

    const handleDownloadCsv = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/download-work-order-sales-report
`, searchParams, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          responseType: 'blob',
        });
  
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sales_report.csv');
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error('Error downloading sales order report:', error);
      }
    };
  
    const handleDownloadPDF = () => {
      const input = document.getElementById('report-table');
      
      html2canvas(input, { 
        scale: 2,
        useCORS: true,
        allowTaint: true 
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });
        
        // Calculate A4 dimensions in mm
        const pageWidth = 297;
        const pageHeight = 210;
        
        // Add image to PDF with 2mm margin on all sides
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pageWidth - 4; // 2mm margin on each side
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 2, 2, imgWidth, imgHeight);
        pdf.save('sales-order-report.pdf');
      });
    };
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: 'Work Order Report',
        pageStyle: `
        @page {
          size: A4 ;
          margin: 2mm;
        }
        @media print {
          body {
            margin: 2mm !important;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10pt;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 4px;
            text-align: center;
          }
        }
      `
      });
  
    if (loading) {
      return <Loader/>;
    }
  return (
    <Layout>
         <div >
       
          <div className="flex bg-white rounded-lg justify-between items-center  p-2  mb-4">
          <h2 className="text-xl font-bold">Sales Report</h2>
          <div className="space-x-4 flex">
          <Button 
        
        onClick={handleDownloadCsv}
              className="flex bg-blue-500 hover:bg-green-400 p-2 items-center space-x-2"
            >
              <span> Download CSV</span>
            </Button>
            <Button 
        
        onClick={handleDownloadPDF}
              className="flex bg-blue-500 hover:bg-green-400 p-2 items-center space-x-2"
            >
              <span> Download PDF</span>
            </Button>
            
            <Button 
           
           onClick={handlePrint}
              className="flex bg-blue-500 hover:bg-green-400 items-center space-x-2"
            >
              <span>Print Report</span>
            </Button>
            
           
          </div>
        </div>
          <div className="overflow-x-auto">
            <table 
              id="report-table" 
              ref={printRef}
              className="w-full border-collapse border border-gray-300"
            >
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Work Order Sa No</th>
                  <th className="border border-gray-300 p-2">Work Order Sa Date</th>
                  <th className="border border-gray-300 p-2">Retailer</th>
                  <th className="border border-gray-300 p-2">Dc no</th>
                  <th className="border border-gray-300 p-2">Sa Status</th>
                </tr>
              </thead>
              <tbody>
                {workOrders.map((order, index) => (
                  <tr 
                    key={index} 
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="border border-gray-300 p-2 text-center">{order.work_order_sa_no}</td>
                    <td className="border border-gray-300 p-2 text-center">{moment(order.work_order_sa_date).format("DD-MM-YYYY")}</td>
                    <td className="border border-gray-300 p-2 text-center">{order.work_order_sa_retailer_name}</td>
                    <td className="border border-gray-300 p-2 text-center">{order.work_order_sa_dc_no}</td>
                    <td className="border border-gray-300 p-2 text-center">{order.work_order_sa_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {workOrders.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No Sales orders found.
              </div>
            )}
          </div>
        </div>
    </Layout>
  )
}

export default ViewSalesReport