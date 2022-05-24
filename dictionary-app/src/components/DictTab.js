import { Tab, Tabs } from "@blueprintjs/core";

function DictTab(props){
  console.log(props);
  return (          
    <Tabs
    id='category-tabs'
    vertical= {true} 
    > 
      {props === 0 ? 
        <p> Loading</p>
      :
        tabList(props)
      }

        <Tabs.Expander />
    </Tabs>)
}

function tabList(props){
  return (
    <>
      {props.map(({ name, id }) => (
         myTabs ({key : id, name : name})
       ))}
    </>
  );
}

function myTabs(props){
  return <Tab key={props.key} title={props.name} panel={makePanel(props)} />
}

function makePanel(props){
  return (<table className="bp4-html-table .modifier">
  <thead>
    <tr>
      <th>English</th>
      <th>M&#257;ori</th>
      <th>Description</th>
      <th>Level</th>
    </tr>
  </thead>
  <tbody>
    { createGridRow([1,23,4,5,5,5,5,5,5])}
  </tbody>
  <tfoot>
    <tr>
      <td colSpan={3}>Total</td>
      <td>1408</td>
    </tr>
  </tfoot>
</table>
)
}

function createGridRow(word){
  return (
    <tr>
      <td>{word[1]}</td>
      <td>{word[2]}</td>
      <td>{word[5]}</td>
      <td>{word[3]}</td>
    </tr>
  )
}
export default DictTab