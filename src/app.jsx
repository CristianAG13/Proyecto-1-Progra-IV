import './App.css'
import { AuthContext } from './Context/AuthContext'
import { useContext } from 'react'
import Login from './components/Login' 
import SideBar from './Area_administrativa/Components/SideBar'

function App() {
  const { isAuthenticated } = useContext(AuthContext) 

  return (
    <>
      {isAuthenticated ? <SideBar /> : <Login />}
    </>
  )
}

export default App