import React, { useRef, useEffect, useContext, useState } from 'react';
import chatContext from '../context/ChatContext';
import jwt from 'jsonwebtoken';

const Message = ({ chat, user_Id, darkMode, bottomRef, inputFieldRef, setLastChatEdit, lastChatEdit }) => {
  const messageMenuRef = useRef(null);
  const vbRef = useRef(null);
  const ThreeDotsRef = useRef(null);
  const mainMessageRef = useRef(null);
  const modalRef = useRef(null);
  const myModalRef = useRef(null);
  const editRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  setTimeout(() => {
    if (document.getElementById(`main-message-${chat._id}`)) {
      setEditValue(document.getElementById(`main-message-${chat._id}`).innerHTML);
    }
  }, 500);

  const context = useContext(chatContext);
  const { name, id, avatarURL, chatContent, setChatContent, changeChatWith, loggingOut, getmydetails, getMessages } = context;


    const toggleMessageMenu = () => {
        if (messageMenuRef.current.style.display === 'flex') {
            vbRef.current.style.display = 'none';
            messageMenuRef.current.classList.remove('open-message-menu');
            messageMenuRef.current.classList.add('open-message-menu-reverse');
            setTimeout(() => {
                messageMenuRef.current.style.display = 'none';
            }, 100);
        }
        else {
            vbRef.current.style.display = 'block';
            messageMenuRef.current.classList.remove('open-message-menu-reverse');
            messageMenuRef.current.classList.add('open-message-menu');
            messageMenuRef.current.style.display = 'flex';
        }
        // bottomRef.current.scrollIntoView({behavior: "auto", inline: "nearest"});
    }


    const toggleMessageMenuAfterDelete = () => {
        if (messageMenuRef.current.style.display === 'flex') {
            vbRef.current.style.display = 'none';
            messageMenuRef.current.classList.remove('open-message-menu');
            messageMenuRef.current.classList.add('open-message-menu-reverse');
            setTimeout(() => {
                messageMenuRef.current.style.display = 'none';
            }, 1000);
        }
        else {
            vbRef.current.style.display = 'block';
            messageMenuRef.current.classList.remove('open-message-menu-reverse');
            messageMenuRef.current.classList.add('open-message-menu');
            messageMenuRef.current.style.display = 'flex';
        }
        // bottomRef.current.scrollIntoView({behavior: "auto", inline: "nearest"});
    }
    


    const copyToClipboard = () => {
      let text_field = document.getElementById(`main-message-${chat._id}`).innerHTML;

      // text_field.select();
      // text_field.setSelectionRange(0, 99999);

      navigator.clipboard.writeText(text_field);
      console.log(text_field);

      const copy_btn = document.getElementById(`li_1-${chat._id}`);
      copy_btn.style.backgroundColor = 'green';
      copy_btn.innerHTML = 'Copied &#10003;';

      setTimeout(() => {
        copy_btn.style.backgroundColor = '';
        copy_btn.innerHTML = 'Copy';
      }, 1000);
    }



    const openDeleteModal = () => {
      document.getElementById(`modal-${chat._id}`).style.display = 'block !important';
      console.log(`modal-${chat._id}`);
      setTimeout(() => {
        document.getElementById(`form-${chat._id}`).classList.remove('blur-in-expand');
      }, 150);

      // setShowModal(true);
      document.getElementById(`modal-${chat._id}`).style = 'display: block;';
      // document.body.style = 'background-color: rgb(7 7 7)';
    }




    const closeModal = () => {
      document.getElementById(`form-${chat._id}`).classList.add('blur-out-contract');
                    
      setTimeout(() => {
        // setShowModal(false);
        document.getElementById(`modal-${chat._id}`).style.display = 'none';
        document.body.style.backgroundColor = 'rgb(39, 39, 39)';
        document.getElementById(`form-${chat._id}`).classList.remove('blur-out-contract');
        document.getElementById(`form-${chat._id}`).classList.add('blur-in-expand');
      }, 150);
    }



    const handleClickOutsideTheModal = (e) => {
      const myModal = document.getElementById(`modal-${chat._id}`);
      if (e.target === myModal) {
        closeModal();
      }
    }



    const handleOnKeyDown = async (e) => {
      if (e.key === "Enter") {
        if(editValue){
          const token = localStorage.getItem('auth-token');
          const user_Id = await jwt.decode(token).user.id;
    
    
          const response = await fetch(`http://localhost:5000/api/message/edit/${chat._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'auth-token': token
                },body: JSON.stringify({msgcontent: editValue})
          }).then((res) => res.json())
          .then((result) => {
            chat.msgcontent = editValue;
            setIsEditing(false);
            chat.isEdited = true;
          })
          // .then((res) => res.json())
          //   .then((res) => {setChatContent((list) => [...list, res])})
      }
    }
  }







    const deleteMessage = async () => {
      document.getElementById(`modal-${chat._id}`).click();
      document.getElementById(`vb-${chat._id}`).click();


      setTimeout(() => {

        const sexySex = async () => {
          const token = localStorage.getItem('auth-token');
          const user_Id = await jwt.decode(token).user.id;
    
    
          const response = await fetch(`http://localhost:5000/api/message/delete/${chat._id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'auth-token': token
                }
          }).then((res) => changeChatWith(id, name, avatarURL))
        }

        sexySex();

      }, 200);
     



      // const token1 = localStorage.getItem('auth-token');
      // const user_Id1 = await jwt.decode(token).user.id;


      // const response1 = await fetch(`http://localhost:5000/api/message/chat/${id}`, {
      //     method: 'GET',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'auth-token': token1
      //     },
      // }).then((res) => res.json())
      //   .then((res) => {setChatContent((list) => [...list, res])})



        // .then(setChatContent((list) => [...list, {msgcontent: message, sentBy: user_Id}]));

        // const json = await response.json();
        // console.log(json);
        // // await changeChatWith(name, id);
        // // getMessages(id);
        // bottomRef.current.scrollIntoView({behavior: "smooth", inline: "nearest"});
        // setMessage('');

        // let sent_data = {
        //   msgcontent: message,
        //   to: id,
        //   by: user_Id
        // }
        // if(message){
        //   await socket.emit('sent_message', sent_data);
        //   await socket.emit('content_changed_refresh_discussions', id);
        // }
    }








    // editRef.current.on('keydown', (e) => {
    //   if (e.key === "Enter" || e.code === 13) {
    //     console.log("Enter Pressed!!");
    //   }
    // })








  return (
    <>

    <div onMouseLeave={() => {setIsHovering(false)}} onMouseEnter={() => {setIsHovering(true)}} className="message">

          
    
          <div id={`vb-${chat._id}`} onClick={(e) => {
            // console.log(e.target);
            // console.log(e.target);
            // let sexyInputSex = document.getElementById('sexy-input-sex');
            if (e.target === vbRef.current) {
              toggleMessageMenu();
              console.log("Ok");
              vbRef.current.style.display = 'none';
            }
          }} ref={vbRef} className="virtualBackground">
            {/* <div>sex</div> */}
          </div>

        <div id={chat._id} className={user_Id !== chat.sentBy ? 'sex' : 'response'}>

        {user_Id === chat.sentBy && 
        <div ref={messageMenuRef} className="message-menu" style={{display: 'none'}}>
            <ul style={{position: 'absolute', top: '-70px', left: '-100px', color: darkMode?'white':'black'}}>
            <li onClick={copyToClipboard} className='li_1' id={`li_1-${chat._id}`}>Copy</li>
            {/* <li className='li_1' id='li_1'>{chat._id}</li> */}
            <hr style={{margin: '0px', width: '100px'}} />
            <li onClick={() => {
              setIsEditing(true);
              toggleMessageMenu();
              console.log(editValue);
              setTimeout(() => {
                document.getElementById(`edit-${chat._id}`).focus();
                // document.getElementById(`vb-${chat._id}`).style.display = 'block';
              }, 100);
            }} className='li_2' id='li_2'>Edit</li>
            <hr style={{margin: '0px', width: '100px'}} />
            <li onClick={openDeleteModal} className='li_3' id='li_3'>Delete</li>
            </ul>
        </div>}

       {!isEditing && <i ref={ThreeDotsRef} onClick={toggleMessageMenu} style={{cursor: 'pointer', display: 'none', width: '30px', visibility: isHovering?'visible':'hidden', color: darkMode?'white': 'black', position: 'relative', top: '40px', fontSize: '20px', display: user_Id === chat.sentBy?'block':'none'}} class="fa-solid fa-ellipsis"></i>}
        {!isEditing && <p ref={mainMessageRef} style={{display: 'flex', transition: 'background-color ease 0.3s', backgroundColor: darkMode?(user_Id !== chat.sentBy?'#6e6e6e': 'rgb(162 156 156)'): (user_Id !== chat.sentBy? '#f6f6f6': '#e3effd'), maxWidth: '300px', color: darkMode?'white': 'black'}} className="text"><p style={{margin: '0'}} id={`main-message-${chat._id}`}>{chat.msgcontent}</p>
        {chat.isEdited && <small style={{marginLeft: '2px', fontSize: '1px', color: darkMode?'black':'#b36d6d', position: 'relative', bottom: '-10px'}} className="check-edit">{'(edited)'}</small>}
        </p>}


            {isEditing && <div onClick={() => {
              setIsEditing(false);
            }} style={{zIndex: isEditing?'1':'-2'}} className='virtualBackground-2' id={`editing-vb-${chat._id}`}></div>}

          {isEditing && <input onKeyDown={handleOnKeyDown} ref={editRef} id={`edit-${chat._id}`} className='edit-input' style={{color: darkMode?'white':'black', zIndex: '4', position: 'relative'}} onChange={(e) => setEditValue(e.target.value)} value={editValue} type="text" />}

        </div>
    </div>




    {/* Delete Confirmation Modal */}
    <div ref={myModalRef} onClick={handleClickOutsideTheModal} id={`modal-${chat._id}`} class="my-modal">
          <span style={{visibility: 'hidden'}} id='sexy-span' class="close" title="Close Modal">×</span>
          <form  style={{borderRadius: '23px'}} id={`form-${chat._id}`} class="my-modal-content blur-in-expand" action="/action_page.php">
            <div ref={modalRef} class="my-container" id={`my-container-${chat._id}`}  style={{borderRadius: '18px'}}>
              <div className="top-pallete">
                <h3 className='sexy-h3'>Delete Message</h3>
                <p style={{fontSize: '16px', color: '#d0d1d2', width: '118%', display: 'flex', justifyContent: 'left'}}>Are you sure you want to delete this message?</p>
              </div>
              <div className="bottom-pallete">
              <div style={{marginRight: '20px'}} class="clearfix">
                <button style={{color: 'white'}} onClick={() => {
                  closeModal();
                  toggleMessageMenu();
                }} type="button" class="cancelbtn cancel-btn">Cancel</button>
                <button style={{color: 'white'}} type="button" onclick="document.getElementById('id01').style.display='none'" onClick={() => {
                  deleteMessage();
                  // document.body.click();
                  // document.getElementById('sexy-span').click();
                  // console.log('Clicked');

                  setTimeout(() => {
                    // console.log(document.getElementById('vb-123'));
                    // vbRef.current.style.display = 'none';
                    // console.log(vbRef.current.style.display);
                    document.getElementById('sexy-input-sex').click();
                    console.log(document.getElementById('sexy-input-sex'));
                    // inputFieldRef.current.focus();
                  }, 500);

                  // closeModal();
                  // toggleMessageMenuAfterDelete();

                }} class="deletebtn delete-btn">Delete Message</button>
              </div>
              </div>
            </div>
          </form>
        </div>
    </>
  )
}

export default Message