import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import './LoginForm.css';


export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
  <>
  <div id="wrap">
  <div id="wrap1">
    <div className="form-container">
      <h1 className='welcome'>Welcome Back!</h1>
      <p>Say something nice here, and probably this long should be good.</p>
          <form id="form" autoComplete="off" onSubmit={handleSubmit}>
            <label className='login'>Email</label>
            <input type="text" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required />
            <label className='login'>Password</label>
            <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
            <h4 className='forgot'>Forgot Password?[link]</h4>
            <button className='login-btn' type="submit">LOG IN</button>
            <p className="error-message">&nbsp;{error}</p>
          </form>
          <hr></hr>
      <h4 className='option'>Dont have an account? [link here]</h4>
  </div>
</div>
    <div className='random'>

    </div>
</div>

  </>
)};