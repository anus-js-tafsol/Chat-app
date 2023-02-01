import './App.css';
import { Routes, Route } from 'react-router-dom';
//Pages
import Login from './pages/login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
//Components
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import Chat from './pages/Chat/Chat'

// socket
import io from "socket.io-client";
const socket = io.connect("https://react-jobster-backend.herokuapp.com");

function App() {
  // var isUserThere = undefined
  const isUserThere = useSelector((state)=>{return state.authReducer.authentication.token})?true:false
  return (
    <>
      <Navigation />
      <Routes>
        <Route element={ <ProtectedRoute user={isUserThere} redirectTo="login"/> }>
          <Route path='dashboard' element={ <Dashboard /> }/>
        </Route>
        <Route element={ <ProtectedRoute user={isUserThere} redirectTo="login"/> }>
          <Route path='chat' element={ <Chat socket={socket}/> }/>
        </Route>
        {/* <Route path='/' element={ <Dashboard /> }/> */}
        {/* <Route path='/dashboard' element={  }/> */}
        <Route path='/' element={ <Home/> }/>
        <Route element={ <ProtectedRoute user={!isUserThere} redirectTo="/"/> }>
          <Route path='login' element={ <Login /> }/>
        </Route>

        <Route path="*" element={ <NotFound/> }/>
      </Routes>
    </>
  );
}

export default App;
