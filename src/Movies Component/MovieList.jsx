import React from 'react'
import NoResultImg from '../asset/2953962.jpg';
import NodataImg from '../asset/5203299.jpg';
import "./Styling/MovieList.css";
import {Link} from "react-router-dom";
import Shimmer from './Shimmer';
function MovieList(props){
  let [movies,setMovies] = React.useState([]);
  let[searchMovies,setSearchMovies] = React.useState([]);
  let [favourites, setFavourite] = React.useState([]);
  const [hoveredDiv, setHoveredDiv] = React.useState(null);
  const handleMouseEnter = (id) => {
    setHoveredDiv(id);
  };
  const handleMouseLeave = () => {
    setHoveredDiv(null);
  };
  function setToFavouriteHandlers(movieId) {
      console.log("add", movieId);
      for (let i = 0; i < searchMovies.length; i++) {
          let movieObj = searchMovies[i];
          if (movieObj.id == movieId) {
              // [..favorites,movieobj]
              let newfavourites = [...favourites];
              newfavourites.push(movieObj);
              // localstorage add
              let prevStrArray = localStorage.getItem("favourites") || "[]";
              let prevArray = JSON.parse(prevStrArray);
              prevArray.push(movieObj);
              prevArray = JSON.stringify(prevArray);
              localStorage.setItem("favourites", prevArray);
              setFavourite(newfavourites);
              break;
          }
      }
  }
  function deleteFavoriteHandlers(movieId) {
      let filteredFavorite =
          favourites.filter((movieObj) => {
              return movieObj.id != movieId;
          })

      let prevStrArray = localStorage.getItem("favourites") || "[]";
      let prevArray = JSON.parse(prevStrArray);
      prevArray = prevArray.filter((movieObj) => {
          return movieObj.id != movieId;
      })
      prevArray = JSON.stringify(prevArray);
      localStorage.setItem("favourites", prevArray);
      // remove 
      setFavourite(filteredFavorite);
  }
  function checkContainFavHandlers(movieId) {
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].id == movieId) {
        return true
      }
    }
    return false;
  }
    React.useEffect(function () {
     props.handleInput("");
     let prevStrArray = localStorage.getItem("favourites") || "[]";
     let prevArray = JSON.parse(prevStrArray);
     setFavourite(prevArray)
    },[]);
    React.useEffect(function(){
      setSearchMovies(["empty"]);
      if(props.value===""){
        setSearchMovies(movies);
        props.pageState(false);
        return;
      }
      props.pageState(true);
      async function fetchData(){
        let response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=890dcf27eddd875f7c33f4aae0b78586&language=en-US&query="+props.value+"&page=1&include_adult=false");
        let data = await response.json();
        let movies = data.results;
        if(searchMovies.length!=0){
          setSearchMovies(movies);
        }
      }
      fetchData();
    },[props.value])

    React.useEffect(function(){
      props.handleInput("");
      setMovies("");
      async function fetchData(){
      let response;
      if(props.genreid!=undefined){
        let query = Number(props.genreid);
        response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=890dcf27eddd875f7c33f4aae0b78586&language=en-US&page="+props.pageNo+"&with_genres="+query);  
      }
      else if(props.countryid!=undefined){
        response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=890dcf27eddd875f7c33f4aae0b78586&page="+props.pageNo+"&with_origin_country="+props.countryid);
      }
      else{
        response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=890dcf27eddd875f7c33f4aae0b78586&page="+props.pageNo);
      }
      let data = await response.json();
      let movies = data.results;
      setSearchMovies(movies);
      setMovies(movies);
    }
     fetchData();
    },[props.pageNo,props.genreid,props.countryid]);

  return(
    <div className='movielist'>
      
      {
        movies.length===0?<Shimmer></Shimmer>
        :<>
          <div className='trending_box'>
            {searchMovies.length==0?
            <img className = "nodata" alt="Not Data Found" src = {NoResultImg}/>
            :searchMovies[0]==="empty"?<Shimmer></Shimmer> :searchMovies.map(function(movieObj,idx){
        
                return(
                  
                  <div id={movieObj.id} className="poster_box" onMouseEnter={() => handleMouseEnter(movieObj.id)} onMouseLeave={handleMouseLeave}>
                   <div className='posterheading'>
                    <h5 className='movieTitle'>{movieObj.original_title}</h5>
                   </div>
                   <Link to={"/movie/"+movieObj.id} key = {movieObj.id}>
                   <img className="poster_img" alt ="Poster" src={movieObj.backdrop_path!=null?"https://image.tmdb.org/t/p/w500/" + movieObj.backdrop_path:movieObj.poster_path!=null?"https://image.tmdb.org/t/p/w500/" + movieObj.poster_path :NodataImg}></img>
                   </Link>
                   {
                    checkContainFavHandlers(movieObj.id) === true ?
                     hoveredDiv === movieObj.id && <div style={{ display: 'flex'}} className="xmark"
                             onClick={() => {
                              deleteFavoriteHandlers(movieObj.id) }}
                        >❌</div> :
                     hoveredDiv === movieObj.id  &&<div style={{ display: 'flex'}} className="hearts"
                          onClick={() => { 
                            setToFavouriteHandlers(movieObj.id) }}
                        >😍</div>
                    }
                  </div>
                  
                )
           
            })}
          </div>
        </>
      }
    </div>
  );
  }
export default MovieList