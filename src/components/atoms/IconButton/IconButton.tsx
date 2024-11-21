import React from 'react'

const IconButton = ({
  icon,
  onClick,
  label,
  size = 'medium',
  disabled = false,
}) => {
  const sizes = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-12 h-12 text-lg',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full p-2
        ${sizes[size]} ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}
        text-white`}
      aria-label={label}
    >
      {icon}
    </button>
  )
}

export default IconButton
