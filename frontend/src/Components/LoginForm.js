import React, { useState } from "react";

function LoginForm() {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);

    function handleLoginClick() {
        setShowLoginForm(true);
        setShowSignupForm(false);
    }

    function handleSignupClick() {
        setShowSignupForm(true);
        setShowLoginForm(false);
    }

    return (
        <div>

            {showLoginForm && (
                <div>
                    <h4>Login</h4>
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
            )}

            {showSignupForm && (
                <div>
                    <h4>Sign up</h4>
                    <form method="POST">
                        <label>
                            <span>E-mail:</span>
                            <input type="email" name="email" required />
                        </label>
                        <label>
                            <span>Password:</span>
                            <input type="password" name="password" required />
                        </label>
                        <button>Sign Up!</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default LoginForm;
