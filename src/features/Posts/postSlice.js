import {createSlice,nanoid,createAsyncThunk} from '@reduxjs/toolkit'
import {sub} from 'date-fns'
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
    posts:[],
    status:'idle',
    error:null,
}

//creating async thunk function that fetches data from server
export const fetchPosts = createAsyncThunk('posts/fetchPosts',async()=>{
    try{
        const response = await axios.get(POSTS_URL);
        console.log(response);
        return response.data;
    } catch(err){
        console.log(err.message)
        return err.message;
    }
})


export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        postAdded:{
            reducer(state,action){
                //this is only possible due to immerjs as redux toolkit support it
                state.posts.push(action.payload);
            },
            prepare(title,content,userId){
                return{
                    payload:{
                        id:nanoid(),
                        title,
                        content,
                        date:new Date().toISOString(),
                        userId,
                        reactions:{
                            thumbsUp:0,
                            wow:0,
                            heart:0,
                            rocket:0,
                        }
                    }
                }
            }
        },
        reactionAdded:(state,action)=>{
            const {postId,reaction} = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchPosts.pending,(state,action)=>{
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status = 'succeeded'

            //Adding date and reactions
            let addMin = 1;
            const loadedPosts = action.payload.map(post=>{
                //we can add data as immer js make sure it is not mutation
                post.date = sub(new Date(),{minute:addMin++}.toISOString());
                post.reactions = {
                        thumbsUp:0,
                        wow:0,
                        heart:0,
                        rocket:0,
                }
                return post;
            });
            console.log(loadedPosts)
            //Add any fetched posts to the array
            state.posts = state.posts.concat(loadedPosts);
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.err.message;
        })
    }
}
)

export const getAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const {postAdded,reactionAdded} = postSlice.actions;

export default postSlice.reducer;