import React from 'react'
import TopBar from './TopBar.jsx'
import Nav from './Nav.jsx'
import { C, globalStyles } from '../../theme/constants.js'

export default function PageLayout({ children, showNav = true }) {
  return (
    <div style={{ background: C.cream, minHeight: "100vh" }}>
      <style>{globalStyles}</style>
      <TopBar />
      {showNav && (
        <div className="enuw-container">
          <Nav />
        </div>
      )}
      {children}
    </div>
  )
}
