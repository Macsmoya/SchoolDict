import { Tab, Tabs, Card, Elevation } from "@blueprintjs/core";
import React from 'react';

function DictTab(props){
  const catList = props[0]
  const wordList = props[1]
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

        <Tabs.Expander />
    </Tabs>)
}


function myTabs(props){
    return <Tab id={props[0]} title={props[1]} panel={makePanel(props)} />
  }

function makePanel(props){
  return (<div key={props[0]}>
            <h1>{props[1]}</h1>
            <div className="flex flex-wrap mb-4 p-10">
              {props[2].map(word => (
                  wordPanel(word)
              ))}
            </div> 
          </div>
        )
}

function wordPanel(props){
  return(
    <div className="p-1">
      <Card interactive={true} elevation={Elevation.TWO}>
        <h5>{props[1]}</h5>
        <p>{props[2]}</p>
      </Card>
      </div>)
}

export default DictTab