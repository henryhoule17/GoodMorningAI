import {logo} from '../assets'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const NavBar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [openPage, setOpenPage] = useState('home')

    useEffect(() => {
        console.log(openPage)
    }, [openPage])

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between w-full mb-7 pt-3 bg-white shadow-md px-10 py-3">
        <div className="flex justify-between items-center max-h-full">
            <img src={logo} alt="NewsPulse_logo" className="w-11 object-contain" />
            <h1 className="font-satoshi font-extrabold text-4xl text-black pr-20">
                GoodMorningAI
            </h1>
            <button 
                className={`max-h-full font-satoshi ${location.pathname == '/' ? 'text-amber-400' : 'text-black'} rounded-md font-bold px-6 text-xl hover:text-amber-400`}
            onClick={location.pathname != '/'? () => navigate('/') : null}
            >
                Home
            </button>
            <button 
                className={`max-h-full font-satoshi ${location.pathname == '/recruiting' ? 'text-amber-400' : 'text-black'} rounded-md font-bold px-6 text-xl hover:text-amber-400`}
                onClick={location.pathname != '/recruiting'? () => navigate('recruiting') : null}
            >
                For Recruiting
            </button>
        </div>
        <div>
            <button 
                className='px-3 font-satoshi hover:text-amber-500 hover:underline'
                onClick={location.pathname != '/login'? () => navigate('login') : null}
            >
                Log In
            </button>
            <button
                type="button" 
                onClick={() => console.log("Sign Up!")} 
                className="rounded-md font-satoshi bg-amber-300 py-1.5 px-9 text-xl font-bold 
                transition-all hover:bg-amber-200 hover:text-amber-500 hover:px-12 "
            >
                Sign Up!
            </button>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
