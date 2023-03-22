import React from 'react';
import "./Styling/Favourites.css";
import { useEffect, useState} from 'react';
import NoresultImg from '../asset/2426351.jpg';
import nodataImg from '../asset/nofav.jpg';
function Favourites(props) {
    let [favourites, setFavourites] = useState([]);
    let [inputvalue,setInputValue] = useState(props.value);
    let [noOfElems, setElems] = useState(5);
    let [currPage, setPage] = useState(1);
    let [totalPage,setTotalPage] = useState(1);
    let [sidx,setSidx] = useState(0);
    let [eidx,setEdix] = useState(1);
    let [prevHidden,setPrevHidden] = useState(true);
    let [nxtHidden,setnxtHidden] = useState(false);
    
    useEffect(function () {
        props.handleInput("");
        let favStrArr =
            localStorage.getItem("favourites") || "[]";
        let favArr = JSON.parse(favStrArr);
        setFavourites(favArr);
    }, []);
    useEffect(function(){
        console.log("fav length -> " +favourites.length+" ,total Pages -> "+totalPage);
        let intialPage = ((favourites.length%noOfElems)==0)?(Math.floor(favourites.length/noOfElems)):((Math.floor(favourites.length/noOfElems)+1));
        setTotalPage(intialPage);
        if(favourites.length!=0 && currPage>intialPage){
            setPage(intialPage);
            if(intialPage==1){
                setnxtHidden(true);
                setPrevHidden(true);
            }  
        }
        if(currPage < intialPage){
            setnxtHidden(false);
        }
        if(currPage == intialPage){
            setnxtHidden(true);
        }
        
    },[favourites,noOfElems]);
    useEffect(function(){
      setSidx(noOfElems*(currPage-1));
      setEdix((noOfElems*currPage) -1);
    },[currPage,noOfElems]);
    useEffect(function(){
        setInputValue(props.value);
        setPage(1);
        if(props.value=="" && totalPage!=1){
            setnxtHidden(false);
        }
        else{
            setnxtHidden(true);
            setPrevHidden(true);
        }
    },[props.value])
    function setnoElemsHandler(e) {
        let newValue = e.target.value;
        setElems(newValue);
    }
    // pag number change
    function incPageNumber() {
        if(currPage == totalPage-1 || currPage == totalPage){
            setnxtHidden(true);
        }
        setPrevHidden(false);
        setPage(function (currPage) {
            return currPage + 1;
        });
    }
    function descPageNum() {
        // if (currPage == 1) {
        //     setPrevHidden(true);
        // }
        if(currPage == 2){
            setPrevHidden(true);
        }
        setnxtHidden(false);
        setPage(function (currPage) {
            return currPage - 1;
        });
    }
    function sortRating(val){
        if(val){
           let sortedArr = favourites.sort(function(a,b){
             return b.vote_average - a.vote_average;
           })
           setFavourites([...sortedArr]);
        }
        else{
           let sortedArr = favourites.sort(function(a,b){
             return a.vote_average - b.vote_average;
           })
           setFavourites([...sortedArr]);
        }
    }
    function sortPopularity(val){
        if(val){
          let sortedArr = favourites.sort(function(a,b){
             return b.popularity - a.popularity;
           })
           setFavourites([...sortedArr]);
        }
        else{
          let sortedArr = favourites.sort(function(a,b){
             return a.popularity - b.popularity;
           })
           setFavourites([...sortedArr]);
        }
    }
    function deleteMovie(id){
      let prevStrArray = localStorage.getItem("favourites") || "[]";
      let prevArray = JSON.parse(prevStrArray);
      prevArray = prevArray.filter((movieObj) => {
          return movieObj.id != id;
      })
      setFavourites([...prevArray]);
      prevArray = JSON.stringify(prevArray);
      localStorage.setItem("favourites", prevArray)
    }
    function callback(movieObj,idx) {
        if(idx>=sidx && idx <=eidx){
        return (
            <tr>
                <td>
                  <div class="tbl_data">
                    <img src={"https://image.tmdb.org/t/p/w500/" + movieObj.backdrop_path} className="poster_img"

                        style={{ height: "10rem" }}
                    ></img>
                  </div>
                </td>
                <td className='posterName'>
                <h4>{movieObj.original_title}</h4>
                </td>
                <td>{movieObj.vote_average}</td>
                <td>{movieObj.popularity}</td>
                <td><button onClick={()=>{
                    deleteMovie(movieObj.id);
                }}>❌</button></td>
            </tr>
        )}
    }

    return (<>
        {/* <Header handleInput = {handleInput}></Header> */}
        <div className="favContainer">
        <div className="page-set">
          <h4>Item Cap</h4>
          <input className='favLimit' type="number" min="1" step="1" value={noOfElems} onChange={setnoElemsHandler}/>
        </div> 
        <table>
            <thead>
                <tr>
                    <th >Poster</th >
                    <th>Name</th>
                    <th> 
                      <div className='tableHead'>
                        <div className='headContainer'>
                         <div class="angles-up" onClick={() => {sortRating(true)}}>🔼</div>
                          Rating
                         <div class="angles-down" onClick={() => {sortRating(false)}}>🔽</div>
                       </div>
                      </div>
                    </th>
                    <th>
                    <div className='tableHead'>
                     <div className='headContainer'>
                        <div class="angles-up" onClick={() => {sortPopularity(true)}}>🔼</div>
                        Popularity
                        <div class="angles-down" onClick={() => {sortPopularity(false)}}>🔽</div>
                     </div>
                    </div>
                    </th>
                    <th>
                        Remove
                    </th>
                </tr>

            </thead>
            <tbody>
                {
                (inputvalue==""?favourites.length!=0?favourites.map(callback):<tr><td><img className='no_img' src = {nodataImg}/></td></tr>:filterLogic(inputvalue,favourites).length!=0?filterLogic(inputvalue,favourites).map(callback):<tr><td><img className='no_img'src = {NoresultImg}/></td></tr>)}
            </tbody>
        </table>
        <div className="pagination">
            {prevHidden?null:<button className="pagination_btn"
                onClick={descPageNum}
            >◀</button>}
            <div className="page_no">{currPage}</div>
            {nxtHidden?null:<button className="pagination_btn"
                onClick={incPageNumber}
            >▶</button>}
        </div>
        </div>
    </>
    )
}

function filterLogic(searchText, movieArray) {
    let filteredMovieArray = [];
    for (let i = 0; i < movieArray.length; i++) {
        let upperSearchText = searchText.toUpperCase();
        let movieName = movieArray[i].original_title;
        let upperText = movieName.toUpperCase();
        let ans = upperText.includes(upperSearchText);
        if (ans == true) {
            filteredMovieArray.push(movieArray[i]);
        }
    }
    return filteredMovieArray;
}

export default Favourites