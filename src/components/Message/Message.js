import React from 'react'
import style from './Message.module.css'
const Message = ({message,direction}) => {
  return (
    <div className={`d-flex justify-content-center align-items-${direction} flex-column ${style.msgbox} my-3`}>
      <div className={`${style.msg} p-1`}>
       {message.text}
      </div>
      <div className={`mt-1`}>
       {message.createdAt}
      </div>
    </div>
  )
}

export default Message
