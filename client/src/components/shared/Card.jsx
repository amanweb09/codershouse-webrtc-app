import React from 'react'

const Card = ({ title, children }) => {
    return (
        <div className="card sm:w-5/12 w-10/12 sm:h-80 h-96 sm:px-8 px-4 flex-center flex-col rounded-md text-center bg-card">
            <div className="heading flex-center">
                <h1 className='text-xl font-semibold mb-8'>{title}</h1>
            </div>
            {children}
        </div>
    )
}

export default Card