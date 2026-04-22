import axios from 'axios'
import React, { cache, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../contexts/AuthContext';



const MyProduct = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if(user){
    axiosSecure.get('/my-products')
    .then(res => setProducts(res.data));
    }
  }, [user]);

  const handleDelete = async (id) => {
    try{
      await axiosSecure.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));    
    }
    catch(error) {
      console.log(error);
    }
  };

  return (
    <div className='max-w-[1200px] mx-auto my-10'>
      
      {/* Title */}
      <h1 className='text-3xl font-bold text-center mb-6'>
        My Products: <span className='text-purple-500'>{products.length}</span>
      </h1>

 {/* ================= MOBILE CARD VIEW ================= */}
      <div className="sm:hidden space-y-4">
    {products.map((product, index) => (
      <div
        key={product._id}
        className="p-4 rounded-xl shadow-md bg-white px-5"
      >
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt=""
            className="w-14 h-14 rounded-lg border"
          />

          <div>
            <p className="font-semibold">
              #{index + 1} {product.title}
            </p>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
        </div>

        <div className="mt-3 space-y-1 text-sm">
          <p><b>Price:</b> $ {product.price_min}</p>

          <p>
            <b>Status:</b>{" "}
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-300 font-semibold">
              {product.status}
            </span>
          </p>
        </div>

        <div className="mt-3 flex gap-2">
          <Link
            to={`/edit-product/${product._id}`}
            className="flex-1 text-center py-1 rounded bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold"
          >
            Edit
          </Link>

          <button
            onClick={() => handleDelete(product._id)}
            className="flex-1 py-1 rounded bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold"
          >
            Delete
          </button>
        </div>

        <button className="mt-2 w-full py-1 rounded bg-gradient-to-r from-green-500 to-purple-500 text-white font-semibold">
          Make Sold
        </button>
      </div>
    ))}
  </div>

       {/* ================= DESKTOP TABLE VIEW ================= */}
      <div className="overflow-x-auto rounded-xl shadow-md hidden sm:block">
        <table className="w-full border-collapse">

          {/* Head */}
          <thead className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white">
            <tr className="text-center">
              <th className="p-3">SL No</th>
              <th className="p-3">Products</th>
              <th className="p-3">Title</th>
              <th className="p-3">Price Range</th>
              <th className="p-3">Category</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="text-center border-b hover:bg-gray-50 transition">

                <td className="p-3">{index + 1}</td>

                <td className="p-3">
                  <img
                    src={product.image}
                    alt=""
                    className="w-12 h-12 mx-auto rounded-lg border"
                  />
                </td>

                <td className="p-3 font-medium">{product.title}</td>
                <td className="p-3">$ {product.price_min}</td>
                <td className="p-3">{product.category}</td>
                

                <td className="p-3">
                  <span className="px-2 py-1 text-sm rounded-full bg-yellow-300 font-semibold text-black">
                    {product.status}
                  </span>
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                  <Link to={`/edit-product/${product._id}`} className=" p-[2px] rounded-sm bg-gradient-to-r from-[#632EE3] to-[#9F62F2] inline-block"><button className='px-3 py-[3px] rounded-sm bg-white font-semibold hover:bg-gray-100 transition'><span className=' bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Edit</span></button></Link>
                  <button onClick={() => handleDelete(product._id)} className=" p-[2px] rounded-sm bg-gradient-to-r from-[#e32e40] to-[#7504ed] inline-block"><button className='px-3 py-[3px] rounded-sm bg-white font-semibold hover:bg-gray-100 transition'><span className=' bg-linear-to-r from-[#e32e34] to-[#9F62F2] bg-clip-text text-transparent'>Delete</span></button></button>
                  <Link to="" className=" p-[2px] rounded-sm bg-gradient-to-r from-[#2ee343] to-[#9F62F2] inline-block"><button className='px-3 py-[3px] rounded-sm bg-white font-semibold hover:bg-gray-100 transition'><span className=' bg-linear-to-r from-[#0a9d03] to-[#9F62F2] bg-clip-text text-transparent'>Make Sold</span></button></Link>
                   

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default MyProduct