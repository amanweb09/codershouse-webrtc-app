import React from 'react'
import { useNavigate } from 'react-router-dom'

const RoomCard = ({ room }) => {

    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5500'

    const navigate = useNavigate()

    return (
        <div
            onClick={() => { navigate(`/room/${room.id}`) }}
            className="w-full block mx-auto sm:mx-0 bg-card p-6 rounded-md cursor-pointer">
            <h3 className="capitalize font-semibold">{room.topic}</h3>
            <div className='flex items-center justify-between mt-4'>
                <div className="avatars flex items-center">
                    {room.speakers.map((speaker) => {
                        return (
                            <img
                                key={speaker.id}
                                className="w-10 h-10 rounded-full border-2 border-solid border-green-normal"
                                src={`${BASE_URL}${speaker.avatar}`}
                                alt="avatar" />
                        )
                    })}
                </div>
                <div className="names">
                    {room.speakers.map((speaker) => {
                        return (
                            <div key={speaker.id}>
                                <span className="capitalize pb-2">{speaker.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="mt-4 w-full flex justify-end">
                <span>{room.speakers.length}</span>
            </div>
        </div>
    )
}

export default RoomCard