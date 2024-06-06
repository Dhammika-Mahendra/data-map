import React from 'react';

//Confirm page==================================================>>>>>>>>>>>>>>>>

export interface ConfirmProps{
    SetMap:React.Dispatch<React.SetStateAction<StrStrNmbArray>>,
    Map:StrStrNmbArray,
    actdist:number|null,
    setLin:React.Dispatch<React.SetStateAction<linProps>>
}

export type StrStrArrayElem = [string, string];
export type StrStrArray = StrStrArrayElem[];    

export type StrNmbArrayElem = [string, number];
export type StrNmbArray = StrNmbArrayElem[];

export type StrNmbStrArrayElem = [string, number, string];
export type StrNmbStrArray = StrNmbStrArrayElem[];

export type StrStrNmbArrayElem = [string, string, number];
export type StrStrNmbArray = StrStrNmbArrayElem[];

export type range ={min:number,max:number}
export type colListElem ={id:number,c:number,R:number,G:number,B:number}
export type colList =colListElem[]

export type group ={status:boolean,groups:number}
export type valid ={st:boolean,msg:string}

export interface helpProps{
    setHelp:React.Dispatch<React.SetStateAction<boolean>>
}

//DataField ==================================================>>>>>>>>>>>>>>>>
export interface DataFieldUnitProps{
    title:string,
    def:number,
    setDistVal:(val:number,ind:number)=>void,
    index:number
}

export interface DataFieldProps{
    distr:StrNmbArray,
    setDistr:React.Dispatch<React.SetStateAction<StrNmbArray>>,
    setValid:React.Dispatch<React.SetStateAction<valid>>,
    min:number,
    max:number
}

//Scale=====================================================>>>>>>>>>>>>>>>>>>
export interface ScaleProps{
    arr:StrNmbStrArray
    min:number,
    max:number
}

//Colobar =====================================================>>>>>>>>>>>>>>>>>
export interface ColorBarProps{
    colList:colList
    setColList:React.Dispatch<React.SetStateAction<colList>>,
    range:range,
    setRange:React.Dispatch<React.SetStateAction<range>>,
    check:group,
    setLin:React.Dispatch<React.SetStateAction<linProps>>,
    indi:Hovedet|undefined,
    barLim:[number,number]
}

export type Navig={
    xCoord:number,
    yCoord:number,
}

export interface NavigPointProps{
    yCoord:number,
    xCoord:number,
    enable:boolean
}

export type Hovedet=[string,number,number]

export interface HoverProps{
    dist:Hovedet,
    min:number,
    max:number
}

//Map page ============================================>>>>>>>>>>>>>>>>>>>>>>>>>>>
export interface ledgendProps{
    enable:boolean,
    color:string
}

export interface OptionsProps{
    setLedgend:React.Dispatch<React.SetStateAction<ledgendProps>>,
    setScale:React.Dispatch<React.SetStateAction<boolean>>,
    setbg:React.Dispatch<React.SetStateAction<boolean>>,
    svgref:React.RefObject<SVGSVGElement>
}

export interface linProps{
    min:number,
    max:number,
    mincolor:string,
    maxcolor:string
}


export interface indProps{
    val:Hovedet|undefined
}