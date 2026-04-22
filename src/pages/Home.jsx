import React, { useState } from 'react'
import left from "../assets/bg-hero-left.png";
import right from "../assets/bg-hero-right.png";
import { FaSearch } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router-dom';
import LatestProducts from '../components/LatestProducts';
import axios from 'axios';


const LatestProductsPromise = fetch ('http://localhost:3000/latest-products')
.then(res => {
if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    });
const Home = () => {
 
const [search, setSearch] = useState("");
const [products, setProducts] = useState([]);




    const handleSearch = async () => {
      try{
        const res = await axios.get(`http://localhost:3000/all-products?search=${search}`);
        setProducts(res.data);
      }catch (error) {
        console.log(error);
      }
    };





  return (
    <div>
      <div
        className="hero min-h-screen relative flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url(${left}), url(${right})`,
          backgroundPosition: "left center, right center",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundSize: "250px, 250px",
        }}
      >

        {/* 🔥 Light Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[#FDBFF7]/60 to-[#D5FBF6]/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-6xl font-bold text-gray-800 leading-tight">
            Deal Your{" "}
            <span className="text-purple-600">Products</span> <br />
            In A{" "}
            <span className="text-purple-500">Smart</span> Way !
          </h1>

          <p className="mt-4 text-gray-500">
            SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!
          </p>

          {/* Search Box */}
          <div className="mt-6 flex justify-between items-center rounded-l-full shadow-2xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search For Products, Category..."
              className="w-full px-5 py-3 outline-none bg-white rounded-l-full"
            />
            <button onClick={handleSearch} className='btn h-12 rounded-r-full outline-none bg-linear-to-r from-[#632EE3] to-[#9F62F2] w-15 text-white text-xl'><FaSearch></FaSearch> </button>
          </div>
          <div className='mt-10 flex justify-center'>
                 <Link  to="/all-product" className="btn mr-4 h-13 bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold">Watch All Products</Link>
             
                 <Link to="/create-product" className=" p-[2px]  rounded-sm bg-linear-to-r from-[#632EE3] to-[#9F62F2] inline-block"><button className='px-5 h-12 py-[6px] rounded-sm bg-white font-semibold hover:bg-gray-100 transition'><span className=' bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Post an Product</span></button></Link>
             
          </div>
        </div>

      </div>

    
      
     {/* Card */}
     {
      products.length > 0 ? (
        <div  className="max-w-[1200px] mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {
              products.map(product => (
                <div key={product._id} className=" p-4 rounded shadow"> 
                  <figure className="px-10 pt-10">
               <img
                  src={product.image}
                  alt=""
                  className="rounded-xl w-80 h-60" />
               </figure>
             <div className=''>
             <div className="card-body">
             <h2 className="card-title">{product.title} </h2>
             <p className='text-purple-600 font-semibold'>Price: ${product.price_min} - ${product.price_max}</p>
             <div className="w-full">
                 <Link to={`/productDetails/${product._id}`} className=" p-[1.5px] rounded-sm bg-gradient-to-r from-[#632EE3] to-[#9F62F2] inline-block w-full"><button className='px-5 py-[6px] rounded-sm bg-white font-semibold hover:bg-gray-100 transition w-full'><span className=' bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>View Details</span></button></Link> 
             </div>
            </div>
          </div>
                </div>
              ))
            }
        </div>
      ) : (
          <LatestProducts LatestProductsPromise={LatestProductsPromise}></LatestProducts>
      )
     }
    

  <div className='items-center flex justify-center mt-10'>
    <Link  to="/all-product" className="btn mr-4 h-13 bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold w-30 text-lg">Show All</Link>
    </div>
</div>
  )
}

export default Home;