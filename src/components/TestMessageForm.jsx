import { useState, useEffect } from 'react'
import { loader } from '../assets'
import { usePostGeneralMutation } from '../services/api'
import Button from '@mui/material/Button'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useSelector } from 'react-redux';
import { selectAuthTokenValue } from '../services/authToken';

const Demo = () => {
  const userToken = useSelector(selectAuthTokenValue)

  const [messageData, setMessageData] = useState({
    token: userToken,
    phone: '',
    messageType: '',
    topic: '',
  })
  const [missingInfo, setMissingInfo] = useState(false)
  const [response, setResponse] = useState("")

  const [postGeneral, { error, isFetching }] = usePostGeneralMutation()

  const handleTestMessageClick = async (e) => {
    e.preventDefault();
    if(messageData.phone.length < 7 || !messageData.messageType || !messageData.topic) {
      setMissingInfo(true)
      return
    }
    console.log(messageData.token)
    setMissingInfo(false)
    try {
      console.log(messageData)
      const resp = await postGeneral({ messageData, endpoint: '/test-message/' })
      setResponse(resp['data']['message'])
    } catch (err) {
      console.log(err)
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
              value={messageData.phone}
              onChange={phone => setMessageData({...messageData, phone})}
          />
        </div>
        <h2 className='font-satoshi font-bold text-gray-600 text-xl mt-5'>
        Enter a topic or field you're interested in
        </h2>
        <form className="relative flex justify-center items-center w-[100%]">
          <input 
            type='text'
            className='url_input peer' 
            placeholder='Weightlifting, Software, Finance, etc.'
            value={messageData.topic}
            onChange={e => setMessageData({...messageData, topic: e.target.value})}
          />
        </form>
        <h2 className='font-satoshi font-bold text-gray-600 text-xl mt-5'>
          Next, choose what type of message you'd like to recieve
        </h2>
        <form className="relative flex justify-center items-center w-[100%]">
          <select 
              value={messageData.messageType}
              onChange={e => setMessageData({...messageData, messageType: e.target.value})}
              required
              className="url_input peer"
          >
              <option value="">Select a message type</option>
              <option value="MQ">Motivational Quote</option>
              <option value="SP">Supportive and Positive</option>
              <option value="FF">Fun Facts</option>
              <option value="MD">Mean and Discouraging</option>
          </select>
      </form>
      <h2 className='font-satoshi font-bold text-gray-600 text-xl mt-5'>
        Now click below to see the magic happen!
      </h2>
        <div className="flex justify-center items-center gap-6 mt-3 max-h-60 overflow-y-auto w-[100%] pb-2">
          {!isFetching ? (
            <Button 
              sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
                borderRadius: '4px',
                padding: '8px 16px',
                transition: 'all 0.2s',
                backgroundColor: '#FFA500',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#FFC500',
                  boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
                }
              }}
              variant="contained"
              onClick={handleTestMessageClick}>
              Try it out!
            </Button>
          ) : (null)}
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
          )
          : (null)
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
