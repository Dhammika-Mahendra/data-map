import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { helpProps } from './Datatypes';
import GeogridSL_help from '../public/GeogridSL_help.png'

const Help:React.FC<helpProps>=({setHelp})=>{
  return (
    <div className='w-[90%] h-[90%] fixed top-[5%] left-[5%] bg-white flex flex-col z-20 border border-gray-200 rounded-[5px] shadow-md'>
        <div className='h-[20px] w-[100%] flex justify-end py-[3px] px-[5px] '>
            <IoCloseSharp className='cursor-pointer' onClick={()=>setHelp(false)}></IoCloseSharp>
        </div>
        <div style={{width:'100%',height:'95%',backgroundImage:'url(\'./GeogridSL_help.png\')',backgroundRepeat:'no-repeat',backgroundSize:'contain',backgroundPosition:'center'}}>

        </div>
    </div>
  )
}

export default Help;
