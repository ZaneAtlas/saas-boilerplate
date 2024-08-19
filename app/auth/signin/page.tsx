'use client'

import { AuthForm } from '@/components/ui/auth-form'
import { Vortex } from '@/components/ui/vortex'
import React, { useEffect, useState } from 'react'

export default function SignInPage () {

  return (
    <div>
      {/* <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      > */}
        <AuthForm type={'signin'} />
      {/* </Vortex> */}
    </div>
  )
}
