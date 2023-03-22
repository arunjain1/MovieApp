import React from 'react'
import "./Styling/Shimmer.css";
function Shimmer() {
 let arr = [];
 for(let i = 0;i<20;i++){
    arr.push(<div id ={i} className='shimmer'>
    </div>)
 }
  return (
    <div className = "shimmerContainer">
     {arr}
    </div>
  )
}

export default Shimmer