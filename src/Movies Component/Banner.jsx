import React from 'react'
import "./Styling/Banner.css";
function Banner(){
    let[firstMovie,setfirstMovie] = React.useState("");
    React.useEffect(function() {async  function fetchData(){
      let response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=890dcf27eddd875f7c33f4aae0b78586");
      let data = await response.json();
      let movies = data.results;
      setfirstMovie(movies[0]);
    }
    fetchData();
    },[]);
    return (<>
        {
        firstMovie ==""?<div className='shimmerHeader'></div>:
        <>
        <h2 className='bannertitle'>{firstMovie.original_title}</h2>
        <div className='banner'>
        
         <img 
         className='banner_poster'
         src={"https://image.tmdb.org/t/p/original/" + firstMovie.backdrop_path}/>
        </div>
        </>
        }
        </>
    );
}

export default Banner