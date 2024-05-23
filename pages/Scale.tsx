import React from 'react'
import { ScaleProps, StrNmbArrayElem } from './Datatypes'

const Scale:React.FC<ScaleProps>=({arr,min,max})=>{

  arr.sort((a, b) => b[1] - a[1])
  
  return (
    <div style={{width:'230px',height:'400px'}}>
      {
        arr.map((el:StrNmbArrayElem)=>{
          return <div style={{fontSize:'12px',width:'200px',display:'flex',alignItems:'center'}}>
                    <div style={{width:'100px',display:'flex',justifyContent:'right',flex:1}}>
                        <div style={{backgroundColor:'#2196f3',height:'2px',width:`${(el[1]-min)/(max-min)*100}px`}}></div>
                    </div>
                    <div style={{width:'90px',display:'flex',justifyContent:'left',flex:1,paddingLeft:'5px'}}>
                      {el[0]}
                    </div>
                  </div>
        })
      }
    </div>
  )
}

export default Scale;
