import React, { useState } from "react";
import Layout from "../../../layout/Layout";
import { Button, Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack, MdSend } from "react-icons/md";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { toast } from "react-toastify";
import MasterFilter from "../../../components/MasterFilter";

const AddFactory = () => {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [factory, setFactory] = useState({
    factory_name: "",
    factory_address: "",
    factory_gstin: "",
    factory_contact_name: "",
    factory_contact_mobile: "",
    factory_contact_email:"",
  });
  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const validateOnlyText = (inputtxt) => {
    var re = /^[A-Za-z ]+$/;
    if (inputtxt === "" || re.test(inputtxt)) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "factory_contact_mobile") {
      if (validateOnlyDigits(e.target.value)) {
        setFactory({
          ...factory,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "factory_contact_name") {
      if (validateOnlyText(e.target.value)) {
        setFactory({
          ...factory,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setFactory({
        ...factory,
        [e.target.name]: e.target.value,
      });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    let data = {
      factory_name: factory.factory_name,
      factory_address: factory.factory_address,
      factory_gstin: factory.factory_gstin,
      factory_contact_name: factory.factory_contact_name,
      factory_contact_mobile: factory.factory_contact_mobile,
      factory_contact_email: factory.factory_contact_email,
    };

    axios({
      url: BASE_URL + "/api/create-factory",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == "200") {
        toast.success("Factory Create succesfull");

        setFactory({
          factory_name: "",
          factory_address: "",
          factory_gstin: "",
          factory_contact_name: "",
          factory_contact_mobile: "",
          factory_contact_email:"",
        });
        navigate("/factory");
      } else {
        toast.error("Duplicate Entry");
      }
    });
  };
  return (
    <Layout>
       <MasterFilter/>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Create Factory
        </h3>
      </div>
      <div className="w-full mt-5 p-4 bg-white shadow-lg rounded-xl">
        <form id="addIndiv" autoComplete="off" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="form-group">
              <Input
                label="Factory Name"
                type="text"
                name="factory_name"
                value={factory.factory_name}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            <div className="form-group">
              <Input
                label="Email"
                type="text"
                name="factory_contact_email"
                value={factory.factory_contact_email}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            <div className="form-group">
              <Input
                label="Address"
                type="text"
                name="factory_address"
                value={factory.factory_address}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="form-group">
              <Input
                label="GSTIN"
                type="text"
                name="factory_gstin"
                value={factory.factory_gstin}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            <div className="form-group">
              <Input
                label="Contact Name"
                type="text"
                name="factory_contact_name"
                value={factory.factory_contact_name}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
            {/* Service Rate Field */}

            <div className="form-group">
              <Input
                label="Mobile"
                type="text"
                name="factory_contact_mobile"
                maxLength={10}
                minLength={10}
                value={factory.factory_contact_mobile}
                onChange={(e) => onInputChange(e)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md "
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            {/* Submit Button */}

            <Button
              type="submit"
              className="mr-2 mb-2"
              disabled={isButtonDisabled}
            >
              <div className="flex gap-1">
                <MdSend className="w-4 h-4" />
                <span>{isButtonDisabled ? "Submiting..." : "Submit"}</span>
              </div>
            </Button>

            {/* Back Button */}

            <Link to="/factory">
              <Button className="mr-2 mb-2">
                <div className="flex gap-1">
                  <MdArrowBack className="w-5 h-5" />
                  <span>Back</span>
                </div>
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddFactory;
