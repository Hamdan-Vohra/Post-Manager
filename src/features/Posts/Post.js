import {useSelector} from 'react-redux'
import { selectAllPosts } from './postSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const Post = () => {
    const posts = useSelector(selectAllPosts);
    const orderedPosts = posts.slice().sort((a,b)=>b.date.localeCompare(a.date));
    const renderPosts = orderedPosts.map((post) => {
      return(
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0,100)}</p>
            <p className='postCredit'>
              <PostAuthor userId={post.userId}/>
              <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionButtons post={post}/>
        </article>
      )
  });
  return (
    <section>
        <h2>Posts</h2>
        {renderPosts}
    </section>
  )
}

export default Post