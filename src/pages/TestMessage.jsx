import TestMessageForm from '../components/TestMessageForm'
import NavBar from '../components/NavBar'
import DashDrawer from '../components/DashDrawer'

const Home = () => {
  return (
    <div>
        <header className="w-full flex justify-center items-center flex-col mt-36">
            <h1 className="font-satoshi text-3xl font-extrabold  ">
                Try Our Amazing Service!
            </h1>
            <h2 className="desc">
                Follow the instructions below to get a taste of what we have to offer!  
            </h2>
        </header>
      <NavBar />
      <DashDrawer />
      <TestMessageForm/>
    </div>
  )
}

export default Home