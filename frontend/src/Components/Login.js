export default function Login() {
    return (
      <div className="login">
        <h2>Welcome back!</h2>
        <h3>It's time to MAX-OUT</h3>
        <h4>Login</h4>
        <form method = "POST">
          <label>
            <span>User:</span>
            <input type="email" name="email" required />
          </label>
          <label>
            <span>Password:</span>
            <input type="password" name="password" required />
          </label>
          <button>Let's Break Some Records!</button>
        </form>
        <form method = "POST">
        <h4>Sign up</h4>
          <label>
            <span>User:</span>
            <input type="email" name="email" required />
          </label>
          <label>
            <span>Password:</span>
            <input type="password" name="password" required />
          </label>
          <button>Sign Up!</button>
        </form>
      </div>
    )
  }

