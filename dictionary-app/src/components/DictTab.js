import { Tab, Tabs, Card, Elevation, Intent, Button, PopoverInteractionKind, Popover, Position } from "@blueprintjs/core";
import React from 'react';
import axios from "axios";
import catCreationTab from "./catCreateTab";

//Import images
import airplane from './images/airplane.png';
import apple from './images/apple.jpg';
import baby from './images/babt.jpg';
import bacon from './images/bacon.jpg';
import banana from './images/banana.jpg';
import bear from './images/bear.jpg';
import bee from './images/bee.jpg';
import bird from './images/boat.jpg';
import boat from './images/boat.jpg';
import boy from './images/boy.jpg';
import butterfly from './images/butterfly.jpg';
import cake from './images/cake.jpg';
import canoe from './images/canoe.jpg';
import car from './images/car.jpg';
import cat from './images/cat.jpg';
import chicken from './images/chicken.jpg';
import clock from './images/clock.jpg';
import cloud from './images/cloud.png';
import computer from './images/computer.jpg';
import cow from './images/cow.png';
import cup from './images/cup.jpg';
import doctor from './images/doctor.png';
import dog from './images/dog.jpg';
import egg from './images/egg.jpg';
import electricity from './images/electricity.jpg';
import hat from './images/hat.jpg';
import icecream from './images/icecream.jpg';
import milk from './images/milk.png';
import noimage from './images/noimage.png';
import potato from './images/potato.jpg';
import poutama from './images/poutama.jpg';
import sinegraph from './images/sinegraph.jpg';


const images = [
  {name:'aireplane', src:airplane},
  {name:'apple', src:apple},
  {name:'baby', src:baby},
  {name:'bacon', src:bacon},
  {name:'banana', src:banana},
  {name:'bear', src:bear},
  {name:'bee', src:bee},
  {name:'bird', src:bird},
  {name:'boat', src:boat},
  {name:'boy', src:boy},
  {name:'butterfly', src:butterfly},
  {name:'cake', src:cake},
  {name:'canoe', src:canoe},
  {name:'car', src:car},
  {name:'cat', src:cat},
  {name:'chicken', src:chicken},
  {name:'clock', src:clock},
  {name:'cloud', src:cloud},
  {name:'bird', src:bird},
  {name:'bird', src:bird},
  {name:'bird', src:bird},
  {name:'bird', src:bird},
  {name:'bird', src:bird},
  {name:'bird', src:bird},
  {name:'bird', src:bird},

]
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
        <img src={apple}/>
      </Card>
      </div>)
}

export default DictTab