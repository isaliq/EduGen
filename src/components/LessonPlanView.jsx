import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Printer, 
  Sparkles, 
  Clock, 
  Target, 
  HelpCircle, 
  CheckCircle, 
  ListChecks, 
  Layers,
  RotateCw
} from 'lucide-react';
import { CLASSES, SUBJECTS, getChaptersForClassAndSubject } from '../data/curriculumData';
import { generateDynamicLessonPlan } from '../services/dynamicModelGenerators';

export default function LessonPlanView() {
  const [cls, setCls] = useState('8');
  const [subject, setSubject] = useState('Science');
  const [chapter, setChapter] = useState('Force and Pressure');
  const [duration, setDuration] = useState('45 Minutes');
  const [pedagogyStyle, setPedagogyStyle] = useState('5E Model (Engage, Explore, Explain, Elaborate, Evaluate)');
  const [lessonPlanData, setLessonPlanData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const chapters = getChaptersForClassAndSubject(cls, subject);

  useEffect(() => {
    if (chapters.length > 0) {
      setChapter(chapters[0].name);
    }
  }, [cls, subject]);

  useEffect(() => {
    handleGenerate();
  }, [cls, subject, chapter, duration, pedagogyStyle]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const plan = generateDynamicLessonPlan({
        cls,
        subject,
        chapter,
        duration,
        framework: pedagogyStyle
      });
      setLessonPlanData(plan);
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
            NEP 2020 Aligned Lesson Plan Studio
          </h1>
          <span className="badge badge-purple">Dynamic 5E Generation</span>
        </div>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          Construct structured, inspection-ready teaching plans complete with instructional objectives, interactive classroom activities, and evaluation rubrics for any topic.
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '360px 1fr',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* Controls */}
        <div className="card-glass no-print" style={{ padding: '24px', borderRadius: 'var(--radius-xl)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '16px', color: 'var(--text-dark)' }}>
            Lesson Plan Parameters
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
            <label className="form-label">Topic / Chapter</label>
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
            <label className="form-label">Period Duration</label>
            <select
              className="form-select"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="40 Minutes">40 Minutes (Standard Single Period)</option>
              <option value="45 Minutes">45 Minutes (Extended Period)</option>
              <option value="80 Minutes">80 Minutes (Block / Lab Session)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Pedagogical Framework</label>
            <select
              className="form-select"
              value={pedagogyStyle}
              onChange={(e) => setPedagogyStyle(e.target.value)}
            >
              <option value="5E Model">5E Model (Engage, Explore, Explain, Elaborate, Evaluate)</option>
              <option value="Experiential">Experiential & Activity-Based Learning</option>
              <option value="Inquiry">Inquiry-Led Scientific Method</option>
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
                <span>Synthesizing Plan...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Regenerate Lesson Plan</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="btn-secondary"
            style={{ width: '100%', marginTop: '10px', padding: '12px' }}
          >
            <Printer size={16} />
            <span>Print Lesson Plan (A4)</span>
          </button>
        </div>

        {/* Lesson Plan A4 Document */}
        {lessonPlanData && (
          <div 
            className="a4-preview-card"
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 6px 24px rgba(0, 0, 0, 0.06)',
              padding: '44px 50px',
              color: '#000000',
              maxWidth: '850px',
              width: '100%',
              margin: '0 auto',
              fontSize: '0.9rem',
              lineHeight: 1.6
            }}
          >
            {/* Header Banner */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '4px' }}>
                <img src="/edugen-icon.png" alt="Icon" style={{ width: '36px', height: '36px', borderRadius: '8px' }} />
                <h2 style={{ fontSize: '1.35rem', fontWeight: '800', textTransform: 'uppercase', margin: 0 }}>
                  {lessonPlanData.title}
                </h2>
              </div>
              <div style={{ fontSize: '0.98rem', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>
                Subject: {lessonPlanData.subject} &nbsp;|&nbsp; Topic: {lessonPlanData.chapter}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.82rem',
                fontWeight: '600',
                background: '#F8FAFC'
              }}>
                <div><strong>Class:</strong> {lessonPlanData.cls}</div>
                <div><strong>Duration:</strong> {lessonPlanData.duration}</div>
                <div><strong>Framework:</strong> 5E Model</div>
                <div><strong>Session:</strong> {lessonPlanData.session}</div>
              </div>
            </div>

            {/* 1. Objectives */}
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '0.96rem', fontWeight: '800', color: '#0F172A', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '6px' }}>
                1. INSTRUCTIONAL OBJECTIVES (BLOOM'S TAXONOMY)
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.86rem' }}>
                <div>
                  <strong>(A) Cognitive & Conceptual Understanding:</strong>
                  <ul style={{ paddingLeft: '18px', marginTop: '4px' }}>
                    {lessonPlanData.objectives.cognitive.map((c, cIdx) => (
                      <li key={cIdx}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>(B) Practical Skills & Problem Solving:</strong>
                  <ul style={{ paddingLeft: '18px', marginTop: '4px' }}>
                    {lessonPlanData.objectives.skillBased.map((s, sIdx) => (
                      <li key={sIdx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Teaching Aids & Materials */}
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '0.96rem', fontWeight: '800', color: '#0F172A', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '6px' }}>
                2. TEACHING AIDS & DIDACTIC MATERIALS
              </h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.86rem' }}>
                {lessonPlanData.teachingAids.map((aid, aIdx) => (
                  <li key={aIdx}>{aid}</li>
                ))}
              </ul>
            </div>

            {/* 3. 4-Phase Classroom Activity Breakdown & Time Allocation */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.96rem', fontWeight: '800', color: '#0F172A', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '8px' }}>
                3. ACTIVITY WORKFLOW & TIME ALLOCATION ({lessonPlanData.duration})
              </h4>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                <thead>
                  <tr style={{ background: '#F1F5F9', borderBottom: '1.5px solid #000' }}>
                    <th style={{ padding: '6px 10px', textAlign: 'left', width: '22%' }}>Phase & Time</th>
                    <th style={{ padding: '6px 10px', textAlign: 'left', width: '42%' }}>Teacher's Directives & Questions</th>
                    <th style={{ padding: '6px 10px', textAlign: 'left', width: '36%' }}>Student Hands-on Task</th>
                  </tr>
                </thead>
                <tbody>
                  {lessonPlanData.phases.map((ph, pIdx) => (
                    <tr key={pIdx} style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '8px 10px', verticalAlign: 'top' }}>
                        <strong>{ph.stage}</strong><br />
                        <span style={{ color: '#64748B' }}>{ph.time}</span>
                      </td>
                      <td style={{ padding: '8px 10px' }}>{ph.teacherActivity}</td>
                      <td style={{ padding: '8px 10px' }}>{ph.studentActivity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 4. Homework & Extended Inquiry */}
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '0.96rem', fontWeight: '800', color: '#0F172A', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '6px' }}>
                4. HOMEWORK & EXTENDED INQUIRY
              </h4>
              <ol style={{ paddingLeft: '20px', fontSize: '0.86rem' }}>
                {lessonPlanData.homework.map((hw, hIdx) => (
                  <li key={hIdx}>{hw}</li>
                ))}
              </ol>
            </div>

            {/* 5. Expected Learning Outcomes */}
            <div style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '6px',
              padding: '10px 14px',
              fontSize: '0.84rem',
              color: '#166534'
            }}>
              <strong>Expected Learning Outcome (NEP Standard):</strong> {lessonPlanData.learningOutcomes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
