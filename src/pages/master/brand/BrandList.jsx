import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { ContextPanel } from "../../../utils/ContextPanel";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { FaEdit } from "react-icons/fa";
import MUIDataTable from "mui-datatables";

const BrandList = () => {
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/fetch-brand-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBrandData(response.data?.brand);
      } catch (error) {
        console.error("Error fetching brand data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrandData();
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
      name: "fabric_brand_images",
      label: "Images",
      options: {
        filter: true,
        sort: true,

        customBodyRender: (image) => {
          const imageUrl = image
            ? `https://houseofonzone.com/admin/storage/app/public/Brands/${image}`
            : "https://houseofonzone.com/admin/storage/app/public/no_image.jpg";
          return (
            <img
              src={imageUrl}
              alt="Service"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
          );
        },
      },
    },

    {
      name: "fabric_brand_brands",
      label: "Brand",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "fabric_brand_status",
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
              onClick={() => navigate(`/branch-edit/${id}`)}
              className="flex items-center space-x-2"
            >
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
          Brand List
        </h3>

        <Link
          to="/add-branch"
          className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
        >
          + Add Brand
        </Link>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={brandData ? brandData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default BrandList;
