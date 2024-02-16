import React from 'react'

export const DateHeader = () => {
  const today = new Date();
  return (
    <div className = "fixed top-0 right-0">
        {/* TODO: format as per Figma, for now, we are using disorganized string, eg. February 29, 2024 */}
        {today.toLocaleDateString()}
    </div>
  )
}
