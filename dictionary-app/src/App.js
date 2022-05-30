import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import axios from 'axios';
import { Button, Spinner, Navbar, Classes, Dialog} from "@blueprintjs/core";
import DictTab from './components/DictTab';
import useToken from './components/useToken';
import Login from './components/Login';
import LogoutButton from './components/LogoutButton';


function Welcome(props) {
  return <h1>Hello, {props}</h1>;
}



function App() {
  const [currentUser, setCurrentUser] = useState(0);
  const [categoryList, setCategoryList] = useState(0);
  const [wordList, setWordList] = useState(0);
  const { token, removeToken, setToken } = useToken();
  const [isOpen, setIsOpen] = React.useState(false)

  //TODO #2
  useEffect(() => {
    fetch('http://localhost:5000/api/retreive-users').then(res => res.json()).then(data => {
      setCurrentUser(data[0][1]);
    });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/retreive-categories').then(res => res.json()).then(data => {
      setCategoryList((data))
      
    });
  }, []);
  useEffect(() => {
    fetch('http://localhost:5000/api/retreive-words').then(res => res.json()).then(data => {
      setWordList((data))
      
    });
  }, []);

  return (
    <div className="App"> 
      <header className="App-header">
        <Navbar fixedToTop={true}>
          <Navbar.Group>
              <Navbar.Heading> M&#257;ori Dictionary</Navbar.Heading>
              <Navbar.Divider />
              <Button className="bp4-minimal" icon="home" text="Admin" />
              
              {!token && token!=="" &&token!== undefined?  
              <Button className="bp4-minimal" icon="log-in" text="Log in" onClick={() => { setIsOpen(true) }}/>
              :
              <LogoutButton token={removeToken}></LogoutButton>
              }
          </Navbar.Group>
        </Navbar>
      </header>
      <div className='page-content'>

        {  categoryList === 0 || wordList === 0 ?
          <p>Loading</p>
          :
          DictTab([categoryList, wordList]) 
        }
        <div>

        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >

          Learn React
        </a>
        {currentUser === 0 ? 

            <Spinner intent="primary"/>
        :
        Welcome(currentUser)
        }
        <ul>
          { currentUser }

          <div style={{
            display: 'block', width: 400, padding: 30
        }}>
            <h4>ReactJS Blueprint Overlay Component</h4>
  
            <Button onClick={() => { setIsOpen(true) }}>Toggle Overlay</Button>

            <Dialog isOpen={isOpen} canOutsideClickClose={true} hasBackdrop={true} usePortal={true} onClose={() => setIsOpen(false) }>
                <div className={Classes.DIALOG_BODY}>
            <p>
                <strong>
                    Data integration is the seminal problem of the digital age. For over ten years, we’ve helped the
                    world’s premier organizations rise to the challenge.
                </strong>
            </p>
            <Login setToken={setToken}/>

        </div>
            </Dialog>        

        </div >
          
         

        </ul>
      </div>

    </div>
  );
}

export default App;

