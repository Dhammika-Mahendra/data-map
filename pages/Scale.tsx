import React from 'react'
import { ScaleProps, StrNmbArrayElem, StrNmbStrArrayElem, StrStrArray } from './Datatypes'

const Scale:React.FC<ScaleProps>=({arr,min,max})=>{

  console.log(min,max)

  arr.sort((a, b) => b[1] - a[1])
  
  return (
    <div className="flex flex-col justify-between w-56">
      {
        arr.map((el:StrNmbStrArrayElem)=>{
          return <div className="text-[11px] w-200 flex items-center">
                    <div className="w-100 flex justify-end flex-1">
                        <div style={{backgroundColor:el[2],height:'2px',width:`${(el[1]-min)/(max-min)*100}px`}}></div>
                    </div>
                    <div className="w-90 flex justify-start flex-1 pl-[5px]">
                      {el[0]}
                    </div>
                  </div>
        })
      }
    </div>
  )
}

export default Scale;
