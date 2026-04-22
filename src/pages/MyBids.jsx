import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyBids = () => {
  const {user} = useContext(AuthContext);
  const [bids, setBids] = useState([])
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/bids?email=${user.email}`)
    .then(data => {
     
      setBids(data.data)
    })
  },[user, axiosSecure])


  const handleDeletedBid = (_id) => {
      Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed)
  {
    fetch(`http://localhost:3000/bids/${_id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      if(data.deletedCount){
    Swal.fire({
    title: "Deleted!",
    text: "Your bid has been deleted.",
    icon: "success"
  });
  const remainingBids = bids.filter(bid => bid._id !==_id);
  setBids(remainingBids)
      }
    })
  }

    
});

  }

  return (

    <div className='max-w-[1200px] mx-auto my-10'>
     
      {/* Title */}
      <h1 className='text-3xl font-bold text-center mb-6'>
        My Bids: <span className='text-purple-500'>{bids.length}</span>
      </h1>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="w-full border-collapse">

          {/* Head */}
          <thead className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white">
            <tr className="text-start">
              <th className="p-3">SL No</th>
              <th className="p-3">Product</th>
              <th className="p-3">Saller</th>
              <th className="p-3">Bid Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {bids.map((bid, index) => (
              <tr key={bid._id} className="text-center border-b hover:bg-gray-50 transition">

                <td className="p-3">{index + 1}</td>

                <td className="p-3">
                  <div className='flex items-center gap-3 text-start'>
                    <div>
                    <img
                    src={bid.product_image}
                    alt="v"
                    className="w-14 h-14 rounded-md object-cover flex-shrink-0"
                  />
                    </div>
                    <div className='w-[180px]'>
                      <p className="font-medium truncate">{bid.product_title}</p>
                      <p>${bid.product_price_min}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className='flex justify-center text-start items-start gap-2'>
                    <div>
                    <img
                    src={user?.photoURL}
                    alt=""
                    className="w-12 h-12 mx-auto rounded-full border"
                  />
                    </div>
                    <div>
                      <p>{bid.buyer_name}</p>
                      <p>{bid.buyer_email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3">${bid.bid_price}</td>

                <td className="p-3">
                  {bid.status === 'pending' ? <div className='badge badge-warning text-black text-lg w-25 h-8 font-semibold'>
                    {bid.status}
                     </div> :
                     <div className='badge badge-success text-black text-lg font-semibold'>
                      {bid.status}
                      </div>}
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                  <Link onClick={() => handleDeletedBid(bid._id)} to="" className=" p-[2px] rounded-sm bg-gradient-to-r from-[#632EE3] to-[#9F62F2] inline-block"><button className='px-3 py-[3px] rounded-sm bg-white font-semibold hover:bg-gray-100 transition'><span className=' bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Remove Bid</span></button></Link>                 
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

export default MyBids