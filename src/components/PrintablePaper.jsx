import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  Save, 
  Edit3, 
  Check, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Copy, 
  BookCheck,
  RotateCw
} from 'lucide-react';

export default function PrintablePaper({ 
  paper, 
  onSavePaper, 
  onRegenerateSection, 
  onUpdateQuestion 
}) {
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editText, setEditText] = useState('');

  if (!paper) {
    return (
      <div className="card-glass" style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>No paper loaded. Configure and generate one on the left.</p>
      </div>
    );
  }

  const isUrdu = paper.language === 'Urdu';
  const isHindi = paper.language === 'Hindi';

  const handlePrint = () => {
    window.print();
  };

  const startEdit = (q) => {
    setEditingQuestionId(q.id);
    setEditText(q.question || q.statement || '');
  };

  const saveEdit = (sectionId, qId) => {
    if (onUpdateQuestion) {
      onUpdateQuestion(sectionId, qId, editText);
    }
    setEditingQuestionId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Action Bar for the Paper */}
      <div className="action-bar-top" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-card)',
        padding: '12px 20px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-blue">{paper.board}</span>
          <span className="badge badge-purple">Class {paper.cls}</span>
          <span className="badge badge-green">{paper.totalMarks} Marks</span>
          <span className="badge badge-neutral">{paper.timeAllowed}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowAnswerKey(!showAnswerKey)}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.86rem' }}
          >
            {showAnswerKey ? <EyeOff size={16} /> : <Eye size={16} />}
            <span>{showAnswerKey ? 'Hide Answer Key' : 'Show Answer Key & Marking'}</span>
          </button>

          <button
            onClick={onSavePaper}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.86rem' }}
          >
            <Save size={16} />
            <span>Save Paper</span>
          </button>

          <button
            onClick={handlePrint}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.86rem' }}
          >
            <Printer size={16} />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Live A4 Print Paper Container */}
      <div 
        className="a4-preview-card"
        style={{
          background: '#FFFFFF',
          color: '#000000',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
          border: '1px solid var(--border-light)',
          padding: '48px 56px',
          margin: '0 auto',
          width: '100%',
          maxWidth: '850px',
          position: 'relative',
          fontFamily: isUrdu ? 'var(--font-urdu)' : isHindi ? 'var(--font-hindi)' : 'var(--font-sans)',
          direction: isUrdu ? 'rtl' : 'ltr',
          lineHeight: isUrdu ? '2.1' : '1.6'
        }}
      >
        {/* Paper Watermark */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-30deg)',
          fontSize: '4.5rem',
          fontWeight: '900',
          color: 'rgba(0, 0, 0, 0.03)',
          letterSpacing: '0.1em',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}>
          {paper.schoolName.toUpperCase()}
        </div>

        {/* 1. Official School & Exam Header */}
        <div style={{
          textAlign: 'center',
          borderBottom: '2px solid #000000',
          paddingBottom: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '8px' }}>
            <img
              src="/edugen-icon.png"
              alt="Official Crest"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                objectFit: 'cover',
                border: '1px solid #CBD5E1'
              }}
            />
            <div>
              <h1 style={{
                fontSize: '1.45rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '2px',
                color: '#000000'
              }}>
                {paper.schoolName}
              </h1>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B', letterSpacing: '0.05em' }}>
                AFFILIATED TO {paper.board.toUpperCase()} • EXAMINATION DIVISION
              </div>
            </div>
          </div>

          <h2 style={{
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#1E293B',
            marginBottom: '4px'
          }}>
            {paper.examType}
          </h2>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            fontSize: '0.92rem',
            fontWeight: '600',
            color: '#334155',
            marginTop: '6px'
          }}>
            <span><strong>Board:</strong> {paper.board}</span>
            <span>•</span>
            <span><strong>Class:</strong> {paper.cls}</span>
            <span>•</span>
            <span><strong>Subject:</strong> {paper.subject}</span>
          </div>

          {/* Student Roll No & Meta Box */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #CBD5E1',
            marginTop: '12px',
            paddingTop: '8px',
            fontSize: '0.88rem',
            fontWeight: '600'
          }}>
            <div>
              <strong>Time Allowed:</strong> {paper.timeAllowed}
            </div>
            <div>
              <strong>Roll No:</strong> __________________
            </div>
            <div>
              <strong>Maximum Marks:</strong> {paper.totalMarks}
            </div>
          </div>
        </div>

        {/* 2. General Instructions */}
        <div style={{
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          padding: '12px 18px',
          marginBottom: '24px',
          fontSize: '0.82rem',
          lineHeight: '1.5'
        }}>
          <h4 style={{
            fontSize: '0.84rem',
            fontWeight: '700',
            marginBottom: '6px',
            textTransform: 'uppercase',
            color: '#0F172A'
          }}>
            General Instructions:
          </h4>
          <ol style={{ paddingLeft: isUrdu ? '0' : '20px', paddingRight: isUrdu ? '20px' : '0' }}>
            {paper.generalInstructions && paper.generalInstructions.map((inst, idx) => (
              <li key={idx} style={{ marginBottom: '3px', color: '#334155' }}>
                {inst}
              </li>
            ))}
          </ol>
        </div>

        {/* 3. Examination Sections */}
        {paper.sections.map((section, sIdx) => (
          <div key={section.id} style={{ marginBottom: '28px' }}>
            {/* Section Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1.5px solid #0F172A',
              paddingBottom: '4px',
              marginBottom: '14px',
              marginTop: sIdx > 0 ? '24px' : '0'
            }}>
              <div>
                <h3 style={{
                  fontSize: '0.98rem',
                  fontWeight: '800',
                  letterSpacing: '0.02em',
                  color: '#0F172A'
                }}>
                  {section.title}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748B', fontStyle: 'italic' }}>
                  {section.instruction}
                </p>
              </div>

              <div style={{
                fontSize: '0.85rem',
                fontWeight: '700',
                background: '#F1F5F9',
                padding: '3px 8px',
                borderRadius: '4px'
              }}>
                [{section.marks} Marks]
              </div>
            </div>

            {/* Questions in this Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {section.questions.map((q) => {
                const isEditing = editingQuestionId === q.id;

                return (
                  <div 
                    key={q.id} 
                    className="question-item"
                    style={{
                      position: 'relative',
                      fontSize: '0.92rem',
                      lineHeight: '1.55',
                      padding: '4px 0'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: '700', marginRight: '6px', marginLeft: isUrdu ? '6px' : '0' }}>
                          Q{q.number}.
                        </span>

                        {isEditing ? (
                          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              style={{
                                flex: 1,
                                padding: '4px 8px',
                                border: '1px solid var(--primary-blue)',
                                borderRadius: '4px',
                                fontSize: '0.9rem'
                              }}
                            />
                            <button
                              onClick={() => saveEdit(section.id, q.id)}
                              className="btn-success"
                              style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                            >
                              <Check size={14} />
                            </button>
                          </div>
                        ) : (
                          <span>{q.question || q.statement}</span>
                        )}

                        {/* Options for MCQs */}
                        {q.options && (
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '8px 24px',
                            marginTop: '8px',
                            paddingLeft: isUrdu ? '0' : '20px',
                            paddingRight: isUrdu ? '20px' : '0'
                          }}>
                            {q.options.map((opt, oIdx) => {
                              const label = ['A', 'B', 'C', 'D'][oIdx];
                              return (
                                <div key={oIdx} style={{ fontSize: '0.88rem', color: '#1E293B' }}>
                                  <strong>({label})</strong> {opt}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Internal Choice OR for Long Questions */}
                        {q.orQuestion && (
                          <div style={{
                            marginTop: '10px',
                            paddingTop: '8px',
                            borderTop: '1px dashed #CBD5E1',
                            color: '#1E293B',
                            fontSize: '0.9rem'
                          }}>
                            <div style={{
                              fontWeight: '700',
                              textAlign: 'center',
                              fontSize: '0.8rem',
                              color: '#64748B',
                              margin: '4px 0'
                            }}>
                              — OR —
                            </div>
                            <p>{q.orQuestion}</p>
                          </div>
                        )}

                        {/* Sub-questions breakdown for Short Answers if any */}
                        {q.subQuestions && (
                          <div style={{ marginTop: '6px', paddingLeft: '16px', fontSize: '0.82rem', color: '#475569' }}>
                            {q.subQuestions.map((sub, sidx) => (
                              <div key={sidx}>• {sub}</div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right Marks Indication */}
                      <div style={{
                        fontWeight: '700',
                        fontSize: '0.88rem',
                        color: '#334155',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <span>[{q.marks}]</span>
                        <button
                          onClick={() => startEdit(q)}
                          className="no-print"
                          title="Edit Question Text"
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-subtle)',
                            padding: '2px'
                          }}
                        >
                          <Edit3 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Answer Key / Marking Rubric (Visible when toggled) */}
                    {showAnswerKey && (
                      <div style={{
                        marginTop: '8px',
                        background: '#F0FDF4',
                        border: '1px solid #BBF7D0',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '0.82rem',
                        color: '#166534'
                      }}>
                        <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Check size={14} />
                          <span>Model Answer / Solution:</span>
                        </div>
                        <div style={{ marginTop: '3px' }}>
                          {q.correctAnswer && <div><strong>Correct Choice:</strong> Option ({q.correctAnswer})</div>}
                          {q.answer && <div><strong>Answer:</strong> {q.answer}</div>}
                          {q.isTrue !== undefined && <div><strong>Evaluation:</strong> {q.isTrue ? 'TRUE' : 'FALSE'} — {q.reason}</div>}
                          {q.modelAnswer && <div><strong>Rubric / Scheme:</strong> {q.modelAnswer}</div>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Paper End Stamp */}
        <div style={{
          textAlign: 'center',
          marginTop: '36px',
          paddingTop: '16px',
          borderTop: '2px dashed #94A3B8',
          fontSize: '0.86rem',
          fontWeight: '700',
          color: '#475569',
          letterSpacing: '0.05em'
        }}>
          *** END OF QUESTION PAPER • EDIS / EDUGEN AI VERIFIED ***
        </div>
      </div>
    </div>
  );
}
