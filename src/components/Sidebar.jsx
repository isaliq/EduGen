import React from 'react';
import { 
  Home, 
  FileText, 
  Layers, 
  BookOpen, 
  Database, 
  KeyRound, 
  CheckSquare, 
  Languages, 
  FolderArchive, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'generate', label: 'Generate Paper', icon: FileText, badge: 'Core' },
  { id: 'worksheet', label: 'Worksheet Generator', icon: Layers },
  { id: 'lesson-plan', label: 'Lesson Plan', icon: BookOpen },
  { id: 'question-bank', label: 'Question Bank', icon: Database, count: '1,200+' },
  { id: 'answer-key', label: 'Answer Key', icon: KeyRound },
  { id: 'paper-checker', label: 'Paper Checker', icon: CheckSquare, badge: 'AI' },
  { id: 'translate', label: 'Translate Notes', icon: Languages },
  { id: 'saved-papers', label: 'Saved Papers', icon: FolderArchive },
  { id: 'profile', label: 'Profile', icon: UserCheck }
];

export default function Sidebar({ activeTab, onSelectTab, onOpenUpgrade }) {
  return (
    <aside className="app-sidebar" style={{
      width: 'var(--sidebar-width)',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-light)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 40,
      overflowY: 'auto'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '20px 20px 18px',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <img
          src="/edugen-icon.png"
          alt="EduGen AI Icon"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            objectFit: 'cover',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.25)',
            flexShrink: 0
          }}
        />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontSize: '1.22rem',
              fontWeight: '800',
              color: 'var(--text-dark)',
              letterSpacing: '-0.02em'
            }}>
              EduGen
            </span>
            <span style={{
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              color: '#FFFFFF',
              fontSize: '0.65rem',
              fontWeight: '700',
              padding: '2px 6px',
              borderRadius: '6px',
              textTransform: 'uppercase'
            }}>
              AI
            </span>
          </div>
          <p style={{
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontWeight: '500',
            marginTop: '1px'
          }}>
            Smart Tools for Teachers
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{
          fontSize: '0.72rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--text-subtle)',
          padding: '8px 12px 6px'
        }}>
          Workspace
        </div>

        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: isActive 
                  ? 'var(--primary-blue-light)' 
                  : 'transparent',
                color: isActive 
                  ? 'var(--primary-blue)' 
                  : 'var(--text-body)',
                fontWeight: isActive ? '600' : '500',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all var(--transition-fast)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--bg-muted)';
                  e.currentTarget.style.color = 'var(--text-dark)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-body)';
                }
              }}
            >
              <Icon 
                size={18} 
                style={{ 
                  color: isActive ? 'var(--primary-blue)' : 'var(--text-muted)',
                  transition: 'color var(--transition-fast)'
                }} 
              />
              <span style={{ flex: 1 }}>{item.label}</span>

              {item.badge && (
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: '700',
                  padding: '2px 7px',
                  borderRadius: '10px',
                  background: item.badge === 'Core' ? '#4F46E5' : '#22C55E',
                  color: '#FFFFFF'
                }}>
                  {item.badge}
                </span>
              )}

              {item.count && (
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  color: 'var(--text-subtle)'
                }}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Upgrade Card */}
      <div style={{ padding: '16px 14px 20px' }}>
        <div style={{
          background: 'linear-gradient(145deg, #F5F3FF, #EEF2FF)',
          border: '1px solid #DDD6FE',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '6px'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Sparkles size={15} />
            </div>
            <span style={{
              fontWeight: '700',
              fontSize: '0.9rem',
              color: 'var(--text-dark)'
            }}>
              EduGen Pro
            </span>
          </div>

          <p style={{
            fontSize: '0.76rem',
            color: 'var(--text-muted)',
            lineHeight: 1.4,
            marginBottom: '12px'
          }}>
            Unlimited 100-mark papers, AI handwriting OCR & bulk PDF watermarks.
          </p>

          <button
            onClick={onOpenUpgrade}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)',
              transition: 'transform var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span>Upgrade School License</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
