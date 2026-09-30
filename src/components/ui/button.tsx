import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "accent" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inferno dark:focus-visible:ring-cherry disabled:pointer-events-none disabled:opacity-50 cursor-pointer shadow-md font-heading"

    const variants = {
      default:
        "bg-inferno text-white hover:bg-inferno-dark dark:hover:bg-inferno active:translate-y-px",
      accent:
        "bg-cherry text-white hover:bg-cherry-hover dark:hover:bg-cherry active:translate-y-px",
      outline:
        "border border-slate-300 dark:border-zinc-700 bg-white dark:bg-blackbrown text-darkslate dark:text-lighttext hover:bg-slate-100 dark:hover:bg-zinc-800 hover:border-inferno dark:hover:border-cherry",
      ghost:
        "shadow-none hover:bg-slate-100 dark:hover:bg-zinc-800 text-darkslate dark:text-lighttext hover:text-inferno dark:hover:text-cherry",
      link:
        "shadow-none text-inferno dark:text-cherry underline-offset-4 hover:underline p-0",
    }

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3 text-xs",
      lg: "h-11 rounded-md px-8 text-base",
      icon: "h-10 w-10",
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
