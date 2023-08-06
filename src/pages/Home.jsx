import HomeHero from '../components/HomeHero'
import NavBar from '../components/NavBar'
import DashDrawer from '../components/DashDrawer'
import { useAuthUser } from 'react-auth-kit'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const auth = useAuthUser()
  const navigate = useNavigate()
  
  useEffect(() => {
    if(auth())
      navigate('/user/')
  }, [])

  return (
    <div>
      <NavBar />
      <DashDrawer />
      <HomeHero/>
    </div>
  )
}

export default Home
