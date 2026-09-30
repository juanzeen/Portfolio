import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent" | "outline" | "secondary" | "road"
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "bg-inferno/10 dark:bg-cherry/20 text-inferno dark:text-lighttext border-inferno/20 dark:border-cherry/30",
    accent:
      "bg-cherry/10 dark:bg-cherry/25 text-cherry dark:text-red-300 border-cherry/20 dark:border-cherry/40",
    outline:
      "border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 bg-white dark:bg-blackbrown",
    secondary:
      "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border-slate-200 dark:border-zinc-700",
    road: "bg-blackbrown text-lighttext border-amber-400/50 shadow-xs",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold font-heading tracking-wide transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
