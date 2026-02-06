import React from 'react'
import { colors } from '../../styles/design-system'

const css = `
  .top-gradient-bar {
    height: 3px;
    background: linear-gradient(90deg, ${colors.mint}, ${colors.gold}, ${colors.mintLight}, ${colors.mint});
    background-size: 300% 100%;
    animation: barShift 10s ease infinite;
    width: 100%;
    position: relative;
    z-index: 1000;
  }
  @keyframes barShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`

export default function TopGradientBar() {
  return (
    <>
      <style>{css}</style>
      <div className="top-gradient-bar" />
    </>
  )
}
