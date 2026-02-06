import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Meta Tags Component
 * Sets og:title, og:description, og:image for SEO and social sharing
 */
export default function MetaTags({ title, description, image, type = 'website' }) {
  const location = useLocation()
  const baseUrl = window.location.origin
  const fullUrl = `${baseUrl}${location.pathname}`
  const defaultImage = `${baseUrl}/og-image.png` // You'll need to create this

  useEffect(() => {
    // Update document title
    document.title = title ? `${title} | byeNU` : 'byeNU - From conversation to live website'

    // Update or create meta tags
    const updateMetaTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`) || 
                 document.querySelector(`meta[name="${property}"]`)
      
      if (!meta) {
        meta = document.createElement('meta')
        if (property.startsWith('og:')) {
          meta.setAttribute('property', property)
        } else {
          meta.setAttribute('name', property)
        }
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // Set meta tags
    updateMetaTag('og:title', title || 'byeNU - From conversation to live website')
    updateMetaTag('og:description', description || 'Tell NU what you need. Your website builds itself while you watch. No coding. No design skills. No templates.')
    updateMetaTag('og:image', image || defaultImage)
    updateMetaTag('og:url', fullUrl)
    updateMetaTag('og:type', type)
    updateMetaTag('description', description || 'Tell NU what you need. Your website builds itself while you watch.')
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title || 'byeNU')
    updateMetaTag('twitter:description', description || 'From conversation to live website')
    updateMetaTag('twitter:image', image || defaultImage)

    // Cleanup function
    return () => {
      // Optionally reset to defaults on unmount
    }
  }, [title, description, image, type, fullUrl, defaultImage])

  return null // This component doesn't render anything
}
