import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactToPrint from 'react-to-print';
import { CircularProgress } from '@mui/material';
import axios from 'axios'
import Moment from 'moment';
import { Print } from '@mui/icons-material';
import Layout from '../../../layout/Layout'
import BASE_URL from '../../../base/BaseUrl';
import AttributeFilter from '../../../components/AttributeFilter';
const tablelabel = { fontWeight: 'bold' };
const tablecss = { fontSize: '12px' };
const ViewRatioList = () => {
    const {id} = useParams()
    const componentRef = useRef();
    const [ratio, setRatio] = useState({});

    const [loader, setLoader]= useState(true);
    useEffect(() => {
       
    
        axios({
            url: BASE_URL+"/api/fetch-ratio-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then((res) => {
            setRatio(res.data.ratio);
         
          setLoader(false)
        });
      }, []);
  return (
   <Layout>
     <AttributeFilter/>
    <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Ratio {id}
        </h3>

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
                className={`text-right p-4 ${
                  localStorage.getItem("user_type_id") == 4 ? "hidden" : ""
                }`}
              >
                
                <ul className="flex justify-end">
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
                </ul>
             
              </div>
              <div className="p-2" ref={componentRef}>
                                    <div className="justify-content-between" style={{marginTop:'1cm',marginLeft: '1cm', marginRight: '1cm',marginBottom: '1cm', fontSize: '16px' }}>
                                        
                                        <table style={{width:'100%'}}>
                                            <thead>
                                                <tr style={{background: '#84B0CA',textAlign: 'center',color: 'white'}}>
                                                    <th>Swatch</th>
                                                    <th>Mtrs</th>
                                                    <th>Sleeve</th>
                                                    <th>Cons</th>
                                                    <th>Size
                                                        <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                            <th>36</th>
                                                            <th>38</th>
                                                            <th>40</th>
                                                            <th>42</th>
                                                            <th>44</th>
                                                            <th>46</th>
                                                            <th>48</th>
                                                            <th>50</th>
                                                        </tr>
                                                    </th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ratio.map((fabricsub,key)=>(
                                                    <React.Fragment key={key}>
                                                        <tr style={{border:"1px solid black"}}>
                                                            <td rowSpan={5} style={{border:"1px solid black",textAlign:"center"}}><span style={tablecss}></span></td>
                                                            <td rowSpan={5} style={{border:"1px solid black",textAlign:'center'}}><span style={tablecss}>{fabricsub.ratio_mtr}</span></td>
                                                            <td style={{border:"1px solid black",textAlign:'center'}}><span className='font-bold' style={tablecss}>Half</span></td>
                                                            <td style={{border:"1px solid black",textAlign:'center'}}><span className='font-bold' style={tablecss}>1.2</span></td>
                                                            <td style={{border:"1px solid black"}}>
                                                                <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                    <td><span className='font-bold' style={tablecss}>0</span></td>
                                                                    <td><span className='font-bold' style={tablecss}>0</span></td>
                                                                    <td><span className='font-bold' style={tablecss}>0</span></td>
                                                                    <td><span className='font-bold' style={tablecss}>0</span></td>
                                                                    <td><span className='font-bold' style={tablecss}>0</span></td>
                                                                    <td><span className='font-bold' style={tablecss}>0</span></td>
                                                                    <td><span className='font-bold' style={tablecss}>0</span></td>
                                                                    <td><span className='font-bold' style={tablecss}>0</span></td>
                                                                </tr>
                                                            </td>
                                                            <td style={{border:"1px solid black",textAlign:'center'}}><span style={tablecss}>0</span></td>
                                                        </tr>
                                                        <tr style={{border:"1px solid black"}}>
                                                            <td rowSpan={3} style={{border:"1px solid black",textAlign:'center'}}><span style={tablecss}></span></td>
                                                            <td style={{border:"1px solid black",textAlign:'center'}}><span style={tablecss}>PCS</span></td>
                                                            <td style={{border:"1px solid black"}}>
                                                                <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_36_pcs}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_38_pcs}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_40_pcs}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_42_pcs}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_44_pcs}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_46_pcs}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_48_pcs}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_50_pcs}</span></td>
                                                                </tr>
                                                            </td>
                                                            <td rowSpan={4} style={{border:"1px solid black",textAlign:'center'}}><span style={tablecss}>{fabricsub.ratio_total}</span></td>
                                                        </tr>
                                                        <tr style={{border:"1px solid black"}}>
                                                            <td style={{border:"1px solid black",textAlign:'center'}}><span style={tablecss}>RATIO</span></td>
                                                            <td style={{border:"1px solid black"}}>
                                                                <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_36_ratio}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_38_ratio}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_40_ratio}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_42_ratio}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_44_ratio}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_46_ratio}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_48_ratio}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_50_ratio}</span></td>
                                                                </tr>
                                                            </td>
                                                        </tr>
                                                        <tr style={{border:"1px solid black"}}>
                                                            <td style={{border:"1px solid black",textAlign:'center'}}><span style={tablecss}>BITS</span></td>
                                                            <td style={{border:"1px solid black"}}>
                                                                <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_36_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_38_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_40_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_42_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_44_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_46_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_48_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_50_bits}</span></td>
                                                                </tr>
                                                            </td>
                                                        </tr>
                                                        <tr style={{border:"1px solid black"}}>
                                                            <td style={{border:"1px solid black",textAlign:'center'}}><span className='font-bold' style={tablecss}>Full</span></td>
                                                            <td style={{border:"1px solid black",textAlign:'center'}}><span className='font-bold' style={tablecss}>1.4</span></td>
                                                            <td style={{border:"1px solid black"}}>
                                                                <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                    <td><span className='font-bold' style={tablecss}>{fabricsub.ratio_36_pcs + fabricsub.ratio_36_ratio + fabricsub.ratio_36_bits}</span></td>
                                                                    <td><span className='font-bold' style={tablecss}>{fabricsub.ratio_38_pcs + fabricsub.ratio_38_ratio + fabricsub.ratio_38_bits}</span></td>
                                                                    <td><span className='font-bold' style={tablecss}>{fabricsub.ratio_40_pcs + fabricsub.ratio_40_ratio + fabricsub.ratio_40_bits}</span></td>
                                                                    <td><span className='font-bold' style={tablecss}>{fabricsub.ratio_42_pcs + fabricsub.ratio_42_ratio + fabricsub.ratio_42_bits}</span></td>
                                                                    <td><span className='font-bold' style={tablecss}>{fabricsub.ratio_44_pcs + fabricsub.ratio_44_ratio + fabricsub.ratio_44_bits}</span></td>
                                                                    <td><span className='font-bold' style={tablecss}>{fabricsub.ratio_46_pcs + fabricsub.ratio_46_ratio + fabricsub.ratio_46_bits}</span></td>
                                                                    <td><span className='font-bold' style={tablecss}>{fabricsub.ratio_48_pcs + fabricsub.ratio_48_ratio + fabricsub.ratio_48_bits}</span></td>
                                                                    <td><span className='font-bold' style={tablecss}>{fabricsub.ratio_50_pcs + fabricsub.ratio_50_ratio + fabricsub.ratio_50_bits}</span></td>
                                                                </tr>
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                ))}
                                            </tbody>
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

export default ViewRatioList