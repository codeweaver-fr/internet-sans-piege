import type { HTMLMotionProps } from 'framer-motion'
import { motion } from 'framer-motion'

type Variant = 'primary' | 'ghost'
type Size    = 'md' | 'sm'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: Variant
  size?:    Size
}

export default function Button({
  variant   = 'primary',
  size      = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const ghost = variant === 'ghost' ? 'isp-btn-ghost' : ''
  const small = size    === 'sm'    ? 'isp-btn-sm'    : ''

  return (
    <motion.button
      className={`isp-btn ${ghost} ${small} ${className}`.trim()}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}