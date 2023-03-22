import React from 'react'
import Home from './Home.jsx'
import Favourites from './Favourites.jsx'
import PageNotFound from './PageNotFound.jsx'
import MovieCard from './MovieCard.jsx'
import Country from './Country.jsx'
import "./Styling/Movies.css"
import "./Styling/Pagination.css";
import { Route, Redirect,Switch } from "react-router-dom";
import Genre from './Genre.jsx'
function Movies(props) {
  return (
    <div className='movie_body'>
    <Switch>
      <Route path="/home/:pageid" exact><Home value ={props.value} handleInput = {props.handleInput}></Home></Route>
      <Route path="/favourites" exact><Favourites value = {props.value} handleInput = {props.handleInput}></Favourites></Route>
      <Route path ="/movie/:id"><MovieCard handleInput = {props.handleInput}></MovieCard></Route>
      <Route path ='/genre/:genreid/:pageid'><Genre value ={props.value} handleInput = {props.handleInput}></Genre></Route>
      <Route path ='/country/:countryid/:pageid'><Country value ={props.value} handleInput = {props.handleInput}></Country></Route>
      <Redirect from ="/" to="/home/1" exact></Redirect>
      <Route><PageNotFound handleInput = {props.handleInput}></PageNotFound></Route>
    </Switch>
    
    </div>
  )
}

export default Movies
