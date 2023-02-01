import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authentication:{
        token:null,
        user:{}

    }
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        AddUser:(state,{payload})=>{
            console.log(payload)
            state.authentication.token=payload.token
            state.authentication.user=payload.user
        }
    }
})

export const {AddUser}=authSlice.actions
export default authSlice.reducer