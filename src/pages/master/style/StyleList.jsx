import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { FaEdit } from "react-icons/fa";
import MUIDataTable from "mui-datatables";
import AddStyle from "./AddStyle";
import { CiEdit } from "react-icons/ci";
import MasterFilter from "../../../components/MasterFilter";

const StyleList = () => {
  const [styleData, setStyleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);

  const navigate = useNavigate();

  const fetchStyleData = async () => {
    try {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/fetch-style-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStyleData(response.data?.style);
    } catch (error) {
      console.error("Error fetching Style data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStyleData();
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
      name: "style_type",
      label: "Style",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "style_status",
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
            <div 
            onClick={() => navigate(`/style-edit/${id}`)}
            className="flex items-center space-x-2">
              <CiEdit title="Edit" className="h-5 w-5 cursor-pointer" />
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
       <MasterFilter/>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Style List
        </h3>

        <Link
          to="/add-style"
          className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
        >
          + Create A New Style
        </Link>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={styleData ? styleData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default StyleList;
