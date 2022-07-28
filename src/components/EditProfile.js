import React, { useContext, useRef } from 'react'
import Sidebar from './Sidebar';
import modeContext from '../context/ModeContext';
import { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const EditProfile = ({ socket }) => {
    const navigate = useNavigate();
    const pfpRef = useRef(null);
    const editDivRef = useRef(null);

    const mode_context = useContext(modeContext);
    const { darkMode, toggleDarkMode } = mode_context;

    let data;
    const [isLoaded, setIsLoaded] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [pfpuri, setPfpuri] = useState("");
    const [email, setEmail] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {

        const getMyDetails = async () => {
            const token = localStorage.getItem('auth-token');
            const user_Id = await jwt.decode(token).user.id;


            const response = await fetch(`http://localhost:5000/api/auth/finduser/${user_Id}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'auth-token': token
                },
            });

            data = await response.json();
            console.log(data.name);

            setName(data.name);
            setUsername(data.username);
            setPfpuri(data.pfpuri);
            setEmail(data.email);

            setIsLoaded(true);
        }

        getMyDetails();

    }, [])
    


    const saveChanges = async () => {
      const token = localStorage.getItem('auth-token');
      const user_Id = await jwt.decode(token).user.id;


            const response = await fetch(`http://localhost:5000/api/auth/updateuser`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'auth-token': token
                },body: JSON.stringify({name: name, email: email})
            });

            data = await response.json();
            console.log(data);

            setName(data.name);
            setEmail(data.email);

            if (!data.errors) {
              setShowAlert(true);
  
              setTimeout(() => {
                setShowAlert(false);
              }, 2000);
            }

    }





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



    const startAnimation = () => {
      editDivRef.current.style.zIndex = '1';
      pfpRef.current.classList.remove('pfp-hover-animation-reverse');
      pfpRef.current.classList.remove('pfp-hover-animation');
      console.log("Enter");
      pfpRef.current.classList.add('pfp-hover-animation');
    }


    const endAnimation = () => {
      editDivRef.current.style.zIndex = '-1';
      pfpRef.current.classList.remove('pfp-hover-animation');
      console.log("Leave");
      pfpRef.current.classList.add('pfp-hover-animation-reverse');
    }



  return (
    <>
    {isLoaded && (
        <>
        <div>
        {showAlert && <div class="sexy-alert alert alert-success" role="alert">
          Successfully Updated Your Information!!
        </div>}
<div style={{paddingTop: '17px', backgroundColor: '#272727', transition: 'background-color ease 0.3s'}} class="container">
<div class="row flex-lg-nowrap">
        <Sidebar socket={socket} />
  {/* <div class="col-12 col-lg-auto mb-3" style={{width: "200px"}}>
    <div class="card p-3">
      <div class="e-navlist e-navlist--active-bg">
        <ul class="nav">
          <li class="nav-item"><a class="nav-link px-2 active" href="#"><i class="fa fa-fw fa-bar-chart mr-1"></i><span>Overview</span></a></li>
          <li class="nav-item"><a class="nav-link px-2" href="https://www.bootdey.com/snippets/view/bs4-crud-users" target="__blank"><i class="fa fa-fw fa-th mr-1"></i><span>CRUD</span></a></li>
          <li class="nav-item"><a class="nav-link px-2" href="https://www.bootdey.com/snippets/view/bs4-edit-profile-page" target="__blank"><i class="fa fa-fw fa-cog mr-1"></i><span>Settings</span></a></li>
        </ul>
      </div>
    </div>
  </div> */}

  <div class="col" style={{ transition: 'background-color ease 0.3s', backgroundColor: darkMode?'rgb(52 52 52)': 'white', boxShadow: darkMode&&'5px 10px #0000001a'}}>
    <div class="row">
      <div class="col mb-3">
        <div class="card" style={{height: '0px'}}>
          <div class="card-body" style={{color: darkMode?'white':'black'}}>
            <div class="e-profile">
              <div class="row">
                <div class="col-12 col-sm-auto mb-3">
                  <div class="mx-auto" style={{width: "140px"}}>
                    <div class="d-flex justify-content-center align-items-center rounded" style={{height: "140px", backgroundColor: "rgb(233, 236, 239)", transition: 'background-color ease 0.3s'}}>
                      {/* <span style={{color: "rgb(166, 168, 170)", font: "bold 8pt Arial"}}>140x140</span> */}

                      <div ref={editDivRef} style={{pointerEvents: 'none', color: 'black', position: 'absolute', zIndex: '-1'}} className="show-on-img-hover">
                        <i style={{fontSize: '20px'}} class="fa-solid fa-pen-to-square"></i>
                      </div>

                      <img onClick={() => {navigate('/editavatar')}} style={{cursor: 'pointer'}} onMouseLeave={endAnimation} onMouseEnter={startAnimation} ref={pfpRef} src={pfpuri} alt="" />
                    </div>
                  </div>
                </div>
                <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                  <div class="text-sm-left mb-2 mb-sm-0">
                    <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">{name}</h4>
                    <p class="mb-0">@{username}</p>
                    {/* <div class="text-muted"><small>Last seen 2 hours ago</small></div> */}
                    <div class="mt-2">
                      <button onClick={() => navigate('/editavatar')} style={{marginTop: '25px'}} class="btn btn-primary" type="button">
                        {/* <i class="fa fa-fw fa-camera"></i> */}
                        <span>Change Avatar</span>
                      </button>
                    </div>
                  </div>
                  <div class="text-sm-right">
                    <span class="badge badge-secondary">administrator</span>
                    <div class="text-muted"><small>Joined 09 Dec 2017</small></div>
                  </div>
                </div>
              </div>
              <ul class="nav nav-tabs">
                {/* <li class="nav-item"><a href="" class="active nav-link">Settings</a></li> */}
              </ul>
              <div class="tab-content pt-3">
                <div class="tab-pane active">
                  <form class="form" novalidate="">
                    <div class="row">
                      <div class="col">
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <label>Full Name</label>
                              <input style={{ transition: 'background-color ease 0.3s', backgroundColor: '#1b1b1b', border: 'none', color: 'white'}} class="form-control" type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                            </div>
                          </div>
                          {/* <div class="col">
                            <div class="form-group">
                              <label>Username</label>
                              <input class="form-control" type="text" name="username" placeholder="johnny.s" value="johnny.s"/>
                            </div>
                          </div> */}
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <label>Email</label>
                              <input onChange={(e) => { setEmail(e.target.value) }} style={{ transition: 'background-color ease 0.3s', backgroundColor: '#1b1b1b', border: 'none', color: 'white'}} class="form-control" type="text" value={email} placeholder="user@example.com"/>
                            </div>
                          </div>
                        </div>
                        {/* <div class="row">
                          <div class="col mb-3">
                            <div class="form-group">
                              <label>About</label>
                              <textarea class="form-control" rows="5" placeholder="My Bio"></textarea>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    {/* <div class="row">
                      <div class="col-12 col-sm-6 mb-3">
                        <hr style = {{border: '2px solid #ffe7e7'}} />
                        <div class="mb-3 mt-4"><b>Change Password</b></div>
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <label>Current Password</label>
                              <input style={{backgroundColor: '#1b1b1b', border: 'none', color: 'white'}} class="form-control" type="password" placeholder="••••••"/>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <label>New Password</label>
                              <input style={{backgroundColor: '#1b1b1b', border: 'none', color: 'white'}} class="form-control" type="password" placeholder="••••••"/>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <label>Confirm <span class="d-none d-xl-inline">Password</span></label>
                              <input style={{backgroundColor: '#1b1b1b', border: 'none', color: 'white'}} class="form-control" type="password" placeholder="••••••"/></div>
                          </div>
                        </div>
                      </div>
                     
                    </div> */}
                    <div class="row" style={{position: 'relative', bottom: '-30px'}}>
                      <div class="col d-flex justify-content-end">
                        <button class="btn btn-primary" type="button" onClick={saveChanges}>Save Changes</button>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="col-12 col-md-3 mb-3">
        <div class="card mb-3">
          <div class="card-body">
            <div class="px-xl-3">
              <button class="btn btn-block btn-secondary">
                <i class="fa fa-sign-out"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h6 class="card-title font-weight-bold">Support</h6>
            <p class="card-text">Get fast, free help from our friendly assistants.</p>
            <button type="button" class="btn btn-primary">Contact Us</button>
          </div>
        </div>
      </div> */}
    </div>

  </div>
</div>
</div>
    </div>
    </>
    )}
    </>
  )
}

export default EditProfile