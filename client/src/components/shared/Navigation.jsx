import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../store/authSlice'

const Navigation = () => {

  const dispatch = useDispatch()
  const { isAuth, user } = useSelector((state) => state.auth)

  async function logoutUser() {
    try {
      const { data } = await logout()
      dispatch(setAuth(data))
    } catch (error) {
      alert(error.response.data.err)
    }
  }

  return (
    <nav className='container mx-auto flex items-center justify-between py-4 px-2 sm:px-0'>
      <Link to={'/'} className="flex items-center">
        <img src="/images/waving-hand.png" className="h-6 mr-2" />
        <span className='font-bold sm:text-base text-sm'>Codershouse</span>
      </Link>

      {
        isAuth && <div className="flex items-center">
          <span className="font-bold mr-2 sm:text-base hidden sm:inline-block text-xs">{user?.name}</span>
          {
            user.avatar && <Link to={'/'}>
              <img
                src={user.avatar}
                className="sm:h-12 sm:w-12 h-8 w-8 border-2 border-solid border-blue-normal rounded-full"
                alt="avatar" />
            </Link>
          }
          <button className="sm:w-24 w-16 p-2 sm:text-base text-xs sm:ml-6 ml-2 bg-blue-normal rounded-full font-bold" onClick={logoutUser}>Logout</button>
        </div>
      }

    </nav>
  )
}

export default Navigation