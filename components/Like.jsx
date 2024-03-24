import React, { useEffect, useState } from 'react'

const Like = ({id}) => {

    const [liked,setLiked] = useState(false);
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
const cheackLikedStatus = async()=>{
try {
    const response = await axios.get(
        `http://localhost:5000/api/post/postby/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            postId: id,
          }),
        }
      );
} catch (error) {
    
}
}
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Like
