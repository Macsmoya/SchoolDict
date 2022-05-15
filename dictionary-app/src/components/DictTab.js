import { Tab, Tabs } from "@blueprintjs/core";

function DictTab(props){
  return (          
    <Tabs
    id='category-tabs'
    vertical= {true} 
    >
        { myTabs([1, "Test"]) }
        { myTabs([2, "Test"]) }
        { myTabs([3, "yoza"]) }
        <Tabs.Expander />
    </Tabs>)
}

function myTabs(props){
    return <Tab id={props[0]} title={props[1]} panel={makePanel(props)} />
  }

function makePanel(props){
  return <p>{props}</p>
}

export default DictTab