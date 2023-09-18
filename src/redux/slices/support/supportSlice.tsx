import { createSlice,PayloadAction } from "@reduxjs/toolkit";


export interface supportType {
    name:string,
    email:string,
    helpWith:string,
    message:string,
    token:string,
  }
  
  interface supportTypeState {
    supportContact: supportType[];
 
  }
  
  const initialState: supportTypeState = {
    supportContact: [],
  
  };
  
const supportSlice=createSlice({
    name:'support',
    initialState,
    reducers:{
        AddContactSupport:(state, action:PayloadAction<{ supportContact: supportType; }>):void=>{
            state.supportContact.push(action.payload.supportContact);
         
        },
        ResolveContactSupport:(state,action:PayloadAction<{token:string}>)=>{
          const {token}=action.payload;
          state.supportContact=state.supportContact.filter((item)=>(
            item.token !== token
          ))
        }

    }
   
})


export const {AddContactSupport,ResolveContactSupport} =supportSlice.actions;
export default supportSlice.reducer;