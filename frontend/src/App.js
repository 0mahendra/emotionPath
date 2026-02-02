import react from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import './App.css';
import WaitingPage from './pages/WaitingPage';

const App = () => {
  return (
   <Routes>
    <Route path="/" element ={<LandingPage />}/>
    <Route path= "/waiting" element = {<WaitingPage/>}/>
   </Routes>
  )
}

export default App;
