import React from 'react';
import { 
  FileText, 
  Layers, 
  BookOpen, 
  Database, 
  KeyRound, 
  CheckSquare, 
  Languages, 
  ArrowUpRight,
  TrendingUp,
  FileCheck2,
  Clock,
  Sparkles
} from 'lucide-react';

export const FEATURE_CARDS = [
  {
    id: 'generate',
    title: 'Generate Question Paper',
    description: 'Complete 100-mark multi-section exams with 20 MCQs, Blanks, T/F, Short, Long & HOTS.',
    icon: FileText,
    accentColor: '#4F46E5',
    accentBg: '#EEF2FF',
    badge: 'Flagship Tool',
    stats: '100 Marks Standard'
  },
  {
    id: 'worksheet',
    title: 'Worksheet Generator',
    description: 'Generate customized practice worksheets, matching columns, and daily homework with student headers.',
    icon: Layers,
    accentColor: '#059669',
    accentBg: '#ECFDF5',
    badge: 'Classes 1–10',
    stats: 'Printable A4'
  },
  {
    id: 'lesson-plan',
    title: 'Lesson Plan Generator',
    description: 'Structured pedagogical plans with objectives, teaching aids, 4-phase classroom activities & rubrics.',
    icon: BookOpen,
    accentColor: '#D97706',
    accentBg: '#FFFBEB',
    badge: 'NEP 2020 Aligned',
    stats: 'Classroom Ready'
  },
  {
    id: 'question-bank',
    title: 'Question Bank',
    description: 'Vast repository of 1,200+ curriculum questions categorized by chapter, difficulty, and question type.',
    icon: Database,
    accentColor: '#7C3AED',
    accentBg: '#F5F3FF',
    badge: 'Infinite Pool',
    stats: 'Filter & Export'
  },
  {
    id: 'answer-key',
    title: 'Answer Key & Rubrics',
    description: 'Instant model answers, step-wise mathematical solutions, and partial marking allocation tables.',
    icon: KeyRound,
    accentColor: '#0284C7',
    accentBg: '#F0F9FF',
    badge: 'Evaluation',
    stats: 'Step Solutions'
  },
  {
    id: 'paper-checker',
    title: 'Paper Checker (AI)',
    description: 'Interactive handwriting evaluation: OCR scanning, keyword matching, and suggested score rubrics.',
    icon: CheckSquare,
    accentColor: '#DC2626',
    accentBg: '#FEF2F2',
    badge: 'Future Ready',
    stats: 'Handwriting OCR'
  },
  {
    id: 'translate',
    title: 'Translate Notes',
    description: 'Translate study notes and questions between English, Urdu (Nastaliq RTL), and Hindi without losing format.',
    icon: Languages,
    accentColor: '#4F46E5',
    accentBg: '#EEF2FF',
    badge: 'Multilingual',
    stats: 'English • Urdu • Hindi'
  }
];

export default function DashboardCards({ onSelectCard, savedPapers = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Quick Metrics Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        <div className="card-glass" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'var(--primary-blue-light)',
            color: 'var(--primary-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Papers Generated</span>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-dark)', lineHeight: 1.1 }}>
              {savedPapers.length > 0 ? savedPapers.length : 1}
            </div>
          </div>
        </div>

        <div className="card-glass" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'var(--purple-accent-light)',
            color: 'var(--purple-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Database size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Questions in Bank</span>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-dark)', lineHeight: 1.1 }}>1,480+</div>
          </div>
        </div>

        <div className="card-glass" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'var(--success-green-light)',
            color: 'var(--success-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileCheck2 size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Class Coverage</span>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-dark)', lineHeight: 1.1 }}>Classes 1–10</div>
          </div>
        </div>

        <div className="card-glass" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: '#FEF3C7',
            color: '#B45309',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Boards Supported</span>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-dark)', lineHeight: 1.1 }}>JKBOSE & CBSE</div>
          </div>
        </div>
      </div>

      {/* Feature Section Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-dark)' }}>
            Teaching & Assessment Suite
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Click any tool to launch workspace
          </span>
        </div>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Every tool is engineered for quick lesson preparation, standardized test delivery, and grading automation.
        </p>
      </div>

      {/* 7 Modern Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {FEATURE_CARDS.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              onClick={() => onSelectCard(card.id)}
              className="card-glass card-interactive"
              style={{
                padding: '28px',
                borderRadius: 'var(--radius-xl)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px'
              }}
            >
              <div>
                {/* Header with Icon and Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '18px'
                }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '16px',
                    background: card.accentBg,
                    color: card.accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 4px 14px ${card.accentColor}25`
                  }}>
                    <Icon size={26} />
                  </div>

                  <span className="badge" style={{
                    background: card.accentBg,
                    color: card.accentColor,
                    border: `1px solid ${card.accentColor}30`
                  }}>
                    {card.badge}
                  </span>
                </div>

                {/* Card Title */}
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  color: 'var(--text-dark)',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {card.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.5,
                  marginBottom: '18px'
                }}>
                  {card.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--border-light)',
                paddingTop: '14px',
                marginTop: '4px'
              }}>
                <span style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                  {card.stats}
                </span>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: card.accentColor,
                  fontWeight: '700',
                  fontSize: '0.84rem'
                }}>
                  <span>Open Tool</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Saved Papers Preview Row on Home */}
      {savedPapers.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-dark)' }}>
              Recent Exam Papers
            </h3>
            <button
              onClick={() => onSelectCard('saved-papers')}
              className="btn-ghost"
              style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--primary-blue)' }}
            >
              View All ({savedPapers.length}) →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {savedPapers.slice(0, 3).map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectCard('saved-papers')}
                className="card-glass"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'transform var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--primary-blue-light)',
                    color: 'var(--primary-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.96rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '2px' }}>
                      {p.schoolName}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {p.board} • Class {p.cls} • {p.subject} • {p.totalMarks} Marks • {p.timeAllowed}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="badge badge-green">100M Ready</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
