import Home from './pages/Home.jsx';
import ForRecruiting from './pages/ForRecruiting.jsx';
import Login from './pages/Login.jsx';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <main>
        <div className="main">
            <div className="gradient"/>
            {/*<h1 className="text-9xl top-96 right-0 fixed text-slate-100">GoodMorningAI</h1>*/}
        </div>
        <div className="app">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recruiting" element={<ForRecruiting />} />
            <Route path="/login" element={<Login />} />
         </Routes>
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