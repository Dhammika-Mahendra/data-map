import React,{ useState} from 'react'
import { ColorBarProps, Navig} from '../dataTypes/Datatypes'
import Indicator from './Indicator'

const Colorbar:React.FC<ColorBarProps>=({colList,setColList,range,setRange,check,indi,barLim,actdist})=>{

  const setCol=(e:React.ChangeEvent<HTMLInputElement>)=>{ 
    //hex triplet are broken down and send to confirm component
    let r=parseInt(e.target.value.slice(1,3),16)
    let g=parseInt(e.target.value.slice(3,5),16)
    let b=parseInt(e.target.value.slice(5,7),16)
    setColList(colList.map((el)=>{
      if(e.target.id==`${el.id}`){return {id:parseInt(e.target.id),c:el.c,R:r,G:g,B:b}}else{return el}
    }))

    if(e.target.id==`${colList[0].id}`){
      setMaxCol(e.target.value)
    }else if(e.target.id==`${colList[colList.length-1].id}`){
      setMinCol(e.target.value)
    }
  }

  const [minCol,setMinCol] = useState('#0000FF')
  const [maxCol,setMaxCol] = useState('#FFFFFF')
 //values to navig point squre of colorbar
const [Navig,setNavig]=useState<Navig>({xCoord:0,yCoord:0});

const linear_str=():string=>{
  let i:number=0

  if(!check.status){
    let str:string='linear-gradient(to top'
    colList.forEach((elem,indx) => {
      let point:number=Math.floor(elem.c*100/400)
      str+=`,rgb(${elem.R},${elem.G},${elem.B}) ${point}%`
    });
    str+=')'
    return str
  }else{

    let subR:number=colList[1].R-colList[0].R
    let subG:number=colList[1].G-colList[0].G
    let subB:number=colList[1].B-colList[0].B

    let dist:number=((400/check.groups)/400)*100
    let colGap:number=1/(check.groups-1)
    let point:number=0;
    let x:number,y:number,z:number

    let str:string='linear-gradient(to top'
    str+=`,rgb(${colList[0].R},${colList[0].G},${colList[0].B}) ${0}%`

    while(i<=check.groups){
      point=i*dist
      x=(colList[0].R+Math.floor(colGap*i*subR))
      y=(colList[0].G+Math.floor(colGap*i*subG))
      z=(colList[0].B+Math.floor(colGap*i*subB))
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
          onChange={(e)=>setRange({...range,max:Number(e.target.value)})} value={range.max}></input>
          <input type='color' className="p-0 w-0 h-0 rounded-full mt-[5px]"  style={{border:`10px solid ${minCol}`}} onChange={(e)=>setCol(e)} defaultValue={minCol} 
          id={`${colList[colList.length-1].id}`}></input>
        </div>

      {/* ----------  color bar conatiner ----------------------------- */}
       <div className="w-[80px] h-[404px] flex justify-center items-center relative">
                                      {/*underlying border */} 
        <div className="h-[404px] w-[26px] bg-gray-500 rounded-[12px] absolute right-[27px]"></div>
       
        <div className='w-[80px] h-[404px] absolute right-0 top-0 z-5 flex flex-col justify-between items-center'>{/* top and bottom masks to cover underlying border */}
          <div className="w-[80px] bg-gray-300" style={{height:barLim[0]}}></div>
          <div className="h-[40px] w-[80px] bg-gray-300" style={{height:barLim[1]}}></div>
        </div>

        <div className="h-[400px] w-[20px] inline-block relative rounded-[10px] z-10" style={{background:`${linear_str()}`}}>{/* actual color bar */}
        {actdist!==null?<Indicator val={indi}></Indicator>:''}
        </div>
       </div>

      {/* ----------  min color input ---------------------------------------------- */}
       <div className="mb-[10px] mt-[5px] w-[70px] flex flex-col items-center">
        <input type='color' className="p-0 w-[5px] h-[5px] rounded-full mb-[5px]" style={{border:`10px solid ${maxCol}`}} onChange={(e)=>setCol(e)} defaultValue={maxCol} id={`${colList[0].id}`}
        ></input>
        <input type='number'className="text-[13px] w-[60px] h-[25px] border border-gray-300 rounded-[5px] bg-gray-50 text-right"
        onChange={(e)=>setRange({...range,min:Number(e.target.value)})} value={range.min}></input>
      </div>

    </div>
  )
}

export default Colorbar;