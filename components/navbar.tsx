import React from 'react'
import { Profile } from './profile'

export const NavBar = () => {
  return (
    <div className='flex justify-between items-center bg-transparent'>
        <h1 className='text-xl font-bold'>Logo</h1>
        <Profile />
    </div>
  )
}
