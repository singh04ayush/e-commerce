import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/collection' element={ <Collection /> } />
        <Route path='/about' element={ <About /> } />
        <Route path='/contact' element={ <Contact /> } />
        <Route path='/product/:productId' element={ <Product /> } />
        <Route path='/cart' element={ <Cart /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/place-order' element={ <PlaceOrder /> } />
        <Route path='/orders' element={ <Orders /> } />
        <Route path='/profile' element={ <Profile /> } />
      </Routes>
      <Footer />
      
    </div>
  )
}

export default App