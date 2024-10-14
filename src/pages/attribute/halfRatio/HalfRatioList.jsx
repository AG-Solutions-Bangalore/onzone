import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { FaEdit } from "react-icons/fa";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import MUIDataTable from "mui-datatables";
import { CiEdit } from "react-icons/ci";
import AttributeFilter from "../../../components/AttributeFilter";

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
            <div 
            onClick={() => navigate(`/halfRatio-edit/${id}`)}
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
    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
    customToolbar: () => {
      return (
        <Link
        to="/add-halfratio"
        className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md"
      >
        + H-Ratio
      </Link>
       
      );
    },
  };
  return (
    <Layout>
       <AttributeFilter/>
      
      <div className="mt-2">
        <MUIDataTable
        title='Half Ratio List'
          data={halfRatioData ? halfRatioData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default HalfRatioList;
