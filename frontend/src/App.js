import react from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import './App.css';
import WaitingPage from './pages/WaitingPage';
import GuestPage from './pages/GuestPage';
import GuestChat from './pages/GuestChat';

const App = () => {
  return (
   <Routes>
    <Route path="/" element ={<LandingPage />}/>
    <Route path= "/waiting" element = {<WaitingPage/>}/>
    <Route path= "/Guest" element = {<GuestPage/>}/>
    <Route path= "/GuestChat" element = {<GuestChat/>}/>
   </Routes>
  )
}

export default App;
