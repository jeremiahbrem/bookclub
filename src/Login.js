import React, { useState } from "react";
import "./Login.css";

const Login = ({loginOpen, setLoginOpen, setOpen}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const target = event.target;
    const name = event.target.name;
  
    if (name === 'username')
      setUsername(target.value);
    else if (name === 'password')
      setPassword(target.value); 
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };
    fetch(`/db/api/login/`, requestOptions)
        .then(response => response.json())
        .then(json => {
          if (json.token) {
            localStorage.setItem('token', json.token);
            console.log(localStorage.getItem('token'));
            setMessage('Logged In!')
            setTimeout(() => {
              setLoginOpen(false);
              setOpen(false);
            }, 4000);
          } else if (json.status === 400)
            setMessage(json.message);
        }).catch(e => setMessage(e));  
  }

  return (
    <div className={`Login-container ${loginOpen && 'Login-container-show'}`}>
      <form className="Login-form" onSubmit={handleSubmit}>
        <label className="Login-label">Username</label>
        <input className="Login-input" type="text" value={username} name="username" onChange={handleChange} required/>
        <label className="Login-label">Password</label>
        <input className="Login-input" type="text" value={password} name="password" onChange={handleChange} required/>
        <button className="Login-button" type="submit"><p>Send</p></button>
        <p className="Login-message">{message}</p>
      </form>
    </div>
  );
}

  export default Login;