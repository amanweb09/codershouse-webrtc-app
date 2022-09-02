import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../store/authSlice'

const Navigation = () => {

  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.auth)

  async function logoutUser() {
    try {
      const { data } = await logout()
      dispatch(setAuth(data))
    } catch (error) {
      alert(error.response.data.err)
    }
  }

  return (
    <nav className='container mx-auto flex items-center justify-between py-4 sm:px-0 px-4'>
      <Link to={'/'} className="flex items-center">
        <img src="/images/waving-hand.png" className="h-6 mr-2" />
        <span className='font-bold'>Codershouse</span>
      </Link>

      {
        isAuth && <button className="w-24 p-2 bg-blue-normal rounded-full font-bold" onClick={logoutUser}>Logout</button>
      }
    </nav>
  )
}

export default Navigation