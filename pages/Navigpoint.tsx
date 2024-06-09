import React from 'react'
import {NavigPointProps } from '../dataTypes/Datatypes';

const Navigpoint:React.FC<NavigPointProps>=({yCoord,xCoord,enable})=>{
  return (
    <>
    {enable? <div style={{minWidth:"30px",height:"30px",position:"absolute",backgroundColor:"#ebebeb",right:"30px",top:`${yCoord-15}px`,display:'flex',alignItems:'center',paddingLeft:'5px'}}>
        <h3 style={{fontSize:'14px',width:'30px'}}>{Math.ceil(yCoord)}</h3>
        <div style={{	width: 0,height: 0,borderTop:'5px solid transparent',borderLeft: '10px solid #ebebeb',
	      borderBottom: '5px solid transparent',marginRight:'-30px'}}></div>
    </div>: <></>}
    </>
  )
}

export default Navigpoint;
