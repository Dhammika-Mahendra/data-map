import React from 'react'
import { HoverProps } from './Datatypes';

const Hover:React.FC<HoverProps>=({dist})=>{
  return (
    <div style={{width:'120px',height:'50px',position:'fixed',top:'20px',left:'260px',backgroundColor:'#fafafa',paddingLeft:'10px',boxShadow:'0px 1px 1px #ebe8e8',borderRadius:'4px'}}>
        <p style={{fontSize:'18px'}}>{dist[0]}</p>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <p style={{fontSize:'16px'}}>{dist[1]}</p>
            <p style={{fontSize:'16px',marginRight:'20px'}}>%</p>
        </div>
    </div>
  )
}

export default Hover;