//Confirm page==================================================>>>>>>>>>>>>>>>>
export interface ConfirmProps{
    SetMap:React.Dispatch<React.SetStateAction<StrStrNmbArray>>,
    Map:StrStrNmbArray,
    actdist:number|null,
    setLin:React.Dispatch<React.SetStateAction<linProps>>,
    setgroupar:React.Dispatch<React.SetStateAction<StrStrArray|null>>,
    setminmax:React.Dispatch<React.SetStateAction<[number,number]>>
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
export type colList ={Min:{R:number,G:number,B:number},Max:{R:number,G:number,B:number}}

export type group ={status:boolean,groups:number}
export type valid ={st:boolean,msg:string}

export interface helpProps{//help window
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
    setValid:React.Dispatch<React.SetStateAction<valid>>
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
    groupStatus:boolean,
    groups:number,
    indi:Hovedet|null,
    barLimMin:number;
    barLimMax:number;
    actdist:number|null,
}

export interface indProps{//incdicator on colorbar
    val:Hovedet|null
}

//Hover ============================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export type Hovedet=[string,number,number]

export interface HoverProps{
    dist:Hovedet,
    min:number,
    max:number
}

//Options ===============================================>>>>>>>>>>>>>>>>>>>>>>>>
export interface OptionsProps{
    setLedgend:React.Dispatch<React.SetStateAction<ledgendProps>>,
    setScale:React.Dispatch<React.SetStateAction<boolean>>,
    setbg:React.Dispatch<React.SetStateAction<bgProps>>,
    svgref:React.RefObject<SVGSVGElement>
}

//Map page ============================================>>>>>>>>>>>>>>>>>>>>>>>>>
export interface ledgendProps{
    enable:boolean,
    color:string
}

export interface linProps{//color poin details for scale 
    mincolor:string,
    maxcolor:string
}

export interface bgProps{//background color 
    enable:boolean,
    color:string
}

//Alert =================================================>>>>>>>>>>>>>>>>>
export interface alertProps{
    msg:string,
    setalertst:React.Dispatch<React.SetStateAction<boolean>>
}