import React, { useContext, useEffect, useState } from 'react'
import jwt from 'jsonwebtoken';
import ProfileItem from './ProfileItem';
import { useNavigate } from 'react-router-dom';
import modeContext from '../context/ModeContext';



// One great thing i learnt today: We can only use ".map" with state variables XD


const Discussions = ({ socket }) => {
  const mode_context = useContext(modeContext);
  const { darkMode, toggleDarkMode } = mode_context;
  const [sex, setSex] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate(); 

  const checkLoggedIn = () => {
    if (!localStorage.getItem('auth-token')) {
      navigate('/login');
    }
  };


  let initialList = [];
  const [list, setList] = useState(initialList);

  // let fetchData;

  useEffect(() => {
    

    // if(localStorage.getItem('auth-token')){
      
    // const fetchData = async (useparams) => {
      

    // const token = localStorage.getItem('auth-token');
    // const user_Id = await jwt.decode(token).user.id;

    // console.log(user_Id);

    // const response = await fetch(`http://localhost:5000/api/auth/sort`, {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'auth-token': token    // Dude, this line fucking took me 10 mins to identify that i've not added it lol
    //         },
    //     });

    //     const json = await response.json();
    //     console.log(json);
    //     setList(json);

    //     setSex(true);
    //   }
    //   fetchData('noparams');
    // }
  }, [])
  




  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
    const fetchSearch = async () => {
      setIsLoaded(false);
    const token = localStorage.getItem('auth-token');
    const user_Id = await jwt.decode(token).user.id;

    console.log(user_Id);

    const response = await fetch(`http://localhost:5000/api/auth/findallfriends/${searchValue}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': token    // Dude, this line fucking took me 10 mins to identify that i've not added it, lol
            },
        });

        const json = await response.json();
        console.log(json);
        setList(json);

        setSex(true);
        setIsLoaded(true);
      }
      fetchSearch();





      if (searchValue === "") {
        const allSearch = async () => {
          const token = localStorage.getItem('auth-token');
          const user_Id = await jwt.decode(token).user.id;
      
          console.log(user_Id);
      
          const response = await fetch(`http://localhost:5000/api/auth/sort`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token    // Dude, this line fucking took me 10 mins to identify that i've not added it lol
                  },
              });
      
              const json = await response.json();
              console.log(json);
              setList(json);
      
              setSex(true);

              setTimeout(() => {
                setIsLoaded(true);
              }, 100);
            }
            allSearch();
      }
    }
  }, [searchValue])
  


  useEffect(() => {
    socket.on('refresh_discussions', () => {
      const allSearch = async () => {
        const token = localStorage.getItem('auth-token');
        const user_Id = await jwt.decode(token).user.id;
    
        console.log(user_Id);
    
        const response = await fetch(`http://localhost:5000/api/auth/sort`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': token    // Dude, this line fucking took me 10 mins to identify that i've not added it lol
                },
            });
    
            const json = await response.json();
            console.log(json);
            setList(json);
    
            setSex(true);
          }
          allSearch();
    })


    socket.on('cameOnline', (user_Id) => {
      console.log("lol");
    })


    
  }, [socket])








  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
    const cameOnline = async () => {
      const token = localStorage.getItem('auth-token');
      const user_Id = await jwt.decode(token).user.id;
  
  
      const response = await fetch(`http://localhost:5000/api/auth/online`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': token    // Dude, this line fucking took me 10 mins to identify that i've not added it lol
              },
          });
  
          const json = await response.json();
          console.log(json);
        }
        cameOnline();
      }
  }, [])
  
  




  return (
    <>
    {sex && <section className="discussions" style={{overflowY: "scroll", transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#343434':''}}>
        <div style={{ transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#343434': 'white'}} className="discussion search">
          <div style={{ transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#464242': 'white'}} className="searchbar">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input onChange={(e) => {setSearchValue(e.target.value)}} style={{ transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#464242': 'white', border: 'none', outline: 'none', color: darkMode?'white':'black'}} type="text" placeholder="Search..."></input>
          </div>
        </div>
        {/* <div className="discussion message-active">
          <div className="photo" >
            <div className="online"></div>
          </div>
          <div className="desc-contact">
            <p className="name">Megan Leib</p>
            <p className="message">9 pm at the bar if possible 😳</p>
          </div>
          <div className="timer">12 sec</div>
        </div> */}


        {list? list.map((user) => {
          // console.log("Hi");

          return(
          <>
          {isLoaded && <ProfileItem searchValue={searchValue} socket={socket} key={user._id} url={user.pfpuri} id={user._id} name={user.name} />}
          </>
          )
          })
          : ""
        }

      </section>}
      </>
  )
}

export default Discussions