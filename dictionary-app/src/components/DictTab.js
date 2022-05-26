import { Tab, Tabs } from "@blueprintjs/core";

function DictTab(props){
  console.log(props)
  const stations = [
    {call:'station one',frequency:'000'},
    {call:'station two',frequency:'001'}
  ]
  return (          
    <Tabs
    id='category-tabs'
    vertical= {true} 
    >
        { myTabs([1, "Test"]) }
        { myTabs([2, "Test"]) }
        { myTabs([3, "Next word"]) }
        {stations.map(station => (
          myTabs([station.call, station.call]) 
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
            <h2>{props[0]}</h2>
          </div>
        )
}

export default DictTab