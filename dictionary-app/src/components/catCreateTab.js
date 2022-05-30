import { InputGroup, Label, Button } from "@blueprintjs/core";
import { useState } from 'react';
import axios from "axios";
import React from 'react';

function catCreationTab(props) {

    const [catForm, setcatForm] = useState({
      name: "",
      desc: ""
    })

    function logMeIn(event) {
      axios({
        method: "POST",
        url:"/token",
        data:{
          name: catForm.name,
          desc: catForm.desc
         }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setcatForm(({
        name: "",
        desc: ""}))

      //event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setcatForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div>
        <p>Category Name:</p>
        <form className="create-cat">  
            <Label>
            <InputGroup onChange={handleChange} 
                label="name"
                type="name"
                text={catForm.name} 
                name="name" 
                placeholder="name" 
                value={catForm.name} />
            </Label>
            
            <br></br>
            <Label>
                Description:
                <InputGroup onChange={handleChange} 
                  type="desc"
                  text={catForm.desc} 
                  name="desc" 
                  placeholder="desc" 
                  value={catForm.desc} /> 
            </Label>
            
            <br></br>
            <Button className="bp4-icon-standard" icon="tick" text="Submit" onClick={() =>{logMeIn(); window.location.reload();}}/>


        </form>
      </div>
    );
}

export default catCreationTab;