import React from 'react'
import { indProps } from './Datatypes';

const Indicator:React.FC<indProps>=({val})=>{
  
  const calcCord=():number=>{
    if(val!=null){
      return ((100-val[2])/100)*400-5
    }else{
      return 400-5
    }
  }

  return (
    <div className='w-[46px] absolute right-[-13px] flex justify-between items-center' style={{top:`${calcCord()}px`}}>
      <div className='w-0 h-0 border-t-[5px] border-t-transparent border-l-[10px] border-l-gray-500 border-b-[5px] border-b-transparent'></div>
      <div className='w-0 h-0 border-t-[5px] border-t-transparent border-r-[10px] border-r-gray-500 border-b-[5px] border-b-transparent'></div>
    </div>
  )
}

export default Indicator;