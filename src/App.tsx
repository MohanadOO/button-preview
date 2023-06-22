import React, { useState } from 'react'
import { Button, ButtonProps, buttonVariants } from './components/ui/button'
import { twJoin } from 'tailwind-merge'

const translate = {
  primary: { en: 'Primary', ar: 'الرئيسي' },
  secondary: { en: 'Secondary', ar: 'الثانوي' },
  destructive: { en: 'Destructive', ar: 'تدمير' },
  success: { en: 'Success', ar: 'نجاح' },
  ghost: { en: 'Ghost', ar: 'مخفي' },
  link: { en: 'Link', ar: 'رابط' },
  outline: { en: 'Outline', ar: 'حواف' },
  loading: { en: 'Loading', ar: 'تحميل' },
  toggle: { en: 'Toggle Loading', ar: 'أبدء التحميل' },
  change: { en: 'EN', ar: 'AR' },
}

type TypeProp =
  | ButtonProps['variant']
  | 'loading'
  | 'change'
  | 'toggle'
  | null
  | undefined

const buttonsVariants: ButtonProps['variant'][] = [
  'primary',
  'secondary',
  'destructive',
  'success',
  'outline',
  'ghost',
  'link',
]
const buttonSizes: ButtonProps['size'][] = ['sm', 'default', 'lg']

export default function App() {
  const [loading, setLoading] = useState(false)
  const [dir, setDir] = useState('ltr')

  function getTranslate(type: TypeProp): string {
    if (typeof type !== 'string') return ''

    return translate[type][dir === 'rtl' ? 'ar' : 'en']
  }

  return (
    <main
      dir={dir}
      className='p-4 min-h-screen flex flex-col bg-zinc-900 text-gray-200'
    >
      <div className='space-y-5 flex flex-col my-auto flex-wrap gap-y-10 md:gap-y-5'>
        <div className='self-center'>
          <Button
            loading={loading}
            onClick={() => setLoading((prev) => !prev)}
            className='self-center my-12 me-5'
          >
            {getTranslate('toggle')}
          </Button>
          <Button
            onClick={() => setDir((prev) => (prev === 'ltr' ? 'rtl' : 'ltr'))}
            variant={'secondary'}
            className='self-center my-12 uppercase'
          >
            {getTranslate('change')}{' '}
            <span className='text-purple-400'>({dir})</span>
          </Button>
        </div>

        {buttonsVariants.map((type) => (
          <React.Fragment key={type}>
            <div
              key={type}
              className='flex flex-wrap items-center justify-evenly gap-x-5 gap-y-5 border-b border-b-purple-400/50 py-4'
            >
              {buttonSizes.map((size) => (
                <Button
                  key={size}
                  variant={type}
                  size={size}
                  className='capitalize'
                >
                  {getTranslate(type)}
                </Button>
              ))}
              <Button
                loading={loading}
                disabled={loading}
                variant={type}
                className='capitalize'
              >
                {getTranslate('loading')}
              </Button>
              <Button
                variant={type}
                className='capitalize'
                icon={<HeartIcon />}
              >
                {getTranslate(type)}
              </Button>

              <Button variant={type} outline={'outline'}>
                {getTranslate('outline')}
              </Button>
            </div>
          </React.Fragment>
        ))}
      </div>

      <a
        href='/'
        className={twJoin(
          buttonVariants({ variant: 'primary' }),
          'self-center my-10'
        )}
      >
        <pre>a tag</pre>
      </a>
    </main>
  )
}

function HeartIcon() {
  return (
    <svg
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
      ></path>
    </svg>
  )
}
