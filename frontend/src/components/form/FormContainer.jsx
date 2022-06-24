import React from 'react'

export const FormContainer = ({ children }) => {
  return (
    <div className="fixed inset-0 dark:bg-primary bg-white -z-10  flex justify-center items-center">
    {children}</div>
  )
}
