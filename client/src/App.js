import { useState } from 'react'
import './styles/App.css';
import './styles/tailwind.css';
import Home from './pages/Home'
import { Routes, Route, BrowserRouter as Router, Navigate, useLocation } from 'react-router-dom'
import Navigation from './components/shared/Navigation'
import Authenticate from './pages/Authenticate';
import Activate from './pages/Activate';
import Rooms from './pages/Rooms';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader';

function App() {

  const { loading } = useLoadingWithRefresh()

  return loading ? (
    <Loader message="Loading... Please Wait"/>
  ) : (
    <Router>
      <Navigation />
      <Routes>

        <Route path='/' element={
          <GuestRoute>
            <Home />
          </GuestRoute>
        } exact />

        <Route path='/authenticate' element={
          <GuestRoute>
            <Authenticate />
          </GuestRoute>
        } />

        <Route path='/activate' element={
          <SemiProtectedRoute>
            <Activate />
          </SemiProtectedRoute>
        } />

        <Route path='/rooms' element={
          <ProtectedRoute>
            <Rooms />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
}

function GuestRoute({ children }) {

  const { isAuth } = useSelector((state) => state.auth)
  const location = useLocation()

  if (isAuth) {
    return <Navigate to={'/rooms'} state={{ from: location }} />
  }

  return children
}

function SemiProtectedRoute({ children }) {

  const { isAuth, user } = useSelector((state) => state.auth)

  const location = useLocation()

  if (!isAuth) {
    return <Navigate to={'/'} state={{ from: location }} />
  }

  if (isAuth && !user.activated) {
    return children
  }

  return <Navigate to={'/rooms'} state={{ from: location }} />
}

function ProtectedRoute({ children }) {
  const { isAuth, user } = useSelector((state) => state.auth)
  const location = useLocation()

  if (!isAuth) {
    return <Navigate to={'/'} state={{ from: location }} />
  }

  if (isAuth && !user.activated) {
    return <Navigate to={'/activate'} state={{ from: location }} />
  }

  return children
}

export default App;
