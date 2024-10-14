import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { ContextPanel } from "../../../utils/ContextPanel";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { CiEdit } from "react-icons/ci";
import MUIDataTable from "mui-datatables";
import MasterFilter from "../../../components/MasterFilter";
import { motion } from "framer-motion";

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
  }, [isPanelUp, navigate]);

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
            <motion.img
              src={imageUrl}
              alt="Service"
              className="rounded-lg"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
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
            <motion.div
              onClick={() => navigate(`/branch-edit/${id}`)}
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CiEdit title="Edit" className="h-5 w-5 cursor-pointer" />
            </motion.div>
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
        to="/add-brand"
        className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md"
      >
        + Brand
      </Link>
       
      );
    },
    
  };

  return (
    <Layout>
      <MasterFilter/>
      

      <motion.div
        className="mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <MUIDataTable
        title='Brand List'
          data={brandData ? brandData : []}
          columns={columns}
          options={options}
        />
      </motion.div>
    </Layout>
  );
};

export default BrandList;
