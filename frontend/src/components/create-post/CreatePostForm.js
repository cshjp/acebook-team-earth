import { useState } from "react"
import "./CreatePost.css"

const CreatePostForm = ({ navigate }) => {
  const [message, setMessage] = useState("");
  // this is the method that is linked to the submit button
  const handleSubmit = async (event) => {
    event.preventDefault();
    // below: this is the method that handles the post request
      await fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        message: message,
      })
    })
    navigate('/posts')
  }
  // below: this is the method that handles the change in the input field
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }

  // below: this is the form that shows up on the page to make a new post, the value in the input is used the the 'useState" react method above
  // handleMessageChange is called when the user types in the input field

  return (
    <>
    <div className="swimming_duck"></div>
    <div className="create_post_form">
      <form onSubmit={handleSubmit}>
        <textarea placeholder="E.G. How's your day?" id="message" type="text" value={message} onChange={handleMessageChange} />
        <input role='submit-button' id='submit' type="submit" value="Post!" />
      </form>
    </div>
    </>
  )
}

export default CreatePostForm;