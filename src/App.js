
import Movies from "./Movies Component/Movies";
import Footer from "./Movies Component/Footer";
import React, { useEffect } from "react";
import Header from "./Movies Component/Header";
function App() {
  let [inputvalue,setInputValue] = React.useState("");
  const handleInput = (val) => {
    setInputValue(val);
  };
  
  return (
    <>
    <Header handleInput = {handleInput} inVal = {inputvalue} ></Header>
    <Movies handleInput = {handleInput} value = {inputvalue}></Movies>
    <Footer></Footer>
    </>
    
  );
}

export default App;
