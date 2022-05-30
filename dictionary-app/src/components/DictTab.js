import { Tab, Tabs, Card, Elevation, Intent, Button, PopoverInteractionKind, Popover, Position } from "@blueprintjs/core";
import React from 'react';
import axios from "axios";
import catCreationTab from "./catCreateTab";

function DictTab(props){
  const catList = props[0]
  const wordList = props[1]
  const currentUser = props[2][0]
  const isAdmin = props[2][4]
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
        {catList.map((cat, index) => (
          myTabs([cat[0], cat[1], groupedByCat[index], isAdmin]) 

        ))}


        <Tabs.Expander />
    </Tabs>)
}


function myTabs(props){
    return <Tab id={props[0]} key={props[0]} title={props[1]} panel={makePanel(props)} />
  }

function makePanel(props){
  const isAdmin = props[3]
  return (<div key={props[0]}>
            <h1>{props[1]}</h1>
            { isAdmin === 1 ?
            <div>
              <Popover
                  interactionKind={PopoverInteractionKind.CLICK}
                  popoverClassName="bp4-popover-content-sizing"
                  position={Position.RIGHT}
              >
                <Button>Delete Category</Button>
                <div>
                    <h4>Are you sure you want to delete this category?</h4>
                    <Button onClick={() => {deleteCat(props[0]); window.location.reload()}} className="bp4-minimal" intent={Intent.DANGER} icon="delete" text="Delete" />

                </div>
              </Popover>
              <br></br>
              <br></br>
            </div>
            :
            <></>
            }
            
            <div className="container">
              {props[2].map(word => (
                  wordPanel(word)
              ))}
            </div> 
          </div>
        )
}

function deleteCat(cat){
  axios({
    method: "GET",
    url:"/api/delete-cat/" + cat
  })
  .then((response) => {
    console.log(202);  
  }).catch((error) => {
    if (error.response) {
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      }
  })
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