import React, { use } from 'react'
import Product from './Product';

const LatestProducts = ({LatestProductsPromise}) => {
    const products = use (LatestProductsPromise);
    console.log(products)
    return (
    <div className='mx-auto'>
        <h1 className='text-3xl font-bold text-center mt-10 '>Recent <span className='text-purple-500'>Products</span> </h1>

        <div className='mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
            {
            products.map(product => <Product 
            key={product._id} 
            product = {product}
            ></Product>)
            }
        </div>
    </div>
  )
}

export default LatestProducts;