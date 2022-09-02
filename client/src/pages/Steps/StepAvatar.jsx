import React, { useState, useEffect } from 'react'
import Button from '../../components/shared/Button'
import Card from '../../components/shared/Card'
import Loader from '../../components/shared/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { setAvatar } from '../../store/activate-slice'
import { setAuth } from '../../store/authSlice'
import { activate } from '../../api'

const StepAvatar = ({ onNext }) => {

  const dispatch = useDispatch()
  const { name, avatar } = useSelector((state) => state.activate)
  const [image, setImage] = useState('/images/avatar.png')
  const [loading, setLoading] = useState(false)
  const [unmounted, setUnmounted] = useState(false)

  async function submit() {
    if (!name || !avatar) {
      alert('Please enter a name and avatar')
      return
    }
    setLoading(true)
    try {
      const { data } = await activate({ name, avatar: image })
      if (data.auth) {
        if(!unmounted) {
          dispatch(setAuth(data))
        }
      }

    } catch (error) {
      console.log(error);
      alert(error.response.data.err)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      setUnmounted(true)
    }
  }, [])

  function captureImage(e) {
    const files = e.target.files
    const reader = new FileReader()
    reader.readAsDataURL(files[0])

    reader.onloadend = () => {
      setImage(reader.result)
      dispatch(setAvatar(reader.result))
    }
  }

  if (loading) return (
    <Loader message={"Activation in Progress..."} />
  )
  return (
    <Card title={`Okay, ${name}!`}>
      <p className='text-gray-t text-sm text-center'>How's this picture?</p>
      <div className="w-24 h-24 rounded-full overflow-hidden mt-4 border-4 border-solid border-blue-normal">
        <img src={image} alt="w-full h-full" />
      </div>
      <div>
        <label htmlFor="avatar_input" className='text-sm text-blue-normal block mt-2 mb-4 cursor-pointer'>
          Choose a different picture
        </label>
        <input type="file" name="avatar" onChange={captureImage} id="avatar_input" className="hidden" />
      </div>
      <div className=''>
        <Button text={"Next"} onClick={submit} />
      </div>
    </Card>
  )
}

export default StepAvatar