import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAuth } from '../store/authSlice'

export function useLoadingWithRefresh() {
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5500'

            try {
                const { data } = await axios.get(`${baseURL}/api/refresh`, { withCredentials: true })
                dispatch(setAuth(data))

                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }

        })()
    }, [])

    return { loading }
}