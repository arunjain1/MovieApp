import React, { useEffect,useState} from 'react'
import { withRouter } from 'react-router-dom';
import "./Styling/MovieCard.css";
import NoImgAvail from '../asset/NoImgFound.jpg';
import NoImgAvail2 from '../asset/NoImg.jpg';

function MovieCard(props) {
const[movieData,setMovieData] = useState("");
const[movieReview,setMovieReview] = useState([]);
const id = props.match.params.id;
 useEffect(function(){
    props.handleInput("");
    async function fetchData(){
        let response = await fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key=890dcf27eddd875f7c33f4aae0b78586&language=en-US");
        let reviewResp = await fetch("https://api.themoviedb.org/3/movie/"+id+"/reviews?api_key=890dcf27eddd875f7c33f4aae0b78586&language=en-US&page=1");
        let data = await response.json();
        let reviewdata = await reviewResp.json();
        setMovieData(data);
        setMovieReview(reviewdata.results);
    }
    fetchData();
 },[]);
 return (
    <div className="mov_cont">
        <div className='mov_title'>
            {movieData?.original_title}
        </div>
        <div className='mov_img'>
              {movieData==""?<div className='shimmerHeader'></div>:movieData.backdrop_path!=null?<img src = {"https://image.tmdb.org/t/p/original/"+movieData?.backdrop_path}/>:<img src = {NoImgAvail}/>}
        </div>
        <div className='mov_info'>
            <div className="mov_poster">
                {movieData==""?<div className='shimmerHeader'></div>:movieData.poster_path!=null?<img src={"https://image.tmdb.org/t/p/w500/"+movieData?.poster_path}/>:<img src = {NoImgAvail2}/>}
            </div>
            <div className='mov_extras'>
                <div className="mov_desc">
                 <div className="movie_description">
                     Description
                  </div>
                 <p className='mov_detail'>
                   {movieData?.overview}
                 </p>
               </div>
               <div className='mov_data'>
                  <div className="mov_val">
                    <div className="heading">Popularity</div>
                    <div className="mov_value">{movieData?.popularity}</div>
                  </div>
                  <div className="mov_val">
                    <div className="heading">Release Date</div>
                    <div className="mov_value">{movieData?.release_date}</div>
                  </div>  
                  <div className="mov_val">
                    <div className="heading">Rating</div>
                    <div className="mov_value">{movieData?.vote_average}</div>
                  </div>  
                 <div className="mov_val" style={{
                    marginRight : 10
                 }}>
                    <div className="heading">Vote Count</div>
                    <div className="mov_value">{movieData?.vote_count}</div>  
                 </div>   
               </div>
                <div className="review_heading">Review ▶</div>
                <div className="review_val">{movieReview.length==0?"No Data Found":movieReview[0]?.content}</div>
               
            </div>
        </div>

    </div>
   )
}

export default withRouter(MovieCard);