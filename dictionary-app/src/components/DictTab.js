import { Tab, Tabs, Card, Elevation } from "@blueprintjs/core";
import React from 'react';

function DictTab(props){
  const catList = props[0]
  const wordList = props[1]
  const isAdmin = props[2]
  console.log(isAdmin);
  const groupedByCat = [];
  for (const cat of catList){
    const catWords = [];
    for (const word of wordList){

      if (word[7] === cat[0]){

        catWords.push(word)
      }  
    }
    groupedByCat.push(catWords)
  }
  return (          
    <Tabs
    id='category-tabs'
    vertical= {true}
    large = {true} 
    >
        {catList.map(cat => (
          myTabs([cat[0], cat[1], groupedByCat[cat[0] - 1]]) 

        ))}
        {  isAdmin === 1  ?
          <Tab id='admin' key='99' title='Manage Categories' panel={adminPanel(catList)} />
          :
          <></>
        }
        <Tabs.Expander />
    </Tabs>)
}
function adminPanel(props){
  return(
    <div  style={{textAlign: "left"}}>
      <h1>Manage Categories</h1>
      <div className="bp4-card">
        <h5>Delete category</h5>
        <div className="bp4-html-select">
          <select className=".bp4-fill">
            <option selected>Choose an item...</option>
            {props.map(cat => (
            <option value={cat[0]}>{cat[1]}</option>

          ))}
          </select>
          <span class="bp4-icon bp4-icon-double-caret-vertical"></span>
          </div> 
          <button onclick="alert('test')">Try it - click</button>     
      </div>
    </div>   
  )
}
function deleteCategory() {
  alert("hey")
}

function myTabs(props){
    return <Tab id={props[0]} key={props[0]} title={props[1]} panel={makePanel(props)} />
  }

function makePanel(props){
  return (<div key={props[0]}>
            <h1>{props[1]}</h1>
            <div className="container">
              {props[2].map(word => (
                  wordPanel(word)
              ))}
            </div> 
          </div>
        )
}

function wordPanel(props){
  return(
    <div key={props[0]} className="item">
      <Card interactive={true} className="" elevation={Elevation.TWO}>
        <h5>{props[1]}</h5>
        <p>{props[2]}</p>
      </Card>
      </div>)
}

export default DictTab