import './App.css';
import Chat from './components/Chat';
import Discussions from './components/Discussions';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Signup from './components/Signup';
import ChatState from "./context/ChatState";
import io, { Socket } from "socket.io-client";
import TransferToChat from './components/TransferToChat';
import Avatar from './components/Avatar';
import ModeState from './context/ModeState';
import modeContext from './context/ModeContext';
import TransferComponent from './components/TransferComponent';
import EditProfile from './components/EditProfile';
import EditAvatar from './components/EditAvatar';
import AddFriend from './components/AddFriend';
import ChatNotiState from './context/ChatNotiState';
import FriendState from './context/FriendState';


const socket = io.connect('http://localhost:5000');


function App() {
  

  // useEffect(() => {
    
  // }, [socket])
  


  return (
    <>
    <FriendState>
    <ChatNotiState>
    <ModeState>
    <ChatState>
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/avatar" element={<Avatar />} />
        <Route exact path="/edit" element={<EditProfile socket = {socket} />} />
        <Route exact path="/editavatar" element={<EditAvatar />} />
        <Route exact path="/addfriend" element={<AddFriend socket={socket} />} />
      

        <Route exact path="/" element={<TransferComponent socket={socket} />} />
      
      </Routes>
      </Router>
      </ChatState>
      </ModeState>
      </ChatNotiState>
      </FriendState>
    </>
  );
}

export default App;
