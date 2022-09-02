import React, { useState } from 'react'
import Email from '../../components/authenticate/Email'
import Phone from '../../components/authenticate/Phone'

const phoneEmailMap = {
    phone: Phone,
    email: Email
}

const StepPhoneEmail = ({ onNext }) => {

    const [type, setType] = useState('phone')
    const Component = phoneEmailMap[type]

    return (
        <div className="container mx-auto flex-center flex-col pt-24">
            <div className='flex mb-4 items-center justify-end w-5/12'>
                <button
                    onClick={() => { setType('phone') }}
                    className={`p-2 ${type === 'phone' ? 'bg-blue-normal' : 'bg-card'} mr-2 rounded-md`}>
                    Phone
                </button>
                <button
                    onClick={() => { setType('email') }}
                    className={`p-2 ${type === 'email' ? 'bg-blue-normal' : 'bg-card'} bg-card rounded-md`}>
                    Email
                </button>
            </div>
            <Component onNext={onNext} />
        </div>
    )
}

export default StepPhoneEmail