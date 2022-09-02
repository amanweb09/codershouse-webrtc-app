import React from 'react'
import Card from './Card'

const Loader = ({ message }) => {
    return (
        <div className='flex-center inset-0 fixed bg-black/50'>
            <Card>
                <div className="spinner w-10 mb-4 h-10 rounded-full border-8 border-solid border-x-blue-normal border-b-blue-normal border-t-transparent"></div>
                <span className="font-bold">{message}</span>
            </Card>
        </div>
    )
}

export default Loader