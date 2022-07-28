import React, { useState } from "react";
import { useEffect } from "react";
import FriendContext from "./FriendContext";
import jwt from 'jsonwebtoken';


const FriendState = (props) => {
    const [friendList, setFriendList] = useState([]);


    const getAllSortedFriends = async () => {
        const token = localStorage.getItem('auth-token');
        const user_Id = await jwt.decode(token).user.id;
            
        const response = await fetch(`http://localhost:5000/api/auth/sort`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'auth-token': token
                }
            });

            const json = await response.json();
            console.log(json);
            setFriendList(json);
    }


    // useEffect(() => {
    //     getAllSortedFriends();
    // }, [])
    





  return (
    <FriendContext.Provider value = {{ friendList, getAllSortedFriends, setFriendList }} >
        {props.children}
    </FriendContext.Provider>
  )
}

export default FriendState;