import React, { useState } from 'react'
import Card from '../shared/Card'
import Button from '../shared/Button'
import TextInput from '../shared/TextInput'

const Email = ({onNext}) => {

    const [email, setEmail] = useState('')

    return (
        <Card title={'Enter your email ID'}>
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
            <div>
                <div className='mt-8'>
                    <Button text={"Next"} onClick={onNext}/>
                </div>
                <p className='text-gray-t sm:w-3/4 w-11/12 block mx-auto mt-6 sm:text-sm text-xs'>
                    By entering your email, you're agreeing to our Terms of services and Privacy Policy. Thanks!
                </p>
            </div>
        </Card>
    )
}

export default Email