import { useSignOut, useAuthUser } from "react-auth-kit"
import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import DashDrawer from "../components/DashDrawer"


const Dashboard = () => {
    const signOut = useSignOut()
    const navigate = useNavigate()
    const auth = useAuthUser()

  return (
    <div>
        <NavBar />
        <DashDrawer />
        <div className="flex-col justify-center items-center mt-20">
            <br/>This is the Dashboard <br/> Hello {auth().fname}!
        </div>
    </div>
  )
}

export default Dashboard
