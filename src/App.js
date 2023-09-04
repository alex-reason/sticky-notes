import { useAuthContext } from "./hooks/useAuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Create, Login, Project, Dashboard, Signup } from "./pages";
import UsersList from "./components/UsersList";
import Navbar from "./components/Navbar";
import './app.scss';
import Sidebar from "./components/Sidebar";


const App = () => {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className='app'>
      {authIsReady &&
        <BrowserRouter>
          <Sidebar />
          <div className='app__container'>
            <Navbar />
            <Routes>
              <Route path='/'
                element={user ? <Dashboard /> : (<Navigate to='/login' />)}
              />
              <Route path='/create'
                element={user ? <Create /> : (<Navigate to='/login' />)}
              />
              <Route path='/projects/:id'
                element={user ? <Project /> : (<Navigate to='/login' />)}
              />
              <Route path='/login'
                element={authIsReady && user ? (<Navigate to='/' />) :
                  <Login />}
              />
              <Route path='/signup'
                element={authIsReady && user ? (<Navigate to='/' />) :
                  <Signup />}
              />
            </Routes>
          </div>
          {user && <UsersList />}
        </BrowserRouter>
      }
    </div>
  )
}

export default App