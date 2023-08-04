import { useSignIn } from 'react-auth-kit'
import { useState } from 'react'
import { usePostAuthCheckMutation } from '../services/auth'
import { Link, useNavigate } from 'react-router-dom'

import React from 'react'
import { set } from 'mongoose'

const SignUpForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({email: '', password: '', firstName: '', lastName: ''})
    const [checkData, setCheckData] = useState({emailcheck: '', passwordcheck: ''})
    const [missingInfo, setMissingInfo] = useState(false)
    const [passwordDontMatch, setPasswordDontMatch] = useState(false)
    const [emailDontMatch, setEmailDontMatch] = useState(false)
    const [success, setSuccess] = useState(false)
    const [alreadyExists, setAlreadyExists] = useState(false)

    const [postAuthCheck, { error, isLoading }] = usePostAuthCheckMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(formData.email.length < 7 || !formData.password || !formData.firstName || !formData.lastName) {
            setMissingInfo(true)
            return
        }
        setMissingInfo(false)

        if(formData.email !== checkData.emailcheck) {
            setEmailDontMatch(true)
            return
        }
        setEmailDontMatch(false)

        if(formData.password !== checkData.passwordcheck) {
            setPasswordDontMatch(true)
            return
        }
        setPasswordDontMatch(false)

        const resp = await postAuthCheck({formData, endpoint: '/signup/'})
        console.log("Response: ", resp)
        console.log("Error: ", error)
        if(resp['data']['status'] == 'success') {
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                navigate('/login')
            }
            , 2000)

        } else if (resp['data']['status'] == 'preexisting') {
            setAlreadyExists(true)
        }
    }

    return (
      <>
        <div className="lg:h-2/3 md:h-2/3 sm:h-3/4 h-full flex flex-col w-full justify-center items-center bg-amber-200 rounded-lg px-10">
            { success ?
                <div className='flex flex-col items-center'> 
                    <h1 className='pt-10 font-satoshi font-extrabold text-3xl pb-7'>
                        🎉Success🎉 <br/> 
                    </h1>
                    <h1 className='pt-3 font-satoshi font-extrabold text-lg pb-7'>
                        Redirecting to login page...
                    </h1>
                </div>
                : 
            <div className='flex flex-col items-center'>
                <h1 className='pt-10 font-satoshi font-extrabold text-xl pb-7'>
                    Welcome!
                </h1>
                <div className='pb-4 w-full'>
                    <form className="relative flex-col justify-center items-center w-full">
                        <input 
                            type='text'
                            className='w-full rounded-md mb-4 bg-amber-100 py-2.5 pl-3 pr-12 text-sm font-satoshi focus:outline-none font-medium focus:bg-amber-50' 
                            placeholder='First Name'
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        />
                        <input 
                            type='text'
                            className='w-full rounded-md mb-6 bg-amber-100 py-2.5 pl-3 pr-12 text-sm font-satoshi focus:outline-none font-medium focus:bg-amber-50' 
                            placeholder='Last Name'
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        />
                        <input 
                            type='text'
                            className='w-full rounded-md mb-4 bg-amber-100 py-2.5 pl-3 pr-12 text-sm font-satoshi focus:outline-none font-medium focus:bg-amber-50' 
                            placeholder='Email'
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        <input 
                            type='text'
                            className='w-full rounded-md mb-6 bg-amber-100 py-2.5 pl-3 pr-12 text-sm font-satoshi focus:outline-none font-medium focus:bg-amber-50' 
                            placeholder='Confirm Email'
                            value={checkData.emailcheck}
                            onChange={(e) => setCheckData({...checkData, emailcheck: e.target.value})}
                        />
                        <input 
                            type='password'
                            className='w-full rounded-md mb-4 bg-amber-100 py-2.5 pl-3 pr-12 text-sm font-satoshi focus:outline-none font-medium focus:bg-amber-50' 
                            placeholder='Password'
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                        <input 
                            type='password'
                            className='w-full rounded-md bg-amber-100 py-2.5 pl-3 pr-12 text-sm font-satoshi focus:outline-none font-medium focus:bg-amber-50' 
                            placeholder='Confirm Password'
                            value={checkData.passwordcheck}
                            onChange={(e) => setCheckData({...checkData, passwordcheck: e.target.value})}
                        />
                    </form>
                </div>
                <div className='pb-5 pt-5'>
                    {isLoading ? 
                    <p className='text-gray-700 text-lg font-bold pt-2 pb-10'>Loading...</p>
                    : (
                    <button
                        type="button" 
                        onClick={(e) => handleSubmit(e)} 
                        className="rounded-md font-satoshi bg-amber-300 py-1.5 px-9 text-xl font-bold 
                        transition-all hover:bg-amber-100 hover:px-12 "
                    >
                        Sign Up!
                    </button>)}
                </div>
                <div className='justify-center flex align-center'>
                    <Link className='font-satoshi font-bold text-gray-600 text-sm hover:text-gray-500 hover:underline' to='/login'>
                        Already have an account?
                    </Link>
                </div>
                <div>
                    {missingInfo ? 
                        <p className='text-red-500 text-sm pt-2'>
                            Please enter a valid email and password
                        </p> 
                        : null
                    }
                </div>
                <div>
                    {emailDontMatch ? 
                        <p className='text-red-500 text-sm pt-2'>
                            Make sure your emails match
                        </p> 
                        : null
                    }
                </div>
                <div>
                    {passwordDontMatch ? 
                        <p className='text-red-500 text-sm pt-2 pb-4'>
                            Make sure your passwords match
                        </p> 
                        : <div className='pb-5'/>
                    }
                </div>
                <div>
                    {alreadyExists ? 
                        <p className='text-red-500 text-sm pt-2 pb-4'>
                            User with that email already exists
                        </p> 
                        : <div className='pb-5'/>
                    }
                </div>
                <div>
                    {error ? 
                        <p className='text-red-500 text-sm pt-2 pb-4'>
                            {error.message}
                        </p> 
                        : <div className='pb-5'/>
                    }
                </div>
            </div>}
        </div>
      </>
    )
}

export default SignUpForm
