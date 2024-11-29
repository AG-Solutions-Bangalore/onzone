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

  const componentRef = useRef(null);

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

  const splitBarcodeData = (data, chunkSize = 9) => {
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
    <div className=" mb-4 break-inside-avoid">
      {/* Box Details */}
     
     
      {/* Barcode Section */}
      <div className="border border-black p-1  ">
      <div className="flex flex-row items-center justify-between border rounded-lg border-black p-2 mb-2">
        <span>Box: {boxNumber}</span>
        <span>Total No of Pcs: {totalPcs}</span>
      </div>
       <div className="p-1">
       {splitBarcodeData(barcodeData)}
       </div>
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
          <div className="flex gap-1">
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

        <div ref={componentRef} className="bg-white rounded-lg p-6">
          {/* Main Details Table with Single Border */}
          <table className="w-full mb-1 border-collapse text-sm">
            <tbody>
              <tr className="border-t border-l border-r border-black">
                <td className="font-semibold p-1 w-[8rem] border-r">Factory</td>
                <td className="p-1 w-[16rem] border-r">
                  : {workOrder.work_order_rc_factory}
                </td>
                <td className="font-semibold p-1 w-[6rem] text-right border-r">Date</td>
                <td className="p-1 w-[8rem]">
                  : {moment(workOrder.work_order_rc_date).format("DD-MM-YYYY")}
                </td>
              </tr>
              <tr className="border-l border-r border-black">
                <td className="font-semibold p-1 w-[8rem] border-r">Brand</td>
                <td className="p-1 w-[16rem] border-r">
                  : {workOrder.work_order_rc_brand}
                </td>
                <td className="font-semibold p-1 w-[6rem] text-right border-r">DC No</td>
                <td className="p-1 w-[8rem]">
                  : {workOrder.work_order_rc_dc_no}
                </td>
                <td className="font-semibold p-1 w-[6rem] text-right border-r">
                  DC Date
                </td>
                <td className="p-1 w-[8rem]">
                  : {moment(workOrder.work_order_rc_dc_date).format("DD-MM-YYYY")}
                </td>
              </tr>
              <tr className="border-l border-r border-black">
                <td className="font-semibold p-1 w-[8rem] border-r">No of Box</td>
                <td className="p-1 w-[16rem] border-r">
                  : {workOrder.work_order_rc_box}
                </td>
                <td className="font-semibold p-1 w-[6rem] text-right border-r">
                  Total Pcs
                </td>
                <td className="p-1 w-[8rem] border-r">
                  : {workOrder.work_order_rc_pcs}
                </td>
                <td className="font-semibold p-1 w-[6rem] text-right border-r">
                  Received By
                </td>
                <td className="p-1 w-[8rem]">
                  : {workOrder.work_order_rc_received_by}
                </td>
              </tr>
              <tr className="border-l border-r border-b border-black">
                <td className="font-semibold p-1 w-[8rem] border-r">Work Order No</td>
                <td className="p-1 w-[16rem] border-r">
                  : {workOrder.work_order_rc_id}
                </td>
                <td className="font-semibold p-1 w-[6rem] text-right border-r">
                  Remarks
                </td>
                <td colSpan="3" className="p-1 break-words">
                  : {workOrder.work_order_rc_remarks}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Render 3 boxes */}
          <div className="mt-4 space-y-4 ">
            {renderBoxContent(1, 12, "MF12I5,MF12I6,TF12I5,JHMF12,MF12I5,MF12I6,TF12I5,JHMF12,MF12I5,MF12I6,TF12I5,JHMF12")}
            {renderBoxContent(2, 18, "MF12I5,MF12I6,TF12I5,JHMF12,MF12I5,MF12I6,TF12I5,JHMF12,MF12I5,MF12I6,TF12I5,JHMF12,MF12I5,MF12I6,TF12I5,JHMF12,MF12I5,MF12I6")}
            {renderBoxContent(3, 24, "MF12I5,MF12I6,TF12I5,JHMF12,MF12I5,MF12I6,TF12I5,JHMF12,MF12I5,MF12I6,TF12I5,JHMF12,MF12I5,MF12I6,TF12I5,JHMF12,MF12I5,MF12I6,TF12I5,JHMF12,MF12I5,MF12I6,TF12I5,JHMF12")}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DcReceiptReceived;