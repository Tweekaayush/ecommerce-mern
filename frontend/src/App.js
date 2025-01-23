import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Product from './pages/Product'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/browse' element={<Home/>}/>
        <Route path='/product/:id' element={<Product/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App