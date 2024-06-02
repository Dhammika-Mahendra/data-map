import React from 'react'
import { HoverProps } from './Datatypes';

const Hover:React.FC<HoverProps>=({dist})=>{
  return (
    <div className="w-[120px] fixed top-[10px] left-[10px] bg-gray-50 pl-[10px] pr-[10px] shadow-[0_1px_1px_#ebe8e8]">
        <p className="text-[13px] mb-0 mt-[2px]">{dist[0]}</p>
        <div className="flex justify-between">
            <p className="m-0 text-[13px]">{dist[1]}</p>
            <p className="m-0 text-[13px]">%</p>
        </div>
    </div>
  )
}

export default Hover;