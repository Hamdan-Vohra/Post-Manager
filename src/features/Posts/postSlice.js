import {createSlice,nanoid} from '@reduxjs/toolkit'
import {sub} from 'date-fns'

const initialState = [
    {
        id:'1',
        title:'Redux Journey',
        content:'This is my react-redux learning',
        date:sub(new Date(),{minutes:10}).toISOString(),
    },
    {
        id:'2',
        title:'Immer js',
        content:'This provides advantage to mutate an immutable js data structures using draft.So we can directly push into the states',
        date:sub(new Date(),{minutes:5}).toISOString(),
    }
]
export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        postAdded:{
            reducer(state,action){
                //this is only possible due to immerjs as redux toolkit support it
                state.push(action.payload);
            },
            prepare(title,content,userId){
                return{
                    payload:{
                        id:nanoid(),
                        title,
                        content,
                        date:new Date().toISOString(),
                        userId,
                    }
                }
            }
        }
    }
}
)

export const selectAllPosts = (state) => state.posts;

export const {postAdded} = postSlice.actions;

export default postSlice.reducer;