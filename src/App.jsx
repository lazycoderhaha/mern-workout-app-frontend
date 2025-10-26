import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages and Components
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import WorkoutDetail from './components/WorkoutDetail.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { useUserContext } from './hooks/useUserContext.jsx';

const App = () => {
  const { user } = useUserContext();
  return (
    <Router>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/workouts/:id' element={user ? <WorkoutDetail /> : <Navigate to='/login' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App