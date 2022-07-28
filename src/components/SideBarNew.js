import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import chatContext from '../context/ChatContext';
import modeContext from '../context/ModeContext';

const Sidebar = () => {


  const context = useContext(chatContext);
  const { loggingOut, setChatContent } = context;

  
  const mode_context = useContext(modeContext);
  const { darkMode, toggleDarkMode } = mode_context;


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


  return (
        <nav style={{ transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#3e3f44': '#4768b5', height: 'auto', display: 'block', marginLeft: '-10px', padding: '10px'}} className="menu">
        <ul className="items">
          <li style={{cursor: 'pointer'}} className="item, tooltipa" onClick={() => {navigate('/edit')}}>
            <i style={{marginTop: '20px'}} className="sexy-icon fa fa-user" aria-hidden="true"></i>
            <span class="tooltipatext">Your Account</span>
          </li>
          <hr style={{margin: '0px', color: 'white', marginTop: '20px', marginBottom: '1px'}} />

          <li style={{cursor: 'pointer'}} className="item, tooltipa" onClick={() => {navigate('/addfriend')}}>
            <i style={{marginTop: '20px'}} className="sexy-icon fa-solid fa-user-plus" aria-hidden="true"></i>
            <span class="tooltipatext">Add a Friend</span>
          </li>
          <hr style={{margin: '0px', color: 'white', marginTop: '20px', marginBottom: '1px'}} />

          <li style={{cursor: 'pointer'}} className="item, tooltipa" onClick={() => {navigate('/')}}>
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