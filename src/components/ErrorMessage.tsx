import React, { PropsWithChildren } from 'react'
interface Props extends PropsWithChildren{

}
export const ErrorMessage = ({children}:Props) => {
  return (
    <p className='bg-red-600 p-2 text-white font-bold text-sm text-center uppercase rounded-md' >{children}</p>
  )
}
