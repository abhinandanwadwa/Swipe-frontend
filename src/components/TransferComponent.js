import React from 'react'
import Discussions from './Discussions'
import Sidebar from './Sidebar'
import TransferToChat from './TransferToChat'
import ModeContext from '../context/ModeContext'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt from 'jsonwebtoken'

const TransferComponent = ({ socket }) => {
  const navigate = useNavigate();

  const mode_context = useContext(ModeContext);
  const { darkMode, toggleDarkMode } = mode_context;


  useEffect(() => {
    if (!localStorage.getItem('auth-token') || localStorage.getItem('auth-token') === null) {
      navigate('/login');
    }
    else {
      const sexy_man = async () => {
        const token = localStorage.getItem('auth-token');
        const user_Id = await jwt.decode(token).user.id;
        
        socket.emit('userloggedin', user_Id)
      }
      sexy_man();
    }
  }, [])
  


  // useEffect(() => {
  //   if (localStorage.getItem('mode')) {
  //     if (localStorage.getItem('mode') === 'light' && darkMode === true) {
  //       toggleDarkMode();
  //     }
  //     else {
  //       if (darkMode === false) {
  //           toggleDarkMode();
  //       }
  //     }
  //   }
  // }, [])
  

  console.log(localStorage.getItem('auth-token'));

  return (
    <>
        <div className="container">
        <div className="row" id={darkMode?'dark':'light'} style={{display: "flex", flexDirection: "row", transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#343434': 'white'}}>
          <Sidebar socket={socket} />
          <Discussions socket={socket} />
          <TransferToChat socket={socket} />
          {/* <Chat socket={socket} /> */}
        </div>
      </div>
      </>
  )
}

export default TransferComponent