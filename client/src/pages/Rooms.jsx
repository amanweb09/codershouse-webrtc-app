import React, { useEffect, useState } from 'react'
import AddRoomModal from '../components/rooms/AddRoomModal'
import RoomCard from '../components/rooms/RoomCard'
import { getAllRooms } from '../api'

// const rooms = [
//   {
//     id: 1,
//     topic: 'guddu pandit vs munna tripathi',
//     speakers: [
//       {
//         id: 1,
//         name: "golu gupta",
//         avatar: "/images/avatar.png"
//       },
//       {
//         id: 2,
//         name: "sweety gupta",
//         avatar: "/images/avatar.png"
//       }
//     ],
//     totalPeople: 2
//   },
//   {
//     id: 2,
//     topic: 'When will mismatched 2 come?',
//     speakers: [
//       {
//         id: 1,
//         name: "prajakta koli",
//         avatar: "/images/avatar.png"
//       },
//       {
//         id: 2,
//         name: "rohit saraf",
//         avatar: "/images/avatar.png"
//       }
//     ],
//     totalPeople: 4
//   },
// ]

const Rooms = () => {

  const [showModal, setShowModal] = useState(false)
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    async function fetchRooms() {
      try {
        const { data } = await getAllRooms()
        setRooms(data.rooms)

      } catch (error) {
        console.log(error);
      }
    }
    fetchRooms()
  }, [])

  function openModal() {
    setShowModal(true)
  }

  return (
    <div className='container mx-auto overflow-hidden'>
      <div className="w-full my-4 flex items-center justify-between">
        <div className="flex items-center sm:flex-row flex-col w-max">
          <span className='font-semibold sm:text-base text-xs'>All voice rooms</span>
          <input type="text" className='bg-card sm:ml-4 ml-2 sm:px-4 px-2 py-2 rounded-full' />
        </div>
        <div className="">
          <button onClick={openModal} className="sm:w-32 w-28 sm:text-base mr-2 sm:mr-0 text-xs sm:px-4 px-2 py-2 rounded-full bg-green-normal hover:bg-green-hover font-bold">Start a room</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-4 grid-cols-1 sm:gap-6 gap-2 mt-8">
        {
          rooms.map((room) => {
            return <RoomCard key={room.id} room={room} />
          })
        }
      </div>
      {
        showModal && <AddRoomModal onClose={() => { setShowModal(false) }} />
      }
    </div>
  )
}

export default Rooms