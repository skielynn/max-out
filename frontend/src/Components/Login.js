import React, { useState } from 'react';
import LoginForm from "../Components/LoginForm";


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
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        <span>Password:</span>
                        <input type="password" name="password" required />
                    </label>
                    <button>Let's Break Some Records!</button>
                </form>
            </div>
            <div id="signupForm" className={`form ${showSignupForm ? '' : 'hide'}`}>
                <h3>Sign-Up</h3>
                <form method="POST">
                    <label>
                        <span>E-mail:</span>
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        <span>Password:</span>
                        <input type="password" name="password" required />
                    </label>
                    <button>Let's get started!</button>
                </form>
            </div>
        </main>
    );
}

export default Login;
