import { useSignIn } from 'react-auth-kit'
import { useState } from 'react'
import { usePostAuthCheckMutation } from '../services/auth'
import { Link, useNavigate } from 'react-router-dom'

import React from 'react'
import { set } from 'mongoose'

const LogInForm = () => {
    const navigate = useNavigate()
    const signIn = useSignIn()
    const [formData, setFormData] = useState({email: '', password: ''})
    const [missingInfo, setMissingInfo] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const [postAuthCheck, { error, isLoading, isSuccess }] = usePostAuthCheckMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(formData.email.length < 7 || !formData.password) {
            setMissingInfo(true)
            return
        }
        setMissingInfo(false)
        console.log(formData)
        
        const resp = await postAuthCheck({formData, endpoint: '/auth/'})
        if(!resp?.error?.data?.error) {
            
            signIn(
                {
                    token: resp.data.token,
                    expiresIn:resp.data.expiresIn,
                    tokenType: "Bearer",
                    authState: resp.data.authUserState,
                    refreshToken: resp.data.refreshToken,                    // Only if you are using refreshToken feature
                    refreshTokenExpireIn: resp.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
                }
            )
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                navigate('/dashboard')
            }, 1000)
        } else {
            setErrorMsg(resp.error.data.error)
        }
    }

    return (
      <div>
        <div className="lg:h-2/3 md:h-2/3 sm:h-3/4 h-full flex flex-col w-full justify-center items-center bg-amber-200 rounded-lg px-10">
            {success ? 
                <div className='flex flex-col items-center'> 
                    <h1 className='pt-10 font-satoshi font-extrabold text-3xl pb-7'>
                        🎉Success🎉 <br/> 
                    </h1>
                    <h1 className='pt-3 font-satoshi font-extrabold text-lg pb-7'>
                        We're getting you in there...
                    </h1>
                </div>
                :
            <div className='flex flex-col items-center'>
                <h1 className='pt-10 font-satoshi font-extrabold text-xl pb-7'>
                    Welcome Back!
                </h1>
                <div className='pb-4 w-full'>
                    <form className="relative flex-col justify-center items-center w-full">
                        <input 
                            type='text'
                            id='username'
                            className='w-full rounded-md mb-4 bg-amber-100 py-2.5 pl-3 pr-12 text-sm font-satoshi focus:outline-none font-medium focus:bg-amber-50' 
                            placeholder='Email'
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        <input 
                            type='password'
                            id='password'
                            className='w-full rounded-md bg-amber-100 py-2.5 pl-3 pr-12 text-sm font-satoshi focus:outline-none font-medium focus:bg-amber-50' 
                            placeholder='Password'
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </form>
                </div>
                <div className='pb-5 pt-5'>
                    <button
                        type="button" 
                        onClick={(e) => handleSubmit(e)} 
                        className="rounded-md font-satoshi bg-amber-300 py-1.5 px-9 text-xl font-bold 
                        transition-all hover:bg-amber-100 hover:px-12 "
                    >
                        Log In
                    </button>
                    {/*error && <p className='text-red-500 text-sm pt-2 pb-10'>{error.message}</p>*/}
                </div>
                <div className='justify-center flex align-center'>
                    <Link className='font-satoshi font-bold text-gray-600 text-sm hover:text-gray-500 hover:underline' to='/signup'>
                        Sign Up?
                    </Link>
                    <span className='font-satoshi font-bold text-gray-600 text-sm '> &nbsp;|&nbsp; </span>
                    <Link className='font-satoshi font-bold text-gray-600 text-sm hover:text-gray-500 hover:underline' to='/forgot-password'>
                        Forgot Password?
                    </Link>
                </div>
                <div>
                    {missingInfo ? 
                        <p className='text-red-500 text-sm pt-2 pb-4'>
                            Please enter a valid email and password
                        </p> 
                        : <div className='pb-5'></div>
                    }
                </div>
                <div>
                    {errorMsg != "" ? 
                        <p className='text-red-500 text-sm pt-2 pb-4'>
                            {errorMsg}
                        </p> 
                        : <div className='pb-5'></div>
                    }
                </div>
            </div>
            }
        </div>
      </div>
    )
}

export default LogInForm
