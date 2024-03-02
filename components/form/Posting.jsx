"use client"
import { Axios } from '@/app/jwt/token';
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
   const response = await Axios.post('http://localhost:5000/api/post/new/post',formData)
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
    <div className="mb-3" >
            <input
             style={{marginLeft:"25%",marginRight:"25%"}}
              type="text"
              value={title}
              placeholder="write a name"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
      <h2>Upload Image</h2>
      <form >
        <input type="file" accept="image/*" onChange={handleImageChange} />
        
      </form>
      {image && (
        <div>
          <h3>Preview:</h3>
          <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '100%' }} />
        </div>
      )}
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default Posting;
