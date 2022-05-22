import React, { Component } from 'react'
import  axios  from 'axios'
export default class Banner extends Component {
  constructor()
  {
    super();
    this.state={
      bannerimg:""
    }
    
  }
  async componentDidMount(){
    const res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ca8c06e81eb055c03e4ebfb1d93b5647&language=en-US&page=1`);
let ans=res
    let bimg=res.results[5].backdrop_path
    console.log(ans);
    console.log('backdroppath = ',bimg);
    this.setState({
      bannerimg:bimg
    })
  }
  render() {



    return (
        //
        <div className="card banner-card" >
        <img src="https://springboard-cdn.appadvice.com/wp-content/appadvice-v2-media/2016/11/Netflix-background_860c8ece6b34fb4f43af02255ca8f225-xl.jpg" className="card-img-top banner-img" alt="..."/>
        
          {/* <h5 className="card-title banner-title">Movies</h5>
          <p className="card-text banner-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
           
        
      </div>
      

    )
  }
}

