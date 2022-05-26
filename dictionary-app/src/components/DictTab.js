import { Tab, Tabs } from "@blueprintjs/core";

function DictTab(props){
  return (          
    <Tabs
    id='category-tabs'
    vertical= {true}
    large = {true} 
    >
        {props.map(cat => (
          myTabs([cat[0], cat[1]]) 
        ))}

        <Tabs.Expander />
    </Tabs>)
}


function myTabs(props){
    return <Tab id={props[0]} title={props[1]} panel={makePanel(props)} />
  }

function makePanel(props){
  return (<div>
            <h1>{props[1]}</h1>
            <h2>{words[0]}</h2>
          </div>
        )
}

export default DictTab