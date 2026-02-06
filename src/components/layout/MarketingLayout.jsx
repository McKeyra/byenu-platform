import React from 'react'
import TopGradientBar from './TopGradientBar.jsx'
import MarketingNav from './MarketingNav.jsx'
import MarketingFooter from './MarketingFooter.jsx'
import { colors, spacing } from '../../styles/design-system'

const css = `
  .marketing-layout {
    min-height: 100vh;
    background: ${colors.bg};
    display: flex;
    flex-direction: column;
  }
  .marketing-content {
    flex: 1;
    max-width: ${spacing.container.maxWidth};
    margin: 0 auto;
    padding: ${spacing.container.padding};
    width: 100%;
  }
  @media (max-width: 640px) {
    .marketing-content {
      padding: ${spacing.container.paddingMobile};
    }
  }
`

export default function MarketingLayout({ children }) {
  return (
    <>
      <style>{css}</style>
      <div className="marketing-layout">
        <TopGradientBar />
        <MarketingNav />
        <main className="marketing-content">
          {children}
        </main>
        <MarketingFooter />
      </div>
    </>
  )
}
