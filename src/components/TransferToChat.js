import React from 'react';
import Chat from './Chat';
import chatContext from '../context/ChatContext';
import { useContext } from 'react';

const TransferToChat = ({ socket }) => {
    const context = useContext(chatContext);
    const { id } = context;

  return (
    <>
    {id && <Chat socket={socket} />}
    </>
  )
}

export default TransferToChat