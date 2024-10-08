import React from 'react'
import DataFieldUnit from './DataFieldUnit'
import { DataFieldProps, StrNmbArray} from '../dataTypes/Datatypes'

const DataField:React.FC<DataFieldProps>=({distr,setDistr})=>{

  const setDistVal=(val:number,ind:number):void=>{
    let tmp:StrNmbArray=[...distr]
    tmp[ind][1]=val
    setDistr(tmp)
  }

  return (
    <div className="flex">
        <div className="flex-col">

        {
        distr!=null?distr.map((el,ind)=>{
          if(ind<13){
            return <DataFieldUnit key={ind} def={el[1]} title={el[0]} setDistVal={setDistVal} index={ind}></DataFieldUnit>
          }
        }):''
      }

        </div>

       <div className="flex-col ml-[10px]">

       {
        distr!=null?distr.map((el,ind)=>{
          if(ind>12){
            return <DataFieldUnit key={ind} def={el[1]} title={el[0]} setDistVal={setDistVal} index={ind}></DataFieldUnit>
          }
        }):''
      }
       </div>
    </div>
  )
}

export default DataField;