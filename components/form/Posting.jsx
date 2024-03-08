"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
const userId = localStorage.getItem('username')
import {Input} from "../ui/input"
import { Label } from '../ui/label';

const Posting = () => {
  const router = useRouter()
  const [title,setTitle] = useState('')
  const [body, setBody] = useState('');
  const [image,setImage] = useState('')
  const [url,setUrl] = useState('')

useEffect(()=>{
  if(url){
  fetch("http://localhost:5000/api/post/new/post",{
    method:"post",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
       title,
      body,
      pic:url
    })
  }).then(res=>
    res.json()).then(data=>{
  
      if(data.error){
      }
     else{
      router.push("/dashbord")
      console.log('success');
     }
    })
    .catch(err => {
      console.error("Error:", err);
    })
  }
},[url])
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  // };

  // const handleSubmit = async(e) => {
  //   e.preventDefault();

  const postDetails = ()=>{
    const formData = new FormData();
      formData.append('file', image)
      formData.append('upload_preset', 'insta-clone');
      formData.append("cloud_name", "dbcs1wzb6")

      fetch("https://api.cloudinary.com/v1_1/dbcs1wzb6/image/upload",{
        method:"post",
        body:formData
      }
      )
      .then(res=>res.json())
      .then(data=>{
        setUrl(data.url)
      })
      .catch(err=>{
        console.log(err);
      })

      
  }

//       try{
//       const formData = new FormData();
//       formData.append('title', title)
//       formData.append('body', body);
//    const response = await axios.post('http://localhost:5000/api/post/new/post',formData)
//    console.log(response);
//      if(response.status === 201){
//       console.log('image upload successfully');
//       router.push('/dashbord')

//      }
//     }catch(error) {
//         console.error('Error:', error);
    
//     }
//   };

  return (
//     <div>
//      {/* {image && (
//         <div className='flex flex-col justify-center items-center mb-1'>
//           <h3>Preview:</h3>
//           <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '50%',maxHeight: '50%' }} clas />
//         </div>
//       )} */}
//       <div className="mb-1  flex flex-col justify-center items-center" >
//             <textarea
            
//               type="text"
//               value={title}
//               placeholder="text here...."
//               className="form-control rounded-lg w-1/3"
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>
          
//       <form className="flex flex-col justify-center items-center">
//         <div>
//     <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//         <div class="flex flex-col items-center justify-center pt-5 pb-6">
//             <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//             </svg>
//             <input type="file" accept="image/*" onChange={handleImageChange}/>

//             <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
//         </div>
//         <input id="dropzone-file" type="file" class="hidden" />
//         <div className='flex flex-col justify-center items-center'>
//       <button className='bg-pink-700 w-28 mt-2 border rounded-sm ' onClick={handleSubmit}>Post</button>
//       </div>
//     </label>
   
// </div> 
//       </form>
     
     
      
//     </div>
//   );
// };

<div className="card input-filed mx-auto max-w-500px p-20 text-center border w-1/2">
<div className="grid w-full max-w-sm items-center gap-1.5" onChange={(e)=>setImage(e.target.files[0])}>
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file"/>
    </div>
    <input 
        type="text"
        placeholder="title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        className="w-full mb-4 h-[30px] rounded mt-3"
    />
    <div>
    <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e)=>setBody(e.target.value)}
        className="w-full mb-4 h-[30px] rounded"
    />
    </div>
    <button 
        className="btn waves-effect waves-light bg-gray-500 text-white hover:bg-blue-600 focus:bg-blue-600 py-2 px-4 rounded-lg"
        onClick={()=>postDetails()}
    >
        Submit post
    </button>
</div>
    
    
    

)
}
  
export default Posting;
