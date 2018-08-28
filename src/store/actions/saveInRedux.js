import {SAVE_IN_REDUX} from "./actionTypes";
export const saveInRedux =(picture,fbname)=>{
 console.warn("Inside the function save in redux");
 return  {
     type:SAVE_IN_REDUX,
    image:picture,
    name:fbname

     
     
   
 
 };
 
 
 }