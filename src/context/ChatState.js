import React, { useState } from "react";
import ChatContext from "./ChatContext";
import jwt from 'jsonwebtoken';


const ChatState = (props) => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [avatarURL, setAvatarURL] = useState("");
    const [chatContent, setChatContent] = useState([])





        
    const loggingOut = () => {
        setChatContent([]);
        setName("");
        setId("");
        setAvatarURL("");
    }






    const getMessages = async (otherId) => {
        const token = localStorage.getItem('auth-token');
        // const user_Id = await jwt.decode(token).user.id;


        const response = await fetch(`http://localhost:5000/api/message/chat/${otherId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': token
            },
        });

        const json = await response.json();
        console.log(json);
        setChatContent(json);
    }





    const changeChatWith = async (changetoid, name, url) => {
        setId(changetoid);
        setName(name);
        setAvatarURL(url);









        const token = localStorage.getItem('auth-token');
        const user_Id = await jwt.decode(token).user.id;


        const response = await fetch(`http://localhost:5000/api/message/chat/${changetoid}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': token
            },
        });

        const json = await response.json();
        // console.log(json);
        setChatContent(json);
    }






    const getmydetails = async () => {

        const token = localStorage.getItem('auth-token');
        const user_Id = await jwt.decode(token).user.id;


        const response = await fetch(`http://localhost:5000/api/auth/finduser/${user_Id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': token
            },
        });

        const json = await response.json();
        console.log(json);
    };

















    return(
    <ChatContext.Provider value = {{changeChatWith, setName, setId, setAvatarURL, name, id, chatContent, avatarURL, setChatContent, loggingOut, getmydetails, getMessages}} >
        {props.children}
    </ChatContext.Provider>
    )
};


export default ChatState;