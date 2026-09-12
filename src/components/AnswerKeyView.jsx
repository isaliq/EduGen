import React, { useState, useEffect } from 'react';
import { 
  KeyRound, 
  Printer, 
  CheckCircle2, 
  FileText, 
  Copy, 
  Check, 
  Search, 
  Award, 
  Sliders,
  RotateCw,
  Sparkles
} from 'lucide-react';
import { CLASSES, SUBJECTS, getChaptersForClassAndSubject } from '../data/curriculumData';
import { generateDynamicAnswerKey } from '../services/dynamicModelGenerators';

export default function AnswerKeyView() {
  const [cls, setCls] = useState('8');
  const [subject, setSubject] = useState('Science');
  const [chapter, setChapter] = useState('Force and Pressure');
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const chapters = getChaptersForClassAndSubject(cls, subject);

  useEffect(() => {
    if (chapters.length > 0) {
      setChapter(chapters[0].name);
    }
  }, [cls, subject]);

  useEffect(() => {
    handleGenerate();
  }, [cls, subject, chapter]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const items = generateDynamicAnswerKey({ cls, subject, chapter });
      setSolutions(items);
      setIsGenerating(false);
    }, 250);
  };

  const handleCopy = (idx, text) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-dark)' }}>
              Answer Key & Step-Wise Marking Scheme
            </h1>
            <span className="badge badge-green">Dynamic Rubrics</span>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            Standardized model answers, point-by-point partial marking guidelines, and expected student keywords for any chapter.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-secondary"
            style={{ padding: '10px 18px' }}
          >
            <RotateCw size={16} className={isGenerating ? 'animate-spin' : ''} />
            <span>Regenerate Key</span>
          </button>

          <button
            onClick={handlePrint}
            className="btn-primary"
            style={{ padding: '10px 18px' }}
          >
            <Printer size={16} />
            <span>Print Marking Scheme</span>
          </button>
        </div>
      </div>

      {/* Selectors */}
      <div className="card-glass no-print" style={{ padding: '18px 24px', borderRadius: 'var(--radius-xl)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <label className="form-label">Class</label>
            <select
              className="form-select"
              value={cls}
              onChange={(e) => setCls(e.target.value)}
              style={{ width: '100%' }}
            >
              {CLASSES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Subject</label>
            <select
              className="form-select"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{ width: '100%' }}
            >
              {SUBJECTS.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Target Chapter</label>
            <select
              className="form-select"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              style={{ width: '100%' }}
            >
              {chapters.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Solutions Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {solutions.map((item, idx) => {
          const isCopied = copiedIdx === idx;

          return (
            <div
              key={idx}
              className="card-glass"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    background: 'var(--primary-blue)',
                    color: '#FFFFFF',
                    fontWeight: '800',
                    fontSize: '0.82rem',
                    padding: '3px 10px',
                    borderRadius: '6px'
                  }}>
                    {item.qNum}
                  </span>
                  <span className="badge badge-neutral">{item.type}</span>
                </div>

                <button
                  onClick={() => handleCopy(idx, `${item.question}\n\nModel Answer:\n${item.modelAnswer}`)}
                  className="btn-ghost"
                  style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                >
                  {isCopied ? <Check size={14} color="var(--success-green)" /> : <Copy size={14} />}
                  <span>{isCopied ? 'Copied' : 'Copy Solution'}</span>
                </button>
              </div>

              {/* Question */}
              <div style={{ fontSize: '0.96rem', fontWeight: '600', color: 'var(--text-dark)' }}>
                {item.question}
              </div>

              {/* Model Answer */}
              <div style={{
                background: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px',
                color: '#14532D'
              }}>
                <div style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="var(--success-green)" />
                  <span>Model Answer / Verified Solution:</span>
                </div>
                <div style={{ fontSize: '0.92rem', whiteSpace: 'pre-line', lineHeight: 1.55 }}>
                  {item.modelAnswer}
                </div>
              </div>

              {/* Step-wise Marking Scheme Table */}
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Step-Wise Rubric & Partial Marking:
                </div>
                <div style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  {item.markingScheme.map((step, sIdx) => (
                    <div 
                      key={sIdx} 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 14px',
                        background: sIdx % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-subtle)',
                        borderBottom: sIdx < item.markingScheme.length - 1 ? '1px solid var(--border-light)' : 'none',
                        fontSize: '0.85rem'
                      }}
                    >
                      <span style={{ color: 'var(--text-body)' }}>{step.criteria}</span>
                      <span style={{ fontWeight: '700', color: 'var(--primary-blue)', background: 'var(--primary-blue-light)', padding: '2px 8px', borderRadius: '4px' }}>
                        +{step.marks} M
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
