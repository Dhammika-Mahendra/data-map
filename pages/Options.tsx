import React, { useEffect, useState } from 'react'
import { OptionsProps } from './Datatypes';
import { FiUpload } from "react-icons/fi";

const Options: React.FC<OptionsProps> = ({setLedgend,setScale,svgref,setbg}) => {

  const [colEn,setcolEn] = useState<boolean>(false)//to display label colors
  const [seaEn,setseaEn] = useState<boolean>(false)//to display sea colors
  const [col,setCol] = useState<string>('white')
  const [seacol,setseaCol] = useState<string>('white')

  useEffect(()=>{
    setLedgend((prev)=>({color:col,enable:prev.enable}))
  },[col])
  
  useEffect(()=>{
    setbg((prev)=>({color:seacol,enable:prev.enable}))
  },[seacol])

    const exportToPng = () => {
        const svgElement = svgref.current;
      
        if (!svgElement) return;
      
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
      
        if (!context) return;
      
        // Create a style element with the font import and append to the cloned SVG
        const clonedSvgElement = svgElement.cloneNode(true) as SVGSVGElement;
        const style = document.createElement('style');
        style.textContent = `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
          text {
            font-family: 'Inter', sans-serif;
          }
        `;
        clonedSvgElement.insertBefore(style, clonedSvgElement.firstChild);
        const svgData = new XMLSerializer().serializeToString(clonedSvgElement);

        const img = new Image();
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
      
        img.onload = () => {
          canvas.width = svgElement.clientWidth;
          canvas.height = svgElement.clientHeight;
      
          context.drawImage(img, 0, 0);
      
          const pngData = canvas.toDataURL('image/png');
      
          const link = document.createElement('a');
          link.href = pngData;
          link.download = 'exported_image.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
      };
      
    const setlegend=(x:boolean)=>{
      setLedgend({enable:x,color:col})
      setcolEn(x)
    }

    const setsea=(x:boolean)=>{
      setbg({enable:x,color:seacol})
      setseaEn(x)
    }

    return (
        <div className="h-screen w-[60px] bg-gray-200 flex flex-col justify-start items-center pt-[30px] pb-[10px]">
            {/* --- Labels -------------------- */}
            <div className='flex flex-col justify-start items-center mb-[5px]'>
              <div className='text-[12px]'>Lables</div>
              <input className='cursor-pointer' type='checkbox' onChange={(e)=>setlegend(e.target.checked)}></input>
            </div>
            
            {colEn?
            <div className='w-[30px] h-[90px] py-[5px] border border-gray-300 rounded-[20px] flex justify-between flex-col  items-center mb-[5px]'>
              <div className='bg-white h-[20px] w-[20px] rounded-[50%] cursor-pointer hover:w-[22px] hover:h-[22px]' onClick={()=>setCol('white')}></div>
              <div className='bg-black h-[20px] w-[20px] rounded-[50%] cursor-pointer hover:w-[22px] hover:h-[22px]' onClick={()=>setCol('black')}></div>
              <div className='bg-gray-400 h-[20px] w-[20px] rounded-[50%] cursor-pointer hover:w-[22px] hover:h-[22px]' onClick={()=>setCol('grey')}></div>
            </div>:''}

            <div className='w-[80%] h-[1px] bg-gray-400 mt-[5px] mb-[10px]'></div>

            {/* --- Scale -------------------- */}
            <div className='flex flex-col justify-start items-center mb-[10px]'>
              <div className='text-[12px]'>Scale</div>
              <input className='cursor-pointer' type='checkbox' onChange={(e)=>setScale(e.target.checked)}></input>
            </div>

            <div className='w-[80%] h-[1px] bg-gray-400 mt-[5px] mb-[10px]'></div>


            {/* --- Background -------------------- */}
            <div className='flex flex-col justify-start items-center mb-[5px]'>
              <div className='text-[12px]'>Sea</div>
              <input className='cursor-pointer' type='checkbox' onChange={(e)=>setsea(e.target.checked)}></input>
            </div>

            {seaEn?
            <div className='w-[30px] h-[60px] py-[5px] border border-gray-300 rounded-[20px] flex justify-between flex-col  items-center mb-[5px]'>
              <div className='bg-white h-[20px] w-[20px] rounded-[50%] cursor-pointer hover:w-[22px] hover:h-[22px]' onClick={()=>setseaCol('white')}></div>
              <div className='bg-[#afeeee] h-[20px] w-[20px] rounded-[50%] cursor-pointer hover:w-[22px] hover:h-[22px]' onClick={()=>setseaCol('#afeeee')}></div>
            </div>:''}

            <div className='w-[80%] h-[1px] bg-gray-400 mt-[5px] mb-[10px]'></div>

            <div className='flex flex-col justify-start items-center mb-[5px] mt-[30px]'>
              <div className='text-[12px]'>Export</div>
              <FiUpload className='mt-[5px] cursor-pointer text-[20px]' onClick={exportToPng}></FiUpload>  
            </div> 
        </div>
    );
}


export default Options;