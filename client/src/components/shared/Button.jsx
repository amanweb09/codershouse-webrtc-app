import React from 'react'

const Button = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className="bg-blue-normal py-2 px-4 rounded-full font-bold hover:bg-blue-hover">
            <span>{text}</span>
            <span>&rarr;</span>
        </button>
    )
}

export default Button