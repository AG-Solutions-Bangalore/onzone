import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../layout/Layout";
import ReactToPrint from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import Loader from "../../../components/Loader";
import moment from "moment";

const DcReceiptReceived = () => {
  const { id } = useParams();
  const [workOrder, setWorkOrder] = useState({});
  const [workOrderSub, setWorkOrderSub] = useState([]);
  const [workOrderFooter, setWorkOrderFooter] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Create separate refs for each box to enable individual printing
  const componentRef1 = useRef(null);
  const componentRef2 = useRef(null);
  const componentRef3 = useRef(null);

  useEffect(() => {
    const fetchViewReceived = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/fetch-work-order-received-view-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setWorkOrder(response.data.workorderrc);
        setWorkOrderSub(response.data.workorderrcsub);
        setWorkOrderFooter(response.data.workorderfooter);
      } catch (error) {
        console.error("Error fetching Factory data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchViewReceived();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  const splitBarcodeData = (data, chunkSize = 3) => {
    const barcodes = data.split(",").map(b => b.trim());
    const chunks = [];
  
    for (let i = 0; i < barcodes.length; i += chunkSize) {
      chunks.push(barcodes.slice(i, i + chunkSize).join(", "));
    }
  
    return chunks.map((chunk, index) => (
      <div key={index}>
        {chunk}
      </div>
    ));
  };
  
  // Render box content with dynamic box number and piece count
  const renderBoxContent = (boxNumber, totalPcs, barcodeData) => (
    <div ref={boxNumber === 1 ? componentRef1 : boxNumber === 2 ? componentRef2 : componentRef3} 
         className="border-2 border-black p-4 mb-4 break-inside-avoid">
      {/* Details Table with Borders */}
      <table className="w-full border-2 border-black mb-4 border-collapse text-sm">
        <tbody>
          <tr className="border-2 border-black">
            <td className="font-semibold p-1 w-[8rem] border-r-2 border-black">Factory</td>
            <td className="p-1 w-[16rem]">
              : {workOrder.work_order_rc_factory}
            </td>
            <td className="font-semibold p-1 w-[6rem] text-right border-l-2 border-black">Date</td>
            <td className="p-1 w-[8rem]">
              : {moment(workOrder.work_order_rc_date).format("DD-MM-YYYY")}
            </td>
          </tr>
          {/* Other rows with similar border styling */}
          <tr className="border-2 border-black">
            <td className="font-semibold p-1 w-[8rem] border-r-2 border-black">Brand</td>
            <td className="p-1 w-[16rem]">
              : {workOrder.work_order_rc_brand}
            </td>
            <td className="font-semibold p-1 w-[6rem] text-right border-l-2 border-black">DC No</td>
            <td className="p-1 w-[8rem]">
              : {workOrder.work_order_rc_dc_no}
            </td>
          </tr>
          {/* Add similar border styling to other rows */}
        </tbody>
      </table>

      {/* Box Details */}
      <div className="flex flex-row items-center justify-between border-2 border-black p-2 mb-2">
        <span>Box: {boxNumber}</span>
        <span>Total No of Pcs: {totalPcs}</span>
      </div>

      {/* Barcode Section */}
      <div className="border-2 border-black p-4 text-center">
        {splitBarcodeData(barcodeData)}
      </div>
    </div>
  );

  return (
    <Layout>
      <div>
        <div className="flex mb-4 flex-col md:flex-row justify-between items-center bg-white mt-2 p-2 rounded-lg space-y-4 md:space-y-0">
          <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
            Dc Receipt
          </h3>
          <div className="flex gap-4">
            {/* Print buttons for each box */}
            <ReactToPrint
              trigger={() => (
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Print Box 1
                </button>
              )}
              content={() => componentRef1.current}
            />
            <ReactToPrint
              trigger={() => (
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Print Box 2
                </button>
              )}
              content={() => componentRef2.current}
            />
            <ReactToPrint
              trigger={() => (
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Print Box 3
                </button>
              )}
              content={() => componentRef3.current}
            />
          </div>
        </div>

        {/* Render 3 boxes with different content */}
        {renderBoxContent(1, 12, "MF12I5,MF12I6,TF12I5,JHMF12,MF12I5,MF12I6,TF12I5,JHMF12,MF12I5,MF12I6,TF12I5,JHMF12")}
        {renderBoxContent(2, 15, "AB123,CD456,EF789,GH012,IJ345,KL678,MN901,OP234,QR567")}
        {renderBoxContent(3, 18, "XY789,ZW456,UV123,RS890,TU567,PQ234,LM901,KN678,JH345")}
      </div>
    </Layout>
  );
};

export default DcReceiptReceived;