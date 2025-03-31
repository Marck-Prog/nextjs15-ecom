import { getSetting } from '@/lib/actions/setting.actions'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'

import Image from 'next/image'
import SignUpForm from './signup-form'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default async function SignUpPage(props: {
  searchParams: Promise<{
    callbackUrl: string
  }>
}) {
  const searchParams = await props.searchParams
  const { site } = await getSetting()

  const { callbackUrl } = searchParams

  const session = await auth()
  if (session) {
    return redirect(callbackUrl || '/')
  }

  return (
    // <div className='w-full'>
    //   <Card>
    //     <CardHeader>
    //       <CardTitle className='text-2xl'>Create account</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <SignUpForm />
    //     </CardContent>
    //   </Card>
    // </div>

    <div className='flex w-full max-w-4xl'>
      {/* Left Section: Login Form */}
      <div className='w-1/2 p-8'>
        {/* Logo */}
        {/* <div className='flex items-center mb-6'>
          <span className='text-2xl font-bold text-gray-800'>{site.name}</span>
        </div> */}

        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          Create {site.name} Account
        </h2>
        <SignUpForm />
      </div>{' '}
      {/* Right Section: Promotional Image and Text */}
      <div className='w-1/2 relative'>
        <Image
          src='/images/banner2.jpg' // Replace with your actual image path
          alt='Promotional Image'
          layout='fill'
          objectFit='cover'
          className=''
        />
        <div className='absolute bottom-8 left-8 text-white'>
          <h3 className='text-2xl font-bold mb-2'>Bring your ideas to life.</h3>
          <p className='text-sm'>
            Sign up for free and enjoy access to all features for 30 days. No
            credit card required.
          </p>
        </div>
      </div>
    </div>
  )
}
