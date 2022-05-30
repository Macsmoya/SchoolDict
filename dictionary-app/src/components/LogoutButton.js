import axios from "axios";
import React from 'react';
import { Button} from "@blueprintjs/core";
  

function Header(props) {

  function logOut() {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        }
    })}

    return(
      <Button className="bp4-minimal" icon="log-out" text="Logout" onClick={() => {logOut(); sleep(500); props.onLogout()}} />

  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default Header;