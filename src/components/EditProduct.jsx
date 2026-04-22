import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAxiosSecure from '../hooks/useAxiosSecure';

const EditProduct = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
     const [condition, setCondition] = useState("new")
     useEffect(() => {
        axiosSecure.get(`/products/${id}`)
        .then(res => setProduct(res.data));
     }, [id]);

     const [formData, setFormData] = useState({
            title: "",
            price_min: "",
            price_max: "",
            category: "",
            image: "",
            usage: "",
            seller_name: "",
            seller_contact: "",
            email: "",
            seller_image: "",
            location: "",
            description: ""
        });

     useEffect(() => {
        if(product) {
            setFormData({
                title: product.title,
                price_min: product.price_min,
                price_max: product.price_max,
                category: product.category,
                image: product.image,
                usage: product.usage,
                seller_name: product.seller_name,
                seller_contact: product.seller_contact,
                email: product.email,
                seller_image: product.seller_image,
                location: product.location,
                description: product.description,
            });
             setCondition(product.condition || "new");
        }
     }, [product]);

     const handleChange = (e) => {
      console.log("DATA SENDING:", {
        ...formData,
         condition
        });
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
     };

     const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    await axiosSecure.patch(`/products/${id}`, {
      ...formData,
      condition
    });

    alert("Product updated successfully!");
    navigate("/my-product");
  } catch (error) {
    console.log(error);
  }
};

  return (
     <div>
      <form onSubmit={handleUpdate}>
        <div className='flex justify-between max-w-[1000px] mx-auto p-10 px-20 gap-5 items-start'>
            <div className='flex-1'>
              <fieldset className="fieldset">
              <legend className="fieldset-legend">Title</legend>
              <input type="text" name='title' value={formData.title} onChange={handleChange} className="input w-full" placeholder="e.g. Yamaha Fz Guitar for Sale" />
              </fieldset>
              <fieldset className="fieldset">
              <legend className="fieldset-legend">Min Price You want to Sale ($)</legend>
              <input type="text" name='price_min' value={formData.price_min}
                    onChange={handleChange} className="input w-full" placeholder="e.g. 18.5" />
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
                  <select name="category" value={formData.category}
                     onChange={handleChange}  className="select w-full">
                  <option value="" disabled>Pick a Catagory</option>
                  <option>Appliances</option>
                  <option>Electronics</option>
                  <option>Furniture</option>
                  </select>
                  </fieldset>
                   <fieldset className="fieldset">
                    <legend className="fieldset-legend">Max Price You want to Sale ($)</legend>
                    <input type="text" name='price_max' value={formData.price_max}
                     onChange={handleChange} className="input w-full" placeholder="e.g. 19" />
                    </fieldset>
                     <fieldset className="fieldset">
                      <legend className="fieldset-legend">Product Usage time</legend>
                      <input type="text" name="usage" value={formData.usage}
                     onChange={handleChange} className="input w-full" placeholder="e.g. 1 year 3 month " />
                      </fieldset>
            </div>  
        </div>
        {/* Your Product Image URL */}
          <div className=' max-w-[1000px] mx-auto px-20 '>
             <fieldset className="fieldset">
              <legend className="fieldset-legend">Your Product Image URL</legend>
              <input type="text" name='image' value={formData.image}
                    onChange={handleChange} className="input w-full" placeholder="https://..." />
              </fieldset>
          </div>
          {/* saler part   */}
          <div className='flex justify-between items-center max-w-[1000px] mx-auto px-20 gap-5'>
             <div className='flex-1'>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Seller Name</legend>
                  <input type="text" name='seller_name' value={formData.seller_name}
                     onChange={handleChange} className="input w-full" placeholder="e.g. Artisan Roasters" />  
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Seller Contact</legend>
                  <input type="text" name='seller_contact' value={formData.seller_contact}
                     onChange={handleChange} className="input w-full" placeholder="e.g. +1-555-1234" />
                </fieldset>
             </div>
             <div className='flex-1'>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Seller Email</legend>
                  <input type="text" name="email" className="input w-full" value={formData.email}
                     onChange={handleChange} placeholder="leli31955@nrlord.com" />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Seller Image URL</legend>
                  <input type="text" name='seller_image' value={formData.seller_image}
                     onChange={handleChange} className="input w-full" placeholder="https://..." />
                </fieldset>
             </div>
          </div>
          {/* location */}
          <div className='max-w-[1000px] mx-auto px-20'>
               <fieldset className="fieldset">
               <legend className="fieldset-legend">Location</legend>
               <input type="text" name='location' value={formData.location}
                     onChange={handleChange} className="input w-full" placeholder="City, Country" />
               </fieldset>
          </div>
          {/* Simple Description about your Product */}
          <div className='max-w-[1000px] mx-auto px-20'>
             <fieldset className="fieldset">
               <legend className="fieldset-legend">Simple Description about your Product</legend>
               <input type="text" name='description' value={formData.description}
                     onChange={handleChange} className="input w-full h-30" placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough..... " />
              </fieldset>
          </div>

          {/* Button */}
          <div className='max-w-[1000px] mx-auto px-20 mt-5'>
            <button className='btn w-full  bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold text-lg'>
             Update Product
            </button>
          </div>
      </form>
        

    </div>
  )
}

export default EditProduct