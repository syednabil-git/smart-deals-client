import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router'
import { AuthContext } from '../contexts/AuthContext'

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
    .then(() => {
        console.log("User signed out successfully");
    })
    .catch((error) => {
    console.error("Sign out failed:", error);
  });
  };
  return (
    <div>
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/all-product">All Products</Link></li>
        <li><Link to="/my-product">My Products</Link></li>
        <li><Link to="/my-bids">My Bids</Link></li>
        <li><Link to="/create-product">Create Product</Link></li>
      </ul>
    </div>
    <a className="text-xl ml-5 font-extrabold">Smart<span className=' bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Deals</span></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/">Home</Link></li>
        <li><Link to="/all-product">All Products</Link></li>
         {
          user && <>
            <li><NavLink to="/my-product">My Products</NavLink></li>
            <li><NavLink to="/my-bids">My Bids</NavLink></li>
          </>
         }
        <li><Link to="/create-product">Create Product</Link></li>
    </ul>
  </div>
  {/* <div className="navbar-end flex">
    <Link to="/login" className=" p-[1.5px] rounded-sm bg-gradient-to-r from-[#632EE3] to-[#9F62F2] inline-block"><button className='px-5 py-[6px] rounded-sm bg-white font-semibold hover:bg-gray-100 transition'><span className=' bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Login</span></button></Link>
    <Link  to="/register" className="btn ml-3 mr-10 bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold">Register</Link>
  </div> */}
  <div className="navbar-end flex">
    {
      user ? 
          <button onClick={handleSignOut} className=" p-[1.5px] rounded-sm bg-gradient-to-r from-[#632EE3] to-[#9F62F2] inline-block"><p className='px-5 py-[6px] rounded-sm bg-white font-semibold hover:bg-gray-100 transition'><span className=' bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Sign Out</span></p></button>
            :
               <div className='items-center flex justify-center'>
                 <Link to="/login" className=" p-[1.5px] rounded-sm bg-gradient-to-r from-[#632EE3] to-[#9F62F2] inline-block"><button className='px-5 py-[6px] rounded-sm bg-white font-semibold hover:bg-gray-100 transition'><span className=' bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Login</span></button></Link>
                   <div className='hidden sm:block'> <Link  to="/register" className="btn text-center ml-3 mr-10 bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold ">Register</Link></div>
               </div>


    }
  </div>
</div>

    </div>
    
  )
}


export default Navbar