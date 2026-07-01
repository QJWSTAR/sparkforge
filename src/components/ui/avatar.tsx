'use client'

import { forwardRef, useState } from 'react'
import Image from 'next/image'

export interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  status?: 'online' | 'group' | 'offline'
  className?: string
}

const sizeStyles = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

const sizePx = {
  sm: 32,
  md: 40,
  lg: 48,
}

const statusDotStyles = {
  online: 'bg-ui-success',
  group: 'bg-ui-primary',
  offline: 'bg-ui-border',
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, size = 'md', status, className }, ref) => {
    const [imgError, setImgError] = useState(false)

    return (
      <div
        ref={ref}
        className={[
          'relative inline-flex flex-shrink-0 rounded-full overflow-hidden',
          sizeStyles[size],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {imgError || !src ? (
          <span className="w-full h-full flex items-center justify-center bg-ui-surface text-ui-text-secondary text-sm font-medium">
            {alt.charAt(0).toUpperCase()}
          </span>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={sizePx[size]}
            height={sizePx[size]}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
        {status && (
          <span
            className={[
              'absolute bottom-0 right-0 w-2 h-2 rounded-full ring-2 ring-ui-bg',
              statusDotStyles[status],
            ].join(' ')}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'