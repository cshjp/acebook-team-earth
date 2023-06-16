import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({post}) => {
  const viewPost = `/posts/${post._id}`;

  return(

      <div className='post'>
        <article data-cy="post" key={ post._id } className="article">
          { post.message }
          <br/><Link to={viewPost} id="view-post-link" className="post-link">View post</Link>
        </article>
      </div>

  )
}

export default Post;
