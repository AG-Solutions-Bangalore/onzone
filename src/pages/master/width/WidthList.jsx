import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { FaEdit } from "react-icons/fa";
import MUIDataTable from "mui-datatables";
import { Link, useNavigate } from "react-router-dom";
import { ContextPanel } from "../../../utils/ContextPanel";
import BASE_URL from "../../../base/BaseUrl";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import MasterFilter from "../../../components/MasterFilter";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const WidthList = () => {
  const [widthData, setWidthData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWidthData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/fetch-width-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWidthData(response.data?.width);
      } catch (error) {
        console.error("Error fetching width data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWidthData();
    setLoading(false);
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
        url: BASE_URL + "/api/delete-width/" + id, 
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.code == "200") {
        toast.success("Width Deleted  succesfully")
        setWidthData((prevUserListData) => 
          prevUserListData.filter((user) => user.id !== id && user.width_status === user.width_status)
        );
       
      } else {
        toast.error("Error occur while delete the Width ");
      }
    } catch (error) {
      console.error("Error Width delete data", error);
      toast.error("Error Width delete data");
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
      name: "width_mea",
      label: "Width",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "width_status",
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
            onClick={() => navigate(`/width-edit/${id}`)}
            className="flex items-center space-x-2">
              <CiEdit title="Edit" className="h-5 w-5 cursor-pointer" />
            </div>
            <div 
            onClick={(e) => handleDelete(e,id)}
            className="flex items-center space-x-2">
                  <MdDeleteOutline title="Delete" className="h-5 w-5 cursor-pointer hover:text-red-500" />
            </div>
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
    customToolbar: () => {
      return (
        <Link
        to="/add-width"
        className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md"
      >
        + Width
      </Link>
       
      );
    },
  };
  return (
    <Layout>
       <MasterFilter/>
      
      <div className="mt-5">
        <MUIDataTable
        title='Width List'
          data={widthData ? widthData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default WidthList;
