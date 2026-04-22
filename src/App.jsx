import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
      <div className='max-w-7xl mx-auto'>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
