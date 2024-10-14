import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import MUIDataTable from "mui-datatables";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

const WorkOrderView = () => {
  const { id } = useParams();
  const [workOrderData, setWorkOrderData] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();

  const fetchStyleData = async () => {
    try {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/fetch-work-order-details-list-by-id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWorkOrderData(response.data?.workorder);
    } catch (error) {
      console.error("Error fetching Work Order data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStyleData();
  }, []);

  const openModal = (value) => {
    setSelectedUser(value);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const updateWorkOrderFinish = async (e) => {
    e.preventDefault();
    closeModal();
    try {
      await axios.put(
        `${BASE_URL}/api/update-work-order-finish-by-id/${selectedUser}`,
        null,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Data Update Successfully");
      navigate("/work-order");
      fetchStyleData();
    } catch (error) {
      toast.error("Error updating work order");
    }
  };

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
      name: "finished_stock_tcode",
      label: "Barcode",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "finished_stock_barcode",
      label: "Article",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "finished_stock_total",
      label: "Ordered",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "total_receive",
      label: "Received",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "finished_stock_total",
      label: "Balance",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
  const options = {
    selectableRows: "none",
    elevation: 0,

    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
    customToolbar: () => {
      return (
        <Link
        onClick={() => openModal(id)}
        className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md"
      >
        Close Work 
      </Link>
       
      );
    },
  };
  return (
    <Layout>
      
      <div >
        <MUIDataTable
        title='Work Order'
          data={workOrderData ? workOrderData : []}
          columns={columns}
          options={options}
        />
      </div>

      <Dialog open={showModal} handler={closeModal}>
        <DialogHeader>Receive all Material From the Factory?</DialogHeader>
        <DialogBody divider>
          Are you sure you want to close this work order and mark all materials
          as received?
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={closeModal}>
            No
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={updateWorkOrderFinish}
          >
            Yes
          </Button>
        </DialogFooter>
      </Dialog>
    </Layout>
  );
};

export default WorkOrderView;
