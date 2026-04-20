import type { CSSProperties, ReactNode } from 'react'
import { Icon } from './Icon'
import type { IconName } from '@/types'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md'

interface Props {
  variant?: Variant
  size?: Size
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
  style?: CSSProperties
  icon?: IconName
  title?: string
}

const VARIANT_STYLES: Record<Variant, CSSProperties> = {
  primary: {
    background: 'var(--brass-base)',
    color: '#0B0E13',
    border: 'none',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)'
  },
  secondary: {
    background: 'transparent',
    color: 'var(--fg-1)',
    border: '1px solid var(--smoke)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--fg-2)',
    border: 'none'
  },
  danger: {
    background: 'var(--danger)',
    color: '#0B0E13',
    border: 'none'
  }
}

export function Button({
  variant = 'secondary',
  size = 'md',
  children,
  onClick,
  disabled,
  style,
  icon,
  title
}: Props) {
  const base = VARIANT_STYLES[variant]
  const sz: CSSProperties =
    size === 'sm' ? { padding: '3px 9px', fontSize: 12 } : { padding: '6px 14px', fontSize: 13 }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        ...base,
        ...sz,
        ...style,
        borderRadius: 3,
        fontFamily: 'var(--font-ui)',
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        transition: 'background 120ms var(--ease-out), color 120ms var(--ease-out)'
      }}
      onMouseEnter={(e) => {
        if (disabled) return
        if (variant === 'primary') e.currentTarget.style.background = 'var(--brass-hover)'
        else if (variant === 'secondary') e.currentTarget.style.background = 'var(--slate)'
        else if (variant === 'ghost') e.currentTarget.style.color = 'var(--fg-1)'
      }}
      onMouseLeave={(e) => {
        if (disabled) return
        e.currentTarget.style.background = (base.background as string) ?? 'transparent'
        e.currentTarget.style.color = (base.color as string) ?? 'var(--fg-1)'
      }}
    >
      {icon && <Icon name={icon} size={14} />}
      {children}
    </button>
  )
}
