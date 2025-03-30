'use client'

import { useLocale } from 'next-intl'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useSettingStore from '@/hooks/use-setting-store'
import { i18n } from '@/i18n-config'
import { Link, usePathname } from '@/i18n/routing'
import { setCurrencyOnServer } from '@/lib/actions/setting.actions'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Image from 'next/image'

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const locale = useLocale()
  const pathname = usePathname()
  const { locales } = i18n

  const {
    setting: { availableCurrencies, currency },
    setCurrency,
  } = useSettingStore()

  console.log('Available Currencies:', availableCurrencies)
  console.log('Selected Currency Code:', currency)

  const handleCurrencyChange = async (newCurrency: string) => {
    await setCurrencyOnServer(newCurrency)
    setCurrency(newCurrency)
  }

  const currentCurrency =
    availableCurrencies.find((c) => c.code === currency) ||
    availableCurrencies[0]

  console.log('Current Currency:', currentCurrency)

  if (!currentCurrency?.flag || currentCurrency.flag === '') {
    console.warn('Missing or empty flag for currency:', currentCurrency)
  }

  return (
    <>
      {/* Currency/Language - Hidden on small screens */}
      <div className='hidden xl:flex items-center'>
        {currentCurrency?.flag && currentCurrency.flag !== '' ? (
          <Image
            src={currentCurrency.flag}
            alt={`${currentCurrency.name} Flag`}
            width={19}
            height={20}
            onError={() =>
              console.error(`Failed to load flag for ${currentCurrency.code}`)
            }
          />
        ) : (
          <span>🏳️</span>
        )}
        <span className='text-black font-bold mr-2'>
          {currentCurrency.symbol}
        </span>
        <span className='text-black font-bold'>{currentCurrency.code}</span>
      </div>
      <div className='ml-3 hidden lg:flex hover:bg-white mr-5'>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger className='focus:outline-none'>
            <div className='flex items-center gap-1 mb-1'>
              <span className='text-xl'>
                {locales.find((l) => l.code === locale)?.icon}
              </span>
              <KeyboardArrowDownIcon
                sx={{
                  color: 'black',
                  mt: 0.5,
                  fontSize: '1rem',
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56 mt-1 border-t border-none rounded-none'>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Currency</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={currency}
              onValueChange={handleCurrencyChange}
            >
              {availableCurrencies.map((c) => (
                <DropdownMenuRadioItem key={c.name} value={c.code}>
                  <div className='flex items-center gap-2 cursor-pointer'>
                    {c.flag && c.flag !== '' ? (
                      <Image
                        src={c.flag}
                        alt={`${c.name} Flag`}
                        width={19}
                        height={20}
                      />
                    ) : (
                      <span>🏳️</span>
                    )}
                    <span>
                      {c.symbol} {c.code}
                    </span>
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Language</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={locale}>
              {locales.map((c) => (
                <DropdownMenuRadioItem key={c.name} value={c.code}>
                  <Link
                    className='w-full flex items-center gap-1 cursor-pointer'
                    href={pathname}
                    locale={c.code}
                  >
                    {c.name}
                    <span className='text-lg'>{c.icon}</span>
                  </Link>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
