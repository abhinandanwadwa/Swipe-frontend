import React, { useRef } from 'react'
import modeContext from '../context/ModeContext';
import { useContext } from 'react';
import { useState } from 'react';
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import ConfirmationModal from './ConfirmationModal';

const FriendCard = (props) => {
  const modalRef = useRef(null);
  const mode_context = useContext(modeContext);
  const { darkMode, toggleDarkMode } = mode_context;

  const [buttonText, setButtonText] = useState("Add Friend");
  const [isDisabled, setIsDisabled] = useState(false);
  const [receivedRequest, setReceivedRequest] = useState(false);
  const [isFriends, setIsFriends] = useState(false);
  const [showModal, setShowModal] = useState(false);





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


  // function useOutsideAlerter(ref) {
  //   useEffect(() => {
  //     /**
  //      * Alert if clicked on outside of element
  //      */
  //     function handleClickOutside(event) {
  //       if (showModal && ref.current && !ref.current.contains(event.target)) {
  //         alert("You clicked outside of me!");
  //       }
  //     }
  //     // Bind the event listener
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       // Unbind the event listener on clean up
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, [ref]);
  // }
  
  

  // useOutsideAlerter(modalRef);





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
          sendFrNotification();
          props.socket.emit('sent_fr_notification', props.id);

        }
        else {
          // console.log("Not Sent");
        }
      })

      // console.log(response.json());


    setButtonText('Friend Request Sent');
    setIsDisabled(true);
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
            setButtonText('Friend Request Sent');
            setIsDisabled(true);
          }
        })
    }



    const isFriend = async () => {
      const token = localStorage.getItem('auth-token');
      const user_Id = await jwt.decode(token).user.id;
      
      
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
            // setButtonText('Friend Request Sent');
            // setIsDisabled(true);
            setIsFriends(true);
            setReceivedRequest(true);
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
            setButtonText('Accept');
            setReceivedRequest(true);
          }
        })
    }


    isPending();
    isReceivedPending();
    isFriend();


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


    setIsFriends(true);
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
    setButtonText('Add Friend');
    setIsDisabled(true);
    setReceivedRequest(false);
    setIsDisabled(false);
  }



  const deleteFriend = async () => {
    const token = localStorage.getItem('auth-token');
    const user_Id = await jwt.decode(token).user.id;
    
    
    const response = await fetch(`http://localhost:5000/api/auth/deletefriend/${props.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': token
      }
      });


    setIsFriends(false);
    setButtonText('Add Friend');
    setIsDisabled(false);
    setReceivedRequest(false);
    // setButtonText('Friend Request Sent');
    // setIsDisabled(true);
  }


  // const [clickInsideModal, setClickInsideModal] = useState(false);



  const closeModal = () => {
    document.getElementById(`form-${props.id}`).classList.add('blur-out-contract');
                  
    setTimeout(() => {
      setShowModal(false);
      document.getElementById(props.id).style.display = 'none';
      document.body.style.backgroundColor = 'rgb(39, 39, 39)';
      document.getElementById(`form-${props.id}`).classList.remove('blur-out-contract');
      document.getElementById(`form-${props.id}`).classList.add('blur-in-expand');
    }, 150);
  }



  const handleClickOutsideTheModal = (e) => {
    const myModal = document.getElementById(props.id);
    // const modal_element = document.getElementById(`my-container-${props.id}`);

    // if (modal_element !== document.activeElement) {
    //   alert('Gotcha!');
    //   console.log(document.activeElement);
    // }



    // console.log(e.target);
    if (e.target === myModal) {
      // alert('Dayummm!!');
      closeModal();
    }
  }
  



  return (
    <>


    <div class="card" style={{width: '18rem', height: '243px', marginLeft: '50px', marginBottom: '30px', backgroundColor: darkMode?'black':'white', transition: 'background-color ease 0.3s', color: darkMode?'#bfbebe':'black'}}>

    {isFriends && <span onClick={() => {
      setTimeout(() => {
        document.getElementById(`form-${props.id}`).classList.remove('blur-in-expand');
      }, 150);

      setShowModal(true);
      document.getElementById(props.id).style = 'display: block;';
      document.body.style = 'background-color: rgb(7 7 7)';
      }} style={{width: '50px', right: '0px', position: 'absolute', height: '35px', transition: 'background-color ease 0.3s', backgroundColor: '#3e3f44 !important', display: 'flex', justifyContent: 'center', alignItems: 'center'}} class="badge text-bg-dark btn mc-btn"><i style={{fontSize: '20px'}} class="fa-solid fa-xmark"></i></span>}

      
            <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}} className="image">
              <img style={{width: '130px'}} src={props.pfpuri} class="card-img-top" alt="..."/>
            </div>
            <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}} class="card-body">
                <h5 class="card-title">{props.name}</h5>
                {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                {!receivedRequest && <button disabled = {isDisabled} onClick={addFriend} style={{margin: '15px 20px', width: '255px'}} class="btn btn-primary">{buttonText}</button>}

                {receivedRequest && ( <> <div style={{display: 'flex'}}> <button style={{margin: '15px 20px', width: isFriends?'255px':'', border: !isFriends&&'none', transition: 'background-color ease 0.3s', backgroundColor: isFriends?'':'#099009'}} onClick={acceptFriendRequest} class="btn btn-primary">{isFriends?'Friends':'Accept'} {isFriends? <i class="fa-solid fa-check"></i>: ''}  </button>
                {!isFriends && <button style={{margin: '15px 20px', transition: 'background-color ease 0.3s', backgroundColor: '#ec0000', border: 'none'}} onClick={declineFriendRequest} class="btn btn-primary">Decline</button>} </div> </>)}
            </div>

        </div>

    {/* <ConfirmationModal> */}
    {/* <div class="modal scale-in-center" style={{marginTop: '30vh'}} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" style={{backgroundColor: darkMode?'#393939':'white'}}>
                <div class="modal-header" style={{justifyContent: 'center'}}>
                    <h5 class="modal-title" style={{color: darkMode?'white':'black'}} id="exampleModalLabel">Delete As Friend ?</h5> */}

                    {/* <span data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={deleteFriend} style={{width: '50px', right: '0px', position: 'absolute', height: '35px', backgroundColor: '#3e3f44 !important', display: 'flex', justifyContent: 'center', alignItems: 'center'}} class="badge text-bg-dark btn mc-btn"><i style={{fontSize: '20px'}} class="fa-solid fa-xmark"></i></span> */}

                    {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                {/* </div> */}
                {/* <div class="modal-body">
                    ...
                </div> */}
                {/* <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss = "modal" onClick={deleteFriend}>Delete</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                </div>
                </div>
            </div>
            </div> */}


    {/* {showModal && <ConfirmationModal modalId={props.id} />} */}

    <div onClick={handleClickOutsideTheModal} id={props.id} class="my-modal">
          <span class="close" title="Close Modal">×</span>
          <form  style={{borderRadius: '23px'}} id={`form-${props.id}`} class="my-modal-content blur-in-expand" action="/action_page.php">
            <div ref={modalRef} class="my-container" id={`my-container-${props.id}`}  style={{borderRadius: '18px'}}>
              <div className="top-pallete">
                <h3 className='sexy-h3'>Delete Friend</h3>
                <p style={{fontSize: '16px', color: '#d0d1d2', width: '118%', display: 'flex', justifyContent: 'left'}}>Are you sure you want to delete&nbsp;<strong>{props.name}</strong>&nbsp;as your friend ?</p>
              </div>
              <div className="bottom-pallete">
              <div style={{marginRight: '20px'}} class="clearfix">
                <button onClick={() => {
                  closeModal();
                }} type="button"class="cancelbtn cancel-btn">Cancel</button>
                <button type="button" onclick="document.getElementById('id01').style.display='none'" onClick={() => {
                  deleteFriend();
                  closeModal();

                }} class="deletebtn delete-btn">Delete Friend</button>
              </div>
              </div>
            </div>
          </form>
        </div>
    </>
  )
}

export default FriendCard