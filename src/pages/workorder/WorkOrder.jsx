import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../layout/Layout'
import { useParams } from 'react-router-dom'
import ReactToPrint from 'react-to-print';
import { CircularProgress } from '@mui/material';
import axios from 'axios'
import BASE_URL from '../../base/BaseUrl'
import Moment from 'moment';
import { Print } from '@mui/icons-material';

const tablelabel = { fontWeight: 'bold' };
const tablecss = { fontSize: '14px' };
const WorkOrder = () => {
    const {id} = useParams()
    const componentRef = useRef();
    const [workorder, setWorkOrder] = useState([]);
    const [workordersub, setWorkOrderSub] = useState({});
    const [workorderfooter, setWorkOrderFooter] = useState([]);
    const [loader, setLoader]= useState(true);
    useEffect(() => {
       
    
        axios({
            url: BASE_URL+"/api/fetch-work-order-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then((res) => {
            setWorkOrder(res.data.workorder);
            setWorkOrderSub(res.data.workordersub);
            setWorkOrderFooter(res.data.workorderfooter);
          setLoader(false)
        });
      }, []);

      const sizeCell = (content) => (
        <td style={{
            border: '1px solid #000',
            borderTop: 'none',
            borderBottom: 'none',
            padding: '4px',
            textAlign: 'center'
        }}>
            <span style={tablecss}>{content}</span>
        </td>
    );

    const renderValue = (value) => {
      return value == '0' ? <span className='text-gray-500' >-</span> : value;
    };

    
  return (
    <Layout>
         <div className="flex flex-col md:flex-row justify-between items-center bg-white  p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Work Order
        </h3>
        <ul className="flex justify-end">
                  <li>
                    <ReactToPrint
                      trigger={() => (
                        <button className="flex items-center border  border-blue-500 hover:border-green-500 hover:animate-pulse p-2 rounded-lg">
                          <Print className="mr-2" size={16} />
                          Print
                        </button>
                      )}
                      content={() => componentRef.current}
                    />
                  </li>
                </ul> 

      </div>
       <div>
      {loader && (
        <CircularProgress
          disableShrink
          className="ml-[600px] mt-[300px] mb-[300px]"
          color="secondary"
        />
      )}
      {!loader && (
        <>
          <div className="mx-auto w-full mt-4 ">
            <div className="bg-white shadow-md rounded-lg">
              <div
                className={`text-right p-2 ${
                  localStorage.getItem("user_type_id") == 4 ? "hidden" : ""
                }`}
              >
                {/* <ul className="flex justify-end">
                  <li>
                    <ReactToPrint
                      trigger={() => (
                        <button className="flex items-center border  border-blue-500 p-2 rounded-lg">
                          <Print className="mr-2" size={18} />
                          Print
                        </button>
                      )}
                      content={() => componentRef.current}
                    />
                  </li>
                </ul> */}
              </div>
              <div className="p-5" ref={componentRef}>
                <div className="mx-4 text-base">
                  <table className="w-full">
                    <tbody>
                      <tr  >
                        <td className=' text-sm' >Factory&nbsp;:&nbsp;<span className='font-bold'>{workorder.work_order_factory}</span></td>
                      
                        <td className='text-sm'>Brands&nbsp;:&nbsp;<span className='font-bold'>{workorder.work_order_brand}</span></td>
                        <td className='text-sm'>Ratio&nbsp;:&nbsp;<span className='font-bold'>{workorder.work_order_ratio}</span></td>
                  
                        
                        
                       
                        <td className='text-sm'>Width&nbsp;:&nbsp;<span className='font-bold'>{workorder.work_order_width}</span></td>
                      </tr>
                      <tr>
                       
                      <td className='text-sm'>Work Date&nbsp;:&nbsp;<span className='font-bold'>{Moment(workorder.work_order_date).format('DD-MM-YYYY')}</span></td>
                        <td className='text-sm'>Remarks&nbsp;:&nbsp;<span className='font-bold'>{workorder.work_order_remarks}</span></td>
                        
                        
                      </tr>
                   
                    </tbody>
                  </table>
                  <hr className="my-4  border border-gray-400" />
                  <table style={{width:'100%', border:'1px solid #000'}}>
                                                <thead>
                                                    <tr style={{background: '#84B0CA',textAlign: 'center',color: 'white'}}>
                                                        <th className='w-1/3' style={{border:'1px solid #000'}}>Swatch</th>
                                                        <th className='w-5' style={{border:'1px solid #000'}}>Mtrs</th>
                                                        <th className='w-24 p-2' style={{border:'1px solid #000'}}>Code MRP</th>
                                                        {/* <th style={{border:'1px solid #000'}}>Sleeve</th> 1 */}
                                                        <th className='w-5 p-2' style={{border:'1px solid #000'}}>Cons</th>
                                                        <th style={{border:'1px solid #000'}}>36</th>
                                                        <th style={{border:'1px solid #000'}}>38</th>
                                                        <th style={{border:'1px solid #000'}}>40</th>
                                                        <th style={{border:'1px solid #000'}}>42</th>
                                                        <th style={{border:'1px solid #000'}}>44</th>
                                                        <th style={{border:'1px solid #000'}}>46</th>
                                                        <th style={{border:'1px solid #000'}}>48</th>
                                                        <th style={{border:'1px solid #000'}}>50</th>
                                                        {/* <th style={{border:'1px solid #000'}}>Size
                                                            <tr style={{display:'flex',justifyContent:'space-around',border:'1px solid #000',fontSize:'20px'}}>
                                                                <th  >36</th>
                                                                <th  >38</th>
                                                                <th >40</th>
                                                                <th >42</th>
                                                                <th >44</th>
                                                                <th >46</th>
                                                                <th >48</th>
                                                                <th >50</th>
                                                            </tr>
                                                        </th> */}
                                                        <th style={{border:'1px solid #000'}}>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {workordersub.map((fabricsub,key)=>(
                                                        <>
                                                        <tr style={{border:"1px solid rgb(0, 0, 0)"}}>
                                                            <td rowSpan={5} style={{border:"1px solid rgb(0, 0, 0)",textAlign:"center"}}><span style={tablecss}></span></td>
                                                            <td rowSpan={5} style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{fabricsub.work_order_sub_length}</span></td>
                                                            <td rowSpan={2} style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{fabricsub.work_order_sub_barcode}</span></td>
                                                            {/* <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>Half</span></td> */}
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{workorder.work_order_ratio_h_consumption}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_36_h)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_38_h)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_40_h)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_42_h)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_44_h)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_46_h)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_48_h)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_50_h)}</span></td>
                                                            
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{fabricsub.work_order_sub_half_total}</span></td>
                                                        </tr>
                                                        <tr style={{border:"1px solid rgb(0, 0, 0)"}}>
                                                            {/* <td  style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}></span></td> */}
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>PCS</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_36_pcs)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_38_pcs)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_40_pcs)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_42_pcs)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_44_pcs)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_46_pcs)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_48_pcs)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_50_pcs)}</span></td>

                                                            
                                                            
                                                            <td rowSpan={4} style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{fabricsub.work_order_sub_full_total}</span></td>
                                                        </tr>
                                                        <tr style={{border:"1px solid rgb(0, 0, 0)"}}>
                                                        <td rowSpan={3} style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{fabricsub.work_order_sub_amount}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>RATIO</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_36_ratio)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_38_ratio)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_40_ratio)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_42_ratio)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_44_ratio)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_36_ratio)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_48_ratio)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_50_ratio)}</span></td>
                                                            
                                                            
                                                        </tr>
                                                        <tr style={{border:"1px solid rgb(0, 0, 0)"}}>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>BITS</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_36_bits)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_38_bits)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_40_bits)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_42_bits)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_44_bits)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_46_bits)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_48_bits)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}>{renderValue(fabricsub.work_order_sub_50_bits)}</span></td>
                                                            
                                                        </tr>
                                                        <tr style={{borderBottom:"2px solid rgb(0, 0, 0)"}}>
                                                            {/* <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>Full</span></td> */}
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{workorder.work_order_ratio_consumption}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_36_pcs + fabricsub.work_order_sub_36_ratio + fabricsub.work_order_sub_36_bits)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_38_pcs + fabricsub.work_order_sub_38_ratio + fabricsub.work_order_sub_38_bits)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_40_pcs + fabricsub.work_order_sub_40_ratio + fabricsub.work_order_sub_40_bits)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_42_pcs + fabricsub.work_order_sub_42_ratio + fabricsub.work_order_sub_42_bits)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_44_pcs + fabricsub.work_order_sub_44_ratio + fabricsub.work_order_sub_44_bits)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_46_pcs + fabricsub.work_order_sub_46_ratio + fabricsub.work_order_sub_46_bits)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_48_pcs + fabricsub.work_order_sub_48_ratio + fabricsub.work_order_sub_48_bits)}</span></td>
                                                            <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(fabricsub.work_order_sub_50_pcs + fabricsub.work_order_sub_50_ratio + fabricsub.work_order_sub_50_bits)}</span></td>
                                                            
                                                        </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                                {workorderfooter.map((wsub,key)=>(
                                                <tfoot>
                                                    <tr>
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}></span></td>
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold p-1' style={tablecss}>{Math.floor(wsub.work_order_sub_length * 100) / 100}</span></td>
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}></span></td>
                                                        {/* <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>Half</span></td> */}
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}></span></td>
                                                        <td className='font-bold' style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}></span>{renderValue(wsub.work_order_sub_36_h)}</td>
                                                        <td className='font-bold' style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}></span>{renderValue(wsub.work_order_sub_38_h)}</td>
                                                        <td className='font-bold' style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}></span>{renderValue(wsub.work_order_sub_40_h)}</td>
                                                        <td className='font-bold' style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}></span>{renderValue(wsub.work_order_sub_42_h)}</td>
                                                        <td className='font-bold' style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}></span>{renderValue(wsub.work_order_sub_44_h)}</td>
                                                        <td className='font-bold' style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}></span>{renderValue(wsub.work_order_sub_46_h)}</td>
                                                        <td className='font-bold' style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}></span>{renderValue(wsub.work_order_sub_48_h)}</td>
                                                        <td className='font-bold' style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}></span>{renderValue(wsub.work_order_sub_50_h)}</td>
                                                        
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{wsub.work_order_sub_half_total}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2} style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}></span></td>
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}></span></td>
                                                        {/* <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>Full</span></td> */}
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span style={tablecss}></span></td>
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(wsub.sum_36_pcs)}</span></td>
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(wsub.sum_38_pcs)}</span></td>
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(wsub.sum_40_pcs)}</span></td>
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(wsub.sum_42_pcs)}</span></td>
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(wsub.sum_44_pcs)}</span></td>
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(wsub.sum_46_pcs)}</span></td>
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(wsub.sum_48_pcs)}</span></td>
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{renderValue(wsub.sum_50_pcs)}</span></td>
                                                        
                                                        <td style={{border:"1px solid rgb(0, 0, 0)",textAlign:'center'}}><span className='font-bold' style={tablecss}>{wsub.work_order_sub_full_total}</span></td>
                                                    </tr>
                                                </tfoot>
                                                ))}
                                            </table>
                </div>
              </div>
            </div>
          </div>
          
        </>
      )}
    </div>
    </Layout>
  )
}

export default WorkOrder