import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { FaEdit } from "react-icons/fa";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import MUIDataTable from "mui-datatables";

const HalfRatioList = () => {
  const [halfRatioData, setHalfRatioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHalfRatioData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/fetch-half-ratio-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHalfRatioData(response.data?.ratioHalf);
      } catch (error) {
        console.error("Error fetching half Ratio data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHalfRatioData();
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
      name: "ratio_range",
      label: "Ratio Half",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "ratio_group",
      label: "Ratio Group",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "ratio_type",
      label: "Ratio Type",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "ratio_status",
      label: "Ratio Status",
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
          Half Ratio List
        </h3>

        <Link
          to="/add-halfratio"
          className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
        >
          + Add Half Ratio
        </Link>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={halfRatioData ? halfRatioData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default HalfRatioList;
