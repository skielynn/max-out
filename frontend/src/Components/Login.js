import React, { useState } from 'react';
//import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//import LoginForm from "../Components/LoginForm";


function Login() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  const handleSignupClick = () => {
    setShowSignupForm(true);
    setShowLoginForm(false);
  };

  const navigate = useNavigate()
  ///////////////    USE STATE FOR SIGN UP    ////////////////
  const [user, setUser] = useState({
    user_name: '',
    email: '',
    password: '',
  })

  ///////////// HANDLE SUBMIT FOR SIGN UP /////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user)
    navigate('/');

    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'credentials': 'include'
      },
      body: JSON.stringify(user)
    });

    console.log(response)
    return response.json

  }

  ///////////////   USE STATE FOR LOG IN  ///////////////
  const [profile, setProfile] = useState({
    email: '',
    password: '',
  })
  ////////////    HANDLE SUBMIT FOR LOG IN    //////////////////
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.profile))
        navigate('/tracker'); // add the component you want to redirect to
      } else {
        console.log('Login failed :(');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h2>It's time to MAX-OUT</h2>
      
      <p>Designed to help gym-goers of all levels keep track of their strength training progress.
        Whether you're just starting out or you're an experienced weightlifter, MAX-OUT provides
        you with a powerful tool for tracking your progress and staying motivated along the way.</p>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleSignupClick}>Sign-Up</button>
      <div id="loginForm" className={`form ${showLoginForm ? '' : 'hide'}`}>
        <h3>Login</h3>
        <form method="POST">
          <label>
            <span>E-mail:</span>
            <input type="email"
              name="email"
              onChange={e => setProfile({ ...profile, email: e.target.value })}
              required />
          </label>
          <label>
            <span>Password:</span>
            <input type="password"
              name="password"
              onChange={e => setProfile({ ...profile, password: e.target.value })}
              required />
          </label>
          <button onClick={handleLogIn}>Let's Break Some Records!</button>
        </form>
      </div>
      <div id="signupForm" className={`form ${showSignupForm ? '' : 'hide'}`}>
        <h3>Sign-Up</h3>
        <form method="POST">
          <label>
            <span>E-mail:</span>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
              required />
          </label>
          <label>
            <span>username</span>
            <input
              type="text"
              name="user_name"
              value={user.user_name}
              onChange={e => setUser({ ...user, user_name: e.target.value })}
              required />
          </label>
          <label>
            <span>Password:</span>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })}
              required />
          </label>


          <button type="submit" onClick={handleSubmit} >Let's get started!</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
