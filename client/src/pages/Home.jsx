import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/shared/Button'
import Card from '../components/shared/Card'

const Home = () => {

  const navigate = useNavigate()

  function startRegister() {
    navigate('/authenticate')
  }

  return (
    <div className="flex-center mt-24 container mx-auto">
      <Card title={'Welcome to Codershouse!'}>
        <p className='text-gray-t text-sm sm:text-base'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus fugiat harum ut vero tempore eum consequuntur inventore odio ratione, fugit labore asperiores, laboriosam aliquam. Deserunt impedit itaque illo mollitia quisquam?
        </p>
        <div className='sm:my-4 my-6'>
          <Button onClick={startRegister} text={"Let's go"} />
        </div>
        <div>
          <span className='text-blue-normal'>Have an invite text?</span>
        </div>
      </Card>
    </div>
  )
}

export default Home