import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { postAdded } from "./postSlice";
import { selectAllUsers } from "../Users/userSlice";

const AddPostForm = () => {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [userId,setUserId] = useState('');
    const navigate = useNavigate();
    
    const users = useSelector(selectAllUsers);

    const dispatch = useDispatch();
    const onSavePostClicked = ()=>{
        if(title && content){
            
            dispatch(postAdded(title,content,userId))
            navigate('/')
            setTitle('');
            setContent('');
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
    const userOptions = users.map(user=>(
        <option
            key={user.id}
            value={user.id}
        >
            {user.name}
        </option>
    ))
  return (
    <section>
        <h2>Add a New Post</h2>
        <form>
            <label 
            htmlFor="postTitle">
                Post Title
            </label>
            <input 
                type="text"
                id="postTitle"
                name="postTitle"
                value = {title}
                onChange={(e)=>setTitle(e.target.value)}
            />
            <label 
                htmlFor="postAuthor"
            >
                Author:
            </label>
            <select 
                id="postAuthor" 
                value={userId} 
                onChange={(e)=>setUserId(e.target.value)}
            >
                <option value="">  </option>
                {userOptions}
            </select>
            <label 
                htmlFor="postContent">
                Post Content:
            </label>
            <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={(e)=>setContent(e.target.value)}
            />
            <button 
                type="button"
                onClick={onSavePostClicked}
                disabled={!canSave}
            >
                Save Post</button>
        </form>
    </section>
    )
}

export default AddPostForm;