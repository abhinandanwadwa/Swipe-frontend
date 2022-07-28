import React, { useState } from "react";
import { useEffect } from "react";
import ChatNotiContext from "./ChatNotiContext";
import jwt from 'jsonwebtoken';


const ChatNotiState = (props) => {
    const [hasChatNoti, setHasChatNoti] = useState(false);
    const [noOfChatNoti, setNoOfChatNoti] = useState(0);


    
    const chat_noti = async () => {

        console.log("New Chate Received");
  
        const token = localStorage.getItem('auth-token');
        const user_Id = await jwt.decode(token).user.id;
        
        
        const response = await fetch(`http://localhost:5000/api/auth/calcnoofchatnoti`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'auth-token': token
          }
          }).then((res) => res.json())
          .then((promiseRes) => {
            if (promiseRes.number !== 0) {
              setHasChatNoti(true);
              setNoOfChatNoti(promiseRes.number);
            }
            else {
              setHasChatNoti(false);
              setNoOfChatNoti(0);
            }
            console.log(promiseRes.number);
          })
    
        }



        const chatseen = async (id) => {
            const token = localStorage.getItem('auth-token');
            const user_Id = await jwt.decode(token).user.id;
            
            const response = await fetch(`http://localhost:5000/api/auth/markseen/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'auth-token': token
                }
            }).then((res) => res.json())
            .then((promiseRes) => {
                if (promiseRes.success === true) {
                    chat_noti();
                }
            })
        }
    





  return (
    <ChatNotiContext.Provider value = {{chat_noti, hasChatNoti, noOfChatNoti, chatseen}} >
        {props.children}
    </ChatNotiContext.Provider>
  )
}

export default ChatNotiState;