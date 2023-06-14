import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts);
        })
    } else {
      navigate('/login')
    }
  }, [])
    

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
    if(token) {
      return(
        <>
        <div className="lake">
          <div id='feed' role="feed">
              {posts.map((post) => ( 
                <div className="post" key={ post._id }>
                  <div className="duck"></div>
                  <Post post={ post }  />
                </div> 
              ))}
          </div>
        </div>
        </>
      )
    }
}

export default Feed;