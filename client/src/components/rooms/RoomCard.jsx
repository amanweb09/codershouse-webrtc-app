import React from 'react'

const RoomCard = ({ room }) => {
    return (
        <div className="bg-card p-6 rounded-md cursor-pointer">
            <h3 className="capitalize font-semibold">{room.topic}</h3>
            <div className='flex items-center justify-between mt-4'>
                <div className="avatars flex items-center">
                    {room.speakers.map((speaker) => {
                        return (
                            <img className="w-10 h-10 rounded-full border-2 border-solid border-blue-normal" src={speaker.avatar} alt="avatar" />
                        )
                    })}
                </div>
                <div className="names">
                    {room.speakers.map((speaker) => {
                        return (
                            <div>
                                <span className="capitalize pb-2">{speaker.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="mt-4 w-full flex justify-end">
                <span>{room.totalPeople}</span>
            </div>
        </div>
    )
}

export default RoomCard