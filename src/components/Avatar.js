import React, { useContext, useEffect } from 'react'
import AvatarCard from './AvatarCard'
import { v4 as uuidv4 } from 'uuid'
import  { useNavigate } from 'react-router-dom'
import modeContext from '../context/ModeContext'



const Avatar = () => {
  const mode_context = useContext(modeContext);
  const { darkMode, toggleDarkMode, setDarkMode } = mode_context;

  const navigate = useNavigate();
  

  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      navigate('/login');
    }
  }, [])
  

  console.log(localStorage.getItem('auth-token'));


    let randomURI_1 = uuidv4();
    let randomURI_2 = uuidv4();
    let randomURI_3 = uuidv4();
    let randomURI_4 = uuidv4();


    const reloadAvatars = () => {
        // randomURI_1 = uuidv4();
        // randomURI_2 = uuidv4();
        // randomURI_3 = uuidv4();
        // randomURI_4 = uuidv4();
        navigate('/avatar');
    }



      document.body.style = 'background-color: rgb(39, 39, 39);';
    


  return (
    <>
    <div style={{textAlign: 'center'}}>
        <h1 style={{textAlign: 'center', color: 'white', marginTop: '100px'}}>Select An Avatar for your profile</h1>

        <div className="row row-cols-4 my-5" style={{margin: '0 200px'}}>
        <AvatarCard URI={randomURI_1} />
        <AvatarCard URI={randomURI_2} />
        <AvatarCard URI={randomURI_3} />
        <AvatarCard URI={randomURI_4} />
        </div>
        <button onClick={reloadAvatars} className="btn btn-primary">Generate More</button>
    </div>
    </>
  )
}

export default Avatar