import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import chatContext from '../context/ChatContext';
import modeContext from '../context/ModeContext';
import jwt from 'jsonwebtoken';
import chatNotiContext from '../context/ChatNotiContext';

const Sidebar = ({ socket }) => {
  const [noOfFrNoti, setNoOfFrNoti] = useState(0);
  const [hasNoti, setHasNoti] = useState(false);


  const context = useContext(chatContext);
  const { loggingOut, setChatContent, setId, setName, setAvatarURL } = context;

  
  const mode_context = useContext(modeContext);
  const { darkMode, toggleDarkMode } = mode_context;

  const chat_noti_context = useContext(chatNotiContext);
  const { chat_noti, noOfChatNoti, hasChatNoti } = chat_noti_context;

  // useEffect(() => {
  //   if (localStorage.getItem('mode')) {
  //     if (localStorage.getItem('mode') === 'light') {
  //       toggleDarkMode(false);
  //     }
  //     else {
  //       toggleDarkMode(true);
  //     }
  //   }
  // }, [])
  


  let navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('auth-token');
    navigate('/login');
    loggingOut();
    setChatContent([]);
  }


  useEffect(() => {


    if (localStorage.getItem('auth-token')) {
    const sendOnline = async () => {
      const token = localStorage.getItem('auth-token');
      const user_Id = await jwt.decode(token).user.id;
  
      await socket.emit('isOnline', user_Id);
    }
    sendOnline();
  }
  else {
    navigate('/login');
  }
  }, [])
  


  let noti;

  useEffect(() => {


    if (localStorage.getItem('auth-token')) {
    noti = async () => {

    const token = localStorage.getItem('auth-token');
    const user_Id = await jwt.decode(token).user.id;
    
    
    const response = await fetch(`http://localhost:5000/api/auth/nooffrnoti`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': token
      }
      }).then((res) => res.json())
      .then((promiseRes) => {
        if (promiseRes.number !== 0) {
          setHasNoti(true);
          setNoOfFrNoti(promiseRes.number);
        }
        else {
          setHasNoti(false);
          setNoOfFrNoti(0);
        }
      })

    }


    noti();
  
      chat_noti();

      console.log("Sex1 => " + hasChatNoti);
      console.log("Sex2 => " + noOfChatNoti);
  }
  }, [])
  








  useEffect(() => {
    socket.on('notification_received', () => {
      console.log("Notification Received sexy boiii!");
      noti();
    });

    socket.on('chat_notification_received', (my_Id) => {
      chat_noti();
    })

    socket.on('goOffline', () => {
      const goingOffline = async () => {
        const token = localStorage.getItem('auth-token');
        const user_Id = await jwt.decode(token).user.id;
    
    
        const response = await fetch(`http://localhost:5000/api/auth/offline`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': token    // Dude, this line fucking took me 10 mins to identify that i've not added it lol
                },
            });
    
            const json = await response.json();
            console.log(json);
          }
          goingOffline();
    })
  }, [socket])
  







  return (
        <nav style={{backgroundColor: darkMode?'#3e3f44': '#4768b5', transition: 'background-color ease 0.3s'}} className="menu">
        <ul className="items">
          <li style={{cursor: 'pointer'}} className="item, tooltipa" onClick={() => {setChatContent([]); setName(""); setAvatarURL(''); setId(''); navigate('/edit')}}>
            <i style={{marginTop: '20px'}} className="sexy-icon fa fa-user" aria-hidden="true"></i>
            <span class="tooltipatext">Your Account</span>
          </li>
          <hr style={{margin: '0px', color: 'white', marginTop: '20px', marginBottom: '1px'}} />

          <li style={{cursor: 'pointer'}} className="item, tooltipa" onClick={() => {setChatContent([]); setName(""); setAvatarURL(''); setId(''); navigate('/addfriend')}}>


          {hasNoti && <span class="nomad position-absolute start-100 translate-middle badge rounded-pill bg-danger">
            {noOfFrNoti}
            <span class="visually-hidden">unread messages</span>
          </span>}

            <i style={{marginTop: '20px'}} className="sexy-icon fa-solid fa-user-plus" aria-hidden="true"></i>
            <span class="tooltipatext">Add a Friend</span>
          </li>
          <hr style={{margin: '0px', color: 'white', marginTop: '20px', marginBottom: '1px'}} />

          <li style={{cursor: 'pointer'}} className="item, tooltipa" onClick={() => {setChatContent([]); setName(""); setAvatarURL(''); setId(''); navigate('/')}}>

          {hasChatNoti && <span class="nomad position-absolute start-100 translate-middle badge rounded-pill bg-danger">
            {noOfChatNoti}
            <span class="visually-hidden">unread messages</span>
          </span>}


            <i style={{marginTop: '20px'}} className="sexy-icon fa fa-commenting" aria-hidden="true"></i>
            <span class="tooltipatext">Messages</span>
          </li>
          <hr style={{margin: '0px', color: 'white', marginTop: '20px', marginBottom: '1px'}} />
          {/* <li className="item">
            <i className="fa fa-commenting" aria-hidden="true"></i>
          </li> */}

          {/* <li className="item item-active">
            <i className="fa fa-commenting" aria-hidden="true"></i>
          </li> */}
          {/* <li className="item">
            <i className="fa fa-cog" aria-hidden="true"></i>
          </li> */}
          <li style={{cursor: 'pointer'}} className="item, tooltipa" onClick={toggleDarkMode}>
            {!darkMode?(<i style={{marginTop: '20px'}} className="sexy-icon fa-solid fa-moon"></i>):
            (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun sexy-sex" viewBox="0 0 16 16">
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
          </svg>)}
            <span class="tooltipatext">{darkMode?'Disable Dark Mode':'Enable Dark Mode'}</span>
          </li>
          <hr style={{margin: '0px', color: 'white', marginTop: '20px', marginBottom: '1px'}} />
          <li style={{cursor: 'pointer'}} className="item, tooltipa" onClick={logout}>
          <i style={{marginTop: '20px'}} className="sexy-icon fa-solid fa-power-off"></i>
            <span class="tooltipatext">Logout</span>
          </li>
        </ul>
      </nav>
  )
}

export default Sidebar