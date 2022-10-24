import React from 'react'

export default function Register() {
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Zango</span>
            <span className="title">Register</span>
        <form>
            <input type="text" placeholder='First Name' name='firstName'/>
            <input type="text" placeholder='Last Name' name='lastName'/>
            <input type="email" placeholder='Email' name='email'/>
            <input type="number" placeholder='Phone' name='phone'/>
            <input type="text" placeholder='New password' name='password'/>
            <input type="text" placeholder='Confirm password' name='p2'/>
            <button>Sign up</button>

        </form>
        <p>Already have an account? Login</p>
        </div>
    </div>
  )
}
