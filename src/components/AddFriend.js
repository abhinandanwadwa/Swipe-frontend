import React, { useEffect } from 'react';
import SideBarNew from './SideBarNew';
import modeContext from '../context/ModeContext';
import { useContext } from 'react';
import FriendCard from './FriendCard';
import jwt from 'jsonwebtoken';
import { useState } from 'react';

const AddFriend = ({ socket }) => {
    const mode_context = useContext(modeContext);
    const { darkMode, toggleDarkMode } = mode_context;

    const [newUsers, setNewUsers] = useState([]);
    let jsondt = [];


    useEffect(() => {

        const func = async () => {
            const token = localStorage.getItem('auth-token');
            const user_Id = await jwt.decode(token).user.id;
    
    
            const response = await fetch(`http://localhost:5000/api/auth/getallusers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'auth-token': token
                }
            }).then((res) => res.json())
            .then((sexy_users) => setNewUsers(sexy_users))
    
            // json = await response.json();

            // setNewUsers(json);
            // console.log(newUsers);
        }

        func();
    }, [])
    





    useEffect(() => {
      const markAsSeen = async () => {
        const token = localStorage.getItem('auth-token');
        const user_Id = await jwt.decode(token).user.id;
    
    
        const response = await fetch(`http://localhost:5000/api/auth/markasseen`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': token
            }
        })
      }

      markAsSeen();

    }, [])
    




    // useEffect(() => {
    //     console.log(newUsers);
    // }, [jsondt])



  return (
    <>
        <div className="container" style={{height: 'auto'}}>
        <div className="row" id={darkMode?'dark':'light'} style={{display: "flex", flexDirection: "row", backgroundColor: darkMode?'#343434': 'white', transition: 'background-color ease 0.3s', height: 'fit-content'}}>
        <h1 style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginBottom: '-48px', color: darkMode?'white':'black'}}>Add Friends</h1>




        {/* <div style={{display: 'flex', flexDirection: 'row-reverse', padding: '0'}}> */}

        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>

        <div class="row row-cols-1 row-cols-md-3 g-4" style={{marginLeft: '115px', marginTop: '60px'}}>

        {newUsers.map((user) => {
            return (<FriendCard socket={socket} name={user.name} pfpuri={user.pfpuri} id={user._id} />)
        })}
        </div>

        {/* <nav style={{backgroundColor: darkMode?'#3e3f44': '#4768b5', position: 'absolute', padding: '0px'}} className="menu"> */}

        <SideBarNew />
        </div>
        {/* </nav> */}
        </div>
        </div>
        {/* </div> */}
    </>
  )
}

export default AddFriend