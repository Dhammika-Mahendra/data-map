import React from 'react'
import { ScaleProps, StrNmbArrayElem, StrStrArray } from './Datatypes'

const Scale:React.FC<ScaleProps>=({arr,arr2,min,max})=>{

  arr.sort((a, b) => b[1] - a[1])
  
  const findCol=(arr:StrStrArray, letter:string):string=>{
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === letter) {
        return arr[i][1];
      }
    }
    return 'rgb(255,255,255)'; // return null if the letter is not found
  }

  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'230px',height:'400px'}}>
      {
        arr.map((el:StrNmbArrayElem)=>{
          return <div style={{fontSize:'12px',width:'200px',display:'flex',alignItems:'center'}}>
                    <div style={{width:'100px',display:'flex',justifyContent:'right',flex:1}}>
                        <div style={{backgroundColor:findCol(arr2,el[0]),height:'2px',width:`${(el[1]-min)/(max-min)*100}px`}}></div>
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
