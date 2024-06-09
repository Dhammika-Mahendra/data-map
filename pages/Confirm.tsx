import React,{useState,useEffect} from 'react'
import { ConfirmProps, Hovedet, StrNmbArray,StrNmbStrArray,StrStrArray,StrStrArrayElem,StrStrNmbArray, colList, range, valid } from './Datatypes'
import DataField from './DataField'
import Scale from './Scale'
import Colorbar from './Colorbar'
import Hover from './Hover'
import { GiDiceSixFacesThree } from "react-icons/gi";
import { LuDice5 } from "react-icons/lu";
import { SiTicktick } from "react-icons/si";
import { FiHelpCircle } from "react-icons/fi";
import { BiSolidEraser } from "react-icons/bi";
import Help from './Help'
import Alert from './Alert'

const Confirm:React.FC<ConfirmProps>=({SetMap,Map,actdist,setLin,setgroupar,setminmax})=>{
  
  const [distr,setDistr]=useState<StrNmbArray>([
    ['Ampara',0],['Anuradhapura',0],['Badulla',0],['Baticalo',0],['Colombo',0],['Galle',0],['Gampaha',0],['Hambantota',0],['Jafna',0],['Kegalle',0],['Kalutara',0],['Kandy',0],['Kilinochchi',0],['Kurunegala',0],['Mannar',0],['Matale',0],['Matara',0],['Monaragala',0],['Mulative',0],['Nuwara Eliya',0],['Polonnaruwa',0],['Puttalama',0],['Ratnapura',0],['Trincomalee',0],['Wavunia',0]
  ])

  const [scaleArray2,setScaleAr2]=useState<StrNmbStrArray>([['Ampara',0,'rgb(25,255,255)'],['Anuradhapura',0,'rgb(25,255,255)'],['Badulla',0,'rgb(25,255,255)'],['Baticalo',0,'rgb(25,255,255)'],['Colombo',0,'rgb(25,255,255)'],['Galle',0,'rgb(25,255,255)'],['Gampaha',0,'rgb(25,255,255)'],['Hambantota',0,'rgb(25,255,255)'],['Jafna',0,'rgb(25,255,255)'],['Kegalle',0,'rgb(25,255,255)'],['Kalutara',0,'rgb(25,255,255)'],['Kandy',0,'rgb(25,255,255)'],['Kilinochchi',0,'rgb(25,255,255)'],['Kurunegala',0,'rgb(25,255,255)'],['Mannar',0,'rgb(25,255,255)'],['Matale',0,'rgb(25,255,255)'],['Matara',0,'rgb(25,255,255)'],['Monaragala',0,'rgb(25,255,255)'],['Mulative',0,'rgb(25,255,255)'],['Nuwara Eliya',0,'rgb(25,255,255)'],['Polonnaruwa',0,'rgb(25,255,255)'],['Puttalama',0,'rgb(25,255,255)'],['Ratnapura',0,'rgb(25,255,255)'],['Trincomalee',0,'rgb(25,255,255)'],['Wavunia',0,'rgb(25,255,255)']])

  const [range,setRange]=useState<range>({min:0,max:100})
  const [rangeValid,setRangeValid] = useState<range>({min:0,max:100})//validated range to stop components to be connected with range state directly
  const [colList,setColList]=useState<colList>([{id:0,c:0,R:255,G:255,B:255},{id:1,c:400,R:0,G:0,B:255}])
  const [group,setGroup]=useState({status:false,groups:2})

  const [valid,setValid]=useState<valid>({st:true,msg:''})//for data validation
  const [altertst,setalertst]=useState<boolean>(false)//for alert

  const validationData=():boolean=>{
    //console.log(range.min>=range.max)
    if(range.min>=range.max){ 
      setValid({...valid,st:false,msg:'Invalid min max'})
      return false
    }
   
    let distValid:boolean=true
    distr.forEach(el=>{
      if(el[1]<range.min || el[1]>range.max){
        setValid({...valid,st:false,msg:'Values are out of range'})
        distValid= false
      }
    })
    if(!distValid){return false}

    setValid({...valid,st:true,msg:''})
    setRangeValid({min:range.min,max:range.max})
    return true
  }
 //color value of each district is calculated and send to map component (when clicked OK button)

 const sendMapData=()=>{
    let res:boolean=validationData()
    //console.log(res);

    if(!res){//--------------------------------->>>> Validated
      setalertst(true)
      return ''
    }
    setalertst(false)

    let x:number,y:number,z:number;
    let val:StrNmbArray=[...distr]
    let mp:StrStrNmbArray=[...Map]
    let sub:number=Math.abs(range.max-range.min)
    if(!group.status){

      val.forEach((el,ind)=>{
        let scaledC:number=Math.floor(Math.abs(el[1]-range.min)/sub*400);
        let offsetC:number,offsetRange:number;
        offsetC=scaledC
        offsetRange=colList[1].c

        let subR:number=colList[1].R-colList[0].R
        let subG:number=colList[1].G-colList[0].G
        let subB:number=colList[1].B-colList[0].B
  
        x=(colList[0].R+Math.floor((offsetC/offsetRange)*subR))
        y=(colList[0].G+Math.floor((offsetC/offsetRange)*subG))
        z=(colList[0].B+Math.floor((offsetC/offsetRange)*subB))
        mp[ind][1]=`rgb(${x},${y},${z})`
        mp[ind][2]=el[1]
      })

    }else{

      let subR:number=colList[1].R-colList[0].R
      let subG:number=colList[1].G-colList[0].G
      let subB:number=colList[1].B-colList[0].B

      let gapScale:number=1/group.groups
      let colGapScale:number=1/(group.groups-1)

      val.forEach((el,ind)=>{
        let valScale:number=Math.abs(el[1]-range.min)/sub;
        let groupPos:number=Math.floor(valScale/gapScale)

        x=(colList[0].R+Math.floor(groupPos*colGapScale*subR))
        y=(colList[0].G+Math.floor(groupPos*colGapScale*subG))
        z=(colList[0].B+Math.floor(groupPos*colGapScale*subB))
        mp[ind][1]=`rgb(${x},${y},${z})`
        mp[ind][2]=el[1]
      })

    }

    //This is where that scaleArray bounding with Random value proble fixed
    //I don't know why the hell this happens

    let bkup:StrNmbStrArray=[...scaleArray2];
    let bkup2:StrStrNmbArray=[...mp]
    let bkup3:StrNmbArray=[...val]
    bkup.forEach((el,ind)=>{
      el[0]=bkup2[ind][0]
      el[1]=bkup3[ind][1]
      el[2]=bkup2[ind][1]
    })
    setMapScaleCol()
    SetMap(mp)
    setScaleAr2(bkup)
    setBarLimit([calcTopDivH(),calcBotDivH()])
 }

 const sendmapDataTrigger=()=>{
  sendMapData()
  sendMapData()
 }

 //set random values for districts (when clicked random button)------------------------------------
 const setRandVal=():void=>{
    let val:StrNmbArray=[...distr]
    val.forEach((el,ind)=>{
      el[1]=Math.floor(Math.random() * 101) + 50
    })

    setRange({...range,min:50,max:150})
    setRangeValid({...rangeValid,min:50,max:150})
    setDistr(val)
 }

 const [hovdet,setHovdet]=useState<Hovedet>()//details of hover component
 useEffect(()=>{
   //find and send hovered district details
   if(actdist!=null){
    let obj:Hovedet=[scaleArray2[actdist-1][0],scaleArray2[actdist-1][1],0]
    let perc:number=(Math.abs(obj[1]-rangeValid.min)/Math.abs(rangeValid.max-rangeValid.min))*100
    obj[2]=perc
    setHovdet(obj)
  }
 },[actdist,rangeValid])

 const [barlimit,setBarLimit] = useState<[number,number]>([202,202])//height of top and bottom masks covering the colorbar's outer border

 const calcTopDivH=():number=>{
    let mx:number=distr.reduce((elm, ar) => {
      const nmb = ar[1];
      return nmb > elm ? nmb : elm;
    }, distr[0][1]);
    let sub:number=Math.abs(rangeValid.max-mx)
    sub=(sub/Math.abs(rangeValid.max-rangeValid.min))*404
    sub=Math.ceil(sub)
    return sub
 }

 const calcBotDivH=():number=>{
  let mn:number=distr.reduce((elm, ar) => {
    const nmb = ar[1];
    return nmb < elm ? nmb : elm;
  }, distr[0][1]);
  let sub:number=Math.abs(mn-rangeValid.min)
  sub=(sub/Math.abs(rangeValid.max-rangeValid.min))*404
  sub=Math.ceil(sub)
  return sub
}

const setMapScaleCol=()=>{
  if(group.status){
  let i:number=0
  let subR:number=colList[1].R-colList[0].R
  let subG:number=colList[1].G-colList[0].G
  let subB:number=colList[1].B-colList[0].B

  let dist:number=((400/group.groups)/400)*100
  let colGap:number=1/(group.groups-1)
  let point:number=0;
  let x:number,y:number,z:number

  let gael:StrStrArrayElem=['','']
  let ga:StrStrArray=[]

  let str:string='linear-gradient(to top'
  str+=`,rgb(${colList[0].R},${colList[0].G},${colList[0].B}) ${0}%`

  while(i<=group.groups){
    point=i*dist
    x=(colList[0].R+Math.floor(colGap*i*subR))
    y=(colList[0].G+Math.floor(colGap*i*subG))
    z=(colList[0].B+Math.floor(colGap*i*subB))
    str+=`,rgb(${x},${y},${z}) ${point}%,rgb(${x},${y},${z}) ${point+dist}%`

    gael=[`rgb(${x},${y},${z})`,`${point}%`]
    ga.push(gael)
    gael=['','']
    gael=[`rgb(${x},${y},${z})`,`${point+dist}%`]
    ga.push(gael)
    gael=['','']
    i++
  }
  setgroupar(ga)
  }else{
    setgroupar(null)
    setLin({mincolor:`rgb(${colList[1].R},${colList[1].G},${colList[1].B})`,maxcolor:`rgb(${colList[0].R},${colList[0].G},${colList[0].B})`})
  }
  setminmax([rangeValid.min,rangeValid.max])
 } 

 const [help,setHelp] = useState<boolean>(false)

 const clearData=():void=>{
  let val:StrNmbArray=[...distr]
  val.forEach((el,ind)=>{
    el[1]=0
  })
  setRange({min:0,max:100})
  setDistr(val)
  setBarLimit([202,202])
 }

  return (
    <div className="bg-gray-300 h-screen w-[75%] flex flex-col justify-start items-center font-sans">
      
      <div className="w-[95%] h-[540px] flex justify-between items-center">
        <Colorbar setColList={setColList} colList={colList} range={range} setRange={setRange} check={group}  indi={hovdet} barLim={barlimit} actdist={actdist}></Colorbar>
        <Scale arr={scaleArray2} min={rangeValid.min} max={rangeValid.max}></Scale>
        <DataField distr={distr} setDistr={setDistr} setValid={setValid}></DataField>
      </div>

        <div className="flex justify-start items-center h-[5%] w-[90%] mt-[20px] self-start ml-[35px]">
            <div className="flex items-center">
                <div className='flex flex-col items-center'>
                  <p className="text-[14px] inline">Grouped</p>
                  <input type='checkbox' className='cursor-pointer' onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setGroup({...group,status:e.target.checked})} ></input>
                </div>
                <div className="w-[100px]">
                {group.status ? <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setGroup({...group,groups:Math.abs(parseInt(e.target.value))})} className="text-[13px] w-[40px] h-[25px] m-[2px] border border-gray-400 rounded-[5px] bg-gray-50 text-right" value={group.groups}/> : ''}
                </div>
            </div>
            <div className='flex flex-grow-1 justify-between w-[90%]'>
            <div className='flex item-center justify-between'>
                <div className='bt1 ml-[20px]' onClick={setRandVal}><LuDice5 className='mr-[5px]'></LuDice5>Random</div>
                <div className='bt1 ml-[20px]' onClick={clearData}><BiSolidEraser className='mr-[5px]'></BiSolidEraser>Clear</div>
                <div className='bt ml-[20px]' onClick={sendmapDataTrigger}><SiTicktick className='mr-[5px]'></SiTicktick>OK</div>
            </div>
              <div className='bt1 ml-[25px]' onClick={()=>setHelp(true)} ><FiHelpCircle className='mr-[5px]'></FiHelpCircle>help</div>
            </div>
      </div>
    {actdist!=null && hovdet?<Hover dist={hovdet} min={rangeValid.min} max={rangeValid.max}></Hover>:''}
    {help?<Help setHelp={setHelp}></Help>:''}
    {altertst?<Alert valid={valid} setalertst={setalertst}></Alert>:''}
    </div>
  )
}

export default Confirm;

{/**
      <div style={{width:'100%',height:'30px'}}>
        {!valid.st? <p>{valid.msg}</p>:''}
      </div>
 */}