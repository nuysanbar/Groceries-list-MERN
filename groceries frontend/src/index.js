import React from 'react';
import {useState,useEffect} from "react";
import ReactDOM from 'react-dom';
import Headers  from './headers';
import Footer from './footer';
import Content from './content';
import AddItem from './addItem';
import Search from './search';
import apiRequest from "./apiRequest";
import "./main.css";
function App(){
  var API_URL="http://localhost:3500/groceriesList";
  const [listItems,setListItems]=useState([]);
  const [newItem,setNewItem]=useState('');
  const [search,setSearch]=useState('');
  const [fetchError,setFetchError]=useState(null);
  const [isLoading,setIsLoading]=useState(true)
  
  // testing
 useEffect(()=>{
  const fetchItems=async()=>{
    try{
    const response= await fetch(API_URL);
    if(!response.ok) throw Error("Did not receive the data");
    const newLists= await response.json();
    setListItems(newLists);
    }catch(err){
      setFetchError(err.message);
    }
    finally{
      setIsLoading(false)
    }
  }
  (async()=>fetchItems())();
  // fetchItems();
  
 },[])
 const handleCheck= async (id)=>{
  const newLists=listItems.map((item)=>item._id===id?{...item,checked:!item.checked}:item)
  setListItems(newLists);
  const newUpdateItem=listItems.find((item)=>item._id===id);
  const updateOptions={
    method:"PATCH",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({checked:newUpdateItem.checked})
  }
  API_URL="http://localhost:3500/groceriesList/"+id;
  const res= await apiRequest(API_URL,updateOptions)
  setFetchError(res);
}
  const handleDelete=async(id)=>{
    const newLists=listItems.filter((item)=>item._id!==id);
    setListItems(newLists);
    const deleteOptions={
      method:"DELETE",
    }
    API_URL="http://localhost:3500/groceriesList/"+id;
    const res=await apiRequest(API_URL,deleteOptions)
    setFetchError(res);
  }
  const handleSubmit=async (e)=>{
    e.preventDefault()
    const newId=listItems.length;
    // const id=listItems.length+1;
    const newitem={id:newId,checked:true,item:newItem};
    const newLists=[...listItems,newitem];
    setListItems(newLists);
    const postOptions={
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newitem)
    }
    API_URL="http://localhost:3500/groceriesList/";
    const res=await apiRequest(API_URL,postOptions)
    setFetchError(res);
    setNewItem('');
  }
  return(
     <div className='appInside'>
      <Headers />
      <AddItem setNewItem={setNewItem} handleSubmit={handleSubmit}/>
      <Search setSearch={setSearch}/>
      {fetchError && <p>{fetchError}</p>}
      {<Content listItems= {listItems} handleCheck={handleCheck} handleDelete={handleDelete}/>}
      <Footer />
      </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));
// {listItems.filter((item)=>(item.item).toLowerCase().includes(search))}
