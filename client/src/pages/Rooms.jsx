import React from 'react'
import RoomCard from '../components/rooms/RoomCard'

const rooms = [
  {
      id: 1,
      topic: 'guddu pandit vs munna tripathi',
      speakers: [
          {
              id: 1,
              name: "golu gupta",
              avatar: "/images/avatar.png"
          },
          {
              id: 2,
              name: "sweety gupta",
              avatar: "/images/avatar.png"
          }
      ],
      totalPeople: 2
  },
  {
      id: 2,
      topic: 'When will mismatched 2 come?',
      speakers: [
          {
              id: 1,
              name: "prajakta koli",
              avatar: "/images/avatar.png"
          },
          {
              id: 2,
              name: "rohit saraf",
              avatar: "/images/avatar.png"
          }
      ],
      totalPeople: 4
  },
]

const Rooms = () => {
  return (
    <div className='container mx-auto'>
      <div className="w-full my-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className='font-semibold'>All voice rooms</span>
          <input type="text" className='bg-card ml-4 px-4 py-2 rounded-full' />
        </div>
        <div className="">
          <button className="w-32 px-4 py-2 rounded-full bg-green-normal hover:bg-green-hover font-bold">Start a room</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-8">
        {
          rooms.map((room) => {
            return <RoomCard key={room.id} room={room}/>
          })
        }
      </div>
    </div>
  )
}

export default Rooms