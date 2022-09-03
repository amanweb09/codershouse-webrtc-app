import React from 'react'

const TextInput = (props) => {
    return (
        <div>
            <input
                {...props}
                style={{ backgroundColor: '#323232', width: props.fullWidth === 'true' ? '100%' : 'inherit' }}
                className="py-2 px-4 w-64 text-lg rounded-md border-b-2 border-b-solid border-b-transparent focus:border-b-blue-normal" />
        </div>
    )
}

export default TextInput