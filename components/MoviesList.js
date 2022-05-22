import React, { Component } from 'react'
//import { movies } from '../MoviesData'
import axios from 'axios'
export default class MoviesList extends Component {
  
    constructor(){
      console.log('constructor first');
      super();
      this.state={
        hover:" ",
        parr: [1],
        movies:[],
        currPage:1,
        favourites:[]
      }

    }

    handlePageClick=(value)=>{
      if(this.state.currPage!=value)
      {
        this.setState(
          {
            currPage:value,
          },this.changeMovies
        )
      }
    }
    handlePrev=()=>{
      if(this.state.currPage!=1)     
      {
            this.setState(
          {
           
            currPage:this.state.currPage-1
          },this.changeMovies
        )
      }
  }
    handleNext=()=>{

          let tempArr=[]

      for(let i=1;i<=this.state.parr.length+1;i++)
      {
        tempArr.push(i)
      }
      console.log(tempArr);

      this.setState(
        {
          parr:[...tempArr],
          currPage:this.state.currPage+1
        },this.changeMovies
      )
    
  }


    async componentDidMount(){
      const res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ca8c06e81eb055c03e4ebfb1d93b5647&language=en-US&page=1`);
      let movieData=res.data
      console.log(movieData);
      console.log('CDM third');

      this.setState({
        movies:[...movieData.results]
      })
    }
    async changeMovies(){
      const res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ca8c06e81eb055c03e4ebfb1d93b5647&language=en-US&page=${this.state.currPage}`);
      let movieData=res.data
      console.log(movieData);
      console.log('CDM third');

      this.setState({
        movies:[...movieData.results]
      })
    }

    handleFavourites=(movieObj)=>{

      let oldData= JSON.parse(localStorage.getItem('movies-app')||'[]')
      
      if(this.state.favourites.includes(movieObj.id))
      {
          oldData=oldData.filter((movie)=>movie.id!=movieObj.id)
      }
      else
      {
        oldData.push(movieObj)
      }
        localStorage.setItem('movies-app',JSON.stringify(oldData))    
        console.log(oldData);
        this.handleFavouriteState()
    }

    handleFavouriteState=()=>{
      let oldData= JSON.parse(localStorage.getItem('movies-app')||'[]')
      let temp= oldData.map((movie)=>(movie.id))

      this.setState({
        favourites:[...temp]
      })
    }

  render() {
    console.log('render 2nd');
    //  let moviesArr= movies.results
    return (
        <>
        <div>
        <h3 className='text-center'><strong>Trending</strong></h3>  
      </div>

      <div className='movies-list'>
          {
              this.state.movies.map((movieElem)=>(
                  
                <div className="card movie-card" onMouseEnter={()=>this.setState({hover:movieElem.id})} onMouseLeave={()=>this.setState({hover:" "})} >
                <img src={`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`} className="card-img-top movie-img  " style={{height:"30vh" , width:"50vh"}} alt="..."/>   
                  <h5 className="card-title movie-title ">{movieElem.title}</h5>
                    {
                      this.state.hover==movieElem.id&&
                      <div className='button-wrapper' style={{display:'flex', justifyContent:'center'}}>
                      <a  className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieElem)}>{this.state.favourites.includes(movieElem.id)?'Remove from Favourites':'Add to Favourites'}</a>
                      
                       </div>
                  
  
                    }
                    </div>
                ))


          }
          <div style={{dispay:'flex',justifyContent:'center'}}>
                        <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item"><a className="page-link" onClick={this.handlePrev} href="#">Previous</a></li>
                  {
                    this.state.parr.map((value)=>(
                      <li className="page-item"><a className="page-link" onClick={()=>this.handlePageClick(value)} href="#">{value}</a></li>
                    ))
                  }


                  <li className="page-item"><a className="page-link" onClick={this.handleNext} href="#">Next</a></li>
                </ul>
              </nav>
          </div>
      </div>
        </>
    )
  }
}


{/* <ul>
{
moviesArr.map((movieElem)=>(
<h1>{movieElem.title}</h1>
))
}
</ul> */}
