import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { FaEye } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import MUIDataTable from "mui-datatables";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import AttributeFilter from "../../../components/AttributeFilter";

const RatioList = () => {

  const [ratioData, setRatioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();


  const fetchRatioData = async () => {
    try {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/fetch-ratio`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRatioData(response.data?.ratio);
    } catch (error) {
      console.error("Error fetching width data", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRatioData();

  }, []);

  const deleteData = async (e, id) => {
    console.log("delete,i d",id)
    e.preventDefault();
    try {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }

      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(`${BASE_URL}/api/delete-ratio-by-id/${id}`,
        {},
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Data Deleted Successfully");
      fetchRatioData();
    } catch (error) {
      console.error("Error deleting data", error);
      toast.error("Error deleting data");
    } finally {
      setLoading(false);
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
      name: "ratio_range",
      label: "Ratio",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "ratio_range",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => {
          console.log("ID passed to delete:", id);
          return (
            <div className="flex items-center space-x-2">
              <IoEyeOutline
              onClick={()=>navigate(`/view-ratio-list/${id}`)}
              title="view" className="h-5 w-5 cursor-pointer" />
              <MdDeleteOutline
                 onClick={(e) => deleteData(e, id)}
              title="Delete" className="h-5 w-5 cursor-pointer" />
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
       <AttributeFilter/>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Ratio List
        </h3>

        <Link to='/add-ratio' className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">
          + Add Ratio
        </Link>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={ratioData ? ratioData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default RatioList;
