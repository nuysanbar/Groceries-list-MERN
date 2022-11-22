import React from "react";

function Content({listItems,handleCheck,handleDelete}){
    return(
        <ul>
        {listItems.map((eachItem)=>{
            return (
            <li id={eachItem._id} key={eachItem._id}>
             <input
                checked={eachItem.checked}
                type="checkbox"
                onChange={()=>handleCheck(eachItem._id)}
             />
            <label style={(eachItem.checked)?{textDecoration:"line-through"}:{textDecoration:'none'}}>{eachItem.item}</label>
            <button onClick={()=>handleDelete(eachItem._id)}>DEL</button>
            </li>
        )})}
        </ul>
    )
}
export default Content;
// 