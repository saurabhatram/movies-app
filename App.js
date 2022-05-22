import './App.css';
import Banner from './components/Banner';
import Favourites from './components/Favourites';
import MoviesList from './components/MoviesList';
import NavBar from './components/NavBar';
import {BrowserRouter,Route,Routes} from 'react-router-dom'

function App() {
  return (
    
  <BrowserRouter>
    <NavBar/>
  
    <Routes>
      <Route path='/' element={<><Banner/><MoviesList/></>}/>
  <Route path='favourites' element={<><Favourites/></>}/>
    </Routes>

  </BrowserRouter>

  
  
    
  );
}

export default App;
