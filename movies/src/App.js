import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function MovieList() {
  const [movies, setMovies] = useState([]) 
  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/now_playing?api_key=5ee865e4804812cbe283f1f53ea94ba6&append_to_response=videos')
      .then(response => {
        setMovies(response.data.results)
      })
  }, [])
 
  if (movies.length === 0) {
    return(
      <div style={{flex: 1, padding: 20}}>
        <p>Loading, please wait...</p>
      </div>
    )
  } else {
      const movieItems = movies.map((movie,index) =>
        <MovieListItem key={index} movie={movie}/>
      );
  
    return(
      <div style={{flex: 1, padding: 20}}>
        {movieItems}
      </div>
    )
  }
}

function MovieListItem(props) {
  const [movie, setMovie] = useState([])
  const[videoPressed,SetVideoPressed]= useState()
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
 
useEffect(() => {
  axios
    .get('https://api.themoviedb.org/3/movie/'+props.movie.id+'?api_key=api_key_here&append_to_response=videos')
    .then(response => {
      setMovie(response.data)
    })
}, [])

let IMAGEPATH = 'http://image.tmdb.org/t/p/w500'
let imageurl = IMAGEPATH + props.movie.poster_path;

// get genres
var genres = "";  
if (movie !== undefined && movie.genres !== undefined) {
  for (var i=0;i<movie.genres.length;i++) {
    genres += movie.genres[i].name+" ";
  }
}

// get first youtube video
var video = "";
if (movie !== undefined && movie.videos !== undefined && movie.videos.results !== undefined) {
  video = <span style={{color:'blue', cursor:'pointer'}} onClick={() => videoPressed(movie.videos.results[0].key)}>{movie.videos.results[0].name}</span>
} 

  return(
    <div className="Movie">
      <img src={imageurl}/>
      <p className="MovieTitle">{props.movie.original_title} : {props.movie.release_date}</p>
      <p className="MovieText">{props.movie.overview}</p>
      <span className="GenresText">Genres: {genres}</span><br/>
      <span className="VideosText">Video: {video}</span>
    </div>
  )
}


function App() {
  return (
    <div className="App">
     
     <MovieList/>
    </div>
  );
}

export default App;
