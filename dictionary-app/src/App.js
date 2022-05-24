import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Spinner, Navbar} from "@blueprintjs/core";
import DictTab from './components/DictTab';

function Welcome(props) {
  return <h1>Hello, {props}</h1>;
}


function App() {
  const [currentUser, setCurrentUser] = useState(0);
  const [itemList, setCurrentItemList] = useState(0);
  //const [currentTab, setCurrentTab] = useState(0);
  //setCurrentTab('dict')
  const currentTab = 'dict'

  //TODO #2
  useEffect(() => {
    fetch('http://localhost:5000/api/retreive-categories').then(res => res.json()).then(data => {
      const categories = data.map((category) => ({id: category[0], name : category[1], desc : category[2], level : category[3]}))
      setCurrentItemList(categories)
      
      setCurrentUser(data[0][1]);
    });
  }, []);

  return (
    <div className="App"> 
      <header className="App-header">
        <Navbar fixedToTop={true}>
          <Navbar.Group>
              <Navbar.Heading> M&#257;ori Dictionary</Navbar.Heading>
              <Navbar.Divider />
              <Button className="bp4-minimal" icon="home" text="Admin"/>
              <Button className="bp4-minimal" icon="document" text="Files" />
          </Navbar.Group>
        </Navbar>
      </header>
      <div className='page-content'>

        {  currentTab === 'dict' ?
          DictTab(itemList) 
          :
          <p >LKogin</p>
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
        </ul>
      </div>

    </div>
  );
}

export default App;

