import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../layout/Layout'
import axios from 'axios';
import BASE_URL from '../../../base/BaseUrl';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Loader from '../../../components/Loader';
import { Button } from '@material-tailwind/react';
import ReactToPrint from 'react-to-print';
import { IoIosPrint } from 'react-icons/io';

const RetailerReport = () => {
    const [retailerView, setRetailerView] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);
  const printRef = useRef(null);

  const fetchRetailerReport = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/fetch-customer-report`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRetailerView(response?.data?.customer);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching retailer report:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
 
      fetchRetailerReport();
   
  }, []);

  

  const handleSavePDF = () => {
    const input = tableRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save('retailer-report.pdf');
    });
  };

  const handleDownload = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/download-customer-report`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'retailer_report.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  if (loading) {
    return (
    
        <Loader/>
  
    );
  }

  return (
   <Layout>
       <div >
        <div className="flex bg-white rounded-lg justify-between items-center  p-2  mb-4">
          <h2 className="text-xl font-bold">Retailers</h2>
          <div className="space-x-4 flex">
            <Button 
        
              onClick={handleDownload}
              className="flex bg-blue-400 hover:bg-green-400 p-2 items-center space-x-2"
            >
              <span>Download CSV</span>
            </Button>
            
            <Button 
           
              onClick={handleSavePDF}
              className="flex bg-blue-400 hover:bg-green-400 items-center space-x-2"
            >
              <span>Save PDF</span>
            </Button>
            
            <ReactToPrint
              trigger={() => (
                <Button  className="flex  bg-blue-400 hover:bg-green-400 items-center space-x-2">
                  <IoIosPrint className="text-lg" />
                  <span>Print Report</span>
                </Button>
              )}
              content={() => tableRef.current}
            />
          </div>
        </div>

        <div ref={tableRef} className="bg-white p-6 rounded-lg ">
          <h2 className="text-center text-2xl font-bold mb-6">RETAILERS</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-center">RETAILER</th>
                  <th className="border p-2 text-center">TYPE</th>
                  <th className="border p-2 text-center">MOBILE</th>
                  <th className="border p-2 text-center">EMAIL</th>
                  <th className="border p-2 text-center">ADDRESS</th>
                  <th className="border p-2 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {retailerView.map((retailer, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-2 text-left">{retailer.customer_name}</td>
                    <td className="border p-2 text-left">{retailer.customer_type}</td>
                    <td className="border p-2 text-left">{retailer.customer_mobile}</td>
                    <td className="border p-2 text-left">{retailer.customer_email}</td>
                    <td className="border p-2 text-center">{retailer.customer_address}</td>
                    <td className="border p-2 text-center">{retailer.customer_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
   </Layout>
  )
}

export default RetailerReport