import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  Settings2, 
  Layers, 
  Sliders, 
  BookOpen, 
  Award, 
  Clock, 
  Languages, 
  School,
  Check
} from 'lucide-react';
import { 
  BOARDS, 
  CLASSES, 
  SUBJECTS, 
  EXAM_TYPES, 
  DIFFICULTIES, 
  LANGUAGES, 
  getChaptersForClassAndSubject 
} from '../data/curriculumData';
import { generate100MarkPaper } from '../services/paperGenerator';
import PrintablePaper from './PrintablePaper';

export default function PaperGeneratorView({ onPaperSaved, initialPaper = null }) {
  // Form Configuration State
  const [cls, setCls] = useState('8');
  const [subject, setSubject] = useState('Science');
  const [board, setBoard] = useState('JKBOSE');
  const [examType, setExamType] = useState('Annual Examination (Session End)');
  const [totalMarks, setTotalMarks] = useState(100);
  const [difficulty, setDifficulty] = useState('Balanced');
  const [language, setLanguage] = useState('English');
  const [schoolName, setSchoolName] = useState('Govt. Model Higher Secondary School');
  const [timeAllowed, setTimeAllowed] = useState('3 Hours');

  // Chapters multi-select
  const [availableChapters, setAvailableChapters] = useState([]);
  const [selectedChapters, setSelectedChapters] = useState([]);

  // Active Generated Paper
  const [activePaper, setActivePaper] = useState(initialPaper);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');

  // Load chapters whenever class or subject changes
  useEffect(() => {
    const chs = getChaptersForClassAndSubject(cls, subject);
    setAvailableChapters(chs);
    // Select first 4-6 chapters by default
    setSelectedChapters(chs.slice(0, Math.min(6, chs.length)));
  }, [cls, subject]);

  // Initial generation on first mount if no initial paper
  useEffect(() => {
    if (!activePaper) {
      handleGenerate(false);
    }
  }, []);

  const toggleChapter = (ch) => {
    const exists = selectedChapters.some(c => c.id === ch.id);
    if (exists) {
      if (selectedChapters.length > 1) {
        setSelectedChapters(selectedChapters.filter(c => c.id !== ch.id));
      }
    } else {
      setSelectedChapters([...selectedChapters, ch]);
    }
  };

  const selectAllChapters = () => {
    setSelectedChapters([...availableChapters]);
  };

  const clearChapters = () => {
    if (availableChapters.length > 0) {
      setSelectedChapters([availableChapters[0]]);
    }
  };

  const generationStages = [
    { progress: 15, msg: 'Analyzing syllabus and chapter weightage...' },
    { progress: 35, msg: 'Creating 20 Section A Multiple Choice Questions...' },
    { progress: 55, msg: 'Building Section B & C Objective Questions (Blanks & T/F)...' },
    { progress: 75, msg: 'Writing Short & Long Questions with internal choices...' },
    { progress: 90, msg: 'Formulating HOTS challenges & Step-wise Marking Scheme...' },
    { progress: 100, msg: 'Finalizing 100-Mark Print-Ready Paper...' }
  ];

  const handleGenerate = (withAnimation = true) => {
    if (!withAnimation) {
      const newPaper = generate100MarkPaper({
        schoolName,
        examType,
        cls,
        subject,
        board,
        chapters: selectedChapters,
        totalMarks,
        difficulty,
        language,
        timeAllowed
      });
      setActivePaper(newPaper);
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(10);
    setStatusMessage(generationStages[0].msg);

    let stageIdx = 0;
    const interval = setInterval(() => {
      stageIdx++;
      if (stageIdx < generationStages.length) {
        setGenerationProgress(generationStages[stageIdx].progress);
        setStatusMessage(generationStages[stageIdx].msg);
      } else {
        clearInterval(interval);
        const newPaper = generate100MarkPaper({
          schoolName,
          examType,
          cls,
          subject,
          board,
          chapters: selectedChapters,
          totalMarks,
          difficulty,
          language,
          timeAllowed
        });
        setActivePaper(newPaper);
        setIsGenerating(false);

        // Confetti celebration on completion!
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      }
    }, 450);
  };

  const handleSave = () => {
    if (activePaper && onPaperSaved) {
      onPaperSaved(activePaper);
      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    }
  };

  const handleUpdateQuestion = (sectionId, qId, newText) => {
    if (!activePaper) return;
    const updatedSections = activePaper.sections.map(sec => {
      if (sec.id !== sectionId) return sec;
      return {
        ...sec,
        questions: sec.questions.map(q => {
          if (q.id !== qId) return q;
          return { ...q, question: newText, statement: newText };
        })
      };
    });
    setActivePaper({ ...activePaper, sections: updatedSections });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-dark)' }}>
            100-Mark Question Paper Studio
          </h1>
          <span className="badge badge-blue">JKBOSE & CBSE Standards</span>
        </div>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          Configure curriculum parameters on the left and preview the full authentic A4 board examination paper on the right.
        </p>
      </div>

      {/* Two Column Studio Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '380px 1fr',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* Left Pane: Configurator Controls */}
        <div className="card-glass paper-config-pane" style={{
          padding: '24px',
          borderRadius: 'var(--radius-xl)',
          position: 'sticky',
          top: '90px',
          maxHeight: 'calc(100vh - 110px)',
          overflowY: 'auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings2 size={18} color="var(--primary-blue)" />
              <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-dark)' }}>
                Exam Parameters
              </span>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontWeight: '600' }}>
              Step-by-step
            </span>
          </div>

          {/* School Name */}
          <div className="form-group">
            <label className="form-label">
              <span>School / Institution Name</span>
              <School size={14} color="var(--text-muted)" />
            </label>
            <input
              type="text"
              className="form-input"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="e.g. Govt. Model Higher Secondary School"
            />
          </div>

          {/* Board & Class Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Education Board</label>
              <select
                className="form-select"
                value={board}
                onChange={(e) => setBoard(e.target.value)}
              >
                {BOARDS.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Class (Grade)</label>
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
          </div>

          {/* Subject & Language Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
              <label className="form-label">Paper Language</label>
              <select
                className="form-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {LANGUAGES.map(l => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Exam Type & Total Marks */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Exam Type</label>
              <select
                className="form-select"
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
              >
                {EXAM_TYPES.map(t => (
                  <option key={t.id} value={t.name}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Total Marks</label>
              <select
                className="form-select"
                value={totalMarks}
                onChange={(e) => setTotalMarks(Number(e.target.value))}
              >
                <option value={100}>100 Marks (Full Paper)</option>
                <option value={80}>80 Marks (Theory)</option>
                <option value={50}>50 Marks (Terminal)</option>
                <option value={25}>25 Marks (Unit Test)</option>
              </select>
            </div>
          </div>

          {/* Difficulty & Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Difficulty</label>
              <select
                className="form-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                {DIFFICULTIES.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Time Allowed</label>
              <input
                type="text"
                className="form-input"
                value={timeAllowed}
                onChange={(e) => setTimeAllowed(e.target.value)}
              />
            </div>
          </div>

          {/* Chapter Selection Chips */}
          <div style={{ marginTop: '12px', marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <span className="form-label" style={{ margin: 0 }}>
                Selected Chapters ({selectedChapters.length})
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={selectAllChapters}
                  style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}
                >
                  All
                </button>
                <span style={{ color: 'var(--text-subtle)' }}>•</span>
                <button
                  type="button"
                  onClick={clearChapters}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  Reset
                </button>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              maxHeight: '160px',
              overflowY: 'auto',
              padding: '6px 2px'
            }}>
              {availableChapters.map(ch => {
                const isSelected = selectedChapters.some(c => c.id === ch.id);
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => toggleChapter(ch)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: isSelected ? '1px solid var(--primary-blue)' : '1px solid var(--border-light)',
                      background: isSelected ? 'var(--primary-blue-light)' : 'var(--bg-muted)',
                      color: isSelected ? 'var(--primary-blue)' : 'var(--text-body)',
                      fontSize: '0.76rem',
                      fontWeight: isSelected ? '600' : '400',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {isSelected && <Check size={12} />}
                    <span>{ch.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={() => handleGenerate(true)}
            disabled={isGenerating}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span>Generating Paper...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Generate 100-Mark Paper</span>
              </>
            )}
          </button>
        </div>

        {/* Right Pane: Live A4 Preview & Loading Experience */}
        <div>
          {isGenerating ? (
            /* Loading Experience with animated sparkles & progress bar */
            <div className="card-glass" style={{
              padding: '80px 40px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '540px'
            }}>
              <div style={{
                position: 'relative',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary-blue-light), var(--purple-accent-light))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                animation: 'pulseGlow 2s infinite'
              }}>
                <Sparkles size={38} color="var(--primary-blue)" />
              </div>

              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '8px' }}>
                Crafting Complete Examination Paper
              </h2>

              <p style={{ fontSize: '0.95rem', color: 'var(--primary-blue)', fontWeight: '600', marginBottom: '24px' }}>
                {statusMessage}
              </p>

              {/* Progress Bar */}
              <div style={{
                width: '100%',
                maxWidth: '420px',
                height: '10px',
                background: 'var(--bg-muted)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  width: `${generationProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #4F46E5, #7C3AED, #22C55E)',
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 0.4s ease'
                }} />
              </div>

              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '12px' }}>
                {generationProgress}% • Adhering strictly to {board} blueprint rules
              </span>
            </div>
          ) : (
            <PrintablePaper
              paper={activePaper}
              onSavePaper={handleSave}
              onUpdateQuestion={handleUpdateQuestion}
            />
          )}
        </div>
      </div>
    </div>
  );
}
