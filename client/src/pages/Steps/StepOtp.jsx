import React, { useState } from 'react'
import Card from '../../components/shared/Card'
import Button from '../../components/shared/Button'
import TextInput from '../../components/shared/TextInput'
import { verifyOtp } from '../../api'
import { useSelector, useDispatch } from 'react-redux'
import { setAuth } from '../../store/authSlice'

const StepOtp = ({ onNext }) => {

    const dispatch = useDispatch()

    const [otp, setOtp] = useState('')
    const { phone, hash } = useSelector((state) => state.auth.otp)

    async function submit() {

        if(!otp || !phone || !hash) {
            alert('Please enter a otp and phone number') 
            return;
        }

        try {
            const { data } = await verifyOtp({ otp, phone, hash })
            dispatch(setAuth({ user: data.user }))
            
        } catch (error) {
            console.log(error.response.data.err);
        }
    }

    return (
        <div className="container mx-auto flex-center pt-24">
            <Card title={'Enter the OTP we just sent you'}>
                <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
                <div>
                    <div className='mt-8'>
                        <Button text={"Next"} onClick={submit} />
                    </div>
                    <p className='text-gray-t w-3/4 block mx-auto mt-6 text-sm'>
                        By entering your number, you're agreeing to our Terms of services and Privacy Policy. Thanks!
                    </p>
                </div>
            </Card>
        </div>
    )
}

export default StepOtp