import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Button, Navbar, Classes, Dialog} from "@blueprintjs/core";
import DictTab from './components/DictTab';
import useToken from './components/useToken';
import Login from './components/Login';
import LogoutButton from './components/LogoutButton';
import catCreationTab from './components/catCreateTab';
function App() {
  const [currentUser, setCurrentUser] = useState(0);
  const [categoryList, setCategoryList] = useState(0);
  const [wordList, setWordList] = useState(0);
  const { token, removeToken, setToken, userId } = useToken();
  const [isOpen, setIsOpen] = React.useState(false)

  //TODO #2


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
  useEffect(() => {
    fetch('http://localhost:5000/api/get-user/' + userId).then(res => res.json()).then(data => {
      setCurrentUser(data)
      
    });
  }, []);

  return (
    <div className="App"> 
      <header className="App-header">
        <Navbar fixedToTop={true}>
          <Navbar.Group>
              <Navbar.Heading> M&#257;ori Dictionary</Navbar.Heading>
              <Navbar.Divider />
              <p>  </p>
              {!token && token!=="" &&token!== undefined?  
              <Button className="bp4-minimal" icon="log-in" text="Log in" onClick={() => { setIsOpen(true) }}/>
              :
              <LogoutButton token={removeToken} onLogout={() => window.location.reload()}></LogoutButton>
              }
              


          </Navbar.Group>
        </Navbar>
      </header>
      <div className='page-content'>

        {  categoryList === 0 || wordList === 0 ?
        <img src={logo} className="App-logo" alt="logo" />
        :
          DictTab([categoryList, wordList, currentUser]) 
        }

        <ul>
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

          
         

        </ul>
      </div>

    </div>
  );
}

export default App;

