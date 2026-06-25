interface CardProps {
  children:    React.ReactNode
  interactive?: boolean
  className?:  string
}

export default function Card({ children, interactive = false, className = '' }: CardProps) {
  return (
    <div className={`isp-card ${interactive ? 'isp-card-hover' : ''} ${className}`}>
      {children}
    </div>
  )
}