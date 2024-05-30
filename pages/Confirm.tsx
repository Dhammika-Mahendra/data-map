import React,{useState,useEffect} from 'react'
import { ConfirmProps, Hovedet, StrNmbArray, StrNmbArrayElem, StrStrArray, colList, range, valid } from './Datatypes'
import DataField from './DataField'
import Scale from './Scale'
import Colorbar from './Colorbar'
import Hover from './Hover'

const Confirm:React.FC<ConfirmProps>=({SetMap,Map,actdist})=>{
  
  const [distr,setDistr]=useState<StrNmbArray>([
    ['Ampara',0],['Anuradhapura',0],['Badulla',0],['Baticalo',0],['Colombo',0],['Galle',0],['Gampaha',0],['Hambantota',0],['Jafna',0],['Kegalle',0],['Kalutara',0],['Kandy',0],['Kilinochchi',0],['Kurunegala',0],['Mannar',0],['Matale',0],['Matara',0],['Monaragala',0],['Mulative',0],['Nuwara Eliya',0],['Polonnaruwa',0],['Puttalama',0],['Ratnapura',0],['Trincomalee',0],['Wavunia',0]
  ])

  const [scaleAr,setScaleAr]=useState<StrNmbArray>([['Ampara',0],['Anuradhapura',0],['Badulla',0],['Baticalo',0],['Colombo',0],['Galle',0],['Gampaha',0],['Hambantota',0],['Jafna',0],['Kegalle',0],['Kalutara',0],['Kandy',0],['Kilinochchi',0],['Kurunegala',0],['Mannar',0],['Matale',0],['Matara',0],['Monaragala',0],['Mulative',0],['Nuwara Eliya',0],['Polonnaruwa',0],['Puttalama',0],['Ratnapura',0],['Trincomalee',0],['Wavunia',0]
])

 const [range,setRange]=useState<range>({min:0,max:100})
 const [colList,setColList]=useState<colList>([{id:0,c:0,R:255,G:255,B:255},{id:1,c:300,R:0,G:0,B:255}])
 const [group,setGroup]=useState({status:false,groups:2})
 const [scaleCol,setScaleCol]=useState<StrStrArray>(Map)
 //to get a deep copy of distr arr, since scale graph shown only after validation
 //I don't know why spread operator doesn't work
/*   const copyArr=(arr:StrNmbArray):StrNmbArray=>{
    let Final : StrNmbArray;
    let unit : [string, number];
    arr.forEach((el)=>{
      unit.push(el[0])
      unit.push(el[1])
      Final.push(unit)
      unit.splice(0,2)
    })
    return Final;
  } */
  const [valid,setValid]=useState<valid>({st:true,msg:''})//for data validation

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

    if(!res){return ''}//--------------------------------->>>> Validated

    setScaleAr([...distr])

    let x:number,y:number,z:number;
    let val:StrNmbArray=[...distr]
    let mp:StrStrArray=[...Map]
    let sub:number=range.max-range.min
    if(!group.status){

      val.forEach((el,ind)=>{
        let scaledC:number=Math.floor((el[1]-range.min)/sub*300);
        let offsetC:number,offsetRange:number;
        offsetC=scaledC-colList[0].c
        offsetRange=colList[1].c-colList[0].c
/*           colList.forEach((elm,indx)=>{
              if(elm.c>scaledC && got==false){
                got=true
                cord=indx
                console.log(indx)
                offsetC=scaledC-colList[indx-1].c
                offsetRange=elm.c-colList[indx-1].c
              }else if(indx==colList.length-1){
                cord=indx
                offsetC=scaledC-colList[indx-1].c
                offsetRange=elm.c-colList[indx-1].c
              }
          }) */
        let subR:number=colList[1].R-colList[0].R
        let subG:number=colList[1].G-colList[0].G
        let subB:number=colList[1].B-colList[0].B
  
        x=(colList[0].R+Math.floor((offsetC/offsetRange)*subR))
        y=(colList[0].G+Math.floor((offsetC/offsetRange)*subG))
        z=(colList[0].B+Math.floor((offsetC/offsetRange)*subB))
        mp[ind][1]=`rgb(${x},${y},${z})`
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
      })

    }
    SetMap(mp)
    setScaleCol(mp)
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
    let perc:number=((obj[1]-range.min)/(range.max-range.min))*100
    obj[2]=perc
    setHovdet(obj)
  }
 },[actdist,range,distr,group])

  return (
    <div style={{backgroundColor:'#fafafa',height:'100vh'}}>
      
      <div style={{display:'flex',height:'95vh',justifyContent:'space-between',alignItems:'center'}}>
        <Colorbar setColList={setColList} colList={colList} range={range} setRange={setRange} check={group}></Colorbar>
        <Scale arr={scaleAr} arr2={scaleCol} min={range.min} max={range.max}></Scale>
        <DataField distr={distr} setDistr={setDistr} min={range.min} max={range.max} setValid={setValid}></DataField>
      </div>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex'}}>
                <div>
                  <p style={{fontSize:'14px',display:'inline'}}>Grouped</p>
                  <input type='checkbox' onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setGroup({...group,status:e.target.checked})} ></input>
                </div>
                <div style={{width:'100px'}}>
                {group.status ? <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setGroup({...group,groups:parseInt(e.target.value)})} style={{width:'40px',height:'25px',margin:'2px',border:'1px solid #fafafa',borderBottom:'1px solid #a7abab'}} value={group.groups}/> : ''}
                </div>
            </div>
            <button onClick={setRandVal}>Random</button>
            <button onClick={sendMapData}>OK</button>
      </div>
    {actdist!=null && hovdet?<Hover dist={hovdet}></Hover>:''}

    </div>
  )
}

export default Confirm;

{/**
      <div style={{width:'100%',height:'30px'}}>
        {!valid.st? <p>{valid.msg}</p>:''}
      </div>
 */}