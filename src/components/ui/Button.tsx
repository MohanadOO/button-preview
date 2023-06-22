import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

function ButtonLoader() {
  return (
    <div
      className='absolute inline-flex h-5 w-5 animate-spin items-center rounded-full border-[3px] border-current border-t-transparent text-center leading-6 text-gray-200'
      role='status'
      aria-label='loading'
    >
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
    icon?: React.ReactNode
  }

const buttonVariants = cva(
  'relative inline-flex items-center justify-center cursor-pointer rounded-xl tracking-wide shadow hover:shadow-md shadow-white/20 disabled:shadow disabled:cursor-not-allowed outline-none focus-visible:ring-2 ring-offset-4 ring-offset-zinc-900 focus:scale-[0.95] transition border-2 border-white/20',
  {
    variants: {
      variant: {
        primary:
          'bg-purple-600 hover:bg-purple-700 disabled:bg-purple-700/60 text-white ring-purple-600',
        secondary:
          'bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700/60 text-white ring-gray-600',
        destructive:
          'bg-pink-800 hover:bg-pink-900 disabled:bg-pink-800/60 text-white ring-pink-800',
        success:
          'bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/60 text-white ring-emerald-600',
        ghost:
          'bg-transparent shadow-none border-none hover:bg-gray-600 ring-gray-600',
        outline: 'bg-transparent shadow-none hover:bg-gray-700 ring-gray-700',
        link: 'bg-transparent shadow-none border-none text-purple-600',
      },
      size: {
        sm: 'py-0.5 px-2 text-xs md:text-sm font-bold',
        default: 'py-2 px-4 text-sm md:text-base font-medium',
        lg: 'py-3.5 px-6 md:text-lg font-medium',
      },
      outline: {
        default: '',
        outline: 'bg-transparent',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
    compoundVariants: [
      {
        variant: 'primary',
        outline: 'outline',
        class: 'text-purple-600 border-purple-600 hover:text-white',
      },
      {
        variant: 'secondary',
        outline: 'outline',
        class: 'text-gray-200 border-gray-600 hover:text-white',
      },
      {
        variant: 'destructive',
        outline: 'outline',
        class: 'text-pink-600 border-pink-600 hover:text-white',
      },
      {
        variant: 'success',
        outline: 'outline',
        class: 'text-emerald-600 border-emerald-600 hover:text-white',
      },
    ],
  }
)

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant, size, outline, className, icon, loading, ...rest },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          buttonVariants({ variant, size, outline, className })
        )}
        {...rest}
      >
        {loading && <ButtonLoader />}
        <span
          className={`inline-flex items-center justify-center gap-2 transition-opacity ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {icon && <span className='w-5 h-5'>{icon}</span>}
          {children}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'
export { Button, buttonVariants }
