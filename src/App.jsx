import Home from './pages/Home.jsx';
import ForRecruiting from './pages/ForRecruiting.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TestMessage from './pages/TestMessage.jsx';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <main>
        <div className="main">
            <div className="gradient"/>
        </div>
        <div className="app">
          <AuthProvider authType = {'cookie'}
                    authName={'_auth'}
                    cookieDomain={window.location.hostname}
                    cookieSecure={window.location.protocol === "https:"}>
              <Routes>
                  <Route path="//*" element={<Home />} />
                  <Route path="/recruiting" element={<ForRecruiting />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/user//*" element={
                    <RequireAuth loginPath='/login'>
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/testmsg" element={<TestMessage />} />
                      </Routes>
                    </RequireAuth>
                  } />
              </Routes>
          </AuthProvider>
         </div>
    </main>
  )
}

export default App


{/*<nav className="flex items-center justify-between w-full px-10">
            <div></div>
            <button 
              type="button" 
              onClick={()=> window.open('https://github.com/henryhoule17/NewsPulse')} 
              className="black_btn"
            >
              GitHub
            </button>
          </nav>*/}