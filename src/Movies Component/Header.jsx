import React, { useEffect } from 'react'
import "./Styling/Header.css";
import logoImg from "../asset/logo.jpg"
import { Link } from "react-router-dom";
function Header(props){
let [value,setValue] = React.useState("");
function changeValue(e){
    setValue(e.target.value);
    props.handleInput(e.target.value);
}
useEffect(function(){
  if(props.inVal!=value){
    setValue(props.inVal);
  }
},[props.inVal]);
return (
 <div className="header">
 <div className='flex'>
 <Link to ="/home/1"><div className="logo"><img alt="logo" src = {logoImg}></img></div></Link>
 <Link to ="/home/1"><h2 className='nav'>Movies</h2></Link>
 <Link to ="/favourites"><h2 className='nav'>Favourites</h2></Link>
 <input type="text" className='search' value ={value} placeholder = "🔍 Search Movies" onChange={changeValue}/>
 </div>
 </div>
    );
}

export default Header