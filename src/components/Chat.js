import React, { useRef, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import chatContext from '../context/ChatContext';
import modeContext from '../context/ModeContext';
import jwt from 'jsonwebtoken';
import ScrollToBottom from 'react-scroll-to-bottom';
import Picker from 'emoji-picker-react';
import typingIndicator from '../typing.gif'
import chatNotiContext from '../context/ChatNotiContext';
import Message from './Message';

const Chat = ({ socket }) => {
  const bottomRef = useRef(null);
  const inputField = useRef(null);
  const markerRef = useRef([]);

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showEmojiPalate, setShowEmojiPalate] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [lastChatEdit, setLastChatEdit] = useState(false);

  let navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('auth-token')){
      // setChatContent([]);
      navigate('/login');
    }

    // const input = document.querySelector("input");
    // input.addEventListener('keyup', (event) => {
    //   if (event.key === "Enter") {
    //     console.log("Enter Pressed!!");
    //   }
    // })
  }, [])




  

  const [message, setMessage] = useState("");


  const mode_context = useContext(modeContext);
  const { darkMode } = mode_context;


  const context = useContext(chatContext);
  const { name, id, avatarURL, chatContent, setChatContent, changeChatWith, loggingOut, getmydetails, getMessages } = context;
  let user_Id = '';

  const chat_noti_context = useContext(chatNotiContext);
  const { chat_noti, noOfChatNoti, hasChatNoti, chatseen } = chat_noti_context;



  if (localStorage.getItem('auth-token')) {
    const token = localStorage.getItem('auth-token');
    user_Id = jwt.decode(token).user.id;
  }


  


  useEffect(() => {
      if (localStorage.getItem('auth-token')) {
        // document.getElementById('overlay-chate').style.display = 'block';

      const token = localStorage.getItem('auth-token');
      const user_Id = jwt.decode(token).user.id;

      const payload = {
        id: id,
        user_Id: user_Id
      }
      socket.emit('room_changed', payload);
    }

    chatseen(id);


    inputField.current.focus();

    // let randno = Math.random() * 500 + 500;
    // setTimeout(() => {
    //   document.getElementById('overlay-chate').style.display = 'none';
    // }, randno);
  
  }, [id])
  




  useEffect(() => {
    bottomRef.current.scrollIntoView({behavior: "auto", inline: "nearest"});
    socket.emit('content_changed_refresh_discussions', user_Id);
  }, [chatContent])



  useEffect(() => {
    socket.on('received_message', (sent_data) => {
      console.log("Hi socket.to()!!");
      setChatContent((list) => [...list, {msgcontent: sent_data.msgcontent, sentBy: sent_data.by}])
      bottomRef.current.scrollIntoView({behavior: "smooth", inline: "nearest"});
      chatseen(id);
    });

    
    socket.on('heIsTyping', (payload) => {

      if(payload.msgcontent){
        console.log('He is typing!!');
        setIsTyping(true);
        console.log(payload.msgcontent);
        setTimeout(() => {
          bottomRef.current.scrollIntoView({behavior: "smooth", inline: "nearest"});
        }, 100);
      }
      else {
        setIsTyping(false);
        console.log(payload.msgcontent);
      }
    });
  }, [socket])
  
  





  const sendChatNoti = async () => {
    const token = localStorage.getItem('auth-token');
    const user_Id = await jwt.decode(token).user.id;


      const response = await fetch(`http://localhost:5000/api/auth/sendchatnotification/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'auth-token': token
            },body: JSON.stringify({message: message})
      })

        const json = await response.json();
        console.log(json);

        // let sent_data = {
        //   msgcontent: message,
        //   to: id,
        //   by: user_Id
        // }
        // if(message){
        //   await socket.emit('sent_message', sent_data);
        // }

        let payload = {
          id: id,
          user_Id: user_Id
        }

        await socket.emit('sent_chat_notification', payload);
  }








  const sendMessage = async () => {
    if(message){
      const token = localStorage.getItem('auth-token');
      const user_Id = await jwt.decode(token).user.id;


      const response = await fetch(`http://localhost:5000/api/message/send/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'auth-token': token
            },body: JSON.stringify({message: message})
      }).then((res) => res.json())
        .then((res) => {setChatContent((list) => [...list, res])})
        // .then(setChatContent((list) => [...list, {msgcontent: message, sentBy: user_Id}]));

        // const json = await response.json();
        // console.log(json);
        // // await changeChatWith(name, id);
        // // getMessages(id);
        bottomRef.current.scrollIntoView({behavior: "smooth", inline: "nearest"});
        setMessage('');

        // let sent_data = {
        //   msgcontent: message,
        //   to: id,
        //   by: user_Id
        // }
        // if(message){
        //   await socket.emit('sent_message', sent_data);
        //   await socket.emit('content_changed_refresh_discussions', id);
        // }
        


        sendChatNoti();
    }
  }



  const keyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
    if (e.keyCode === 38) {
      // console.log("Up Pressed!!");
      setLastChatEdit(true);
    }
  }



  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setMessage(message + emojiObject.emoji);
    setShowEmojiPalate(false);
    inputField.current.focus();
    
  };



  const toggleEmojiPallate = () => {
    if (showEmojiPalate) {
      setShowEmojiPalate(false);
      inputField.current.focus();

    }
    else {
      setShowEmojiPalate(true);
    }
  }



  const onchangeFunction = (e) => {
    
      setMessage(e.target.value);
      // console.log(message);


  }


  useEffect(() => {

    let payload = {
      msgcontent: message,
      to: id,
      by: user_Id
  }
  socket.emit('typing', payload);

  }, [message])
  

  // useEffect(() => {
  //   const keyDownHandler = event => {
  //     if (event.key === 'Enter') {
  //       event.preventDefault();

  //       // 👇️ your logic here
  //       sendMessage();
  //     }
  //   };

  //   document.addEventListener('keydown', keyDownHandler);

  //   return () => {
  //     document.removeEventListener('keydown', keyDownHandler);
  //   };
  // }, []);




  useEffect(() => {
    chatseen(id);
  }, [])
  









  // const checkOnClick = (e) => {
  //   let li_1 = document.getElementsByClassName('li_1');
  //   let li_2 = document.getElementsByClassName('li_2');
  //   let li_3 = document.getElementsByClassName('li_3');
  //   // console.log(e.target);
  //   if (e.target !== li_1 || e.target !== li_2 || e.target !== li_3) {
  //     // console.log(e.target);
  //     console.log(li_1);
  //     alert("Dayummm!!");
  //   }
  // }









  
  return (
    <>

      {/* <i className="icon fa fa-user-o" aria-hidden="true"></i> */}

       {/* <div className="photo">
          <div className="online"></div>
        </div> */}

        {/* <div className="message text-only">
        <p className="text"> What are you doing tonight ? Want to go take a drink ?</p>
      </div> */}

      {/* <p className="time"> 14h58</p> */}

      {/* <p className="response-time time"> 14h58</p> */}

      {/* <div className="message text-only">
        <div className="response">
          <p className="text"> When can we meet ?</p>
        </div>
      </div> */}

      {/* <p className="response-time time"> 15h04</p> */}

       {/*<div className="message">
        <div className="photo">
          <div className="online"></div>
        </div>
        <p className="text"> 9 pm at the bar if possible 😳</p>
      </div>
      
    <p className="time"> 15h09</p> */}

    {/* <div className="footer-chat">
      <i className="icon fa fa-smile-o clickable" style={{fontSize: "25pt"}} aria-hidden="true"></i>
      <input type="text" className="write-message" placeholder="Type your message here"></input>
      <i className="icon send fa fa-paper-plane-o clickable" aria-hidden="true"></i>
    </div> */}

    {/* {chosenEmoji ? (
        <span>You chose: {chosenEmoji.emoji}</span>
      ) : (
        <span>No emoji Chosen</span>
      )} */}

        {/* <div>
            Hi
    </div> */}




    <section onClick={(e) => {
      let li_1 = document.getElementById('li_1');
      let li_2 = document.getElementById('li_2');
      let li_3 = document.getElementById('li_3');
      // console.log(e.target);
      if (e.target === li_1 || e.target === li_3 || e.target === li_2) {

      }
      else {
        // alert("don't click outside dude!!");
        // console.log(e.target);
        // console.log(li_1)
      }
    }
    } className="chat">
    {(
    <>

    {/* <div id="overlay-chate">
      
      <div class="card" style={{border: 'none'}} aria-hidden="true">
    <div class="card-body" style={{backgroundColor: '#464242'}}>
      <h5 class="card-title placeholder-glow">
        <span class="placeholder col-6"></span>
      </h5>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-7"></span>
        <span class="placeholder col-4"></span>
      </p>
    </div>
  </div>
      <div class="card" style={{border: 'none'}} aria-hidden="true">
    <div class="card-body" style={{backgroundColor: '#464242'}}>
      <h5 class="card-title placeholder-glow">
        <span class="placeholder col-6"></span>
      </h5>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-7"></span>
        <span class="placeholder col-4"></span>
      </p>
    </div>
  </div>
      <div class="card" style={{border: 'none'}} aria-hidden="true">
    <div class="card-body" style={{backgroundColor: '#464242'}}>
      <h5 class="card-title placeholder-glow">
        <span class="placeholder col-6"></span>
      </h5>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-7"></span>
        <span class="placeholder col-4"></span>
      </p>
    </div>
  </div>
      <div class="card" style={{border: 'none'}} aria-hidden="true">
    <div class="card-body" style={{backgroundColor: '#464242'}}>
      <h5 class="card-title placeholder-glow">
        <span class="placeholder col-6"></span>
      </h5>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-7"></span>
        <span class="placeholder col-4"></span>
      </p>
    </div>
  </div>
      <div class="card" style={{border: 'none'}} aria-hidden="true">
    <div class="card-body" style={{backgroundColor: '#464242'}}>
      <h5 class="card-title placeholder-glow">
        <span class="placeholder col-6"></span>
      </h5>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-7"></span>
        <span class="placeholder col-4"></span>
      </p>
    </div>
  </div>
      <div class="card" style={{border: 'none'}} aria-hidden="true">
    <div class="card-body" style={{backgroundColor: '#464242'}}>
      <h5 class="card-title placeholder-glow">
        <span class="placeholder col-6"></span>
      </h5>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-7"></span>
        <span class="placeholder col-4"></span>
      </p>
    </div>
  </div>
      
    </div> */}


    <div style={{backgroundColor: darkMode?'#222': 'white', transition: 'background-color ease 0.3s'}} className="header-chat">
      <img style={{height: '50px'}} className='icon' src={avatarURL} alt="" />
      <p style={{color: darkMode?'white':'black'}} className="name">{name}</p>
      <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
    </div>



    <ScrollToBottom style={{width: '100%', height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
    <div className="messages-chat" style={{display: "flex", flexDirection: "column", height: "510px", overflowY: "scroll"}}>

      {chatContent.map((chat) => {
        return (<Message lastChatEdit={lastChatEdit} setLastChatEdit={setLastChatEdit} inputFieldRef={inputField} darkMode={darkMode} user_Id={user_Id} bottomRef={bottomRef} chat={chat} />);

      })
        }

      



      
      
      {isTyping && <div className="message">
      <div className="sex">
          <p style={{width: '60px'}} className="text"><img style={{height: '30px'}} src={typingIndicator} alt="" /></p>
        </div>
      </div>
      }
    <div ref={bottomRef}></div>








      
      

    </div>
    </ScrollToBottom>
    

    <div className="footer" style={{textAlign: "center", height: "50px", justifyContent: "center", display: "flex"}}>
      <button style={{color: darkMode?'#9d9d9d': '#000000'}} onClick={toggleEmojiPallate} className='emoji-opener'>☻</button>

      
      {showEmojiPalate && <Picker pickerStyle={{width: '100%', transition: 'opacity 1s ease-out', bottom: '282px', backgroundColor: darkMode?'#343434':'white', transition: 'background-color ease 0.3s' }}  onEmojiClick={onEmojiClick} />}


      <input onKeyDown={keyDown} id='sexy-input-sex' ref={inputField} style={{ transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#464242': 'white', color: darkMode?'white':'black'}} value={message} onChange={onchangeFunction} type="text" placeholder='Write Your Message Here' className="sexyinput" />
      <i onClick={sendMessage} className='fa fa-paper-plane' style={{color: "#3a5199", fontSize: "28px", marginTop: "8px", cursor: "pointer"}}></i>
    </div>
    </>
    )}
  </section>
  

    </>
  )
}

export default Chat