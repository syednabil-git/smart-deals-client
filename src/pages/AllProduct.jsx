import React, { use, useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import Product from '../components/Product'
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const AllProduct = () => {
  
   const [products, setProducts] = useState([]);
   const { user } = use(AuthContext);
   useEffect(() => {
    axios.get('http://localhost:3000/all-products')
      .then(res => setProducts(res.data));
        
   }, []);
  return (
    <div>
      <h1 className='font-bold text-4xl text-center text-purple-500 my-10'>All Products</h1>
      <div>
           <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
            {
            products.map(product => <Product 
            key={product._id} 
            product = {product}
            ></Product>)
            }
        </div>
      </div>
    </div>
  )
}

export default AllProduct