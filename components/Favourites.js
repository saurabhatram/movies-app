import React, { Component } from 'react'
import { movies } from '../MoviesData'
export class Favourites extends Component {
  constructor() {
    super()
    this.state = {
      genres: [],
      currGenre: "All Genres",
      movies: [],
      currText:'',
      limit:5,
      currPage:1
    }

  }
  componentDidMount() {
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
    let data = JSON.parse(localStorage.getItem('movies-app') || '[]')
    let temparr = []

    data.map((movieObj) => {
      if (!temparr.includes(genreids[movieObj.genre_ids[0]])) {
        temparr.push(genreids[movieObj.genre_ids[0]])
      }




    })
    temparr.unshift('All Genres')
    this.setState(
      {
        movies: [...data],
        genres: [...temparr]
      }
    )
  }
  handleGenreChange=(genre)=>{
    this.setState({
      currGenre: genre
    })
    }

  sortPopulartiyDesc=()=>{
    let temp= this.state.movies
    temp.sort(function(objA,objB){
      return objB.popularity-objA.popularity
    
    })
    this.setState({
      movies:[...temp]
    })
  }
  sortPopulartiyAsc=()=>{
    let temp= this.state.movies
    temp.sort(function(objA,objB){
      return objA.popularity-objB.popularity
    })

    this.setState({
      movies:[...temp]
    })
  }
  sortRatingsDesc=()=>{
    let temp= this.state.movies
    temp.sort(function(objA,objB){
      return objB.vote_average-objA.vote_average
    
    })
    this.setState({
      movies:[...temp]
    })
  }
  sortRatingsAsc=()=>{
    let temp= this.state.movies
    temp.sort(function(objA,objB){
      return objA.vote_average-objB.vote_average
    })

    this.setState({
      movies:[...temp]
    })
  }
  handlePageChange=(page)=>{
    this.setState({
      currPage:page
    })
  }
handleDelete=(id)=>{
  let narr=[]
  narr= this.state.movies.filter((movieObj)=>movieObj.id!=id)
  this.setState({
    movies:[...narr]
  })
  localStorage.setItem("movies-app",JSON.stringify(narr))
}
  render() {


    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

    let imgsrc = 'https://image.tmdb.org/t/p/w220_and_h330_face/'


    let filterArr=[]
    
    if(this.state.currText==='')
    {
      filterArr=this.state.movies
    }
    else
    {
      filterArr=this.state.movies.filter((movieObj)=>{
        let title=movieObj.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase().trim())

      })
    }
    

     if(this.state.currGenre!='All Genres')
    {
      filterArr=this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currGenre)
    }

    let pages= Math.ceil(filterArr.length/this.state.limit)
    let pagesarr=[]
    for (let i = 1; i <=pages; i++) {
      pagesarr.push(i);
    }
    let si=(this.state.currPage-1)*this.state.limit
    let ei= si+this.state.limit;
    filterArr= filterArr.slice(si,ei)
    return (
      <div className='main'>
        <div className='row'>
          <div className='col-3 '>
            <ul class="list-group genre-selector">

              {this.state.genres.map((genre) => (

                (genre == this.state.currGenre) ? <li style={{ background: "darkblue", color: "white", fontWeight: 'bold' }} class='list-group-item' >{genre}</li> :
                  <li class='list-group-item' onClick={()=>this.handleGenreChange(genre)} style={{ color: 'darkblue' }}>{genre}</li>)

              )
              }
            </ul>
          </div>

          <div className='col-9 favourites-table'>
            <div className='row'>
              <input type='text' placeholder='Search' className="input-group-text col" value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}/>
              <input type='number' className="input-group-number col" value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})} />

            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope='col' />
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopulartiyDesc}></i>Popularity<i class="fa-solid fa-sort-down" onClick={this.sortPopulartiyAsc} ></i></th>
                  <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingsDesc}></i>Ratings<i class="fa-solid fa-sort-down" onClick={this.sortRatingsAsc}></i></th>

                </tr>
              </thead>
              <tbody> 
                {
                  filterArr.map((MovieEle) => (
                    <tr>
                      <td><img src={`https://image.tmdb.org/t/p/original/${MovieEle.backdrop_path}`} className="favTableImage" /> </td>
                      <th scope="row">{MovieEle.title}</th>
                      <td>{genreids[MovieEle.genre_ids[0]]}</td>
                      <td>{MovieEle.popularity}</td>
                      <td>{MovieEle.vote_average}</td>
                      <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(MovieEle.id)}>Delete</button></td>
                    </tr>

                  ))
                }
              </tbody>
            </table>
            <div>
              <div>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    {
                      pagesarr.map((page)=>(
                        <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                      )

                      )
                    }

                  </ul>
                </nav>
              </div>
            </div>
          </div>

        </div>

      </div>
    )
  }
}

export default Favourites