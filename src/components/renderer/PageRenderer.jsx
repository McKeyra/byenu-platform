/**
 * PageRenderer Component
 * Renders a complete page from component structure
 * 
 * Takes a structure array from generatePageStructure() and renders each component
 * with its props in the correct order.
 */

import React from 'react'
import {
  StickyHeader,
  SolidHeader,
  CenteredHero,
  SplitHero,
  StoryAbout,
  TeamAbout,
  FeaturesGrid,
  TabbedFeatures,
  TestimonialCarousel,
  ContactSection,
  StandardFooter
} from '../library/index.js'

/**
 * Component mapping - maps component names to actual React components
 */
const COMPONENT_MAP = {
  // Headers
  StickyHeader,
  SolidHeader,
  
  // Heroes
  CenteredHero,
  SplitHero,
  
  // About
  StoryAbout,
  TeamAbout,
  
  // Features
  FeaturesGrid,
  TabbedFeatures,
  
  // Testimonials
  TestimonialCarousel,
  
  // Contact
  ContactSection,
  
  // Footers
  StandardFooter
}

/**
 * PageRenderer Component
 * @param {Object} props
 * @param {Array} props.structure - Component structure array from generatePageStructure()
 * @param {Object} props.siteContent - Optional site content override
 * @param {Function} props.onComponentUpdate - Optional callback when component is updated
 */
export default function PageRenderer({ structure = [], siteContent = null, onComponentUpdate = null }) {
  if (!structure || structure.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAFAF5',
        color: '#6B7280',
        fontFamily: "'DM Sans', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>No content to display</p>
          <p style={{ fontSize: '14px' }}>Your site structure is empty. Please generate a site first.</p>
        </div>
      </div>
    )
  }

  // Sort structure by order if not already sorted
  const sortedStructure = [...structure].sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <div className="page-renderer" style={{ minHeight: '100vh' }}>
      {sortedStructure.map((item, index) => {
        const { type, variant, component: componentName, props: componentProps = {} } = item
        
        // Get the actual React component
        const Component = COMPONENT_MAP[componentName]
        
        if (!Component) {
          console.warn(`Component "${componentName}" not found in COMPONENT_MAP`)
          return (
            <div key={index} style={{
              padding: '32px',
              background: '#FFF',
              border: '1px dashed #E8E8E0',
              margin: '16px',
              borderRadius: '8px',
              textAlign: 'center',
              color: '#6B7280'
            }}>
              <p>Component "{componentName}" not found</p>
            </div>
          )
        }

        // Merge siteContent overrides if provided
        let finalProps = { ...componentProps }
        if (siteContent && siteContent[type]) {
          finalProps = { ...finalProps, ...siteContent[type] }
        }

        // Add key for React
        const key = `${type}-${variant}-${index}`

        try {
          return (
            <Component
              key={key}
              {...finalProps}
              onUpdate={onComponentUpdate ? (updatedProps) => {
                onComponentUpdate(type, variant, updatedProps)
              } : undefined}
            />
          )
        } catch (error) {
          console.error(`Error rendering component ${componentName}:`, error)
          return (
            <div key={key} style={{
              padding: '32px',
              background: '#FFF',
              border: '1px solid #E8756D',
              margin: '16px',
              borderRadius: '8px',
              textAlign: 'center',
              color: '#E8756D'
            }}>
              <p>Error rendering component "{componentName}"</p>
              <p style={{ fontSize: '12px', marginTop: '8px' }}>{error.message}</p>
            </div>
          )
        }
      })}
    </div>
  )
}

/**
 * Render page structure to HTML string (for static export)
 * This is a utility function for generating static HTML
 */
export function renderToHTML(structure = []) {
  // This would be used for static site generation
  // For now, we'll use React rendering
  // Future: Implement server-side rendering or static HTML generation
  return null
}

/**
 * Get component count by type
 */
export function getComponentStats(structure = []) {
  const stats = {}
  structure.forEach(item => {
    const type = item.type || 'unknown'
    stats[type] = (stats[type] || 0) + 1
  })
  return stats
}
