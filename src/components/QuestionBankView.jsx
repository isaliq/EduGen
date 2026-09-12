import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Layers, 
  BookOpen, 
  FileText,
  RotateCw
} from 'lucide-react';
import { CLASSES, SUBJECTS, getChaptersForClassAndSubject } from '../data/curriculumData';
import { generateMassiveQuestionBank } from '../services/paperGenerator';

export default function QuestionBankView() {
  const [cls, setCls] = useState('8');
  const [subject, setSubject] = useState('Science');
  const [chapter, setChapter] = useState('Microorganisms: Friend and Foe');
  const [questionType, setQuestionType] = useState('all'); // all, mcq, blanks, tf, short, long, hots
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bankData, setBankData] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const chapters = getChaptersForClassAndSubject(cls, subject);

  useEffect(() => {
    if (chapters.length > 0) {
      setChapter(chapters[0].name);
    }
  }, [cls, subject]);

  useEffect(() => {
    loadBank();
  }, [cls, subject, chapter]);

  const loadBank = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const data = generateMassiveQuestionBank(cls, subject, chapter);
      setBankData(data);
      setIsGenerating(false);
    }, 200);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Compile list according to active filter
  const getFilteredQuestions = () => {
    if (!bankData) return [];
    let list = [];

    if (questionType === 'all' || questionType === 'mcq') {
      list = [...list, ...bankData.mcqs];
    }
    if (questionType === 'all' || questionType === 'blanks') {
      list = [...list, ...bankData.blanks];
    }
    if (questionType === 'all' || questionType === 'tf') {
      list = [...list, ...bankData.trueFalses];
    }
    if (questionType === 'all' || questionType === 'short') {
      list = [...list, ...bankData.shorts];
    }
    if (questionType === 'all' || questionType === 'long') {
      list = [...list, ...bankData.longs];
    }
    if (questionType === 'all' || questionType === 'hots') {
      list = [...list, ...bankData.hots];
    }

    if (difficultyFilter !== 'all') {
      list = list.filter(q => q.difficulty.toLowerCase().includes(difficultyFilter.toLowerCase()));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      list = list.filter(q => 
        (q.question && q.question.toLowerCase().includes(query)) ||
        (q.statement && q.statement.toLowerCase().includes(query)) ||
        (q.chapter && q.chapter.toLowerCase().includes(query))
      );
    }

    return list;
  };

  const filteredQuestions = getFilteredQuestions();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-dark)' }}>
              Massive Question Bank Repository
            </h1>
            <span className="badge badge-purple">1,200+ Questions</span>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            Instant access to 100 MCQs, 50 Blanks, 50 True/False, 80 Short, 40 Long, and 30 HOTS per chapter.
          </p>
        </div>

        <button
          onClick={loadBank}
          disabled={isGenerating}
          className="btn-secondary"
          style={{ padding: '10px 18px' }}
        >
          <RotateCw size={16} className={isGenerating ? 'animate-spin' : ''} />
          <span>Regenerate Pool</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="card-glass" style={{ padding: '20px 24px', borderRadius: 'var(--radius-xl)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
          marginBottom: '16px'
        }}>
          {/* Class */}
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

          {/* Subject */}
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

          {/* Chapter */}
          <div style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Target Chapter</label>
            <select
              className="form-select"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              style={{ width: '100%' }}
            >
              {chapters.map(c => (
                <option key={c.id} value={c.name}>{c.name} ({c.weightage})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search & Type Filters */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          borderTop: '1px solid var(--border-light)',
          paddingTop: '16px'
        }}>
          {/* Question Type Tabs */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Types' },
              { id: 'mcq', label: '100 MCQs' },
              { id: 'blanks', label: '50 Blanks' },
              { id: 'tf', label: '50 True/False' },
              { id: 'short', label: '80 Short' },
              { id: 'long', label: '40 Long' },
              { id: 'hots', label: '30 HOTS' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setQuestionType(tab.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid',
                  borderColor: questionType === tab.id ? 'var(--primary-blue)' : 'var(--border-light)',
                  background: questionType === tab.id ? 'var(--primary-blue)' : 'var(--bg-card)',
                  color: questionType === tab.id ? '#FFFFFF' : 'var(--text-body)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', top: '11px', left: '12px' }} />
            <input
              type="text"
              placeholder="Search in question bank..."
              className="form-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', paddingLeft: '34px', fontSize: '0.85rem' }}
            />
          </div>
        </div>
      </div>

      {/* Results Count Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: '500' }}>
          Showing <strong>{filteredQuestions.length}</strong> questions for <em>{chapter}</em>
        </span>
        <span className="badge badge-green">Curriculum Aligned</span>
      </div>

      {/* Question Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredQuestions.slice(0, 50).map((q, idx) => {
          const textToCopy = q.question || q.statement || '';
          const isCopied = copiedId === q.id;

          return (
            <div
              key={q.id || idx}
              className="card-glass"
              style={{
                padding: '18px 22px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-blue" style={{ fontSize: '0.72rem' }}>
                    {q.type || 'Question'} #{q.number || idx + 1}
                  </span>
                  <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                    {q.difficulty}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(q.id, textToCopy)}
                  className="btn-ghost"
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                >
                  {isCopied ? <Check size={14} color="var(--success-green)" /> : <Copy size={14} />}
                  <span>{isCopied ? 'Copied' : 'Copy Question'}</span>
                </button>
              </div>

              {/* Question text */}
              <p style={{ fontSize: '0.94rem', fontWeight: '500', color: 'var(--text-dark)', lineHeight: 1.5 }}>
                {q.question || q.statement}
              </p>

              {/* Options if MCQ */}
              {q.options && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px 16px',
                  background: 'var(--bg-subtle)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  marginTop: '4px'
                }}>
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} style={{ fontSize: '0.84rem', color: 'var(--text-body)' }}>
                      <strong>({['A', 'B', 'C', 'D'][oIdx]})</strong> {opt}
                    </div>
                  ))}
                </div>
              )}

              {/* Answer & Explanation */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                borderTop: '1px solid var(--border-light)',
                paddingTop: '8px',
                marginTop: '4px'
              }}>
                <div>
                  {q.correctAnswer && <span><strong>Key:</strong> Option ({q.correctAnswer}) &nbsp;•&nbsp; </span>}
                  {q.answer && <span><strong>Key:</strong> {q.answer} &nbsp;•&nbsp; </span>}
                  {q.isTrue !== undefined && <span><strong>Key:</strong> {q.isTrue ? 'TRUE' : 'FALSE'} &nbsp;•&nbsp; </span>}
                  <span>{q.explanation || q.reason || q.modelAnswer}</span>
                </div>

                {q.marks && (
                  <span style={{ fontWeight: '700', color: 'var(--primary-blue)' }}>
                    [{q.marks} Marks]
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {filteredQuestions.length > 50 && (
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Showing first 50 of {filteredQuestions.length} questions in this chapter pool.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
