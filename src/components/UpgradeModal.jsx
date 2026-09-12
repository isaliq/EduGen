import React from 'react';
import { X, Check, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function UpgradeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const proFeatures = [
    'Unlimited 100-Mark Question Papers & Answers Keys',
    'AI Handwriting Paper Checker with OCR & Auto-grading',
    'Custom School Crest & Official Watermarks on PDFs',
    'Complete Question Bank Access (10,000+ Questions)',
    'Full Multilingual Engine (English, Urdu Nastaliq, Hindi)',
    'Print-Ready A4 and Multi-Page Exam Booklet Exports',
    'Faculty Collaboration & Shared Question Pools',
    'Priority Support for Annual Board Exam Seasons'
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
      padding: '20px'
    }}>
      <div className="card-glass" style={{
        maxWidth: '560px',
        width: '100%',
        padding: '36px',
        borderRadius: 'var(--radius-2xl)',
        boxShadow: 'var(--shadow-modal)',
        position: 'relative'
      }}>
        {/* Close */}
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <img
            src="/edugen-icon.png"
            alt="EduGen AI Icon"
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              boxShadow: '0 6px 16px rgba(124, 58, 237, 0.25)'
            }}
          />
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #F5F3FF, #EEF2FF)',
              border: '1px solid #DDD6FE',
              padding: '2px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.74rem',
              fontWeight: '700',
              color: 'var(--purple-accent)',
              marginBottom: '4px'
            }}>
              <Sparkles size={12} />
              <span>Institutional Upgrade</span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-dark)', margin: 0 }}>
              EduGen AI — School License
            </h2>
          </div>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Equip your entire teaching faculty with cutting-edge test design and automated evaluation.
        </p>

        {/* Pricing card */}
        <div style={{
          background: 'linear-gradient(135deg, #1E1B4B, #312E81)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.82rem', color: '#A5B4FC', fontWeight: '600' }}>ANNUAL FACULTY PASS</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>
              ₹4,999 <span style={{ fontSize: '0.9rem', fontWeight: '400', color: '#C7D2FE' }}>/ school / year</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#E0E7FF', marginTop: '2px' }}>Up to 25 Teacher Accounts</div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '8px 14px',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center'
          }}>
            <Zap size={22} color="#FDE047" style={{ margin: '0 auto' }} />
            <div style={{ fontSize: '0.72rem', fontWeight: '700', marginTop: '2px' }}>7-Day Free Trial</div>
          </div>
        </div>

        {/* Feature list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
          {proFeatures.map((feat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-body)' }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'var(--success-green-light)',
                color: 'var(--success-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Check size={13} strokeWidth={3} />
              </div>
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Action */}
        <button
          onClick={onClose}
          className="btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
        >
          <span>Activate School License (Demo Mode)</span>
        </button>
      </div>
    </div>
  );
}
