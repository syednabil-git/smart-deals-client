import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationDot, FaMessage } from 'react-icons/fa6'
import { MdAddCall } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";

const Footer = () => {
  return (
    <div className=''>
        <footer className="footer text-white sm:footer-horizontal p-10 bg-black mt-10">
  <aside>
      <a className="text-3xl  font-extrabold text-white">Smart<span className=' bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Deals</span></a>
    <p>
      Your trusted marketplace for authentic local 
       products.<br /> Discover the best deals from across Bangladesh.
    </p>
  </aside>
  <nav>
    <h6 className="footer-title">Quick Links</h6>
    <a className="link link-hover">All Products</a>
    <a className="link link-hover">Dashboard</a>
    <a className="link link-hover">Login</a>
    <a className="link link-hover">Register</a>
  </nav>
  <nav>
    <h6 className="footer-title">Categories</h6>
    <a className="link link-hover">Electronics</a>
    <a className="link link-hover">Fashion</a>
    <a className="link link-hover">Home & Living</a>
    <a className="link link-hover">Groceries</a>
  </nav>
  <nav>
    <h6 className="footer-title"> Contact & Support</h6>
    <div className='flex justify-center items-center '>
      <p className='mt-1'><MdOutlineMail /></p>
      <a className="link link-hover ml-1">support@Smartdeals.com</a>
      </div>
      <div className='flex justify-center items-center '>
      <p className='mt-1'><MdAddCall /></p>
      <a className="link link-hover ml-1">+880 123 456 789</a>
      </div>
      <div className='flex justify-center items-center '>
      <p className='mt-1'><FaLocationDot /></p>
      <a className="link link-hover ml-1">123 Commerce Street, Dhaka, Bangladesh</a>
      </div>
  </nav>
  <nav>
     <h6 className="footer-title">Social Links</h6>
    <div className="flex justify-center">
        <a className='mr-2'><FaFacebook></FaFacebook> </a>
        <a className='mr-2'><FaLinkedin></FaLinkedin> </a>
        <a><FaInstagram></FaInstagram> </a>
    </div>
    
  </nav>
</footer>
    </div>
  )
}

export default Footer