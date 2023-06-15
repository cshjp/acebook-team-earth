// import React from 'react';
// import { Link } from 'react-router-dom';

// const Post = ({post}) => {
//   const updateLink = `/posts/${post._id}/update`;

//   return(
//     <article data-cy="post" key={ post._id }>
//       { post.message }
//       <Link to={updateLink} id="update-link">Update post</Link>
//     </article>
//   )
// }

// export default Post;
import React from 'react';

<<<<<<< HEAD
const Post = ({ post }) => {
  // Provide a default value for user
  const { user = { name: '' }, message } = post;

  return (
    <div data-cy="post" className="post">
      {/* Display the user's name */}
      <div className="user">{user.name}</div>

      {/* Display the post's message */}
      <div className="message">{message}</div>
    </div>
  );
};
=======
const Post = ({post}) => {
  const updateLink = `/posts/${post._id}/update`;
  const deleteLink = `/posts/${post._id}/delete`;

  return(
    <article data-cy="post" key={ post._id }>
      { post.message }
      <Link to={deleteLink}>Delete post</Link>
      <Link to={updateLink} id="update-link">Update post</Link>
    </article>
  )
}
>>>>>>> origin/main

export default Post;

