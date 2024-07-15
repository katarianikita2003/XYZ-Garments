import React, { useState } from 'react'
import logo from "../assest/logo.png"
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logOutRedux } from '../redux/userSlice'
import { toast } from 'react-hot-toast'

const Header = () => {
  const [showServices, setShowServices] = useState(false)
  const userData = useSelector((state) => state.user)
  console.log(userData.email)
  const dispatch = useDispatch()

  const handleShowServices = () => {
    setShowServices(preve => !preve)
  }
  const handleLogOut = () => {
    dispatch(logOutRedux())
    toast("Log Out Successful")
  }
  console.log(process.env.REACT_APP_ADMIN_EMAIL)
  return (
    <header className='fixed z-50 w-full h-16 px-2 bg-white shadow-md md:px-4'>
      {/* desktop  */}
      <div className='flex items-center justify-between h-full'>
        <Link to={""}>
          <div className='h-14'>
            <img src={logo} className='h-full' />
          </div>
        </Link>

        <div className='flex items-center gap-4 md:gap-7'>
          <nav className='flex gap-4 text-base md:gap-6 md:text-lg'>
            <Link to={""}>Home</Link>
            <Link to={"services"}>Services</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className='relative text-2xl text-slate-600'>
            <FaShoppingCart />
            <div className='absolute w-4 h-4 p-0 m-0 text-sm text-center text-white bg-red-500 rounded-full -top-2 -right-1'>0</div>
          </div>
          <div className='text-slate-600' onClick={handleShowServices}>
            <div className='w-8 h-8 overflow-hidden text-3xl rounded-full cursor-pointer drop-shadow'>
              {userData.image ? (
                <img src={userData.image} className="w-full h-full" />
              ) : (
                <FaUserCircle />
              )}
            </div>
            {
              showServices && <div className='absolute flex flex-col py-2 bg-white shadow right-2 drop-shadow-md'>
                {
                  userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={"newProduct"} className='px-2 cursor-pointer whitespace-nowrap'>New Product</Link>
                }

                {
                  userData.image ? <p className='px-2 text-white bg-blue-600 cursor-pointe' onClick={handleLogOut}>LogOut ({userData.firstName})</p> : <Link to={"login"} className='px-2 cursor-pointer whitespace-nowrap'>Login</Link>
                }
              </div>
            }
          </div>
        </div>

      </div>

      {/* Mobile */}
    </header>
  )
}

export default Header
