import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getSite } from '../api/sites.js'
import { supabase } from '../lib/supabase.js'
import GlassCard from '../components/ui-custom/GlassCard.jsx'
import { ArrowLeft, Monitor, Tablet, Smartphone, Save, Loader2, Eye, Pencil, X } from 'lucide-react'
import { cn } from '../utils/index.js'
import { Input } from '../components/ui/input.jsx'
import { Textarea } from '../components/ui/textarea.jsx'
import { Label } from '../components/ui/label.jsx'

export default function Builder() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const membershipId = searchParams.get('membershipId')
  const [selectedSection, setSelectedSection] = useState('hero')
  const [devicePreview, setDevicePreview] = useState('desktop')
  const [isSaving, setIsSaving] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [content, setContent] = useState(null)

  const { data: siteData, isLoading, refetch } = useQuery({
    queryKey: ['site', membershipId],
    queryFn: () => getSite(membershipId),
    enabled: !!membershipId,
  })

  useEffect(() => {
    if (siteData?.layout_templates?.[0]?.site_content) {
      setContent(siteData.layout_templates[0].site_content)
    }
  }, [siteData])

  const handleContentUpdate = async (section, field, value) => {
    if (!content || !siteData?.layout_templates?.[0]) return

    const updatedContent = {
      ...content,
      [section]: {
        ...content[section],
        [field]: value,
      },
    }

    setContent(updatedContent)

    // Save to database
    setIsSaving(true)
    try {
      await supabase
        .from('bye_nu.layout_templates')
        .update({
          site_content: updatedContent,
        })
        .eq('id', siteData.layout_templates[0].id)

      setTimeout(() => setIsSaving(false), 500)
    } catch (error) {
      console.error('Error saving content:', error)
      setIsSaving(false)
    }
  }

  const profile = siteData?.customer_profiles?.[0]
  const template = siteData?.layout_templates?.[0]
  const membership = siteData

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    )
  }

  if (!membershipId || !siteData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <GlassCard className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">No Site Found</h2>
          <p className="text-slate-600 mb-6">Please claim your website first.</p>
          <Link to="/dashboard">
            <button className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800">
              Go to Dashboard
            </button>
          </Link>
        </GlassCard>
      </div>
    )
  }

  const sections = [
    { id: 'hero', label: 'Hero Section', icon: '🎯' },
    { id: 'about', label: 'About', icon: '📖' },
    { id: 'services', label: 'Services', icon: '✨' },
    { id: 'contact', label: 'Contact', icon: '📧' },
  ]

  return (
    <div className="h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <div>
            <h1 className="font-semibold text-slate-900">
              {profile?.business_name || 'Website'} {isPreviewMode ? 'Preview' : 'Builder'}
            </h1>
            <p className="text-xs text-slate-500">
              {membership?.plan?.charAt(0).toUpperCase() + membership?.plan?.slice(1)} Plan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Device Preview Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            {[
              { id: 'desktop', icon: Monitor },
              { id: 'tablet', icon: Tablet },
              { id: 'mobile', icon: Smartphone },
            ].map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setDevicePreview(id)}
                className={cn(
                  'p-2 rounded-lg transition-all',
                  devicePreview === id ? 'bg-white shadow-sm' : 'text-slate-400 hover:text-slate-600'
                )}
              >
                <Icon className={cn('w-5 h-5', devicePreview === id && 'text-slate-900')} />
              </button>
            ))}
          </div>

          {/* Preview Mode Toggle */}
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={cn(
              'px-4 py-2 rounded-xl transition-colors flex items-center gap-2',
              isPreviewMode
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            )}
          >
            {isPreviewMode ? <Pencil className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {isPreviewMode ? 'Edit' : 'Preview'}
          </button>

          {/* Save Indicator */}
          {isSaving && (
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Saving...</span>
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Section Selector & Properties */}
        {!isPreviewMode && (
          <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
            {/* Section Selector */}
            <div className="p-4 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900 mb-3">Sections</h2>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3',
                      selectedSection === section.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    )}
                  >
                    <span className="text-xl">{section.icon}</span>
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Properties Panel */}
            <div className="flex-1 overflow-y-auto p-4">
              <h2 className="font-semibold text-slate-900 mb-4">Edit Content</h2>
              {content && selectedSection && content[selectedSection] && (
                <div className="space-y-4">
                  {Object.entries(content[selectedSection]).map(([field, value]) => {
                    const isTextarea = field === 'content' || field === 'subtitle' || (field === 'items' && Array.isArray(value))
                    
                    if (field === 'items' && Array.isArray(value)) {
                      return (
                        <div key={field}>
                          <Label className="text-slate-700 font-medium mb-2 block">{field}</Label>
                          <div className="space-y-2">
                            {value.map((item, idx) => (
                              <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                                <Input
                                  value={item.title || ''}
                                  onChange={(e) => {
                                    const updated = [...value]
                                    updated[idx] = { ...updated[idx], title: e.target.value }
                                    handleContentUpdate(selectedSection, field, updated)
                                  }}
                                  placeholder="Title"
                                  className="mb-2"
                                />
                                <Textarea
                                  value={item.description || ''}
                                  onChange={(e) => {
                                    const updated = [...value]
                                    updated[idx] = { ...updated[idx], description: e.target.value }
                                    handleContentUpdate(selectedSection, field, updated)
                                  }}
                                  placeholder="Description"
                                  className="min-h-[60px]"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    }

                    return (
                      <div key={field}>
                        <Label className="text-slate-700 font-medium mb-2 block capitalize">
                          {field.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                        {isTextarea ? (
                          <Textarea
                            value={value || ''}
                            onChange={(e) => handleContentUpdate(selectedSection, field, e.target.value)}
                            className="min-h-[100px]"
                          />
                        ) : (
                          <Input
                            value={value || ''}
                            onChange={(e) => handleContentUpdate(selectedSection, field, e.target.value)}
                            className="h-10"
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Preview Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
          <div
            className={cn(
              'mx-auto bg-white rounded-xl shadow-lg',
              devicePreview === 'desktop' && 'max-w-6xl',
              devicePreview === 'tablet' && 'max-w-3xl',
              devicePreview === 'mobile' && 'max-w-sm'
            )}
          >
            {/* Site Preview */}
            {content && (
              <div className="p-8">
                {/* Hero Section */}
                {content.hero && (
                  <section className="text-center py-16 mb-16 border-b border-slate-200">
                    <h1 className="text-5xl font-bold text-slate-900 mb-4">
                      {content.hero.title || 'Welcome'}
                    </h1>
                    <p className="text-xl text-slate-600 mb-8">
                      {content.hero.subtitle || 'Your subtitle here'}
                    </p>
                    <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors">
                      {content.hero.cta || 'Get Started'}
                    </button>
                  </section>
                )}

                {/* About Section */}
                {content.about && (
                  <section className="py-16 mb-16 border-b border-slate-200">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">
                      {content.about.title || 'About Us'}
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {content.about.content || 'About content here'}
                    </p>
                  </section>
                )}

                {/* Services Section */}
                {content.services && (
                  <section className="py-16 mb-16 border-b border-slate-200">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                      {content.services.title || 'Our Services'}
                    </h2>
                    <p className="text-lg text-slate-600 mb-12 text-center">
                      {content.services.subtitle || 'What we offer'}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {content.services.items?.map((item, idx) => (
                        <div key={idx} className="p-6 bg-slate-50 rounded-xl">
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">
                            {item.title || `Service ${idx + 1}`}
                          </h3>
                          <p className="text-slate-600">
                            {item.description || 'Service description'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Contact Section */}
                {content.contact && (
                  <section className="py-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                      {content.contact.title || 'Get In Touch'}
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 text-center">
                      {content.contact.subtitle || "We'd love to hear from you"}
                    </p>
                    <div className="max-w-md mx-auto">
                      <form className="space-y-4">
                        <Input placeholder="Name" className="h-12" />
                        <Input type="email" placeholder="Email" className="h-12" />
                        <Textarea placeholder="Message" className="min-h-[120px]" />
                        <button
                          type="submit"
                          className="w-full px-6 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                        >
                          Send Message
                        </button>
                      </form>
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
