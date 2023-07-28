import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { usePostTestMessageMutation } from '../services/api'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Demo = () => {
  const [messageType, setmessageType] = useState("")
  const [topic, setTopic] = useState("")
  const [phone, setPhone] = useState("")
  const [sentConfirmation, setSentConfirmation] = useState(1)
  const [missingInfo, setMissingInfo] = useState(false)
  const [response, setResponse] = useState("")

  const [postTestMessage, { error, isFetching }] = usePostTestMessageMutation()

  const handleTestMessageClick = async (e) => {
    e.preventDefault();
    if(phone.length < 7 || !messageType) {
      setMissingInfo(true)
      return
    }
    setMissingInfo(false)
    try {
      const resp = await postTestMessage({ phone, messageType })
      setSentConfirmation(2)
      console.log(resp)
      setResponse(resp['data']['message'])
      setTimeout(() => setSentConfirmation(1), 2000)
    } catch (err) {
      setSentConfirmation(3)
      // handle error here
    }
  }

  return (
    <div className='flex items-center justify-center'>
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2 items-center">
        <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
          First enter your phone number
        </h2>
        <div className='flex justify-center'>
          <PhoneInput
              country={'us'}
              value={phone}
              onChange={phone => setPhone(phone)}
          />
        </div>
        <h2 className='font-satoshi font-bold text-gray-600 text-xl mt-5'>
        Enter a topic or goal you're interested in
        </h2>
        <form className="relative flex justify-center items-center w-[100%]">
          <input 
            type='text'
            className='url_input peer' 
            placeholder='Weightlifting, Coding, Recruiting, etc.'
            value={topic}
            onChange={e => setTopic(e.target.value)}
          />
        </form>
        <h2 className='font-satoshi font-bold text-gray-600 text-xl mt-5'>
          Next, choose what type of message you'd like to recieve
        </h2>
        <form className="relative flex justify-center items-center w-[100%]">
          <select 
              value={messageType}
              onChange={e => setmessageType(e.target.value)}
              required
              className="url_input peer"
          >
              <option value="">Select a message type</option>
              <option value="MQ">Motivational Quote</option>
              <option value="SP">Supportive and Positive</option>
              <option value="NH">News Headlines</option>
              <option value="FF">Fun Facts</option>
              <option value="MD">Mean and Discouraging</option>
          </select>
      </form>
      <h2 className='font-satoshi font-bold text-gray-600 text-xl mt-5'>
        Now click below to see the magic happen!
      </h2>
        <div className="flex justify-center items-center gap-6 mt-3 max-h-60 overflow-y-auto w-[100%]">
          {!isFetching ? (<button className='border border-orange-400 font-bold text-lg rounded-md py-1 px-8 transition-all
            hover:bg-white hover:text-orange-400 font-inter bg-orange-400 text-white'
            onClick={handleTestMessageClick}>
            Try it out!
          </button>) : (null)}
        </div>
        {missingInfo ? (
          <p className="text-black font-inter mt-3 font-bold text-center">
            <span className='text-red-600 font-extrabold'>! </span> Missing Info <span className='text-red-600 font-extrabold'>!</span><br/>
          </p>
          ) : (null)}
        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain"/>
          ) : error ? (
          <p className="font-inter font-bold text-black text-center">
              Something went wrong :( <br/>
              <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
              </span>
          </p>
          ) : sentConfirmation == 2 ? (
            <p className="font-inter font-bold text-black text-center">
              <span className='green_blue_gradient'>Success!</span> info sent to server <br/>
          </p>
          ) : sentConfirmation == 3 ? (
            <p className="font-inter font-bold text-black text-center">
              Your request failed :( <br/>
          </p>
          ) : (null)
        }
        </div>
          {response != "" ? (
            <p className="font-inter font-bold text-3xl text-black text-center">
              {response}
            </p>
          ) : (null)}
      </div>
    </section>
    </div>
  )
}

export default Demo
