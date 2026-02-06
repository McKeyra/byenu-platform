import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Nav() {
  const navigate = useNavigate()

  const handleStartBuilding = () => {
    navigate('/wizard-selector')
  }

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">
        bye<span>NU</span>
      </Link>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#examples">Examples</a>
        <Link to="/docs">Support</Link>
        <button className="nav-cta" onClick={handleStartBuilding}>
          Start Building →
        </button>
      </div>
    </nav>
  )
}
