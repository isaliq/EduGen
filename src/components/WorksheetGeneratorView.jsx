import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Sparkles, 
  RotateCw, 
  Layers, 
  CheckCircle2, 
  FileDown, 
  Calendar, 
  User, 
  BookOpen 
} from 'lucide-react';
import { CLASSES, SUBJECTS, getChaptersForClassAndSubject } from '../data/curriculumData';
import { generateDynamicWorksheet } from '../services/dynamicModelGenerators';

export default function WorksheetGeneratorView() {
  const [cls, setCls] = useState('8');
  const [subject, setSubject] = useState('Science');
  const [chapter, setChapter] = useState('Force and Pressure');
  const [worksheetType, setWorksheetType] = useState('practice'); // practice, blanks, matching, mcq, homework
  const [difficulty, setDifficulty] = useState('Moderate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [worksheetData, setWorksheetData] = useState(null);

  const chapters = getChaptersForClassAndSubject(cls, subject);

  useEffect(() => {
    if (chapters.length > 0) {
      setChapter(chapters[0].name);
    }
  }, [cls, subject]);

  useEffect(() => {
    handleGenerate();
  }, [cls, subject, chapter, worksheetType, difficulty]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const data = generateDynamicWorksheet({
        cls,
        subject,
        chapter,
        worksheetType,
        difficulty
      });
      setWorksheetData(data);
      setIsGenerating(false);
    }, 250);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-dark)' }}>
            Classroom Worksheet Generator
          </h1>
          <span className="badge badge-green">Dynamic Synthesis</span>
        </div>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          Generate customized practice sheets, matching columns, and daily homework with student metadata headers for any class and chapter.
        </p>
      </div>

      {/* Two Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '360px 1fr',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* Configuration Pane */}
        <div className="card-glass no-print" style={{ padding: '24px', borderRadius: 'var(--radius-xl)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '16px', color: 'var(--text-dark)' }}>
            Worksheet Configuration
          </h3>

          <div className="form-group">
            <label className="form-label">Class</label>
            <select
              className="form-select"
              value={cls}
              onChange={(e) => setCls(e.target.value)}
            >
              {CLASSES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Subject</label>
            <select
              className="form-select"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {SUBJECTS.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Target Chapter</label>
            <select
              className="form-select"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
            >
              {chapters.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Sheet Type</label>
            <select
              className="form-select"
              value={worksheetType}
              onChange={(e) => setWorksheetType(e.target.value)}
            >
              <option value="practice">Comprehensive Practice Sheet</option>
              <option value="blanks">Fill in the Blanks Master</option>
              <option value="matching">Match Column A with Column B</option>
              <option value="mcq">Concept Check MCQs</option>
              <option value="homework">Daily Homework & Activity Sheet</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Difficulty Level</label>
            <select
              className="form-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="Easy">Foundational</option>
              <option value="Moderate">Standard Conceptual</option>
              <option value="Challenging">Advanced Application</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary"
            style={{ width: '100%', marginTop: '8px', padding: '12px' }}
          >
            {isGenerating ? (
              <>
                <RotateCw size={16} className="animate-spin" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Regenerate Worksheet</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="btn-secondary"
            style={{ width: '100%', marginTop: '10px', padding: '12px' }}
          >
            <Printer size={16} />
            <span>Print Worksheet (A4)</span>
          </button>
        </div>

        {/* Live A4 Printable Worksheet */}
        {worksheetData && (
          <div 
            className="a4-preview-card"
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 6px 24px rgba(0, 0, 0, 0.06)',
              padding: '44px 50px',
              color: '#000000',
              maxWidth: '820px',
              width: '100%',
              margin: '0 auto'
            }}
          >
            {/* Worksheet Header */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid #000000', paddingBottom: '14px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '6px' }}>
                <img src="/edugen-icon.png" alt="Icon" style={{ width: '36px', height: '36px', borderRadius: '8px' }} />
                <h2 style={{ fontSize: '1.35rem', fontWeight: '800', textTransform: 'uppercase', margin: 0 }}>
                  {worksheetData.title}
                </h2>
              </div>
              <div style={{ fontSize: '0.98rem', fontWeight: '700', color: '#1E293B', marginBottom: '6px' }}>
                Subject: {worksheetData.subject} • Chapter: {worksheetData.chapter}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.88rem', fontWeight: '600' }}>
                <span>Class: {worksheetData.cls}</span>
                <span>•</span>
                <span>Difficulty: {worksheetData.difficulty}</span>
                <span>•</span>
                <span>Total Marks: {worksheetData.totalMarks}</span>
              </div>

              {/* Student details fill-in box */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                gap: '12px',
                border: '1px solid #000000',
                borderRadius: '6px',
                padding: '8px 12px',
                marginTop: '12px',
                fontSize: '0.82rem',
                textAlign: 'left'
              }}>
                <div><strong>Student Name:</strong> ___________________</div>
                <div><strong>Roll No:</strong> _______</div>
                <div><strong>Sec:</strong> ______</div>
                <div><strong>Date:</strong> _________</div>
              </div>
            </div>

            {/* PART I: Fill in the Blanks */}
            {(worksheetType === 'practice' || worksheetType === 'blanks') && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px' }}>
                  <strong>PART I: FILL IN THE BLANKS WITH SUITABLE TERMS</strong>
                  <strong>[5 × 1 = 5 Marks]</strong>
                </div>
                <ol style={{ paddingLeft: '20px', lineHeight: '2.2', fontSize: '0.9rem' }}>
                  {worksheetData.blanks.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* PART II: Matching Columns */}
            {(worksheetType === 'practice' || worksheetType === 'matching') && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px' }}>
                  <strong>PART II: MATCH COLUMN 'A' WITH COLUMN 'B'</strong>
                  <strong>[5 × 1 = 5 Marks]</strong>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '0.88rem', lineHeight: '1.8' }}>
                  <div>
                    <strong>Column A (Attribute / Concept)</strong>
                    {worksheetData.matchingPairs.map((pair, pIdx) => (
                      <div key={pIdx}>{pIdx + 1}. {pair.colA}</div>
                    ))}
                  </div>
                  <div>
                    <strong>Column B (Verification / Output)</strong>
                    {worksheetData.matchingPairs.map((pair, pIdx) => {
                      const code = ['(a)', '(b)', '(c)', '(d)', '(e)'][pIdx];
                      return <div key={pIdx}>{code} {pair.colB}</div>;
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* PART III: Concept Check MCQs */}
            {(worksheetType === 'practice' || worksheetType === 'mcq') && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px' }}>
                  <strong>PART III: CONCEPT CHECK MCQS</strong>
                  <strong>[3 × 2 = 6 Marks]</strong>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', marginTop: '6px' }}>
                  {worksheetData.mcqs.map((mcq, mIdx) => (
                    <div key={mIdx}>
                      <strong>Q{mIdx + 1}. {mcq.q}</strong>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 14px', marginTop: '4px', paddingLeft: '14px' }}>
                        {mcq.options.map((opt, oIdx) => (
                          <div key={oIdx}>({['A', 'B', 'C', 'D'][oIdx]}) {opt}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PART IV: Conceptual Short Questions or Homework */}
            {(worksheetType === 'practice' || worksheetType === 'homework') && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px' }}>
                  <strong>PART IV: SHORT ANSWER & REAL-WORLD INQUIRY</strong>
                  <strong>[3 × 3 = 9 Marks]</strong>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem', marginTop: '6px' }}>
                  {worksheetData.conceptualQuestions.map((cq, qIdx) => (
                    <div key={qIdx}>
                      <strong>Q{qIdx + 1}.</strong> {cq}
                      <div style={{ height: '34px', borderBottom: '1px dotted #CBD5E1', marginTop: '6px' }}></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Signature Box */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderTop: '1px solid #000000',
              paddingTop: '18px',
              fontSize: '0.84rem',
              marginTop: '28px'
            }}>
              <div>
                <strong>Teacher's Remarks:</strong> ________________________
              </div>
              <div>
                <strong>Teacher's Sign:</strong> ______________
              </div>
              <div style={{
                border: '2px solid #000000',
                padding: '6px 14px',
                borderRadius: '4px',
                fontWeight: '700'
              }}>
                Score: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / {worksheetData.totalMarks}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
