import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../../base/BaseUrl";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import MUIDataTable from "mui-datatables";
import { CiEdit } from "react-icons/ci";
import MasterFilter from "../../../components/MasterFilter";

import { RiDeleteBinLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { ContextPanel } from "../../../utils/ContextPanel";
const FactoryList = () => {
  const [factoryData, setFactoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const {isPanelUp,userType} = useContext(ContextPanel)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFactoryData = async () => {
      try {
      
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
        url: BASE_URL + "/api/delete-factory/" + id, 
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.code == "200") {
        toast.success("Factory Deleted  succesfully")
        setFactoryData((prevUserListData) => 
          prevUserListData.filter((user) => user.id !== id && user.factory_status === user.factory_status)
        );
       
      } else {
        toast.error("Errro occur while delete the Factory ");
      }
    } catch (error) {
      console.error("Error Factory delete data", error);
      toast.error("Error Factory delete data");
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
            <div className="flex gap-2">
            <div 
            onClick={() => navigate(`/factory-edit/${id}`)}
            className="flex items-center space-x-2">
              <CiEdit title="Edit" className="h-5 w-5 cursor-pointer" />
            </div>
            {userType == "2" ? (
            <div 
            onClick={(e) => handleDelete(e,id)}
            className="flex items-center space-x-2">
              <MdDeleteOutline title="Delete" className="h-5 w-5 cursor-pointer hover:text-red-500" />
            </div>
             ) : (
              ""
            )}
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
        to="/add-factory"
        className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md"
      >
        + Factory
      </Link>
       
      );
    },
  };
  return (
    <Layout>
       <MasterFilter/>
      
      <div className="mt-5">
        <MUIDataTable
        title='Factory List'
          data={factoryData ? factoryData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default FactoryList;
