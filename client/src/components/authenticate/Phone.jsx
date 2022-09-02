import React, { useState } from 'react'
import Card from '../shared/Card'
import Button from '../shared/Button'
import TextInput from '../shared/TextInput'
import { sendOtp } from '../../api'
import { useDispatch } from 'react-redux'
import { setOtp } from '../../store/authSlice'

const Phone = ({ onNext }) => {

    const [phoneNumber, setPhoneNumber] = useState('')
    const dispatch = useDispatch()

    async function submit() {
        if(!phoneNumber) {
            alert('Please enter a phone number') 
            return
        }
        
        try {
            const { data } = await sendOtp({ phone: phoneNumber })
            dispatch(setOtp({ phone: data.phone, hash: data.hash }))
            onNext()
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Card title={'Enter your phone number'}>
            <TextInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <div>
                <div className='mt-8'>
                    <Button text={"Next"} onClick={submit} />
                </div>
                <p className='text-gray-t sm:w-3/4 w-11/12 block mx-auto mt-6 sm:text-sm text-xs'>
                    By entering your number, you're agreeing to our Terms of services and Privacy Policy. Thanks!
                </p>
            </div>
        </Card>
    )
}

export default Phone