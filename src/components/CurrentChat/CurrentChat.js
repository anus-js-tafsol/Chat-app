import React, { useState, useEffect } from "react";
import Message from "../../components/Message/Message";
import style from "./CurrentChat.module.css";
import send from "../../assets/send-fill.svg";
import { useMutation, useQuery } from "react-query";
import { getRoomChat, sendMessage } from "../../Services/Chat";
import { useSelector } from "react-redux";
import { mockComponent } from "react-dom/test-utils";
import { Oval } from "react-loader-spinner";
import moment from "moment";
const host = "https://react-jobster-backend.herokuapp.com/api/images/";

const CurrentChat = ({ room, socket, MessageList, setMessageList }) => {
  const [Msg, setMsg] = useState("");
  const [isLoading, setisLoading] = useState(false);
 
  const auth = useSelector((state) => state.authReducer.authentication);

  // const user_id=auth.user.UserId.role==='user'?auth.user._id:auth.user.UserId._id
  const user_id = auth.user.UserId._id;
  const roomData =
    auth.user.UserId.role === "user" ? room.company : room.craftman;

  // const { isLoading, error, data } = useQuery(
  //   "GetRoomChat",
  //   () => {
  //     return getRoomChat(auth.token, room.id);
  //   },
  //   {
  //     onSuccess: (response) => {
  //       console.log("roomMsgs", response);
  //       setMessageList(response.data);
  //     },
  //   }
  // );
  const getChats = async () => {
    const response = await getRoomChat(auth.token, room.id);
    setMessageList(response?.data);
  };
 
  useEffect(() => {
    getChats();
   
  }, [room,MessageList]);

  // const mutation = useMutation(
  //   async (info) => {
  //     return sendMessage(info);
  //   },
  //   {
  //     onSuccess: async (response) => {
  //       console.log(response);
  //     },
  //   }
  // );
  useEffect(() => {
    socket.emit("chatJoin", user_id, room.id, auth.user.UserId.role);
  }, [room]);

  const messageChange = (e) => {
    setMsg(e.target.value);
  };

  const sendMsg = (e) => {
    e.preventDefault();
    const msg = {
      text: Msg,
      createdAt: moment().format("DD MMM YYYY"),
      user: {
        _id: user_id,
        name:
          auth.user.UserId.role === "user"
            ? auth.user.userName
            : auth.user.UserId.companyName,
        avatar: auth.user.UserId.photo,
      },
    };

    socket.emit("msg", msg, roomData._id, room.id, auth.user?.UserId?.role);
    setMsg("");
    setMessageList((prev) => [msg, ...prev]);
  };
  // const sendMsgPressEnter = (e) => {
  //   if(e.key === 'Enter' && Msg.length>0){
  //     const msg = {
  //       text: Msg,
  //       createdAt: moment().format('DD MMM YYYY'),
  //       user: {
  //         _id: auth.user._id,
  //         name: auth.user.userName,
  //         avatar: auth.user.photo,
  //       },
  //     };
  //     console.log(msg, room.company._id, room.id, auth.user?.UserId?.role)
  //    socket.emit("msg", msg, room.company._id, room.id, auth.user?.UserId?.role);
  //    setMessageList((prev)=>[msg,...prev])
  //    setMsg('')

  //   }

  // }

  return (
    <div className={` mx-3 ${style.chatBox}`}>
      <div>
        <div className={`d-flex align-items-center ${style.head}`}>
          <div className={`mx-2`}>
            <img
              className={`${style.image}`}
              src={`${host}${roomData.photo}`}
              alt=""
            />
          </div>
          <div className={`d-flex flex-column justify-content-center mx-1`}>
            <h4 className={`${style.friendName}`}>{roomData.UserId.name}</h4>
            <h6 className={`${style.friendName}`}>{roomData.contactPerson}</h6>
            <p className={`${style.status} my-1`}>
              {roomData.isOnline ? "online" : ""}
            </p>
          </div>
        </div>

        
          <div className={`${style.chatSection} d-flex flex-column flex-column-reverse`}>

            {MessageList.length>0?MessageList.map((message, index) => {
              return (
                <Message
                  message={message}
                  direction={message.user._id === user_id ? "end" : "start"}
                />
              );
            }):
            <div className={`${style.chatSection} d-flex justify-content-center align-items-center`}>
              <Oval
                height={80}
                width={80}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
            }
          </div>

        <div>
          <form
            className={`d-flex ${style.typeMsg} align-items-center p-1 my-2 mx-2`}
            onSubmit={sendMsg}
          >
            <input
              value={Msg}
              onChange={messageChange}
              className=""
              type="text"
              name=""
              id=""
              placeholder="Type message here"
            />
            <button
              type="submit"
              disabled={Msg.length <= 0}
              className={`${style.sendButton} d-flex justify-content-center align-items-center`}
            >
              <img className={style.send} src={send} alt="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CurrentChat;

// import React, { useState, useEffect } from "react";
// import Message from "../../components/Message/Message";
// import style from "./CurrentChat.module.css";
// import send from "../../assets/send-fill.svg";
// import { useMutation, useQuery } from "react-query";
// import { getRoomChat, sendMessage } from "../../Services/Chat";
// import { useSelector } from "react-redux";
// import { mockComponent } from "react-dom/test-utils";
// import moment from "moment";
// const host = "https://react-jobster-backend.herokuapp.com/api/images/";

// const CurrentChat = ({ room, socket }) => {
//   const [Msg, setMsg] = useState(null);
//   const [MessageList, setMessageList] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const auth = useSelector((state) => state.authReducer.authentication);

//   const getChats=async()=>{
//   const data=await getRoomChat(auth.token, room.id);
//           setMessageList(data?.data)

//   }
//   const mutation = useMutation(
//     async (info) => {
//       return sendMessage(info);
//     },
//     {
//       onSuccess: async (response) => {
//         console.log(response);
//       },
//     }
//   );
//   useEffect(() => {
//     socket.emit("chatJoin", auth.user._id, room.id, auth.user.UserId.role);
//   }, []);
//   useEffect(() => {
//     if(room !== null){
//       getChats()
//     }
//   }, [room]);

//   const messageChange = (e) => {
//     setMsg(e.target.value);
//   };

//   const sendMsg = () => {
//     const msg = {
//       _id: Math.random()*10000,
//       text: Msg,
//       createdAt: moment().format('DD MMM YYYY'),
//       user: {
//         _id: auth.user._id,
//         name: auth.user.userName,
//         avatar: auth.user.photo,
//       },
//     };
//     console.log(msg, room.company._id, room.id, auth.user?.UserId?.role)
//    socket.emit("msg", msg, room.company._id, room.id, auth.user?.UserId?.role);
//     setMessageList((prev)=>[msg,...prev])
//     // const sendbody = {
//     //   msg: msg,
//     //   msgFrom: auth.user._id,
//     //   msgTo: room.company._id,
//     //   currentUser: auth.user.role,
//     // };
//     // mutation.mutate({
//     //   body:sendbody,
//     //   token:auth.token});
//   };
//   console.log({MessageList})

//   return (
//     <div className={` mx-3 ${style.chatBox}`}>
//       <div>
//         <div className={`d-flex align-items-center ${style.head}`}>
//           <div className={`mx-2`}>
//             <img
//               className={`${style.image}`}
//               src={`${host}${room.company.photo}`}
//               alt=""
//             />
//           </div>
//           <div className={`d-flex flex-column justify-content-center mx-1`}>
//             <h4 className={`${style.friendName}`}>
//               {room.company.UserId.name}
//             </h4>
//             <h6 className={`${style.friendName}`}>
//               {room.company.contactPerson}
//             </h6>
//             <p className={`${style.status} my-1`}>
//               {room.company.isOnline ? "online" : ""}
//             </p>
//           </div>
//         </div>

//         <div
//           className={`${style.chatSection} d-flex flex-column flex-column-reverse`}
//         >
//           {!isLoading ? (
//             MessageList?.map((message, index) => {
//               return (
//                 <Message
//                   message={message}
//                   direction={
//                     message.user._id === auth.user._id ? "end" : "start"
//                   }
//                 />
//               );
//             })
//           ) : (
//             <div>loading</div>
//           )}
//         </div>

//         <div
//           className={`d-flex ${style.typeMsg} align-items-center p-1 my-2 mx-2`}
//         >
//           <input
//             onChange={messageChange}
//             className=""
//             type="text"
//             name=""
//             id=""
//             placeholder="Type message here"
//           />
//           <img
//             onClick={() => {
//               sendMsg();
//             }}
//             className={style.send}
//             src={send}
//             alt=""
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrentChat;
