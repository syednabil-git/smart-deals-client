import React, { use } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { AuthContext } from '../contexts/AuthContext'

const Register = () => {
  const {signInWithGoogle} = use(AuthContext);
  const handleGoogleSignIn = () => {
      signInWithGoogle()
      .then(result => {
        console.log(result.user);

        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL
        }

        //create user in the database
        fetch('http://localhost:3000/users',{
            method: 'POST',
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
          console.log('data after user save', data)
        })

      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    
<div>
  <Navbar></Navbar>
  <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
       <div className='card-body px-10 text-center'>
         <p className='font-bold text-2xl'>Register Now!</p>
         <p>Already have an account? <Link to="/login" className='bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Login Now</Link></p>
       </div>
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="label font-bold">Name</label>
          <input type="text" className="input" placeholder="Name" />
           <label className="label font-bold">Email</label>
          <input type="email" className="input" placeholder="Email" />
           <label className="label font-bold">Image-URL</label>
          <input type="text" className="input" placeholder="Image-url" />
          <label className="label font-bold">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <button className="btn btn-neutral mt-4 bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white">Register</button>
        </fieldset>
        <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="mx-3 text-gray-500 font-semibold">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <div className='w-full mx-auto'>
            <button onClick={handleGoogleSignIn} className='btn text-center mx-auto w-full font-semi-bold'><FaGoogle></FaGoogle> Sign Up With Google</button>
        </div>
      </div>
    </div>
  </div>
 </div>
</div>
    
  )
}

export default Register