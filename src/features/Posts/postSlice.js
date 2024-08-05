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
        console.log('in async');
        const response = await axios.get(POSTS_URL);
        console.log(response);
        return response.data;
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
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
        .addCase(addNewPost.fulfilled, (state, action) => {
            // Fix for API post IDs:
            // Creating sortedPosts & assigning the id 
            // would be not be needed if the fake API 
            // returned accurate new post IDs
            // const sortedPosts = state.posts.sort((a, b) => {
            //     if (a.id > b.id) return 1
            //     if (a.id < b.id) return -1
            //     return 0
            // })
            // action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
            // End fix for fake API post IDs 

            action.payload.userId = Number(action.payload.userId)
            action.payload.date = new Date().toISOString();
            action.payload.reactions = {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
            }
            // console.log(action.payload)
            state.posts.push(action.payload);

        })
    }
}
)

export const getAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const {postAdded,reactionAdded} = postSlice.actions;

export default postSlice.reducer;