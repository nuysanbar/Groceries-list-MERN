import React from "react";

var Search=({setSearch})=>(
    <form className="search" onSubmit={(e)=>e.preventDefault}>
    <input placeholder="Search item" onChange={(e)=>setSearch(e.target.value)}/>
    </form>
)

export default Search;