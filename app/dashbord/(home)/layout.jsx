import Header from '@/components/Header'
import React from 'react'

const homePageLayout = ({children}) => {
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}

export default homePageLayout