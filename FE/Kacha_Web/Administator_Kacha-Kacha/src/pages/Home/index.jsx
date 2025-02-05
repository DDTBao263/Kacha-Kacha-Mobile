import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../modules/global/selector'
import { ROUTES } from '../../routes'

const HomePage = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  console.log(user);

  useEffect(() => {
    dispatch({ type: 'getLengthCart' })
  }, [])

  return (
    <div className='text-blue-600 dark:text-sky-400'>
      home
    </div>
  )
}

export default HomePage