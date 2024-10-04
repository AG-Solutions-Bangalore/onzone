import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../../base/BaseUrl";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import MUIDataTable from "mui-datatables";

const FactoryList = () => {
  const [factoryData, setFactoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFactoryData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/fetch-factory-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFactoryData(response.data?.factory);
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
      name: "factory_no",
      label: "No",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "factory_name",
      label: "Factory",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "factory_address",
      label: "Address",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "factory_gstin",
      label: "GSTIN",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "factory_contact_name",
      label: "Contact Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "factory_contact_mobile",
      label: "Mobile",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "factory_status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => {
          return (
            <div className="flex items-center space-x-2">
              <FaEdit title="Edit" className="h-5 w-5 cursor-pointer" />
            </div>
          );
        },
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
    setRowProps: (rowData) => {
      return {
        style: {
          borderBottom: "10px solid #f1f7f9",
        },
      };
    },
  };
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Factory List
        </h3>

        <Link className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">
          + Add Factory
        </Link>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={factoryData ? factoryData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default FactoryList;