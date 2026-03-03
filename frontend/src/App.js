import react from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import './App.css';
import WaitingPage from './pages/WaitingPage';
import GuestPage from './pages/GuestPage';
import GuestChat from './pages/GuestChat';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/ProtectedRoutes';
import CounsellorDashboard from './pages/CounsellorDashboard';
import CounselorChatPage from './pages/CounselorChatPage';

const App = () => {
  return (
   <Routes>
    <Route path="/" element ={<LandingPage />}/>
    <Route path= "/waiting" element = {<WaitingPage/>}/>
    <Route path= "/Guest" element = {<GuestPage/>}/>
    <Route path= "/GuestChat" element = {<GuestChat/>}/>
    <Route path= "/Auth" element = {<AuthPage/>}/>
    <Route path="/counsellor/dashboard" element={
           <ProtectedRoute allowedRole="counselor">
            <CounsellorDashboard />
           </ProtectedRoute>}/>
    <Route path="/admin/dashboard" element={
         <ProtectedRoute allowedRole="admin">
           {/* <AdminDashboard /> */}
         </ProtectedRoute>}/>

    <Route path = "/counsellor/chat" element={
      <ProtectedRoute allowedRole="counselor">
        <CounselorChatPage />
      </ProtectedRoute>
    }/>    
   </Routes>
  )
}

export default App;
