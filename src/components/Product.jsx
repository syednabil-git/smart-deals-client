import React from 'react'
import LatestProducts from './LatestProducts';
import { Link } from 'react-router-dom';

const Product = ({product}) => {
  const {title, price_min, price_max, image,_id} = product;
  return (
    <div>
       <div className='card-items 0 p-10 mx-auto max-w-[1380px]'>
         <div className=' grid grid-cols-3 gap-2'>
          <div className="card bg-base-100 w-96 shadow-sm">
         <figure className="px-10 pt-10">
         <img
            src={image}
            alt=""
            className="rounded-xl w-80 h-60" />
         </figure>
       <div className=''>
       <div className="card-body">
       <h2 className="card-title">{title} </h2>
       <p className='text-purple-600 font-semibold'>Price: ${price_min} - ${price_max}</p>
       <div className="w-full">
           <Link to={`/productDetails/${_id}`} className=" p-[1.5px] rounded-sm bg-gradient-to-r from-[#632EE3] to-[#9F62F2] inline-block w-full"><button className='px-5 py-[6px] rounded-sm bg-white font-semibold hover:bg-gray-100 transition w-full'><span className=' bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>View Details</span></button></Link> 
       </div>
      </div>
    </div>
          </div>
      
        </div>

    
      </div>
      </div>
  )
}

export default Product