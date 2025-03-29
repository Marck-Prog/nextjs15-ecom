'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import CartButton from './cart-button'
import LanguageSwitcher from './language-switcher'
import UserButtonClient from './user-client-button'

interface Site {
  logo: string
  name: string
}

interface NavIconsProps {
  site: Site
  siteName: string
  categories: string[]
  translations: {
    all: string
    searchSite: string
  }
}

const NavIcons: React.FC<NavIconsProps> = ({
  site,
  categories,
  translations,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false)
      }
    }

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen])

  const logo = site?.logo || '/icons/logo.svg'
  const name = site?.name || 'Default Site'

  return (
    <div className='relative flex items-center gap-2'>
      <LanguageSwitcher />

      {/* Search Button */}
      <Button
        variant='ghost'
        size='icon'
        className='absolute focus:outline-none xs:left-[-178px] sm:left-[-198px] md:left-[-238px] lg:hidden hover:bg-white'
        onClick={() => setIsSearchOpen(true)}
      >
        <Search className='h-5 w-5' />
      </Button>

      <Button
        variant='ghost'
        size='icon'
        className='focus:outline-none hidden lg:flex'
        onClick={() => setIsSearchOpen(true)}
      >
        <Search className='h-5 w-5' />
      </Button>

      {/* Expanded Search Bar */}
      <div
        ref={searchRef}
        className={`fixed top-0 right-0 h-[50vh] bg-white transition-all duration-500 ease-in-out z-50 ${
          isSearchOpen
            ? 'translate-y-0 opacity-100 w-full'
            : '-translate-y-full opacity-0 w-0'
        } overflow-hidden`}
      >
        <div className='flex items-center justify-between px-4 py-2'>
          {/* Logo */}
          <div className='animateIn' style={{ animationDelay: '0s' }}>
            <Link href='/'>
              <Image src={logo} alt={`${name} logo`} width={150} height={50} />
            </Link>
          </div>

          {/* Search Form */}
          <form
            action='/search'
            method='GET'
            className='animateIn flex-1 mx-4'
            style={{ animationDelay: '0.5s' }}
          >
            <div className='relative max-w-md mx-auto'>
              {/* Combined Input with Dropdown */}
              <div className='relative flex items-center rounded-full border border-gray-400 focus-within:ring-2 focus-within:ring-gray-400 bg-white'>
                {/* Hidden Select Input for Form Submission */}
                <Select name='category'>
                  <SelectTrigger
                    className='border-none bg-transparent text-gray-600 focus:ring-0 rounded-l-full pl-4 pr-2 h-10 w-auto'
                    style={{ boxShadow: 'none' }}
                  >
                    <SelectValue placeholder={translations.all} />
                  </SelectTrigger>
                  <SelectContent position='popper'>
                    <SelectItem value='all'>{translations.all}</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Vertical Divider */}
                <div className='h-6 w-px bg-gray-300 mx-2' />

                {/* Search Input */}
                <Input
                  type='search'
                  name='q'
                  placeholder={translations.searchSite}
                  className='border-none rounded-r-full bg-transparent text-gray-900 focus:ring-0 flex-1 py-2 pr-10 pl-2 h-10'
                  style={{ boxShadow: 'none' }}
                />

                {/* Search Button */}
                <button
                  type='submit'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2'
                >
                  <Search className='h-5 w-5 text-gray-400' />
                </button>
              </div>
            </div>
          </form>

          {/* Cancel Button */}
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setIsSearchOpen(false)}
            className='animateIn text-black hover:text-gray-600'
            style={{ animationDelay: '1s' }}
          >
            Cancel
          </Button>
        </div>

        {/* Popular Search Terms */}
        {isSearchOpen && (
          <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 text-center'>
            <p
              className='animateIn text-sm font-semibold text-gray-400'
              style={{ animationDelay: '0.5s' }}
            >
              Popular Search Terms
            </p>
            <div className='flex gap-2 mt-2 flex-wrap justify-center'>
              {[
                'jordan 1 low',
                'vomero 5',
                'vomero',
                'kobe',
                'air max',
                'jordan',
                'air force 1',
                'dunk low',
              ].map((term, index) => (
                <span
                  key={term}
                  className='animateIn px-3 py-1 bg-[#1F1E20] rounded-full text-sm text-white cursor-pointer hover:bg-gray-600'
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Other Icons */}
      <UserButtonClient />
      <CartButton />
    </div>
  )
}

export default NavIcons
