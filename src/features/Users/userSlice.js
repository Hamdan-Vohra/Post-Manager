import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id:'1',name:'Hamdan'},
    {id:'2',name:'Usama'},
    {id:'3',name:'Hamza'},
]
export const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{

    }
})

export const selectAllUsers = (state)=>state.users;

export default userSlice.reducer;