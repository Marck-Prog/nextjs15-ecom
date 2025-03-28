import { UserIcon } from 'lucide-react'
import Link from 'next/link'
import CartButton from './cart-button'
import UserButton from './user-button'

export default function Menu({ forAdmin = false }: { forAdmin?: boolean }) {
  return (
    <div className='flex justify-end'>
      <nav className='flex gap-3 w-full'>
        <Link href='/signin' className='header-button'>
          <UserIcon className='h-8 w-8' />
          <span className='font-bold'>Sign in</span>
        </Link>
        <UserButton />
      </nav>
      <nav className='flex gap-3 w-full'>
        {forAdmin ? null : <CartButton />}
      </nav>
    </div>
  )
}
