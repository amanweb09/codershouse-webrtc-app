import React, { useState } from 'react'
import StepName from './Steps/StepName'
import StepAvatar from './Steps/StepAvatar'

const steps = {
  1: StepName,
  2: StepAvatar
}

const Activate = () => {

  const [step, setStep] = useState(1)
  const Step = steps[step]

  function onNext() {
    setStep(step+1)
  }

  return (
    <div className='container mx-auto flex-center pt-24'>
      <Step onNext={onNext} />
    </div>
  )
}

export default Activate