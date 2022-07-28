import React, { useState } from "react";
import { useEffect } from "react";
import ModeContext from "./ModeContext";


const ModeState = (props) => {
    const [darkMode, setDarkMode] = useState(true);
    useEffect(() => {
        document.body.style = 'background-color: rgb(39 39 39)';
    }, [])
    


    const toggleDarkMode = () => {
        if (darkMode) {
            setDarkMode(false);
            document.body.style = 'background-color: #F5F5F5';
            // localStorage.setItem('mode', 'light');
        }
        else {
            setDarkMode(true);
            document.body.style = 'background-color: rgb(39 39 39)';
            // localStorage.setItem('mode', 'dark');
        }
        console.log(darkMode);
    };





  return (
    <ModeContext.Provider value = {{darkMode, toggleDarkMode, setDarkMode}} >
        {props.children}
    </ModeContext.Provider>
  )
}

export default ModeState;