import React, { useContext } from 'react'
import { FaGoogle } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { AuthContext } from '../contexts/AuthContext'

const Login = () => {

  const { signInUser, signInWithGoogle} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
    .then(() =>{
        navigate(location?.state || "/");
    })
    .catch(err => console.log(err));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
    .then(() => {
      navigate(location?.state || "/");
    })
    .catch(err => console.log(err));
  };
  
  return (
    <div>
      <Navbar></Navbar>
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
       <div className='card-body px-10 text-center'>
         <p className='font-bold text-2xl'>Login</p>
         <p>Don't have an account? <Link to="/register" className='bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Register Now</Link></p>
       </div>
      <div className="card-body">
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset">
          <label className="label font-bold">Email</label>
          <input type="email" className="input" placeholder="Email" />
          <label className="label font-bold">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button type='submit' className="btn btn-neutral mt-4 bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white">Sign In</button>
        </fieldset>
        </form>
        <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="mx-3 text-gray-500 font-semibold">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <div className='w-full mx-auto'>
            <button onClick={handleGoogleLogin} 
             className='btn text-center mx-auto w-full font-semi-bold'><FaGoogle></FaGoogle> Sign In With Google</button>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login