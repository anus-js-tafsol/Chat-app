// import Store from '../store/index'
// import { useDispatch, useSelector } from "react-redux"

const getRooms=async(token,userId)=>{
    console.log("idddd",userId)
    let res=await fetch(`https://react-jobster-backend.herokuapp.com/api/chat/rooms?_id=${userId}`,{
        method:'GET',
        headers:{
            'content-Type':'application/json',
            'authorization':`Bearer ${token}`
        },
    })
    const response =await res.json()
    // console.log(response)
    return response
}

const getRoomChat=async(token,roomId)=>{
    let res=await fetch(`https://react-jobster-backend.herokuapp.com/api/chat/room/single-chat/${roomId}`,{
        method:'GET',
        headers:{
            'content-Type':'application/json',
            'authorization':`Bearer ${token}`
        },
    })
    const response =await res.json()
    console.log("roomchat",response)
    return response
}


const sendMessage=async(info)=>{
    const {body,token}=info
    console.log("tokemmm",token)
    const res = await fetch(
        `https://react-jobster-backend.herokuapp.com/api/chat/message/create`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );
      const response = await res.json();
      console.log("msg send", response);
      return response
}
export {getRooms,getRoomChat,sendMessage}