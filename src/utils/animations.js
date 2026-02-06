/**
 * Animation utilities for polish features
 */

/**
 * Intersection Observer for scroll-triggered reveals
 */
export function createScrollReveal(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    staggerDelay = 100,
  } = options

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
            entry.target.classList.add('revealed')
          }, index * staggerDelay)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold, rootMargin }
  )

  return observer
}

/**
 * Initialize scroll reveals for elements with data-reveal attribute
 */
export function initScrollReveals() {
  const elements = document.querySelectorAll('[data-reveal]')
  const observer = createScrollReveal()

  elements.forEach((el) => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
    observer.observe(el)
  })
}

/**
 * Staggered entry animation for hero sections
 */
export function staggerHeroEntry(selector, delay = 150) {
  const elements = document.querySelectorAll(selector)
  
  elements.forEach((el, index) => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    
    setTimeout(() => {
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, index * delay)
  })
}

/**
 * Smooth scroll to anchor
 */
export function smoothScrollTo(target, offset = 0) {
  const element = document.querySelector(target)
  if (!element) return

  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}

/**
 * Page transition fade
 */
export function fadePageTransition(callback) {
  const body = document.body
  body.style.opacity = '0'
  body.style.transition = 'opacity 0.15s ease-out'

  setTimeout(() => {
    callback()
    setTimeout(() => {
      body.style.opacity = '1'
    }, 10)
  }, 150)
}

/**
 * Loading skeleton animation
 */
export function createSkeletonLoader(className = 'skeleton') {
  const style = document.createElement('style')
  style.textContent = `
    .${className} {
      background: linear-gradient(
        90deg,
        #f0f0f0 25%,
        #e0e0e0 50%,
        #f0f0f0 75%
      );
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s ease-in-out infinite;
    }
    
    @keyframes skeleton-loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `
  document.head.appendChild(style)
}

/**
 * Typing indicator animation
 */
export function createTypingIndicator(container) {
  const dots = container.querySelectorAll('.typing-dot')
  dots.forEach((dot, index) => {
    dot.style.animation = `typing-pulse 1.4s ease-in-out infinite`
    dot.style.animationDelay = `${index * 0.2}s`
  })

  const style = document.createElement('style')
  style.textContent = `
    @keyframes typing-pulse {
      0%, 60%, 100% {
        opacity: 0.3;
        transform: scale(0.8);
      }
      30% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `
  document.head.appendChild(style)
}
