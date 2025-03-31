import React from 'react'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex items-center justify-center min-h-screen bg-white'>
      {children}
    </div>
  )
}
