import React, { useEffect, useState } from 'react';
import "../auth/LoginForm.css"

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [token] = useState(window.localStorage.getItem("token"));
  let [errorMsg, setError] = useState("");

  useEffect(() => {
    if(token) {
      navigate('/posts')
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, username: username })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          setError("Email already taken")
          navigate('/signup')
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }


    return (
      <>
        <div className="duck-body"></div>
        <div className="duck-head"></div>
        <div className="login-form">
        <form onSubmit={handleSubmit}>
            <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
            <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
            <input placeholder="Username" id="username" type='text' value={ username } onChange={handleUsernameChange} />
          <input id='submit' type="submit" value="Submit" />
        </form>
        <p>{errorMsg}</p>
        </div>
      </>
    );
}

export default SignUpForm;
