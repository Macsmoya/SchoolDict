import { InputGroup, Label, Button } from "@blueprintjs/core";
import { useState } from 'react';
import axios from "axios";
import React from 'react';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Login(props) {
    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })
    const [error,setError]=useState();


    function logMeIn(event) {
      axios({
        method: "POST",
        url:"/token",
        data:{
          email: loginForm.email,
          password: loginForm.password
         }
      })
      .then((response) => {
        props.setToken(response.data.access_token, response.data.user_id)
        sleep(500);
        window.location.reload()
      }).catch((error) => {
        if (error.response) {
          setError(<p>Please check your email and password were correct</p>)
        }
      })

      setloginForm(({
        email: "",
        password: ""}))

      //event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div>
        <p>Email:</p>
        <form className="login">  
            <Label>
            <InputGroup onChange={handleChange} 
                label="test"
                type="email"
                text={loginForm.email} 
                name="email" 
                placeholder="Email" 
                value={loginForm.email} />
            </Label>
            
            <br></br>
            <Label>
                Password:
                <InputGroup onChange={handleChange} 
                  type="password"
                  text={loginForm.password} 
                  name="password" 
                  placeholder="Password" 
                  value={loginForm.password} /> 
            </Label>
            
            <br></br>
            <Button className="bp4-icon-standard" icon="tick" text="Submit" onClick={() =>{logMeIn()}}/>
            <br></br>
            <br></br>
            {error}

        </form>
      </div>
    );
}

export default Login;