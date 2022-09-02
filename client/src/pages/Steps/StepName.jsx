import React, { useState } from 'react'
import Button from '../../components/shared/Button'
import Card from '../../components/shared/Card'
import TextInput from '../../components/shared/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { setName } from '../../store/activate-slice'

const StepName = ({ onNext }) => {

  const { name } = useSelector((state) => state.activate)
  const dispatch = useDispatch()
  const [fullName, setFullName] = useState(name)

  function nextStep() {
    if (!fullName) { return }

    dispatch(setName(fullName))
    onNext()
  }

  return (
    <Card title={"What's your full name?"}>
      <TextInput value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
      <div>
        <p className='text-gray-t w-3/4 block mx-auto mt-6 text-sm'>
          People use their real names as Codershouse!
        </p>
        <div className='mt-8'>
          <Button text={"Next"} onClick={nextStep} />
        </div>
      </div>
    </Card>
  )
}

export default StepName