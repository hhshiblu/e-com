import { createReducer } from "@reduxjs/toolkit";

const initialState={
    isloading:true,
}


export const eventReducer=createReducer(initialState,{
    eventCreateRequest:(state)=>{
        state.isloading=true;
    },
    eventCreateSuccess:(state,action)=>{
        state.isloading=false;
        state.events=action.payload;
        state.success=true;
    },
    eventCreateFail:(state,action)=>{
        state.isloading=false;
        state.error=action.payload;
        state.success=false;
    },

    // all events for shop
    getAllEventRequest:(state)=>{
        state.isloading=true;
    },

    getAllShopEventSuccess:(state,action)=>{
    state.isloading=false;
    state.events=action.payload;
},
getAllShopEventFailed:(state,action)=>{
    state.isloading=false;
    state.error=action.payload;
},

// delete event of a shop

deleteeventRequest:(state)=>{
    state.isloading=true;
},
deleteeventSuccess:(state,action)=>{
    state.isloading=false;
    state.message=action.payload;
},
deleteeventFailed:(state,action)=>{

    state.isloading=false;
    state.error=action.payload
},


    clearErrors:(state)=>{
        state.error=null;
    }

})