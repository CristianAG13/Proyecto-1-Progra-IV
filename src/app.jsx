import './App.css'
import { AuthContext } from './Context/AuthContext'
import { useContext } from 'react'
import Login from './components/Login' // Import Login component
import SideBar from './Area_administrativa/Components/SideBar'

function App() {
  const { inventario } = useContext(AuthContext) // Fixed typo in variable name

  return (
    <>
      {inventario ? <SideBar /> : <Login />}
    </>
  )
}

export default App