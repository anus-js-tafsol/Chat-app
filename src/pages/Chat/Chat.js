import React, { useState, useEffect } from "react";
import ChatMembers from "../../components/ChatMembers/ChatMembers"
import async from "async";
import style from "./Chat.module.css";
import CurrentChat from "../../components/CurrentChat/CurrentChat";
import { useSelector, useDispatch } from "react-redux";
import { useQuery,useQueryClient } from "react-query";
import { getRooms } from "../../Services/Chat";
import { AddRooms } from "../../store/Chat/ChatSlice";
const Chat = ({ socket }) => {
  const dispatch = useDispatch();
  const [MessageList, setMessageList] = useState([]);
  const [Current, setCurrent] = useState(null);

  const queryClient=useQueryClient()
  const user = useSelector((state) => state.authReducer.authentication.user);
  const token = useSelector((state) => state.authReducer.authentication.token);
  // const user_id=user.UserId.role==='user'?user._id:user.UserId._id
  const user_id=user._id
  useEffect(() => {
    if(user.UserId.role==='user'){
      socket.emit("join", user_id, user.UserId.role);
    } else {
      socket.emit("join", user_id, user.UserId.role)
    }
  }, []);

  useEffect(() => {
   queryClient.invalidateQueries('GetRooms')
  }, [MessageList,Current])
  
  const { isLoading, error, data } = useQuery(
    "GetRooms",
    () => {
      return getRooms(token, user_id);
    },
    {
      onSuccess: (response) => {
        console.log("roomss", response);
        dispatch(AddRooms(response.data));
      },
    }
    );
    // console.log("data",data)
    const room = useSelector((state) => state.ChatReducer.chat.rooms);
    

    


  const clickMember = (element) => {
    if(element!==Current){
      setMessageList([])
    }
    setCurrent(element);
  };
  return (
    <div className={`chat-container`}>
      <div className={` ${style.chat}`}>
        {/* chatbar */}
        <div className={` mx-2  ${style.room} py-3`}>
          {room.map((element, index) => {
            return (
              <div
                onClick={() => {
                  clickMember(element);
                }}
                className={style.member}
              >  
                  <ChatMembers id={Current && Current.id} room={element}/>
                
                {/* <Friends id={Current && Current.id} room={element} /> */}
              </div>
            );
          })}
        </div>

        {/* chat body */}
        <div>
          {Current ? (
            <CurrentChat socket={socket} room={Current} MessageList={MessageList} setMessageList={setMessageList} />
          ) : (
            <div className={` mx-3 ${style.chatBox}`}>
              <div
                className={`d-flex justify-content-center align-items-center ${style.welcome} `}
              >
                <h2>Welcome to chat</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
