import {useDispatch, useSelector} from 'react-redux'
import { getAllPosts,getPostsStatus,getPostsError,fetchPosts } from './postSlice';
import { useEffect } from 'react';
import EachPost from './EachPost';


const Post = () => {
    const dispatch = useDispatch();

    const posts = useSelector(getAllPosts);
    // const postStatus = useSelector(getPostsStatus);
    // const postError = useSelector(getPostsError);

    // useEffect(()=>{
    //   if(postStatus === 'idle'){
    //     dispatch(fetchPosts);
    //   }
    // },[postStatus,dispatch])

    let content;
    // if (postStatus === 'loading') {
    //     content = <p>"Loading..."</p>;
    // } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <EachPost key={post.id} post={post} />)
    // } else if (postStatus === 'failed') {
    //     content = <p>{postError}</p>;
    // }

  return (
    <section>
        <h2>Posts</h2>
        {content}
    </section>
  )
}

export default Post