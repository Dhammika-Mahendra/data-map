import React,{useState,useEffect} from 'react'
import { ConfirmProps, Hovedet, StrNmbArray, StrNmbArrayElem, StrNmbStrArray, StrStrArray, StrStrNmbArray, colList, range, valid } from './Datatypes'
import DataField from './DataField'
import Scale from './Scale'
import Colorbar from './Colorbar'
import Hover from './Hover'
import { GiDiceSixFacesThree } from "react-icons/gi";
import { SiTicktick } from "react-icons/si";
import { FiHelpCircle } from "react-icons/fi";
import Help from './Help'
import Alert from './Alert'

const Confirm:React.FC<ConfirmProps>=({SetMap,Map,actdist,setLin})=>{
  
  const [distr,setDistr]=useState<StrNmbArray>([
    ['Ampara',0],['Anuradhapura',0],['Badulla',0],['Baticalo',0],['Colombo',0],['Galle',0],['Gampaha',0],['Hambantota',0],['Jafna',0],['Kegalle',0],['Kalutara',0],['Kandy',0],['Kilinochchi',0],['Kurunegala',0],['Mannar',0],['Matale',0],['Matara',0],['Monaragala',0],['Mulative',0],['Nuwara Eliya',0],['Polonnaruwa',0],['Puttalama',0],['Ratnapura',0],['Trincomalee',0],['Wavunia',0]
  ])

  const [scaleArray2,setScaleAr2]=useState<StrNmbStrArray>([['Ampara',0,'rgb(25,255,255)'],['Anuradhapura',0,'rgb(25,255,255)'],['Badulla',0,'rgb(25,255,255)'],['Baticalo',0,'rgb(25,255,255)'],['Colombo',0,'rgb(25,255,255)'],['Galle',0,'rgb(25,255,255)'],['Gampaha',0,'rgb(25,255,255)'],['Hambantota',0,'rgb(25,255,255)'],['Jafna',0,'rgb(25,255,255)'],['Kegalle',0,'rgb(25,255,255)'],['Kalutara',0,'rgb(25,255,255)'],['Kandy',0,'rgb(25,255,255)'],['Kilinochchi',0,'rgb(25,255,255)'],['Kurunegala',0,'rgb(25,255,255)'],['Mannar',0,'rgb(25,255,255)'],['Matale',0,'rgb(25,255,255)'],['Matara',0,'rgb(25,255,255)'],['Monaragala',0,'rgb(25,255,255)'],['Mulative',0,'rgb(25,255,255)'],['Nuwara Eliya',0,'rgb(25,255,255)'],['Polonnaruwa',0,'rgb(25,255,255)'],['Puttalama',0,'rgb(25,255,255)'],['Ratnapura',0,'rgb(25,255,255)'],['Trincomalee',0,'rgb(25,255,255)'],['Wavunia',0,'rgb(25,255,255)']])

 const [range,setRange]=useState<range>({min:0,max:100})
 const [colList,setColList]=useState<colList>([{id:0,c:0,R:255,G:255,B:255},{id:1,c:300,R:0,G:0,B:255}])
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
        setValid({...valid,st:false,msg:'invalid district values'})
        distValid= false
      }
    })
    if(!distValid){return false}

    setValid({...valid,st:true,msg:''})
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
    let sub:number=range.max-range.min
    if(!group.status){

      val.forEach((el,ind)=>{
        let scaledC:number=Math.floor((el[1]-range.min)/sub*300);
        let offsetC:number,offsetRange:number;
        offsetC=scaledC-colList[0].c
        offsetRange=colList[1].c-colList[0].c

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
        let valScale:number=(el[1]-range.min)/sub;
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
    setBarLimit([calcTopDivH(),calcBotDivH()])
    SetMap(mp)
    setScaleAr2(bkup)
 }

 //set random values for districts (when clicked random button)------------------------------------
 const setRandVal=():void=>{
    let val:StrNmbArray=[...distr]
    val.forEach((el,ind)=>{
      el[1]=Math.floor(Math.random() * 101) + 50
    })

    setRange({...range,min:50,max:150})
    setDistr(val)
 }

 const [hovdet,setHovdet]=useState<Hovedet>()
 useEffect(()=>{
  //find and send hovered district details
  if(actdist!=null){
    let obj:Hovedet=[...distr[actdist-1],0]
    let perc:number=(Math.abs(obj[1]-range.min)/Math.abs(range.max-range.min))*100
    obj[2]=perc
    setHovdet(obj)
  }
 },[actdist,range,distr,group])

 const [barlimit,setBarLimit] = useState<[number,number]>([0,0])

 const calcTopDivH=():number=>{
    let mx:number=distr.reduce((elm, ar) => {
      const nmb = ar[1];
      return nmb > elm ? nmb : elm;
    }, distr[0][1]);
    let sub:number=range.max-mx
    sub=(sub/(range.max-range.min))*404
    sub=Math.ceil(sub)
    return sub
 }

 const calcBotDivH=():number=>{
  let mn:number=distr.reduce((elm, ar) => {
    const nmb = ar[1];
    return nmb < elm ? nmb : elm;
  }, distr[0][1]);
  let sub:number=mn-range.min
  sub=(sub/(range.max-range.min))*404
  sub=Math.ceil(sub)
  return sub
}

 const [help,setHelp] = useState<boolean>(false)

  return (
    <div className="bg-gray-200 h-screen w-[75%] flex flex-col justify-evenly items-center font-sans">
      
      <div className="w-[95%] h-[80%] flex justify-between items-center">
        <Colorbar setColList={setColList} colList={colList} range={range} setRange={setRange} check={group} setLin={setLin} indi={hovdet} barLim={barlimit}></Colorbar>
        <Scale arr={scaleArray2} min={range.min} max={range.max}></Scale>
        <DataField distr={distr} setDistr={setDistr} min={range.min} max={range.max} setValid={setValid}></DataField>
      </div>

      <div className="flex justify-between items-center self-start h-[5%]">
            <div className="flex items-center h-[5px]">
                <div>
                  <p className="text-[14px] inline">Grouped</p>
                  <input type='checkbox' className='cursor-pointer' onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setGroup({...group,status:e.target.checked})} ></input>
                </div>
                <div className="w-[100px]">
                {group.status ? <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setGroup({...group,groups:parseInt(e.target.value)})} className="text-[13px] w-[40px] h-[25px] m-[2px] border border-gray-400 rounded-[5px] bg-gray-50 text-right" value={group.groups}/> : ''}
                </div>
            </div>
            <div className='bt' onClick={setRandVal}><GiDiceSixFacesThree className='mr-[5px]'></GiDiceSixFacesThree>Random</div>
            <div className='bt' onClick={sendMapData}><SiTicktick className='mr-[5px]'></SiTicktick>OK</div>
            <div className='bt1' onClick={()=>setHelp(true)} ><FiHelpCircle className='mr-[5px]'></FiHelpCircle>help</div>
      </div>
    {actdist!=null && hovdet?<Hover dist={hovdet} min={range.min} max={range.max}></Hover>:''}
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