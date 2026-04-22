import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAxios from '../hooks/useAxios';

const CreateProduct = () => {

  const { user } = useAuth()
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const [condition, setCondition] = useState("new")
  const handleCreateProduct = async(e) => {
  e.preventDefault();


  const form = e.target;
  const newProduct = {
    title: form.title.value,
    image: form.image.value,
    price_min: form.price_min.value,
    price_max: form.price_max.value,
    seller_name: user.displayName,
    email: user.email,
    seller_contact: form.seller_contact.value,
    seller_image: form.seller_image.value,
    location: form.location.value,
    condition: condition,
    usage: form.usage.value,
    description: form.description.value,
    status: "Pending",
    category: form.category.value,
    create_at: new Date()
  };
  try{
    const res = await axiosSecure.post('/products', newProduct);
    if(res.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product created successfully",
        showConfirmButton: false,
        timer: 1500
      });
      form.reset();
    }
  } catch (error) {
      console.error(error);
      Swal.fire({
      icon: "error",
      title: "Failed to create product",
      text: error.response?.data?.message || error.message
    });
    }
  };
 
  
  return (
    <div>
      <form onSubmit={handleCreateProduct}>
        <div className='flex justify-between max-w-[1000px] mx-auto p-10 px-20 gap-5 items-start'>
            <div className='flex-1'>
              <fieldset className="fieldset">
              <legend className="fieldset-legend">Title</legend>
              <input type="text" name='title' className="input w-full" placeholder="e.g. Yamaha Fz Guitar for Sale" />
              </fieldset>
              <fieldset className="fieldset">
              <legend className="fieldset-legend">Min Price You want to Sale ($)</legend>
              <input type="text" name='price_min' className="input w-full" placeholder="e.g. 18.5" />
              </fieldset>
              <div className="max-w-[1000px] mx-auto mt-2">
                <p className="fieldset font-semibold">Product Condition</p>

                 <div className="flex flex-col md:flex-row items-center md:gap-8">
                 {/* <!-- Brand New --> */}
                 <label className="flex items-center gap-2 cursor-pointer">
                <input 
                       type="radio" 
                       name="condition"
                       value="new"
                       checked= {condition === "new"}
                       onChange={(e) => setCondition(e.target.value)}
                       className="w-5 h-5 accent-purple-600"
                        />
                   <span className="text-gray-800">Brand New</span>
                    </label>

                     {/* <!-- Used --> */}
                    <label className="flex items-center gap-2 cursor-pointer">
                     <input 
                       type="radio" 
                        name="condition"
                        value="used"
                        checked= {condition === "used"}
                        onChange={(e) => setCondition(e.target.value)} 
                       className="w-5 h-5 accent-purple-600"
                       />
                        <span className="">Used</span>
                      </label>
                          </div>
              </div>
              
            </div>
            <div className='flex-1'>
                  <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend w-full">Category</legend>
                  <select name="category" defaultValue="" className="select w-full">
                  <option value="" disabled>Pick a Catagory</option>
                  <option>Appliances</option>
                  <option>Electronics</option>
                  <option>Furniture</option>
                  </select>
                  </fieldset>
                   <fieldset className="fieldset">
                    <legend className="fieldset-legend">Max Price You want to Sale ($)</legend>
                    <input type="text" name='price_max' className="input w-full" placeholder="e.g. 19" />
                    </fieldset>
                     <fieldset className="fieldset">
                      <legend className="fieldset-legend">Product Usage time</legend>
                      <input type="text" name="usage" className="input w-full" placeholder="e.g. 1 year 3 month " />
                      </fieldset>
            </div>  
        </div>
        {/* Your Product Image URL */}
          <div className=' max-w-[1000px] mx-auto px-20 '>
             <fieldset className="fieldset">
              <legend className="fieldset-legend">Your Product Image URL</legend>
              <input type="text" name='image' className="input w-full" placeholder="https://..." />
              </fieldset>
          </div>
          {/* saler part   */}
          <div className='flex justify-between items-center max-w-[1000px] mx-auto px-20 gap-5'>
             <div className='flex-1'>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Saler Name</legend>
                  <input type="text" name='name' className="input w-full" placeholder="e.g. Artisan Roasters" />  
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Seller Contact</legend>
                  <input type="text" name='seller_contact' className="input w-full" placeholder="e.g. +1-555-1234" />
                </fieldset>
             </div>
             <div className='flex-1'>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Seller Email</legend>
                  <input type="text" className="input w-full" placeholder="leli31955@nrlord.com" />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Seller Image URL</legend>
                  <input type="text" name='seller_image' className="input w-full" placeholder="https://..." />
                </fieldset>
             </div>
          </div>
          {/* location */}
          <div className='max-w-[1000px] mx-auto px-20'>
               <fieldset className="fieldset">
               <legend className="fieldset-legend">Location</legend>
               <input type="text" name='location' className="input w-full" placeholder="City, Country" />
               </fieldset>
          </div>
          {/* Simple Description about your Product */}
          <div className='max-w-[1000px] mx-auto px-20'>
             <fieldset className="fieldset">
               <legend className="fieldset-legend">Simple Description about your Product</legend>
               <input type="text" name='description' className="input w-full h-30" placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough..... " />
              </fieldset>
          </div>

          {/* Button */}
          <div className='max-w-[1000px] mx-auto px-20 mt-5'>
            <button className='btn w-full  bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold text-lg'>
              Create a Product
            </button>
          </div>
      </form>
        

    </div>
  )
}

export default CreateProduct