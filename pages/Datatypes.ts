import React from 'react';

//Confirm page==================================================>>>>>>>>>>>>>>>>

export type StrStrArrayElem = [string, string];
export type StrStrArray = StrStrArrayElem[];    

export type StrNmbArrayElem = [string, number];
export type StrNmbArray = StrNmbArrayElem[];

export type range ={min:number,max:number}
export type colListElem ={id:number,c:number,R:number,G:number,B:number}
export type colList =colListElem[]

export type group ={status:boolean,groups:number}
export type valid ={st:boolean,msg:string}

//DataField page==================================================>>>>>>>>>>>>>>>>
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

export interface ScaleProps{
    arr:StrNmbArray,
    arr2:StrStrArray,
    min:number,
    max:number
}

export interface ConfirmProps{
    SetMap:React.Dispatch<React.SetStateAction<StrStrArray>>,
    Map:StrStrArray,
    actdist:number|null
}

export interface ColorBarProps{
    colList:colList
    setColList:React.Dispatch<React.SetStateAction<colList>>,
    range:range,
    setRange:React.Dispatch<React.SetStateAction<range>>,
    check:group
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
    dist:Hovedet
}
