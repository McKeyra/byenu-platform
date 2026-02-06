import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const C = {
  mint: "#1A7A6D",
  mintLight: "#2EC4B6",
  mintGlow: "rgba(26,122,109,0.08)",
  gold: "#D4A843",
  coral: "#E8756D",
  cream: "#FAFAF5",
  white: "#FFFFFF",
  charcoal: "#1A1A2E",
  gray: "#6B7280",
  grayLight: "#9CA3AF",
  border: "#E8E8E0",
}

export default function NotFound() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Simple search - redirect to home with query
      navigate(`/?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: C.cream,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
        animation: 'fadeInUp 0.5s ease-out',
      }}>
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        {/* Logo */}
        <div style={{
          fontFamily: "'Fraunces', serif",
          fontSize: '32px',
          fontWeight: 700,
          marginBottom: '24px',
          color: C.charcoal,
        }}>
          bye<span style={{ color: C.mint }}>NU</span>
        </div>

        {/* 404 Number */}
        <div style={{
          fontSize: '120px',
          fontWeight: 700,
          fontFamily: "'Fraunces', serif",
          color: C.mint,
          lineHeight: 1,
          marginBottom: '16px',
          letterSpacing: '-4px',
        }}>
          404
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '36px',
          fontWeight: 600,
          fontFamily: "'Fraunces', serif",
          color: C.charcoal,
          marginBottom: '12px',
          letterSpacing: '-0.8px',
        }}>
          Lost? Let NU help.
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '16px',
          color: C.gray,
          marginBottom: '32px',
          lineHeight: 1.6,
        }}>
          The page you're looking for doesn't exist. But we can help you find what you need.
        </p>

        {/* Search Input */}
        <form onSubmit={handleSearch} style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            maxWidth: '480px',
            margin: '0 auto',
          }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for pages, features, or help..."
              style={{
                flex: 1,
                padding: '14px 18px',
                border: `2px solid ${C.border}`,
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: 'inherit',
                background: C.white,
                color: C.charcoal,
                outline: 'none',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = C.mint
                e.target.style.boxShadow = `0 0 0 4px ${C.mintGlow}`
              }}
              onBlur={(e) => {
                e.target.style.borderColor = C.border
                e.target.style.boxShadow = 'none'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '14px 28px',
                background: C.mint,
                color: C.white,
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = C.gold
                e.target.style.color = C.charcoal
                e.target.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = C.mint
                e.target.style.color = C.white
                e.target.style.transform = 'translateY(0)'
              }}
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick Links */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '40px',
        }}>
          <Link
            to="/"
            style={{
              padding: '10px 20px',
              border: `1px solid ${C.border}`,
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              color: C.charcoal,
              textDecoration: 'none',
              background: C.white,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = C.mint
              e.target.style.color = C.mint
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = C.border
              e.target.style.color = C.charcoal
              e.target.style.transform = 'translateY(0)'
            }}
          >
            Home
          </Link>
          <Link
            to="/features"
            style={{
              padding: '10px 20px',
              border: `1px solid ${C.border}`,
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              color: C.charcoal,
              textDecoration: 'none',
              background: C.white,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = C.mint
              e.target.style.color = C.mint
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = C.border
              e.target.style.color = C.charcoal
              e.target.style.transform = 'translateY(0)'
            }}
          >
            Features
          </Link>
          <Link
            to="/pricing"
            style={{
              padding: '10px 20px',
              border: `1px solid ${C.border}`,
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              color: C.charcoal,
              textDecoration: 'none',
              background: C.white,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = C.mint
              e.target.style.color = C.mint
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = C.border
              e.target.style.color = C.charcoal
              e.target.style.transform = 'translateY(0)'
            }}
          >
            Pricing
          </Link>
          <Link
            to="/build"
            style={{
              padding: '10px 20px',
              background: C.mint,
              color: C.white,
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = C.gold
              e.target.style.color = C.charcoal
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = C.mint
              e.target.style.color = C.white
              e.target.style.transform = 'translateY(0)'
            }}
          >
            Start Building →
          </Link>
        </div>

        {/* Help Text */}
        <p style={{
          fontSize: '13px',
          color: C.grayLight,
        }}>
          Need help? <Link to="/support" style={{ color: C.mint, textDecoration: 'none' }}>Visit our support page</Link>
        </p>
      </div>
    </div>
  )
}
