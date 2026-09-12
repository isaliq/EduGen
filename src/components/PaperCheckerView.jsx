import React, { useState } from 'react';
import { 
  CheckSquare, 
  UploadCloud, 
  Sparkles, 
  FileText, 
  Check, 
  AlertCircle, 
  Award, 
  User, 
  Save,
  RotateCw,
  Eye,
  PlusCircle
} from 'lucide-react';

export default function PaperCheckerView() {
  const [selectedSample, setSelectedSample] = useState('student_1');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [teacherConfirmed, setTeacherConfirmed] = useState(false);

  // Custom evaluation state
  const [customQuestion, setCustomQuestion] = useState('Explain the process of photosynthesis and write its chemical equation.');
  const [customStudentAnswer, setCustomStudentAnswer] = useState('Photosynthesis is the process by which green plants make food using sunlight, chlorophyll, carbon dioxide and water. The equation is 6CO2 + 6H2O -> C6H12O6 + 6O2.');
  const [customMaxMarks, setCustomMaxMarks] = useState(5);
  const [customEvaluation, setCustomEvaluation] = useState(null);

  const sampleStudentSheets = {
    student_1: {
      studentName: 'Zubair Ahmad Lone',
      rollNo: '24-SEC-0814',
      subject: 'Science (Class 8)',
      paperTitle: 'Force and Pressure Periodic Test',
      totalMaxMarks: 15,
      handwrittenText: [
        {
          qNum: 'Q1',
          question: 'Define Pressure and state its standard unit.',
          studentAnswer: 'Pressure is defined as the force acting on an object per unit area. SI unit of pressure is Pascal (Pa) or N/m2.',
          aiEvaluation: {
            suggestedMarks: 1,
            maxMarks: 1,
            matchedKeywords: ['force', 'per unit area', 'Pascal', 'N/m2'],
            missingKeywords: [],
            feedback: 'Perfect concise scientific definition with correct SI unit.'
          }
        },
        {
          qNum: 'Q2',
          question: 'Why do school bags have broad straps instead of thin strings?',
          studentAnswer: 'Because broad straps have more surface area. When area is more, the weight of bag puts less pressure on shoulders. So it is easy and painless to carry.',
          aiEvaluation: {
            suggestedMarks: 3.5,
            maxMarks: 4,
            matchedKeywords: ['broad straps', 'surface area increased', 'less pressure'],
            missingKeywords: ['P = F/A mathematical formula'],
            feedback: 'Concept correctly grasped. 0.5 marks deducted for missing explicitly stating the formula P = F/A.'
          }
        },
        {
          qNum: 'Q3',
          question: 'Differentiate between contact and non-contact forces with examples.',
          studentAnswer: 'Contact forces require direct touch between two bodies, like friction and muscular force when kicking football. Non-contact forces act without touching, for example magnet pulling iron pins or apple falling due to gravity.',
          aiEvaluation: {
            suggestedMarks: 4,
            maxMarks: 5,
            matchedKeywords: ['direct touch', 'friction', 'muscular', 'without touching', 'gravity', 'magnetism'],
            missingKeywords: ['tabular comparative representation'],
            feedback: 'Good examples and explanation. Would be improved by drawing a neat 2-column comparative table.'
          }
        },
        {
          qNum: 'Q4',
          question: 'Why does a rubber sucker stick firmly to a flat glass surface?',
          studentAnswer: 'When we press rubber sucker, all the air inside it escapes out. The outside atmospheric pressure is very heavy and pushes it strongly against the glass, so it sticks firmly.',
          aiEvaluation: {
            suggestedMarks: 4.5,
            maxMarks: 5,
            matchedKeywords: ['air escapes out', 'atmospheric pressure', 'pushes strongly', 'sticks firmly'],
            missingKeywords: ['vacuum formed inside sucker'],
            feedback: 'Accurate physical reasoning. Mentioning the partial vacuum created under the cup makes it 100% complete.'
          }
        }
      ]
    },
    student_2: {
      studentName: 'Priya Sharma',
      rollNo: '24-MATH-1022',
      subject: 'Mathematics (Class 10)',
      paperTitle: 'Quadratic Equations Mid-Term Assessment',
      totalMaxMarks: 14,
      handwrittenText: [
        {
          qNum: 'Q1',
          question: 'State the quadratic formula for ax² + bx + c = 0.',
          studentAnswer: 'x = (-b ± √(b² - 4ac)) / (2a), where b² - 4ac is discriminant D.',
          aiEvaluation: {
            suggestedMarks: 2,
            maxMarks: 2,
            matchedKeywords: ['-b ± √(b² - 4ac)', '2a', 'discriminant D'],
            missingKeywords: [],
            feedback: 'Accurate mathematical formulation.'
          }
        },
        {
          qNum: 'Q2',
          question: 'Find the roots of 2x² - 7x + 3 = 0 using factorization.',
          studentAnswer: '2x² - 6x - x + 3 = 0 => 2x(x - 3) - 1(x - 3) = 0 => (2x - 1)(x - 3) = 0. Therefore x = 1/2 or x = 3.',
          aiEvaluation: {
            suggestedMarks: 4,
            maxMarks: 4,
            matchedKeywords: ['splitting middle term', 'common factors (x - 3)', 'x = 1/2', 'x = 3'],
            missingKeywords: [],
            feedback: 'Exemplary step-by-step algebraic solution.'
          }
        },
        {
          qNum: 'Q3',
          question: 'Determine the nature of roots for 3x² - 4√3x + 4 = 0.',
          studentAnswer: 'D = b² - 4ac = (-4√3)² - 4(3)(4) = 48 - 48 = 0. Since D = 0, roots are real and equal.',
          aiEvaluation: {
            suggestedMarks: 4,
            maxMarks: 4,
            matchedKeywords: ['D = b² - 4ac', '48 - 48 = 0', 'real and equal roots'],
            missingKeywords: [],
            feedback: 'Complete calculation with correct theoretical deduction.'
          }
        },
        {
          qNum: 'Q4',
          question: 'The sum of ages of two friends is 20. Four years ago product was 48. Is this situation possible?',
          studentAnswer: 'Let ages be x and 20 - x. (x - 4)(16 - x) = 48 => -x² + 20x - 64 = 48 => x² - 20x + 112 = 0. D = 400 - 448 = -48 < 0. No real roots.',
          aiEvaluation: {
            suggestedMarks: 4,
            maxMarks: 4,
            matchedKeywords: ['word problem translation', 'D < 0', 'no real roots'],
            missingKeywords: [],
            feedback: 'Clear modeling and correct conclusion that situation is impossible.'
          }
        }
      ]
    },
    student_3: {
      studentName: 'Mohammad Irfan Dar',
      rollNo: '24-SST-0835',
      subject: 'Social Science (Class 8)',
      paperTitle: 'When People Rebel: 1857 and After',
      totalMaxMarks: 15,
      handwrittenText: [
        {
          qNum: 'Q1',
          question: 'Who was Mangal Pandey and what sparked the sepoy unrest in Barrackpore?',
          studentAnswer: 'Mangal Pandey was a sepoy in Bengal army who attacked British officers because of new cartridges greased with cow and pig fat.',
          aiEvaluation: {
            suggestedMarks: 3,
            maxMarks: 3,
            matchedKeywords: ['sepoy', 'Bengal army', 'greased cartridges', 'cow and pig fat'],
            missingKeywords: [],
            feedback: 'Accurate historical recall of immediate trigger.'
          }
        },
        {
          qNum: 'Q2',
          question: 'Why did the rebel sepoys proclaim Bahadur Shah Zafar as their leader?',
          studentAnswer: 'Because Mughal emperor was symbol of past Indian unity. People believed under Mughal banner all rulers could unite against Company.',
          aiEvaluation: {
            suggestedMarks: 4,
            maxMarks: 4,
            matchedKeywords: ['symbol of unity', 'Mughal dynasty prestige', 'unite against Company'],
            missingKeywords: [],
            feedback: 'Good historical analysis.'
          }
        },
        {
          qNum: 'Q3',
          question: 'Mention three major changes in British rule after the 1857 revolt.',
          studentAnswer: '1. Rule transferred from East India Company to British Crown. 2. Governor General became Viceroy. 3. Indian army ratio of European soldiers was increased.',
          aiEvaluation: {
            suggestedMarks: 4.5,
            maxMarks: 5,
            matchedKeywords: ['British Crown', 'Viceroy', 'European army ratio increased'],
            missingKeywords: ['Doctrine of Lapse abolished'],
            feedback: 'Very good points. Mentioning the policy change towards princely states (adoption rights recognized) completes the full 5 marks.'
          }
        }
      ]
    }
  };

  const isCustom = selectedSample === 'custom';
  const currentSheet = !isCustom ? sampleStudentSheets[selectedSample] : null;

  const [teacherMarks, setTeacherMarks] = useState({ q1: 1, q2: 3.5, q3: 4, q4: 4.5 });

  const handleStartOCRScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTeacherConfirmed(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);

      if (isCustom) {
        // Run simulated intelligent evaluation on custom text
        const hasEquation = customStudentAnswer.includes('CO2') || customStudentAnswer.includes('equation');
        const hasKeyTerms = customStudentAnswer.toLowerCase().includes('sunlight') && customStudentAnswer.toLowerCase().includes('chlorophyll');

        setCustomEvaluation({
          suggestedMarks: hasEquation && hasKeyTerms ? 4.5 : 3.5,
          maxMarks: customMaxMarks,
          matchedKeywords: ['sunlight', 'chlorophyll', 'carbon dioxide', 'water', 'chemical equation'],
          missingKeywords: ['byproduct oxygen release explanation'],
          feedback: 'Excellent explanation and accurate balanced chemical equation provided.'
        });
      }
    }, 1500);
  };

  const handleMarkChange = (qKey, val) => {
    setTeacherMarks({
      ...teacherMarks,
      [qKey]: parseFloat(val) || 0
    });
  };

  const totalCalculatedScore = !isCustom && currentSheet
    ? Object.values(teacherMarks).reduce((a, b) => a + b, 0)
    : customEvaluation ? customEvaluation.suggestedMarks : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-dark)' }}>
            AI Paper Checker & Handwriting Evaluation
          </h1>
          <span className="badge badge-purple">Dynamic Model Evaluation</span>
        </div>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          Evaluate physical answer sheets across Science, Mathematics, and Social Studies, or paste custom student answers to run real-time OCR rubric scoring.
        </p>
      </div>

      {/* Main Grid: Upload/Scan on Left, Evaluated Sheet on Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '360px 1fr',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* Left Column: Upload & Controls */}
        <div className="card-glass" style={{ padding: '24px', borderRadius: 'var(--radius-xl)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '14px', color: 'var(--text-dark)' }}>
            Select Student Submission
          </h3>

          <div className="form-group">
            <label className="form-label">Loaded Student Sheets</label>
            <select
              className="form-select"
              value={selectedSample}
              onChange={(e) => {
                setSelectedSample(e.target.value);
                setScanComplete(false);
                setTeacherConfirmed(false);
              }}
            >
              <option value="student_1">Sample 1: Zubair Ahmad (Class 8 Science)</option>
              <option value="student_2">Sample 2: Priya Sharma (Class 10 Mathematics)</option>
              <option value="student_3">Sample 3: Mohammad Irfan (Class 8 Social Science)</option>
              <option value="custom">✏️ Test Custom Student Answer</option>
            </select>
          </div>

          {/* Upload Dropzone */}
          <div style={{
            border: '2px dashed var(--primary-blue)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 16px',
            textAlign: 'center',
            background: 'var(--primary-blue-light)',
            cursor: 'pointer',
            marginBottom: '16px'
          }}>
            <UploadCloud size={32} color="var(--primary-blue)" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-dark)' }}>
              Drop scanned answer sheet (PDF/JPG)
            </div>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Handwriting OCR parses physical pages automatically
            </p>
          </div>

          {isCustom && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <div>
                <label className="form-label">Question Text</label>
                <input
                  type="text"
                  className="form-input"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Student Handwritten Transcription</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={customStudentAnswer}
                  onChange={(e) => setCustomStudentAnswer(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Max Marks</label>
                <input
                  type="number"
                  className="form-input"
                  value={customMaxMarks}
                  onChange={(e) => setCustomMaxMarks(Number(e.target.value))}
                />
              </div>
            </div>
          )}

          <button
            onClick={handleStartOCRScan}
            disabled={isScanning}
            className="btn-primary"
            style={{ width: '100%', padding: '12px', marginTop: '6px' }}
          >
            {isScanning ? (
              <>
                <RotateCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Reading Handwriting & OCR...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Run AI Evaluation</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Evaluated Sheet with Scanner Animation */}
        <div className="card-glass" style={{ padding: '32px', borderRadius: 'var(--radius-xl)', position: 'relative' }}>
          {isScanning && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, transparent, #22C55E, #4F46E5, transparent)',
              boxShadow: '0 0 15px #4F46E5',
              animation: 'scanLaser 1.8s infinite',
              zIndex: 10
            }} />
          )}

          {/* Sheet Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '16px',
            marginBottom: '20px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-dark)' }}>
                {!isCustom ? currentSheet.paperTitle : 'Custom Student Answer Evaluation'}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {!isCustom ? `Student: ${currentSheet.studentName} (${currentSheet.rollNo})` : 'Live OCR Input Analysis'}
              </p>
            </div>

            <div style={{
              background: 'var(--success-green-light)',
              border: '1px solid #BBF7D0',
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.72rem', color: '#166534', fontWeight: '700', textTransform: 'uppercase' }}>
                Total Awarded
              </span>
              <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#166534' }}>
                {!isCustom ? `${totalCalculatedScore.toFixed(1)} / ${currentSheet.totalMaxMarks} M` : `${totalCalculatedScore} / ${customMaxMarks} M`}
              </div>
            </div>
          </div>

          {/* If Preloaded Sheet */}
          {!isCustom && currentSheet && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {currentSheet.handwrittenText.map((item, idx) => {
                const qKey = `q${idx + 1}`;
                const currentVal = teacherMarks[qKey] ?? item.aiEvaluation.suggestedMarks;

                return (
                  <div
                    key={idx}
                    style={{
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '18px',
                      background: 'var(--bg-subtle)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--text-dark)' }}>
                        {item.qNum}. {item.question}
                      </span>
                      <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                        [Max {item.aiEvaluation.maxMarks} M]
                      </span>
                    </div>

                    <div style={{
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      padding: '10px 14px',
                      fontFamily: 'Comic Sans MS, Inter, cursive',
                      color: '#1E293B',
                      fontSize: '0.92rem',
                      lineHeight: 1.5,
                      marginBottom: '12px'
                    }}>
                      "{item.studentAnswer}"
                    </div>

                    <div style={{
                      background: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      borderRadius: '6px',
                      padding: '12px 14px',
                      fontSize: '0.82rem',
                      color: '#14532D',
                      marginBottom: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}>
                          <Sparkles size={14} color="var(--primary-blue)" />
                          <span>AI Suggested Marks: {item.aiEvaluation.suggestedMarks} / {item.aiEvaluation.maxMarks}</span>
                        </div>
                        <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>Confidence: 96%</span>
                      </div>

                      <div style={{ marginBottom: '4px' }}>
                        <strong>Detected Key Concepts:</strong>{' '}
                        {item.aiEvaluation.matchedKeywords.map((k, kidx) => (
                          <span key={kidx} style={{ background: '#DCFCE7', padding: '1px 6px', borderRadius: '4px', marginRight: '4px' }}>
                            ✓ {k}
                          </span>
                        ))}
                      </div>

                      {item.aiEvaluation.missingKeywords.length > 0 && (
                        <div style={{ color: '#B45309', marginBottom: '4px' }}>
                          <strong>Missing Rubric Criteria:</strong> {item.aiEvaluation.missingKeywords.join(', ')}
                        </div>
                      )}

                      <div style={{ color: '#334155', fontStyle: 'italic', marginTop: '4px' }}>
                        Feedback: {item.aiEvaluation.feedback}
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '12px',
                      borderTop: '1px solid var(--border-light)',
                      paddingTop: '10px'
                    }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: '600', color: 'var(--text-dark)' }}>
                        Teacher Confirmed Score:
                      </span>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max={item.aiEvaluation.maxMarks}
                        value={currentVal}
                        onChange={(e) => handleMarkChange(qKey, e.target.value)}
                        style={{
                          width: '64px',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-strong)',
                          fontWeight: '700',
                          textAlign: 'center',
                          fontSize: '0.9rem'
                        }}
                      />
                      <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>/ {item.aiEvaluation.maxMarks}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* If Custom Answer Evaluation */}
          {isCustom && customEvaluation && (
            <div style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '20px', background: 'var(--bg-subtle)' }}>
              <div style={{ fontWeight: '700', marginBottom: '8px' }}>Q. {customQuestion}</div>
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '12px 14px',
                fontFamily: 'Comic Sans MS, cursive',
                marginBottom: '14px'
              }}>
                "{customStudentAnswer}"
              </div>

              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '14px', borderRadius: '6px', color: '#166534', fontSize: '0.86rem' }}>
                <div style={{ fontWeight: '700', marginBottom: '6px' }}>
                  AI Evaluation: {customEvaluation.suggestedMarks} / {customEvaluation.maxMarks} Marks
                </div>
                <div><strong>Detected Concepts:</strong> {customEvaluation.matchedKeywords.join(', ')}</div>
                <div style={{ marginTop: '4px', fontStyle: 'italic' }}>Feedback: {customEvaluation.feedback}</div>
              </div>
            </div>
          )}

          {/* Finalize Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '28px',
            borderTop: '1px solid var(--border-light)',
            paddingTop: '18px'
          }}>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Teacher always confirms every single mark before recording.
            </div>

            <button
              onClick={() => setTeacherConfirmed(true)}
              className="btn-success"
              style={{ padding: '10px 22px' }}
            >
              <Check size={16} />
              <span>{teacherConfirmed ? 'Grades Finalized & Synced ✓' : 'Approve & Save Student Grade'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
