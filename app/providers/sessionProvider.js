"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'

const SessionProvid = ({children}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default SessionProvid
