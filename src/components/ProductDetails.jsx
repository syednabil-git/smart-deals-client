import React, { use, useEffect, useRef, useState } from 'react'
import { NavLink, useLoaderData } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaBackward } from 'react-icons/fa';

const ProductDetails = () => {
    const {_id: productId} = useLoaderData();
    const [ bids, setBids ] = useState([]);
    const bidModalRef = useRef(null);
    const { user } = use(AuthContext);
    const [product, setProduct] = useState({});
    
    useEffect(() => {
        axios.get(`https://smart-deals-server-enp1.onrender.com/products/bids/${productId}`)
        .then(data => {
          console.log('after axios get', data)
          setBids(data.data);
        });
        axios.get(`https://smart-deals-server-enp1.onrender.com/products/${productId}`)
        .then(res => {
          setProduct(res.data);
        });
        
    }, [productId])

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal();
    }

    const handleBidSubmit = (e) => {
      e.preventDefault(); 
      const name = e.target.name.value;
      const email = e.target.email.value;
      const bid = e.target.bid.value;
      //console.log(productId, name, email, bid);
      const newBid = {
          product: productId,
          buyer_name: name,
          buyer_email: email,
          bid_price: bid,
          status: "pending"
        }

        fetch('https://smart-deals-server-enp1.onrender.com/bids', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newBid)
        })
        .then(res => res.json())
        .then(data => {
          if(data.insertedId){
            bidModalRef.current.close();
            Swal.fire({
             position: "top-end",
             icon: "success",
             title: "Your bid has been placed",
             showConfirmButton: false,
             timer: 1500
          });

          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price)
          setBids(newBids)
          }
        })
      } 
    
  return (
    <div className="bg-gray-100 max-w-7xl mx-auto p-4 md:p-10">

  {/* ================= TOP SECTION ================= */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

    {/* ================= LEFT SIDE ================= */}
    <div className="space-y-4">

      <img
        className="w-65 sm:w-100 h-60 sm:h-80 object-cover rounded-xl shadow mx-auto"
        src={product.image}
        alt="product"
      />

      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-bold text-xl">Product Description</h3>

        <div className="flex justify-between mt-3 text-sm">
          <p><b>Condition:</b> {product.condition}</p>
          <p><b>Usage:</b> {product.usage}</p>
        </div>

        <div className="my-3 border-t"></div>

        <p className="text-gray-600">{product.description}</p>
      </div>

    </div>

    {/* ================= RIGHT SIDE ================= */}
    <div className="space-y-4">

      <NavLink
        to="/"
        className="text-sm font-semibold text-purple-600 flex items-center gap-1"
      >
        ← Back to Products
      </NavLink>

      <h1 className="text-2xl md:text-3xl font-bold">
        {product.title}
      </h1>

      {/* Price */}
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-green-500 font-bold text-lg">
          ${product.price_min} - ${product.price_max}
        </p>
        <p className="text-sm text-gray-500">Price starts from</p>
      </div>

      {/* Product Info */}
      <div className="bg-white p-4 rounded-xl shadow text-sm space-y-1">
        <p><b>Product ID:</b> {product._id}</p>
        <p><b>Posted:</b> {product.created_at}</p>
      </div>

      {/* Seller Info */}
      <div className="bg-white p-4 rounded-xl shadow">

        <h2 className="font-bold mb-3">Seller Information</h2>

        <div className="flex items-center gap-3">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={product.seller_image}
            alt="seller"
          />

          <div>
            <p className="font-semibold">{product.seller_name}</p>
            <p className="text-sm text-gray-500">{product.email}</p>
          </div>
        </div>

        <div className="mt-3 space-y-1 text-sm">
          <p><b>Location:</b> {product.location}</p>
          <p><b>Contact:</b> {product.seller_contact}</p>

          <p className="mt-2">
            <b>Status:</b>{" "}
            <span className="bg-yellow-300 px-2 py-1 rounded-full text-xs font-semibold">
              {product.status}
            </span>
          </p>
        </div>

      </div>

      {/* Buy Button */}
      <button
        onClick={handleBidModalOpen}
        className="w-full bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white py-2 rounded-lg font-semibold"
      >
        I Want To Buy This Product
      </button>

    </div>
  </div>

  {/* ================= BID MODAL ================= */}
  <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">

    <div className="modal-box">

      <h3 className="font-bold text-lg">Give the best offer!</h3>
      <p className="py-2 text-sm text-gray-500">
        Offer something seller can not resist
      </p>

      <form onSubmit={handleBidSubmit} className="space-y-3">

        <div>
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            readOnly
            defaultValue={user?.displayName}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            readOnly
            defaultValue={user?.email}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Bid Price</label>
          <input
            type="text"
            name="bid"
            placeholder="Your bid"
            className="input input-bordered w-full"
          />
        </div>

        <button className="btn w-full bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white">
          Submit Bid
        </button>

      </form>

      <div className="modal-action">
        <form method="dialog">
          <button className="btn">Cancel</button>
        </form>
      </div>

    </div>
  </dialog>

  {/* ================= BIDS SECTION ================= */}
  <div className="mt-10 space-y-4">

    {/* Header */}
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-xl font-bold">
        Bids ({bids.length})
      </h3>
    </div>

    {/* Table */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="w-full text-sm">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">SL</th>
            <th>Buyer</th>
            <th>Bid Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {bids.map((bid, index) => (
            <tr
              key={bid._id}
              className="border-t hover:bg-gray-50 text-center"
            >

              <td className="p-3">{index + 1}</td>

              <td className="font-semibold">
                {bid.buyer_name}
              </td>

              <td className="font-bold text-green-500">
                ${bid.bid_price}
              </td>

              <td>
                <button className="text-purple-600 font-semibold">
                  Details
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  </div>

</div>
  )
}

export default ProductDetails