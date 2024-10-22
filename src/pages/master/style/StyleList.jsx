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
import { RiDeleteBinLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const StyleList = () => {
  const [styleData, setStyleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp,userType } = useContext(ContextPanel);

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

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios({
        url: BASE_URL + "/api/delete-style/" + id, 
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.code == "200") {
        toast.success("Style Deleted  succesfully")
        setStyleData((prevUserListData) => 
          prevUserListData.filter((user) => user.id !== id && user.style_status === user.style_status)
        );
       
      } else {
        toast.error("Errro occur while delete the Style ");
      }
    } catch (error) {
      console.error("Error Style delete data", error);
      toast.error("Error Style delete data");
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
            <div className="flex gap-2">
            <div 
            onClick={() => navigate(`/style-edit/${id}`)}
            className="flex items-center space-x-2">
              <CiEdit title="Edit" className="h-5 w-5 cursor-pointer" />
            </div>
            {userType == "2" ? (
            <div 
             onClick={(e) => handleDelete(e,id)}
            className="flex items-center space-x-2">
            <MdDeleteOutline title="Delete" className="h-5 w-5 cursor-pointer hover:text-red-500" />
            </div>
            ):("")}
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
        to="/add-style"
        className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md"
      >
        + Style
      </Link>
       
      );
    },
  };
  return (
    <Layout>
       <MasterFilter/>
      
      <div className="mt-5">
        <MUIDataTable
        title='Style List'
          data={styleData ? styleData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default StyleList;
