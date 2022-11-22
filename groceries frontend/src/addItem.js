import React from "react";
import {useRef} from "react";
function AddItem({setNewItem,handleSubmit}){
    const inputRef=useRef();
    return(
        <form className="addItem"  onSubmit={handleSubmit}>
            <label htmlFor="addItem">AddItem</label>
            <input
                autoFocus
                required
                ref={inputRef}
                id="addItem"
                placeholder="Add item"
                onChange={(e)=>setNewItem(e.target.value)}
            />
            <button onClick={()=>inputRef.current.focus()}>Add</button>
        </form>
    )
}

export default AddItem;