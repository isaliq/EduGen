import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  PlusCircle, 
  CheckCircle2, 
  ChevronDown, 
  Sparkles,
  Command,
  BookOpen,
  Calendar,
  X
} from 'lucide-react';

export default function Navbar({ onSelectTab, profile, onSearchClick }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'JKBOSE 2026 Blueprint Updated',
      time: '10 mins ago',
      desc: 'Class 8 Science mark distribution now includes 10 marks dedicated HOTS section.',
      unread: true
    },
    {
      id: 2,
      title: '50 New Urdu Question Bank Items Added',
      time: '2 hours ago',
      desc: 'Poetry and grammar sections now support automated rubric marking.',
      unread: true
    },
    {
      id: 3,
      title: 'CBSE Sample Papers Synchronized',
      time: 'Yesterday',
      desc: 'Annual Examination templates updated to latest NCERT rationalized syllabus.',
      unread: false
    }
  ];

  const searchableItems = [
    { label: 'Generate 100-Mark Question Paper', tab: 'generate', category: 'Tool' },
    { label: 'Class 8 Science Annual Exam', tab: 'generate', category: 'Paper' },
    { label: 'Class 10 Mathematics Question Bank', tab: 'question-bank', category: 'Bank' },
    { label: 'Worksheet Generator (Matching & Blanks)', tab: 'worksheet', category: 'Tool' },
    { label: 'NEP 2020 Aligned Lesson Plan Builder', tab: 'lesson-plan', category: 'Tool' },
    { label: 'Handwriting AI Paper Checker', tab: 'paper-checker', category: 'AI Tool' },
    { label: 'Translate Notes to Urdu & Hindi', tab: 'translate', category: 'Tool' },
    { label: 'Saved Exam Papers Archive', tab: 'saved-papers', category: 'Archive' }
  ];

  const filteredItems = searchQuery.trim() === '' 
    ? searchableItems 
    : searchableItems.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <header className="app-navbar" style={{
      height: 'var(--topbar-height)',
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 36px',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      {/* Search Bar */}
      <div style={{ position: 'relative', width: '440px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'var(--bg-muted)',
          padding: '9px 16px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid transparent',
          transition: 'all var(--transition-fast)'
        }}>
          <Search size={17} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search for tools, papers, or subjects..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '0.88rem',
              color: 'var(--text-dark)'
            }}
          />
          {searchQuery ? (
            <button 
              onClick={() => { setSearchQuery(''); setShowSearchDropdown(false); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
            >
              <X size={15} />
            </button>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '6px',
              padding: '2px 6px',
              fontSize: '0.7rem',
              fontWeight: '600',
              color: 'var(--text-muted)'
            }}>
              <span>Ctrl</span>
              <span>K</span>
            </div>
          )}
        </div>

        {/* Search Autocomplete Dropdown */}
        {showSearchDropdown && (
          <div 
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-modal)',
              zIndex: 50,
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '8px 12px', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>
              Quick Navigation
            </div>
            <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
              {filteredItems.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    onSelectTab(item.tab);
                    setShowSearchDropdown(false);
                    setSearchQuery('');
                  }}
                  style={{
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--border-light)',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-muted)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: '0.88rem', fontWeight: '500', color: 'var(--text-dark)' }}>{item.label}</span>
                  <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>{item.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Quick New Paper CTA */}
        <button
          onClick={() => onSelectTab('generate')}
          className="btn-primary"
          style={{ padding: '8px 16px', fontSize: '0.88rem' }}
        >
          <PlusCircle size={16} />
          <span>New 100M Paper</span>
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              background: showNotifications ? 'var(--bg-muted)' : 'var(--bg-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-dark)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Bell size={18} />
            <span style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--rose-danger)'
            }} />
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              right: 0,
              width: '340px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-modal)',
              padding: '16px',
              zIndex: 50
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
                paddingBottom: '8px',
                borderBottom: '1px solid var(--border-light)'
              }}>
                <span style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-dark)' }}>Notifications</span>
                <span className="badge badge-blue">2 New</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {notifications.map((n) => (
                  <div key={n.id} style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: n.unread ? 'var(--primary-blue-light)' : 'var(--bg-subtle)',
                    borderLeft: n.unread ? '3px solid var(--primary-blue)' : '3px solid transparent'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-dark)' }}>{n.title}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>{n.time}</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-body)', lineHeight: 1.35 }}>{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Plan Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--success-green-light)',
          border: '1px solid #BBF7D0',
          padding: '6px 12px',
          borderRadius: 'var(--radius-full)'
        }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--success-green)' }} />
          <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#15803D' }}>Teacher Pro</span>
        </div>

        {/* Teacher Avatar & Profile Details */}
        <div 
          onClick={() => onSelectTab('profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: 'var(--radius-md)',
            transition: 'background var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-muted)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4F46E5, #06B6D4)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '0.9rem',
            boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)'
          }}>
            {profile?.name ? profile.name.split(' ').map(n => n[0]).slice(0, 2).join('') : 'TM'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-dark)', lineHeight: 1.2 }}>
              {profile?.name || 'Prof. Tariq Ahmad'}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {profile?.preferredBoard || 'JKBOSE'} • Classes 1–10
            </span>
          </div>
          <ChevronDown size={14} color="var(--text-muted)" />
        </div>
      </div>
    </header>
  );
}
