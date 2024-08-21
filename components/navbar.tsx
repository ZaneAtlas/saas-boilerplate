import React from 'react'
import { Profile } from './profile'
import Link from 'next/link'

export const NavBar = () => {
  return (
    <div className='flex justify-between items-center bg-transparent'>
        <Link href="/dashboard">
          <h1 className='text-xl font-bold'>Logo</h1>
        </Link>
        <Profile />
    </div>
  )
}
