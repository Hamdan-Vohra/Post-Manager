import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../features/Posts/postSlice'
import userReducer from "../features/Users/userSlice";

export const store = configureStore({
    reducer:{
        posts:postReducer,
        users:userReducer,
    }
})