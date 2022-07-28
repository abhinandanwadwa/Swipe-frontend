import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AvatarCard = ({ URI }) => {

  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef(null);


  
  const saveAvatar = async () => {

      const token = localStorage.getItem('auth-token');


      const response = await fetch(`http://localhost:5000/api/auth/avatarchange`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'auth-token': token
            },body: JSON.stringify({url: `https://avatars.dicebear.com/api/avataaars/${URI}.svg`})
      }).then(navigate('/edit'))

        const json = await response.json();
        console.log(json);
        navigate('/edit');

  }


  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, [])


  const startAnimation = () => {
    cardRef.current.classList.remove('avatar-card-animation-reverse');
    cardRef.current.classList.remove('avatar-card-animation');
    cardRef.current.classList.add('avatar-card-animation');
    console.log("MouseEnter");
    // setTimeout(() => {
    //   cardRef.current.classList.remove('avatar-card-animation');
    // }, 2000);
  }
    
  const removeAnimation = () => {
    console.log("Mouse Left");
    cardRef.current.classList.remove('avatar-card-animation');
    cardRef.current.classList.add('avatar-card-animation-reverse');
  }

  return (
    <>
    <div onMouseLeave={removeAnimation} onMouseEnter={startAnimation} style={{display: isLoaded?'inline-block': 'none', animation: 'zoomIn', animationDuration: '0.6s'}} className="col">
        <div ref={cardRef} onClick={saveAvatar} className="card" style={{width: "12rem", cursor: 'pointer'}}>
            <img src={`https://avatars.dicebear.com/api/avataaars/${URI}.svg`}className="card-img-top" alt="..."/>
            {/* <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div> */}
        </div>
        </div>
     </>
  )
}

export default AvatarCard