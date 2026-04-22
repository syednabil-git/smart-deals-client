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
    <div className='bg-gray-100 max-w-full mx-auto p-10 px-20 gap-5 items-start'>
        {/* product info */}
        <div>
           <div className='flex justify-between items-start gap-5'>
              <div className='left p-2  w-[500px]'>
                <img className='w-full h-80 items-center mx-auto rounded-xl' src={product.image}></img>
                <div className='bg-white mt-5 p-5 rounded-xl'>
                  <h3 className='font-bold text-xl'>Product Description</h3>
                  <div className='flex justify-between items-center'>
                  <h3 className='font-semibold text-purple-600 text-lg'>Condition: <span className='text-black'>{product.condition}</span></h3>
                  <h3 className='font-semibold text-purple-600 text-lg'>Usage Time: <span className='text-black'>{product.usage}</span></h3>
                  </div>
                   <div className="divider"></div>
                  <p className='details'>{product.description}</p>
                </div>
                </div>
              <div className='right  w-[800px]'>
                <NavLink to='/' className='font-semibold flex items-center'><span className='mr-2'><FaBackward></FaBackward></span> Back to Products</NavLink>
                <h1 className='title text-3xl font-bold'>{product.title}</h1>
                <div className='bg-white rounded-lg p-2 mt-4'>
                  <p className='Price font-semibold text-lg text-green-400'>${product.price_min} - ${product.price_max}</p>
                  <p>Price starts from</p>
                </div>
                <div className='my-4 bg-white rounded-lg p-2'>
                 <h1 className='font-semibold text-lg mb-2'>Products Details</h1>
                 <p className='font-semibold'>Product ID: <span className='text-gray-500'>{product._id}</span></p>
                 <p className='font-semibold'>posted: <span className='text-gray-500'>{product.created_at}</span></p>
                </div>
                <div className='bg-white rounded-lg p-2'>
                  <h1 className='font-semibold text-lg'>Seller Information</h1>
                  <div className='mt-2'>
                    <div className='flex items-center'>
                      <img className='rounded-full w-15 h-15' src={product.seller_image}></img>
                    <div className='ml-5'>
                      <p className='font-semibold text-m'>{product.seller_name}</p>
                      <p>{product.email}</p>
                    </div>
                    </div>
                    <p className='font-semibold'>location: <span className='text-gray-600'>{product.location}</span> </p>
                    <p className='font-semibold'>Contact: <span className='text-gray-600'>{product.seller_contact}</span> </p>
                    <p className='font-semibold my-2'>Status:<span className='bg-amber-300 rounded-4xl p-1 px-2 ml-2'>{product.status}</span> </p>
                  </div>
                </div>
               <button onClick={handleBidModalOpen} className='btn w-full mt-3 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white'>I Want Buy This Product</button>
              </div>
           </div>
           <div>
              
              {/* Open the modal using document.getElementById('ID').showModal() method */}
                <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
             <div className="modal-box">
                <h3 className="font-bold text-lg">Give the best offer!</h3>
                  <p className="py-4">offer something seller can not resist</p>

                  <form onSubmit={handleBidSubmit}>
                      <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input type="text" className="input" name='name' readOnly defaultValue={user?.displayName} />
                        <label className="label">Email</label>
                        <input type="email" className="input"name='email' readOnly defaultValue={user?.email} />
                        <label className="label">Bid</label>
                        <input type="text" className="input" name='bid' placeholder='your bid' />
                        
                        <button className="btn btn-neutral mt-4 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold">Please your bid</button>
                      </fieldset>
                  </form>
              <div className="modal-action">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Cancle</button>
                  </form>
                </div>
               </div>
               </dialog>
              </div>
             </div>
                {/* Bids for this products */}
            <div className='mt-10 bg-white rounded-lg'>
              <h3 className='text-3xl p-2'>Bids for this products: <span className='text-primary text-purple-600'>{bids.length}</span></h3>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          SL NO.
        </th>
        <th>Buyer Name</th>
        <th>Buyer Email</th>
        <th>Bid Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {

        bids.map((bid, index) =><tr key={bid._id}>
        <th>
          {index +1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{bid.buyer_name}</div>
              <div className="text-sm opacity-50">{product.location}</div>
            </div>
          </div>
        </td>
        <td>
          {bid.buyer_email}
        </td>
        <td>{bid.bid_price}</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
        )
    }
      
    </tbody>
   
  </table>
</div>
    </div>
  )
}

export default ProductDetails