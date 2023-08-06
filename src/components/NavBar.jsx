import {logo} from '../assets'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuthUser } from "react-auth-kit"
import ProfileAvatar from './ProfileAvatar'
import  IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useDispatch } from 'react-redux'
import { toggleDrawer } from '../services/drawerState'
import { useSelector } from 'react-redux';
import { selectDrawerOpen } from '../services/drawerState';



const NavBar = () => {
    const drawerOpen = useSelector(selectDrawerOpen)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = useAuthUser()
    const location = useLocation()
    const [isAuth, setIsAuth] = useState(auth() ? true : false)

    useEffect(() => {
        if(!auth())
            setIsAuth(false)
        else
            setIsAuth(true)
    }, [])

  return (
    <div style={{zIndex: 1300, position: 'relative'}}>
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between w-full lg:mb-7 lg:pt-3 pt-0 mb-2 bg-white shadow-md px-10 lg:py-3 py-1">
        <div className="flex justify-between items-center max-h-full">
            {isAuth ? 
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => dispatch(toggleDrawer())}
                    edge="start"
                    sx={{ mr: 2, }}
                >
                    {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon/>}
                </IconButton>
            : null
            }
            <button onClick={() => navigate('/')}>
                <div className='flex'>
                    <img src={logo} alt="NewsPulse_logo" className="w-11 object-contain" />
                    <h1 className="font-satoshi font-extrabold text-4xl text-black pr-20">
                        GoodMorningAI
                    </h1>
                </div>
            </button>
            {isAuth ? null :
                <>
                    <button 
                        className={`max-h-full font-satoshi ${location.pathname == '/' ? 'text-amber-400' : 'text-black'} rounded-md font-bold px-6 text-xl hover:text-amber-400`}
                    onClick={ isAuth ? () => navigate('/user/') : () => navigate('/')}
                    >
                        Home
                    </button>
                    <button 
                        className={`max-h-full font-satoshi ${location.pathname == '/recruiting' ? 'text-amber-400' : 'text-black'} rounded-md font-bold px-6 text-xl hover:text-amber-400`}
                        onClick={() => navigate('/recruiting')}
                    >
                        For Recruiting
                    </button>
                </>
            }
        </div>
        <div>
            {!isAuth ?
            <>
                <button 
                className='px-3 font-satoshi hover:text-amber-500 hover:underline'
                onClick={() => navigate('/login')}
                >
                    Log In
                </button>
                <button
                type="button" 
                onClick={() => navigate('/signup')} 
                className="rounded-md font-satoshi bg-amber-300 py-1.5 px-9 text-xl font-bold 
                transition-all hover:bg-amber-200 hover:text-amber-500 hover:px-12 "
                >
                    Get Started!
                </button>
            </>
            :
            <>
                <ProfileAvatar />
            </>
            }
        </div>
      </nav>
    </div>
  )
}

export default NavBar
