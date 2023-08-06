import LogInForm from "../components/LogInForm"
import { logo, arrow } from '../assets'
import { useNavigate } from 'react-router-dom'
import { useAuthUser } from "react-auth-kit"
import { useEffect } from "react"

const Login = () => {
    const navigate = useNavigate()
    const auth = useAuthUser()
    
    useEffect(() => {
        if(auth())
            navigate('/user/')
    }, [])

  return (
    <div className="w-full max-w-sm items-center justify-center">
        <button onClick={() => navigate('/')} className='fixed top-6 left-10 hover:left-7 transition-all'>
            <img src={arrow} alt="arrow" className="w-6 object-contain" />
        </button>
        <div className='flex justify-center pt-5 pl-16'>
            <img src={logo} alt="GMAI_logo" className="w-11 object-contain" />
            <h1 className="font-satoshi pt-1 font-extrabold text-4xl text-black pr-20">
                GoodMorningAI
            </h1>
        </div>
        <div className="pb-40"></div>
        <LogInForm />
    </div>
  )
}

export default Login
