import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, CheckCircle2, FileText, Printer, Database } from 'lucide-react';

export default function HowItWorksModal({ isOpen, onClose, onStartGenerating }) {
  if (!isOpen) return null;

  const steps = [
    {
      num: '01',
      title: 'Select Board & Syllabus (Classes 1–10)',
      desc: 'Pick your education board (JKBOSE or CBSE), choose the class level, and target subjects like Science, Maths, Social Science, Urdu, or Hindi.',
      icon: Database
    },
    {
      num: '02',
      title: 'Multi-Select Chapters & Blueprint Rules',
      desc: 'Select one or more chapters. EduGen AI dynamically calculates weightage so no questions are repeated and all selected chapters receive balanced representation.',
      icon: Sparkles
    },
    {
      num: '03',
      title: 'Complete 7-Section 100-Mark Synthesis',
      desc: 'Generates Section A (20 MCQs), Section B (10 Blanks), Section C (10 T/F), Section D (10 VSA), Section E (Short), Section F (Long with OR choices), and Section G (HOTS).',
      icon: FileText
    },
    {
      num: '04',
      title: 'One-Click Print & PDF Export',
      desc: 'Review the live A4 preview matching authentic board papers. Edit questions inline, reveal model answers & step-wise marking schemes, and print cleanly.',
      icon: Printer
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '24px'
    }}>
      <div className="card-glass" style={{
        maxWidth: '720px',
        width: '100%',
        padding: '36px',
        borderRadius: 'var(--radius-2xl)',
        boxShadow: 'var(--shadow-modal)',
        position: 'relative'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--bg-muted)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-dark)'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
          <img
            src="/edugen-icon.png"
            alt="EduGen AI Icon"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.25)'
            }}
          />
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary-blue)', fontWeight: '700', fontSize: '0.78rem', marginBottom: '2px' }}>
              <Sparkles size={14} />
              <span>Interactive Tour</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-dark)', margin: 0 }}>
              How EduGen AI Works
            </h2>
          </div>
        </div>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
          Watch how teachers save 4 to 6 hours every exam cycle by creating standardized 100-mark papers in four simple steps:
        </p>

        {/* Step cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'var(--primary-blue-light)',
                  color: 'var(--primary-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  flexShrink: 0
                }}>
                  {s.num}
                </div>

                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.96rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '2px' }}>
                    {s.title}
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.45 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '10px 20px' }}
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              if (onStartGenerating) onStartGenerating();
            }}
            className="btn-primary"
            style={{ padding: '10px 24px' }}
          >
            <span>Try Generating Now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
