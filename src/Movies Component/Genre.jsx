import React from 'react';
import Banner from './Banner.jsx';
import MovieList from './MovieList.jsx';
import { Link, withRouter } from 'react-router-dom';
function Genre(props) {
  const pageid = Number(props.match.params.pageid);
  const genreid = props.match.params.genreid;
  const [isHidden, setIsHidden] = React.useState(false);
  const paginationState = (check) => {
    if(check==false){
      setIsHidden(false);
    }
    else{
      setIsHidden(true);
    }
  }
  
  return (
    <>
    <Banner></Banner>
    <h2 className='trendingTitle'>Trending Movies</h2>
    <MovieList pageNo = {pageid}  pageState={paginationState} value = {props.value} handleInput = {props.handleInput} genreid={genreid}></MovieList>
    <>
    {isHidden?null:
    <div className="pagination_cnt">
    <div className="pagination">
    <Link to={"/genre/"+genreid+"/"+(pageid==1?pageid:pageid-1)}>
    <button className="pagination_btn" >◀</button></Link>
      <div className="page_no">{pageid}</div>
    <Link to={"/genre/"+genreid+"/"+(pageid+1)}> 
    <button className="pagination_btn"
          
        >▶</button></Link> 
    </div>
    </div>}
    </>
    </>
  )
}

export default withRouter(Genre)