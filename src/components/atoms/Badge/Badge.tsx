import { cn } from '@/lib/cn'

type Variant = 'default' | 'success' | 'warning' | 'info'

interface BadgeProps {
  label: string
  variant?: Variant
  className?: string
}

const variantStyles: Record<Variant, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  info: 'bg-blue-100 text-blue-700',
}

export default function Badge({ label, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
