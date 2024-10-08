import React,{useState} from 'react'
import { ColorBarProps} from '../dataTypes/Datatypes'
import Indicator from './Indicator'

const Colorbar:React.FC<ColorBarProps>=({colList,setColList,range,setRange,indi,barLimMin,barLimMax,actdist,groupStatus,groups})=>{

  const [minCol,setMinCol] = useState<string>('#FFFFFF')
  const [maxCol,setMaxCol] = useState<string>('#0000FF')

  const setCol=(e:React.ChangeEvent<HTMLInputElement>)=>{ 
    //hex triplet are broken down and send to confirm component
    let r=parseInt(e.target.value.slice(1,3),16)
    let g=parseInt(e.target.value.slice(3,5),16)
    let b=parseInt(e.target.value.slice(5,7),16)
    
    if(e.target.id==='0'){
      setMinCol(e.target.value)
      setColList({...colList,Min:{R:r,G:g,B:b}})
    }else if(e.target.id==='1'){
      setMaxCol(e.target.value)
      setColList({...colList,Max:{R:r,G:g,B:b}})
    }
  }

const linear_str=():string=>{
  let i:number=0
  if(!groupStatus){
    let str:string=`linear-gradient(to top,rgb(${colList?.Min?colList.Min.R:0},${colList?.Min?colList.Min.G:0},${colList?.Min?colList.Min.B:0}) 0%,rgb(${colList?.Max?colList.Max.R:0},${colList?.Max?colList.Max.G:0},${colList?.Max?colList.Max.B:0}) 100%)`
    return str
  }else{
    let subRr:number=colList?.Min?colList.Min.R:0
    let subGr:number=colList?.Min?colList.Min.G:0
    let subBr:number=colList?.Min?colList.Min.B:0
    let subR:number=colList?.Max?colList.Max.R:0
    let subG:number=colList?.Max?colList.Max.G:0
    let subB:number=colList?.Max?colList.Max.B:0
    subR=subR-subRr
    subG=subG-subGr
    subB=subB-subBr

    let dist:number=((400/groups)/400)*100
    let colGap:number=1/(groups-1)
    let point:number=0;
    let x:number,y:number,z:number

    let str:string='linear-gradient(to top'
    str+=`,rgb(${colList?.Min?colList.Min.R:0},${colList?.Min?colList.Min.G:0},${colList?.Min?colList.Min.B:0}) ${0}%`

    while(i<=groups){
      point=i*dist
      x=colList?.Min?colList.Min.R:0
      y=colList?.Min?colList.Min.G:0
      z=colList?.Min?colList.Min.B:0
      x=(x+Math.floor(colGap*i*subR))
      y=(y+Math.floor(colGap*i*subG))
      z=(z+Math.floor(colGap*i*subB))
      str+=`,rgb(${x},${y},${z}) ${point}%,rgb(${x},${y},${z}) ${point+dist}%`

      i++
    }
    str+=')'
    return str
  }
 }

  return (

    <div className="w-auto flex flex-col items-center">

        {/* ----------  max color input ---------------------------------------------- */}
        <div className="mt-[10px] mb-[5px] w-[70px] flex flex-col items-center">
          <input type='number' className="text-[13px] w-[60px] h-[25px] border border-gray-300 rounded-[5px] bg-gray-50 text-right"
          onChange={(e)=>setRange({...range,max:Number(e.target.value)})} value={range!=null?range.max:0}></input>
          <input type='color' className="p-0 w-0 h-0 rounded-full mt-[5px]"  style={{border:`10px solid ${maxCol}`}} onChange={(e)=>setCol(e)} defaultValue={maxCol} 
          id={'1'}></input>
        </div>

      {/* ----------  color bar conatiner ----------------------------- */}
       <div className="w-[80px] h-[404px] flex justify-center items-center relative">
                                      {/*underlying border */} 
        <div className="h-[404px] w-[26px] bg-gray-500 rounded-[12px] absolute right-[27px]"></div>
       
        <div className='w-[80px] h-[404px] absolute right-0 top-0 z-5 flex flex-col justify-between items-center'>{/* top and bottom masks to cover underlying border */}
          <div className="w-[80px] bg-gray-300" style={{height:barLimMin}}></div>
          <div className="h-[40px] w-[80px] bg-gray-300" style={{height:barLimMax}}></div>
        </div>

        <div className="h-[400px] w-[20px] inline-block relative rounded-[10px] z-10" style={{background:`${linear_str()}`}}>{/* actual color bar */}
        {actdist!==null?<Indicator val={indi}></Indicator>:''}
        </div>
       </div>

      {/* ----------  min color input ---------------------------------------------- */}
       <div className="mb-[10px] mt-[5px] w-[70px] flex flex-col items-center">
        <input type='color' className="p-0 w-[5px] h-[5px] rounded-full mb-[5px]" style={{border:`10px solid ${minCol}`}} onChange={(e)=>setCol(e)} defaultValue={minCol} id={'0'}
        ></input>
        <input type='number'className="text-[13px] w-[60px] h-[25px] border border-gray-300 rounded-[5px] bg-gray-50 text-right"
        onChange={(e)=>setRange({...range,min:Number(e.target.value)})} value={range!=null?range.min:0}></input>
      </div>

    </div>
  )
}

export default Colorbar;