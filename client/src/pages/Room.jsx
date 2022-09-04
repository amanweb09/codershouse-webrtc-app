import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useWebRTC } from '../hooks/useWebRTC'
import { useSelector } from 'react-redux'
import { getRoom } from '../api'
import Loader from '../components/shared/Loader'

const Room = () => {

  const navigate = useNavigate()

  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)

  const { id: roomId } = useParams()
  const { user } = useSelector((state) => state.auth)

  const { clients, provideRef } = useWebRTC(roomId, user)
  const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5500'

  function handleManualLeave() {
    navigate('/rooms')
  }

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getRoom(roomId)
        setRoom(data.room)
        setLoading(false)

      } catch (error) {
        setLoading(false)
        alert(error.response.data.err)
      }
    }

    )()
  }, [roomId])
if(loading) {
  return <Loader message={"Setting up your room..."}/>
}
  return (
    <div>
      <div className='container mx-auto'>
        <button onClick={handleManualLeave} className="font-bold">
          <span className="mr-4">&larr;</span>
          <span className="text-sm">All voice rooms</span>
        </button>
      </div>

      <div className="bg-card mt-10 p-4">
        <div className="flex items-center justify-between w-full px-6">
          <h2 className="font-bold text-lg capitalize">{room.topic}</h2>
          <div className="flex-center">
            <button style={{ background: '#262626' }} className="rounded-lg flex-center mx-6 p-2 font-semibold">
              <img
                src="/images/waving-hand.png"
                alt="wave"
                className="w-6 h-6" />
            </button>
            <button
              onClick={handleManualLeave}
              style={{ background: '#262626' }}
              className="rounded-lg mx-6 p-2 font-semibold">Leave Quietly</button>
          </div>
        </div>
        <div className='w-full flex items-center wrap gap-10 mt-6 px-6'>
          {
            clients.length && clients.map((client) => {

              return <div className="flex-center flex-col user_duplicate">
                <div className="bg-pink-200 border-2 border-solid border-purple-600 w-20 h-20 relative rounded-full" key={client._id}>
                  <audio
                    autoPlay
                    ref={(instance) => { provideRef(instance, client._id) }}></audio>
                  <img src={client.avatar} alt="avatar" className="w-full h-full rounded-full" />
                  <div className="w-4 h-4 absolute right-0 bottom-0 bg-red-500 rounded-full"></div>
                </div>
                <h1 className="font-bold mt-2">{client.name}</h1>
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Room