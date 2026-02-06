import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Page transition wrapper component
 * Adds fade + translateY transition on route changes
 */
export default function PageTransition({ children }) {
  const location = useLocation()

  useEffect(() => {
    // Add transition class to body
    document.body.style.transition = 'opacity 0.15s ease-out, transform 0.15s ease-out'
    document.body.style.opacity = '0'
    document.body.style.transform = 'translateY(8px)'

    // Fade in after a brief delay
    const timer = setTimeout(() => {
      document.body.style.opacity = '1'
      document.body.style.transform = 'translateY(0)'
    }, 10)

    return () => {
      clearTimeout(timer)
      // Reset styles on cleanup
      document.body.style.transition = ''
      document.body.style.opacity = ''
      document.body.style.transform = ''
    }
  }, [location.pathname])

  return <>{children}</>
}
