import React from 'react'
import { HoverProps } from './Datatypes';

const Hover:React.FC<HoverProps>=({dist})=>{
  return (
    <div style={{width:'120px',position:'fixed',top:'10px',left:'10px',backgroundColor:'#fafafa',paddingLeft:'10px',paddingRight:'10px',boxShadow:'0px 1px 1px #ebe8e8'}}>
        <p style={{fontSize:'13px',marginBottom:0,marginTop:'2px'}}>{dist[0]}</p>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <p style={{fontSize:'13px',margin:'0'}}>{dist[1]}</p>
            <p style={{fontSize:'13px',margin:'0'}}>%</p>
        </div>
    </div>
  )
}

export default Hover;