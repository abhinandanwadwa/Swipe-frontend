import React, { useContext, useEffect, useRef, useState } from 'react';
import chatContext from '../context/ChatContext';
import modeContext from '../context/ModeContext';
import jwt from 'jsonwebtoken';
import chatNotiContext from '../context/ChatNotiContext';
// import ContextMenu from "@agjs/react-right-click-menu";
import ContextMenu from 'react-jsx-context-menu';
import RightClickMenu from './RightClickMenu';



const ProfileItem = (props) => {
  const profileRef = useRef(null);

  const mode_context = useContext(modeContext);
  const { darkMode } = mode_context;


  const context = useContext(chatContext);
  const { changeChatWith } = context;

  const sexy_context = useContext(chatNotiContext);
  const { chatseen } = sexy_context;



  const [isFriendsex, setIsFriendsex] = useState(true);
  const [itsMe, setItsMe] = useState(false);
  const [btnText, setBtnText] = useState("Add Friend");
  const [requestSent, setRequestSent] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [receivedRequest, setReceivedRequest] = useState(false);
  const [chatNotification, setChatNotification] = useState(false);
  const [noOfChatNotifications, setNoOfChatNotifications] = useState(0);
  const [isOnline, setIsOnline] = useState(false);
  const [isMenuShown, setIsMenuShown] = useState(false);


  useEffect(() => {
    const isFriend = async () => {
      const token = localStorage.getItem('auth-token');
      const user_Id = await jwt.decode(token).user.id;

      if (props.id === user_Id) {
        setItsMe(true);
      }
      
      
      const response = await fetch(`http://localhost:5000/api/auth/isfriend/${props.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'auth-token': token
        }
        }).then((res) => res.json())
        .then((pending) => {
          console.log(pending);
          if (pending === true) {
            setIsFriendsex(true);
            console.log("Friend");
            // setButtonText('Friend Request Sent');
            // setIsDisabled(true);
            // setIsFriends(true);
            // setReceivedRequest(true);
          }
          else {
            setIsFriendsex(false);
            console.log("Not Friend");
          }
        })
    }

    isFriend();
  }, [])





  const sendFrNotification = async () => {
    const token = localStorage.getItem('auth-token');
    const user_Id = await jwt.decode(token).user.id;
    
    
    const response = await fetch(`http://localhost:5000/api/auth/sendfriendreqnoti/${props.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      });
  }





  const addFriend = async () => {

    const token = localStorage.getItem('auth-token');
    const user_Id = await jwt.decode(token).user.id;
    
    
    const response = await fetch(`http://localhost:5000/api/auth/sendfriendrequest/${props.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': token
      }
      }).then((res) => res.json())
      .then((promiseRes) => {
        if (promiseRes.success === true) {
          setBtnText("Pending");
          setRequestSent(true);
          setIsDisabled(true);
          sendFrNotification();
          props.socket.emit('sent_fr_notification', props.id);

        }
        else {
          setBtnText('Already Sent');
          setRequestSent(true);
          setIsDisabled(true);
          // console.log("Not Sent");
        }
      })

      // console.log(response.json());


    // setButtonText('Friend Request Sent');
    // setIsDisabled(true);
  }


  





  

  











  useEffect(() => {
    const isPending = async () => {
      const token = localStorage.getItem('auth-token');
      const user_Id = await jwt.decode(token).user.id;
      
      
      const response = await fetch(`http://localhost:5000/api/auth/pendingrequest/${props.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'auth-token': token
        }
        }).then((res) => res.json())
        .then((pending) => {
          // console.log(pending);
          if (pending === true) {
            setBtnText('Pending');
            setIsDisabled(true);
          }
        })
    }







    const isReceivedPending = async () => {
      const token = localStorage.getItem('auth-token');
      const user_Id = await jwt.decode(token).user.id;
      
      
      const response = await fetch(`http://localhost:5000/api/auth/receivedpendingrequest/${props.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'auth-token': token
        }
        }).then((res) => res.json())
        .then((pending) => {
          // console.log(pending);
          if (pending === true) {
            setBtnText('Accept');
            setReceivedRequest(true);
          }
        })
    }


    isPending();
    isReceivedPending();


  }, [])













  const acceptFriendRequest = async () => {
    const token = localStorage.getItem('auth-token');
    const user_Id = await jwt.decode(token).user.id;
    
    
    const response = await fetch(`http://localhost:5000/api/auth/acceptrequest/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': token
      }
      });


    setIsFriendsex(true);
    // setButtonText('Friend Request Sent');
    // setIsDisabled(true);
  }





  const declineFriendRequest = async () => {
    const token = localStorage.getItem('auth-token');
    const user_Id = await jwt.decode(token).user.id;
    
    
    const response = await fetch(`http://localhost:5000/api/auth/declinerequest/${props.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': token
      }
      });


    // setIsFriends(true);
    setBtnText('Add Friend');
    setIsDisabled(true);
    setReceivedRequest(false);
    setIsDisabled(false);
  }










  const chatNotifier = async () => {
    const token = localStorage.getItem('auth-token');
    const user_Id = await jwt.decode(token).user.id;
    
    
    const response = await fetch(`http://localhost:5000/api/auth/calcnoofchatnoti/${props.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': token
      }
      }).then((res) => res.json())
      .then((promiseRes) => {
        if (promiseRes.number !== 0) {
          setNoOfChatNotifications(promiseRes.number);
          setChatNotification(true);
          console.log("This fukcing fuck sex is: " + promiseRes.number);
        }
        else {
          setNoOfChatNotifications(0);
          setChatNotification(false);
          console.log("This fukcing fuck sex is: " + promiseRes.number);

        }
      })
    }









  useEffect(() => {
    chatNotifier();
  }, [])
  










  
  useEffect(() => {
    props.socket.on('chat_notification_received', (my_Id) => {
      if (my_Id === props.id) {
        chatNotifier();
      }
      else {
        console.log("This user's id who sent the message: " + my_Id);
        console.log("user id: " + props.id);
      }
    })


    props.socket.on('cameOnline', (user_Id) => {
      console.log("TF is online");

      if (props.id === user_Id) {
        setIsOnline(true);
        console.log("TF is online");
      }
    })

    props.socket.on('goingOffline', (user_Id) => {
      console.log("TF is offline");

      if (props.id === user_Id) {
        setIsOnline(false);
        console.log("TF is offline");
      }
    })
  }, [props.socket])



  // if (profileRef.addEventListener) {
  //   profileRef.current.addEventListener('contextmenu', function(e) {
  //     console.log("You've tried to open context menu"); //here you draw your own menu
  //     e.preventDefault();
  //   }, false);
  // } else {
  //   profileRef.current.attachEvent('oncontextmenu', function() {
  //     console.log("You've tried to open context menu");
  //     window.event.returnValue = false;
  //   });
  // }


  document.oncontextmenu = rightClick;
  const rightClick = (e) => {
    e.preventDefault();
    console.log("FO Please!!");
  }



  

  return (
    <>

{/* 
    <div>
      
        <div>
          Right click me to see the context menu
        </div>
    </div> */}





    <ContextMenu
    menu={
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <button>Button 1</button>
        <button>Button 2</button>
      </div>
    }
    >

    {!itsMe && isFriendsex===true && props.searchValue === ''? <div style={{ transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#464242':'#FAFAFA'}} onClick={() => {
      if (isFriendsex) {
        changeChatWith(props.id, props.name, `${props.url}`)};
        setNoOfChatNotifications(0);
        setChatNotification(false);
      }
      
      } className="discussion">
            <div className="photo" style={{position: 'relative'}}>
              <img style={{ transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#464242':'rgb(250 250 250)'}} src={`${props.url}`} alt="" />
              {isOnline && <div className="online"></div>}
            {chatNotification && <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
               {noOfChatNotifications}
              <span class="visually-hidden">unread messages</span>
            </span>}
            </div>
            <div className="desc-contact">
              <strong style={{marginTop: '10px', display: 'block', color: darkMode?'#dedede':'black'}} className="name">{props.name}</strong>
              {/* <p className="message">Let's meet for a coffee or something today ?</p> */}
            </div>


            {!isFriendsex && <>{!receivedRequest && <button onClick={addFriend} style={{}} disabled={isDisabled} className="btn btn-primary">{btnText}</button>}
            {receivedRequest && <button onClick={acceptFriendRequest} style={{}} disabled={isDisabled} className="btn btn-primary">Accept</button>}
           {receivedRequest && <button onClick={declineFriendRequest} style={{margin: '0px 15px'}} disabled={isDisabled} className="btn btn-primary">Decline</button>}
            </>}
    </div>: 
    


    // Warna:-
      <>
    {!itsMe && props.searchValue !== "" && <div style={{ transition: 'background-color color ease 0.3s', backgroundColor: darkMode?'#464242':'#FAFAFA'}} onClick={() => {
      if (isFriendsex) {
        changeChatWith(props.id, props.name, `${props.url}`)};
        setNoOfChatNotifications(0);
        setChatNotification(false);
      }
      
      } className="discussion">
            <div className="photo" style={{position: 'relative'}}>
              <img style={{ transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#464242':'rgb(250 250 250)'}} src={`${props.url}`} alt="" />
              {isOnline && <div className="online"></div>}
            {chatNotification && <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
               {noOfChatNotifications}
              <span class="visually-hidden">unread messages</span>
            </span>}
            </div>
            <div className="desc-contact">
              <strong style={{marginTop: '10px', display: 'block', color: darkMode?'#dedede':'black'}} className="name">{props.name}</strong>
              {/* <p className="message">Let's meet for a coffee or something today ?</p> */}
            </div>


            {!isFriendsex && <>{!receivedRequest && <button onClick={addFriend} style={{}} disabled={isDisabled} className="btn btn-primary">{btnText}</button>}
            {receivedRequest && <button onClick={acceptFriendRequest} style={{}} disabled={isDisabled} className="btn btn-primary">Accept</button>}
           {receivedRequest && <button onClick={declineFriendRequest} style={{margin: '0px 15px'}} disabled={isDisabled} className="btn btn-primary">Decline</button>}
            </>}
    </div>}
    </>
    }
    </ContextMenu>

    </>
  )
}

export default ProfileItem