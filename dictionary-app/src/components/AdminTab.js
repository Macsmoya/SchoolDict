import { Button, Intent, PopoverInteractionKind, Position, Popover } from "@blueprintjs/core";
import React from 'react';


function AdminTab(props){
  return(
    <div  style={{textAlign: "left"}}>
      <h1>Manage Categories</h1>
      <div className="bp4-card">
        <h3>Delete category</h3>
        <div className="bp4-html-select">
          <select className=".bp4-fill">
            <option selected>Choose a Category</option>
            {props.map(cat => (
            <option value={cat[0]}>{cat[1]}</option>

          ))}
          </select>
          <span class="bp4-icon bp4-icon-double-caret-vertical"></span>
          </div> 
          <br></br>
          <br></br>
          <Popover
                interactionKind={PopoverInteractionKind.CLICK}
                popoverClassName="bp4-popover-content-sizing"
                position={Position.RIGHT}
            >
              <Button>Delete</Button>
              <div>
                  <h4>Are you sure you want to delete this category?</h4>
                  <Button className="bp4-minimal" intent={Intent.DANGER} icon="delete" text="Delete" />

              </div>
          </Popover>
        
      </div>
    </div>   
  )
}
export default AdminTab;