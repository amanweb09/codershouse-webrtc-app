import React, { useState } from 'react'
import TextInput from "../shared/TextInput";
import { createRoom as create } from '../../api'
import Loader from '../shared/Loader'
import { useNavigate } from 'react-router-dom'

const AddRoomModal = ({ onClose }) => {

    const navigate = useNavigate()

    const [roomType, setRoomType] = useState('open')
    const [topic, setTopic] = useState('')
    const [loading, setLoading] = useState(false)

    async function createRoom() {
        if (!topic) { return }
        setLoading(true)
        try {
            const { data } = await create({ topic, roomType })
            setLoading(false)
            navigate(`/room/${data.room.id}`)
        } catch (error) {
            setLoading(false)
            console.log(error.response.data.err);
        }
    }

    if (loading) { return <Loader message={"Creating your room..."} /> }
    return (
        <div className="bg-black/50 fixed flex-center inset-0">
            <div style={{ zIndex: 99 }} className="bg-card sm:w-5/12 w-10/12 h-96 rounded-md">
                <div className='p-6 relative border-b-2 border-b-solid border-b-gray-800'>
                    <span
                        onClick={onClose}
                        className="absolute top-2 right-2 text-2xl cursor-pointer font-bold hover:text-red-500">&times;</span>
                    <h3 className="font-bold">Enter the topic to be discussed</h3>
                    <TextInput fullWidth='true' value={topic} onChange={(e) => setTopic(e.target.value)} />

                    <h2 className="font-semibold mt-8">Room Types</h2>
                    <div className='flex items-center justify-evenly mt-4'>
                        <div
                            onClick={() => { setRoomType('open') }}
                            className={`w-20 h-20 ${roomType === 'open' ? 'bg-blue-normal' : 'bg-body'} rounded-md flex-center cursor-pointer border-2 border-solid border-transparent hover:border-blue-normal`}>
                            <span className='font-bold'>Open</span>
                        </div>
                        <div
                            onClick={() => { setRoomType('social') }}
                            className={`w-20 h-20 ${roomType === 'social' ? 'bg-blue-normal' : 'bg-body'} rounded-md flex-center cursor-pointer border-2 border-solid border-transparent hover:border-blue-normal`}>
                            <span className='font-bold'>Social</span>
                        </div>
                        <div
                            onClick={() => { setRoomType('private') }}
                            className={`w-20 h-20 ${roomType === 'private' ? 'bg-blue-normal' : 'bg-body'} rounded-md flex-center cursor-pointer border-2 border-solid border-transparent hover:border-blue-normal`}>
                            <span className='font-bold'>Private</span>
                        </div>

                    </div>
                </div>
                <div className="p-6 text-center">
                    <h2>Start a room, open to everyone!</h2>
                    <button
                        onClick={createRoom}
                        className="bg-green-normal hover:bg-green-hover w-28 mt-2 px-4 py-2 rounded-full font-bold">Let's Go</button>
                </div>
            </div>
        </div>
    )
}

export default AddRoomModal