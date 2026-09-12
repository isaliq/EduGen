import React from 'react';
import { Sparkles, PlayCircle, ArrowRight, BookCheck, ShieldCheck } from 'lucide-react';

export default function HeroBanner({ onGenerateClick, onWatchClick }) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: 'var(--radius-2xl)',
      background: 'linear-gradient(135deg, #312E81 0%, #4338CA 40%, #6366F1 80%, #7C3AED 100%)',
      color: '#FFFFFF',
      padding: '40px 48px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px -10px rgba(79, 70, 229, 0.35)',
      marginBottom: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '32px'
    }}>
      {/* Decorative Background Circles */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '25%',
        width: '240px',
        height: '240px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-50px',
        left: '10%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, rgba(255,255,255,0) 70%)',
        pointerEvents: 'none'
      }} />

      {/* Left Content */}
      <div style={{ maxWidth: '620px', zIndex: 2 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.82rem',
          fontWeight: '600',
          marginBottom: '16px'
        }}>
          <Sparkles size={15} color="#FDE047" />
          <span>JKBOSE & CBSE 2025–2026 Aligned Examination Engine</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <img
            src="/edugen-icon.png"
            alt="EduGen AI"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              border: '2px solid rgba(255, 255, 255, 0.4)'
            }}
          />
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            lineHeight: 1.15
          }}>
            Welcome to EduGen AI
          </h1>
        </div>

        <p style={{
          fontSize: '1.2rem',
          fontWeight: '400',
          color: 'rgba(255, 255, 255, 0.9)',
          lineHeight: 1.4,
          marginBottom: '28px'
        }}>
          Your AI Teaching Assistant for Classes 1–10. Generate complete 100-mark question papers, massive question banks, lesson plans, and worksheets in seconds.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={onGenerateClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#FFFFFF',
              color: '#4F46E5',
              border: 'none',
              padding: '14px 26px',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
            }}
          >
            <span>Generate 100-Mark Paper</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={onWatchClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(8px)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '14px 22px',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.96rem',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <PlayCircle size={18} />
            <span>Watch How It Works</span>
          </button>
        </div>
      </div>

      {/* Right Side Classroom Elements Illustration (Blackboard, Books, Pencil Holder, Sticky Note) */}
      <div style={{
        position: 'relative',
        width: '360px',
        height: '240px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        zIndex: 2
      }}>
        <svg viewBox="0 0 360 240" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Soft Shadow Base */}
          <ellipse cx="180" cy="225" rx="140" ry="12" fill="rgba(0,0,0,0.25)" filter="blur(8px)" />

          {/* 1. BLACKBOARD (Wooden frame & dark slate) */}
          <rect x="40" y="24" width="220" height="150" rx="12" fill="#854D0E" stroke="#713F12" strokeWidth="4" />
          <rect x="48" y="32" width="204" height="134" rx="8" fill="#1E293B" />
          
          {/* Blackboard Chalk Content */}
          <text x="65" y="60" fill="#E2E8F0" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">EduGen Board • 100M</text>
          <line x1="65" y1="68" x2="160" y2="68" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          
          <text x="65" y="90" fill="#94A3B8" fontSize="10" fontFamily="Inter, sans-serif">Section A: 20 MCQs [20M]</text>
          <text x="65" y="108" fill="#94A3B8" fontSize="10" fontFamily="Inter, sans-serif">Section B & C: Blanks + T/F</text>
          <text x="65" y="126" fill="#34D399" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">✓ HOTS & Marking Rubrics</text>
          
          {/* Chalk piece on ledge */}
          <rect x="180" y="156" width="22" height="6" rx="2" fill="#F8FAFC" />
          <rect x="150" y="156" width="18" height="6" rx="2" fill="#FDE047" />

          {/* 2. STACK OF COLORFUL BOOKS (Curriculum NCERT & JKBOSE) */}
          {/* Bottom Book (Indigo) */}
          <rect x="160" y="186" width="130" height="18" rx="3" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
          <path d="M160 186 L154 195 L160 204" fill="#2563EB" />
          <line x1="170" y1="195" x2="280" y2="195" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />

          {/* Middle Book (Emerald) */}
          <rect x="175" y="170" width="120" height="17" rx="3" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
          <line x1="185" y1="178" x2="285" y2="178" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />

          {/* Top Book (Amber/Orange) */}
          <rect x="190" y="155" width="110" height="16" rx="3" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <line x1="200" y1="163" x2="290" y2="163" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />

          {/* 3. PENCIL HOLDER with Ruler and Pens */}
          <rect x="270" y="140" width="46" height="65" rx="6" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="2" />
          <rect x="278" y="148" width="30" height="48" rx="4" fill="#DDD6FE" />

          {/* Wooden Ruler sticking out */}
          <g transform="rotate(-15 285 135)">
            <rect x="275" y="85" width="12" height="65" rx="2" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
            <line x1="277" y1="95" x2="282" y2="95" stroke="#78350F" strokeWidth="1" />
            <line x1="277" y1="105" x2="284" y2="105" stroke="#78350F" strokeWidth="1" />
            <line x1="277" y1="115" x2="282" y2="115" stroke="#78350F" strokeWidth="1" />
          </g>

          {/* Red Pencil */}
          <g transform="rotate(10 295 135)">
            <rect x="290" y="90" width="8" height="60" fill="#EF4444" />
            <polygon points="290,90 294,76 298,90" fill="#FDE047" />
            <polygon points="293,80 294,76 295,80" fill="#1E293B" />
          </g>

          {/* Blue Pen */}
          <g transform="rotate(22 305 135)">
            <rect x="298" y="85" width="7" height="65" rx="2" fill="#2563EB" />
            <rect x="300" y="92" width="2" height="20" fill="#60A5FA" />
          </g>

          {/* 4. YELLOW STICKY NOTE with Pin */}
          <g transform="rotate(6 260 45)">
            <rect x="235" y="25" width="62" height="62" rx="4" fill="#FEF08A" stroke="#FDE047" strokeWidth="1" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />
            {/* Red pushpin */}
            <circle cx="266" cy="30" r="4" fill="#DC2626" />
            {/* Note text lines */}
            <line x1="242" y1="42" x2="288" y2="42" stroke="#854D0E" strokeWidth="2" strokeLinecap="round" />
            <line x1="242" y1="52" x2="280" y2="52" stroke="#854D0E" strokeWidth="2" strokeLinecap="round" />
            <line x1="242" y1="62" x2="272" y2="62" stroke="#854D0E" strokeWidth="2" strokeLinecap="round" />
            <text x="242" y="76" fill="#B45309" fontSize="8" fontWeight="bold">Exam Prep ✓</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
