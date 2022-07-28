import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import modeContext from '../context/ModeContext';


const Signup = () => {
    const mode_context = useContext(modeContext);
    const { darkMode, toggleDarkMode } = mode_context;

    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('auth-token')){
            navigate('/');
        }
    }, []);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState(false);


    const register = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, username: username, email: email, password: password})
        });

        const json = await response.json();
        console.log(json);


        if(json.authtoken){
            // setIncorrectCredentials(false);
            localStorage.setItem('auth-token', json.authtoken);
            navigate('/avatar');
        }
        else{
            alert('No!')
            // setIncorrectCredentials(true);
        }



    }


  return (
    <>
        <div className="content" style={{fontFamily: "Roboto,sans-serif"}}>
        <div className='sexyyybtn'>
                <div class="form-check form-switch">
                    <input checked = {darkMode} onClick={toggleDarkMode} class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                    <label class="form-check-label" for="flexSwitchCheckDefault"><strong style={{color: darkMode?'white':'black'}}>Dark Mode</strong></label>
                </div>
            </div>
            <div className="container" style={{maxWidth: "1140px", transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#272727':"rgb(245 245 245)", boxShadow: "none"}}>
                <div style={{ transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#272727': 'rgb(245 245 245)'}} className="row">
                    <div className="col-md-6">
                        <img src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg" alt="Image" className="img-fluid"/>
                    </div>
                        <div className="col-md-6 contents">
                        <div className="row justify-content-center">
                            {errors &&
                            <div style={{width: "370px"}} className="alert alert-danger" role="alert">
                                <strong>INCORRECT CREDENTIALS!</strong>
                            </div>}
                            <div className="col-md-8">
                                <div className="mb-4">
                                    <h3 style={{color: darkMode?'white': 'black'}}>Sign Up</h3>
                                    <p style={{color: "#9b9595"}} className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>
                                </div>
                                <form action="#" method="post">
                                    <div style={{ transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#323232': '#edf2f5'}} className="form-group first">
                                    <label for="username" >Full Name</label>
                                    <input type="text" onChange={(e) => {setName(e.target.value)}} className="" id="name" style={{outline: "none", border: "none", color: darkMode?'white':"black"}}/>
                                    </div>
                                    <div style={{ transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#323232': '#edf2f5'}} className="form-group first">
                                    <label for="username" >Username</label>
                                    <input type="text" onChange={(e) => {setUsername(e.target.value)}} className="" id="username" style={{outline: "none", border: "none", color: darkMode?'white':"black"}}/>
                                    </div>
                                    <div style={{ transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#323232': '#edf2f5'}} className="form-group first">
                                    <label for="username" >Email</label>
                                    <input type="email" onChange={(e) => {setEmail(e.target.value)}} className="" id="email" style={{outline: "none", border: "none", color: darkMode?'white':"black"}}/>
                                    </div>
                                    <div style={{ transition: 'background-color ease 0.3s', backgroundColor: darkMode?'#323232': '#edf2f5'}} className="form-group last mb-4">
                                    <label for="password" >Password</label>
                                    <input type="password" onChange={(e) => {setPassword(e.target.value)}} className="" id="password" style={{outline: "none", border: "none", color: darkMode?'white':"black"}}/>
                                    </div>
                                    <div className="d-flex mb-5 align-items-center">
                                    {/* <label className="control control--checkbox mb-0"><span className="caption">Remember me</span>
                                    <input type="checkbox" checked />
                                    <div className="control__indicator"></div>
                                    </label> */}
                                    <span className="ml-auto"><Link to="/login" className="forgot-pass">Already Have an Account?</Link></span>
                                    </div>
                                    <input onClick={register} type="submit" value="Log In" className="btn btn-block btn-primary" style={{width: "100%"}}/>
                                    <span className="d-block text-left my-4 text-muted">&mdash; or login with &mdash;</span>
                                    <div className="social-login">
                                    <a href="#" className="facebook">
                                    <span className="icon-facebook mr-3"></span>
                                    </a>
                                    <a href="#" className="twitter">
                                    <span className="icon-twitter mr-3"></span>
                                    </a>
                                    <a href="#" className="google">
                                    <span className="icon-google mr-3"></span>
                                    </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signup