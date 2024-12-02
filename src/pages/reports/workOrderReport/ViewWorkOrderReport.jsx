import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../layout/Layout'
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../../base/BaseUrl';
import axios from 'axios';
import Loader from '../../../components/Loader';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@material-tailwind/react';
import moment from 'moment/moment';

const ViewWorkOrderReport = () => {
    const [workOrders, setWorkOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const printRef = useRef();
    const searchParams = {
      work_order_from_date: localStorage.getItem("work_order_from_date"),
      work_order_to_date: localStorage.getItem("work_order_to_date"),
      work_order_factory_no: localStorage.getItem("work_order_factory_no"),
    };
  
    useEffect(() => {
      const fetchWorkOrderReport = async () => {
        try {
          // Retrieve search parameters from localStorage
        
  
          // Get authentication token
          const token = localStorage.getItem("token");
  
          // Make API call to fetch work order report
          const response = await axios.post(
            `${BASE_URL}/api/fetch-work-order-report`, 
            searchParams,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          // Set work orders in state
          setWorkOrders(response.data?.workorder || []);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching work order report:", error);
          setLoading(false);
        }
      };
  
      fetchWorkOrderReport();
    }, []);


    const handleDownloadCsv = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/download-work-order-report`, searchParams, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          responseType: 'blob',
        });
  
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'work_order.csv');
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error('Error downloading work order report:', error);
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
        pdf.save('work-order-report.pdf');
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
          <h2 className="text-xl font-bold">Work Order Report</h2>
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
                  <th className="border border-gray-300 p-2">Work Order No</th>
                  <th className="border border-gray-300 p-2">Work Order Date</th>
                  <th className="border border-gray-300 p-2">Factory</th>
                  <th className="border border-gray-300 p-2">Brand</th>
                  <th className="border border-gray-300 p-2">Status</th>
                  <th className="border border-gray-300 p-2">Order Count</th>
                  <th className="border border-gray-300 p-2">Total Receive</th>
                </tr>
              </thead>
              <tbody>
                {workOrders.map((order, index) => (
                  <tr 
                    key={index} 
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="border border-gray-300 p-2 text-center">{order.work_order_no}</td>
                    <td className="border border-gray-300 p-2 text-center"> {moment(order.work_order_date).format("DD-MM-YYYY")}</td>
                    <td className="border border-gray-300 p-2 text-center">{order.work_order_factory}</td>
                    <td className="border border-gray-300 p-2 text-center">{order.work_order_brand}</td>
                    <td className="border border-gray-300 p-2 text-center">{order.work_order_status}</td>
                    <td className="border border-gray-300 p-2 text-center">{order.work_order_count}</td>
                    <td className="border border-gray-300 p-2 text-center">{order.total_receive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {workOrders.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No work orders found.
              </div>
            )}
          </div>
        </div>
   </Layout>
  )
}

export default ViewWorkOrderReport