import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material'; 
import { FaDownload, FaArrowLeft } from 'react-icons/fa';
import Layout from '../../../layout/Layout'
import { toast } from 'react-toastify';
import BASE_URL from '../../../base/BaseUrl';
import axios from 'axios';
import AttributeFilter from '../../../components/AttributeFilter';
import { MdArrowBack, MdSend } from 'react-icons/md';

const AddRatioList = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    
    const onSubmit = (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append("uploaded_file",selectedFile);
      const form = document.getElementById("addIndiv");
      if(!form.checkValidity()){
        toast.error("Fill all required")
        return
      }

      setIsButtonDisabled(true)
        axios({
            url: BASE_URL+"/api/create-ratio-files",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                toast.success("Ratio is Inserted Sucessfully");
            navigate('/ratio')
            }else{
                toast.error("Duplicate Entry");
            }
            
        });
    };
  return (
    <Layout>
         <AttributeFilter/>
         <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Create  Ratio
        </h3>
      </div>
        <div className="w-full  mx-auto  mt-2">
       
      <div className="bg-white shadow-md rounded-lg p-6">
        <form id="addIndiv" autoComplete="off" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <TextField
                  fullWidth
                  type="file"
                  label="Ratio File *"
                  required
                  autoComplete="Name"
                  name="uploaded_file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <span className='text-red-500'>Download a Sample Format of Excel</span>
                <Button className="flex items-center mt-2" color="primary">
                  <a
                    className="flex items-center border border-blue-500 p-2 rounded-lg text-black"
                    href="https://houseofonzone.com/admin/storage/app/public/File/format.xlsx"
                    download="format.xlsx"
                  >
                    <FaDownload className="mr-2" /> Download
                  </a>
                </Button>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex justify-start">
                <Button
                  type="submit"
                  className="mr-2 mb-2 bg-blue-500 text-white hover:bg-blue-600"
                  
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled ? "Sumbiting..." : "Sumbit"}
                </Button>
                <Link to="/ratio">
                  <Button className="mr-2 mb-2 bg-green-500 text-white hover:bg-green-600 flex items-center">
                    <FaArrowLeft className="mr-2" /> Back
                  </Button>
                </Link>
              </div>
            </div>
          </div>
      
        </form>
      </div>
    </div>
    </Layout>
  )
}

export default AddRatioList