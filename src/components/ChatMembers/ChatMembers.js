import React from "react";
import style from "./ChatMembers.module.css";
import { useSelector } from "react-redux";
const host='https://react-jobster-backend.herokuapp.com/api/images/'
const Friends = ({id,room}) => {
  console.log("checkkkk",room)
  const auth = useSelector((state) => state.authReducer.authentication);
    const roomData= auth.user.UserId.role==='user'?room.company:room.craftman
  return (
    <div className={`${style.box} d-flex pt-3 ${id===room.id?'bg-info':''}`}>
        <div className={`mx-2`}>
          <img
            className={`${style.image}`}
            src={`${host}${roomData.photo}`}
            alt=""
          />
        </div>
        <div className={`mx-1 ${style.content}`}>
          <h5 className={`${style.friendName}`}>{roomData.UserId.name}</h5>
          <p className={`${style.msg} my-2`}><span className="fw-bold">{auth.user.UserId._id===room.lastMessage.user._id?"You":roomData.UserId.name}:{"  "}</span>{room.lastMessage.text.slice(0,15)}{room.lastMessage.text.length>=15?"...":""}</p>
        </div>
        <div className={` mx-1 ${style.time}`}>{room.lastMessage.createdAt}</div>
    </div>
  );
};

export default Friends;
