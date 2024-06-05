import React from 'react'
import { OptionsProps } from './Datatypes';
import { FiUpload } from "react-icons/fi";

const Options: React.FC<OptionsProps> = ({setLedgend,setScale,svgref}) => {

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
      

    return (
        <div className="h-[100%] w-[60px] bg-gray-200 flex flex-col justify-start items-center py-[30px]">
            <input type='checkbox' onChange={(e)=>setLedgend(e.target.checked)}></input>
            <FiUpload className='mt-[10px] cursor-pointer text-[20px]' onClick={exportToPng}></FiUpload>   
        </div>
    );
}


export default Options;