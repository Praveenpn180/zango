import React from 'react'

export default function Login() {
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Zango</span>
            <span className="title">Register</span>
        <form>
         
            <input type="email" placeholder='Email' name='email'/>
            <input type="text" placeholder='Password' name='password'/>
        
            <button>Login</button>

        </form>
        <p>Dont have an account? Register</p>
        </div>
    </div>
  )
}
