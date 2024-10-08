import React from 'react'
import { DataFieldUnitProps } from '../dataTypes/Datatypes'

const DataFieldUnit:React.FC<DataFieldUnitProps>=({title,def,setDistVal,index})=>{

  return (
    <div className="flex items-baseline bg-gray-200 mt-[3px] pl-[10px] pr-[10px] rounded-[6px] w-[100%] border border-gray-200 py-[3px]">
        <p className="text-[13px] flex-1 m-0">{title}</p>
        <input type='number' className="text-[13px] m-0 w-[100px] h-[25px] border border-gray-200 flex-1 bg-gray-200 text-right text-black" value={def} onChange={(e)=>setDistVal(Number(e.target.value),index)}></input>
    </div>
  )
}

export default DataFieldUnit;