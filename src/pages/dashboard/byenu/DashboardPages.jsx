import React, { useState } from 'react'
import { C } from '../../../theme/constants.js'
import { FileText, Eye, EyeOff, MoreVertical, Plus, Search } from 'lucide-react'
import { useUserWebsites } from '../../../hooks/useDashboard.js'
import { DashboardLoadingSkeleton, ErrorState } from '../../../components/dashboard/LoadingState.jsx'
import { formatDistanceToNow } from 'date-fns'

export default function DashboardPages() {
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [searchQuery, setSearchQuery] = useState('')
  const { data: websites, isLoading, error } = useUserWebsites()
  const website = websites?.[0]

  if (isLoading) {
    return <DashboardLoadingSkeleton theme="corp" />
  }

  if (error) {
    return <ErrorState message="Failed to load pages" />
  }

  if (!website) {
    return (
      <div style={{ padding: '48px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Fraunces', fontSize: '24px', color: C.charcoal }}>
          No website found
        </h2>
      </div>
    )
  }

  // Extract pages from website.pages_json
  const allPages = website.pages_json || []
  const pages = allPages
    .filter(page => !searchQuery || page.title?.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(page => ({
      id: page.id || page.slug,
      title: page.title || page.slug,
      slug: page.slug || page.path || '/',
      status: page.status || 'draft',
      lastEdit: page.updated_at ? formatDistanceToNow(new Date(page.updated_at), { addSuffix: true }) : 'Never',
      thumbnail: page.thumbnail || null
    }))

  return (
    <div>
      <style>{`
        .byenu-pages-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        .byenu-pages-title {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 600;
          color: ${C.charcoal};
        }
        .byenu-pages-actions {
          display: flex;
          gap: 12px;
        }
        .byenu-pages-search {
          position: relative;
          margin-bottom: 24px;
        }
        .byenu-pages-search input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          border: 2px solid ${C.border};
          border-radius: 12px;
          font-size: 14px;
          font-family: inherit;
          color: ${C.charcoal};
          outline: none;
          transition: border-color 0.2s;
        }
        .byenu-pages-search input:focus {
          border-color: ${C.mint};
        }
        .byenu-pages-search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: ${C.gray};
        }
        .byenu-pages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .byenu-page-card {
          background: ${C.white};
          border: 1px solid ${C.border};
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.2s;
          cursor: pointer;
        }
        .byenu-page-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .byenu-page-thumbnail {
          width: 100%;
          height: 180px;
          background: ${C.cream};
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${C.gray};
        }
        .byenu-page-content {
          padding: 20px;
        }
        .byenu-page-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 12px;
        }
        .byenu-page-title {
          font-weight: 600;
          color: ${C.charcoal};
          font-size: 16px;
          margin-bottom: 4px;
        }
        .byenu-page-slug {
          font-size: 13px;
          color: ${C.gray};
        }
        .byenu-page-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }
        .byenu-page-status.published {
          background: ${C.successGlow};
          color: ${C.success};
        }
        .byenu-page-status.draft {
          background: ${C.goldGlow};
          color: ${C.gold};
        }
        .byenu-page-status.hidden {
          background: ${C.grayPale};
          color: ${C.gray};
        }
        .byenu-page-meta {
          font-size: 13px;
          color: ${C.gray};
        }
      `}</style>

      <div className="byenu-pages-header">
        <h1 className="byenu-pages-title">Pages</h1>
        <div className="byenu-pages-actions">
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: C.mint, color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
            <Plus size={18} />
            Add Page
          </button>
        </div>
      </div>

      <div className="byenu-pages-search">
        <Search className="byenu-pages-search-icon" size={18} />
        <input 
          type="text" 
          placeholder="Search pages..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {pages.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', color: C.gray }}>
          {searchQuery ? 'No pages found matching your search' : 'No pages yet. Add your first page!'}
        </div>
      ) : (
        <div className="byenu-pages-grid">
          {pages.map(page => (
          <div key={page.id} className="byenu-page-card">
            <div className="byenu-page-thumbnail">
              <FileText size={48} />
            </div>
            <div className="byenu-page-content">
              <div className="byenu-page-header">
                <div>
                  <div className="byenu-page-title">{page.title}</div>
                  <div className="byenu-page-slug">/{page.slug}</div>
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.gray }}>
                  <MoreVertical size={18} />
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                <span className={`byenu-page-status ${page.status}`}>
                  {page.status === 'published' && <Eye size={12} />}
                  {page.status === 'draft' && <EyeOff size={12} />}
                  {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                </span>
                <div className="byenu-page-meta">{page.lastEdit}</div>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  )
}
