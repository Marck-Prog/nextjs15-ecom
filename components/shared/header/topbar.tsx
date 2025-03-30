'use client'

import { useState, useEffect } from 'react'

const TopBar = () => {
  const messages = [
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
    'LIMITED TIME ONLY',
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
    'LIMITED TIME ONLY',
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
    'LIMITED TIME ONLY',
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
    'LIMITED TIME ONLY',
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
    'LIMITED TIME ONLY',
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
    'LIMITED TIME ONLY',
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
  ]

  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down and past 50px
        setIsVisible(false)
      } else if (currentScrollY < 50) {
        // Near the top (within 50px)
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`bg-black text-white py-2 overflow-hidden fixed top-0 left-0 right-0 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='inline-flex animate-scroll whitespace-nowrap'>
        {messages.map((message, index) => (
          <span
            key={index}
            className={`mx-4 text-xs sm:mx-6 sm:text-sm md:mx-8 md:text-sm font-semibold ${
              message.includes('25%') ? 'text-yellow-400' : 'text-white'
            }`}
          >
            {message}
            {index < messages.length - 1 && (
              <span className='inline-block mx-2 sm:mx-3 md:mx-4 text-gray-500'>
                •
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TopBar
