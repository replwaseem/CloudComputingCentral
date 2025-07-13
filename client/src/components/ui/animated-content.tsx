import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedContentProps {
  children: ReactNode
  animation?: "fade-in" | "slide-up" | "scale-in" | "bounce-in" | "float"
  delay?: number
  className?: string
}

export function AnimatedContent({ 
  children, 
  animation = "fade-in", 
  delay = 0, 
  className = "" 
}: AnimatedContentProps) {
  return (
    <div 
      className={cn(`animate-${animation}`, className)}
      style={{ animationDelay: `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

interface StaggeredListProps {
  children: ReactNode[]
  animation?: "fade-in" | "slide-up" | "scale-in"
  staggerDelay?: number
  className?: string
}

export function StaggeredList({ 
  children, 
  animation = "slide-up", 
  staggerDelay = 100,
  className = "" 
}: StaggeredListProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <AnimatedContent
          key={index}
          animation={animation}
          delay={index * staggerDelay}
        >
          {child}
        </AnimatedContent>
      ))}
    </div>
  )
}

interface HoverAnimationProps {
  children: ReactNode
  animation?: "float" | "wiggle" | "scale"
  className?: string
}

export function HoverAnimation({ 
  children, 
  animation = "float", 
  className = "" 
}: HoverAnimationProps) {
  const getHoverClass = () => {
    switch (animation) {
      case "wiggle":
        return "hover:animate-wiggle"
      case "scale":
        return "hover:scale-105 transition-transform duration-200"
      default:
        return "hover:animate-float"
    }
  }

  return (
    <div className={cn(getHoverClass(), "cursor-pointer", className)}>
      {children}
    </div>
  )
}

export function FadeInWhenVisible({ 
  children, 
  className = "",
  threshold = 0.1 
}: { 
  children: ReactNode
  className?: string
  threshold?: number 
}) {
  // This would ideally use Intersection Observer for better performance
  // For now, we'll use a simple fade-in animation
  return (
    <div className={cn("animate-fade-in", className)}>
      {children}
    </div>
  )
}