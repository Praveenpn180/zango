import React from 'react'

export default function adminLogin() {
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Zango</span>
            <span className="title">Admin Login</span>
        <form>
         
            <input type="email" placeholder='Email' name='email'/>
            <input type="text" placeholder='Password' name='password'/>
        
            <button>Login</button>

        </form>
        
        </div>
    </div>
  )
}
