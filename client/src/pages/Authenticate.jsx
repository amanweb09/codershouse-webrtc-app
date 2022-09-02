import React, { useState } from 'react'
import StepOtp from './Steps/StepOtp'
import StepPhoneEmail from './Steps/StepPhoneEmail'

const steps = {
    1: StepPhoneEmail,
    2: StepOtp
}

const Authenticate = () => {
    function onNext() {
        setStep(step + 1)
    }

    const [step, setStep] = useState(1)
    const Step = steps[step]

    return (
        <div className='container mx-auto'>
            <Step onNext={onNext} />
        </div>
    )
}

export default Authenticate