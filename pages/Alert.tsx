import React, { useEffect } from 'react'
import { alertProps } from './Datatypes';
import { CiWarning } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

const Alert:React.FC<alertProps>=({valid,setalertst})=>{
  useEffect(() => {
    const timer = setTimeout(() => {
      setalertst(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='w-[300px] h-[30px] fixed bottom-[25px] left-[2%] pl-[10px] pr-[10px] shadow-[0_1px_1px_#ebe8e8] bg-red-500 rounded-[5px] border border-red-600 flex justify-between items-center shadow-md'>
        <div className='flex items-center'>
        <CiWarning className='text-white icon-large'></CiWarning>
        <div className='text-[13px] text-white mx-[5px]'>
        {valid.msg}
        </div>
        </div>
        <IoCloseSharp className='text-white cursor-pointer' onClick={()=>setalertst(false)}></IoCloseSharp>
    </div>
  )
}

export default Alert;
