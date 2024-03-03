"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Posting = () => {
  const router = useRouter()
  const [title,setTitle] = useState('')
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

      try{
      const formData = new FormData();
      formData.append('title', title)
      formData.append('image', image);
   const response = await axios.post('http://localhost:5000/api/post/new/post',formData)
   console.log(response);
     if(response.status === 201){
      console.log('image upload successfully');
      router.push('/dashbord')

     }
    }catch(error) {
        console.error('Error:', error);
    
    }
  };

  return (
    <div>
    <div className="mb-3 w-full" >
            <textarea
            
              type="text"
              value={title}
              placeholder="text here...."
              className="form-control w-full"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
      
      <form >
        <div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <input type="file" accept="image/*" onChange={handleImageChange} />

            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" />
    </label>
</div> 
      </form>
      {image && (
        <div>
          <h3>Preview:</h3>
          <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '100%' }} />
        </div>
      )}
      <button className='bg-red-300 w-28 mt-2 border rounded-sm' onClick={handleSubmit}>Post</button>
    </div>
  );
};

export default Posting;
