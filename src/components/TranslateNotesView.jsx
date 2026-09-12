import React, { useState } from 'react';
import { 
  Languages, 
  ArrowRightLeft, 
  Copy, 
  Check, 
  Sparkles, 
  Printer, 
  FileText,
  RotateCw,
  BookOpen
} from 'lucide-react';
import { translateEducationalText } from '../services/translationService';

const PRESET_TOPICS = {
  force: {
    title: 'Force and Pressure (Class 8 Science)',
    text: `# Class 8 Science: Force and Pressure\n\n## 1. Definition of Force\n* A push or a pull upon an object resulting from its interaction with another object is called a force.\n* The SI unit of force is Newton (N).\n\n## 2. Pressure and Its Mathematical Law\n* Pressure is the force acting per unit area of a surface.\n* Formula: Pressure = Force / Area (P = F / A)\n* SI unit of pressure is Pascal (Pa) or N/m².\n\n## 3. Atmospheric Pressure\n* The envelope of air surrounding the earth is known as the atmosphere.\n* Atmospheric pressure is maximum at sea level and decreases as altitude increases.`
  },
  cell: {
    title: 'Microorganisms: Friend and Foe',
    text: `# Class 8 Science: Microorganisms\n\n## 1. Major Groups of Microorganisms\n* Bacteria, Fungi, Protozoa, and Algae.\n* Viruses reproduce only inside the cells of the host organism.\n\n## 2. Friendly Microorganisms\n* Lactobacillus promotes the formation of curd from milk.\n* Yeast is used in commercial baking for fermentation.\n\n## 3. Disease Prevention\n* Vaccines stimulate antibody production to protect against pathogens.`
  },
  maths: {
    title: 'Linear Equations in One Variable',
    text: `# Class 8 Mathematics: Linear Equations\n\n## 1. General Form\n* An algebraic equation containing variables with degree 1 is called a linear equation.\n* Standard form: ax + b = c, where a is not equal to zero.\n\n## 2. Solving Methods\n* Transpose constant terms to the right-hand side.\n* Divide both sides by the variable coefficient to isolate x.`
  }
};

export default function TranslateNotesView() {
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Urdu');
  const [sourceText, setSourceText] = useState(PRESET_TOPICS.force.text);
  const [targetText, setTargetText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(targetText);
    setTargetText(sourceText);
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsTranslating(true);
    setProgressMsg(`Translating ${sourceLang} to ${targetLang}...`);

    try {
      const result = await translateEducationalText(sourceText, sourceLang, targetLang);
      setTargetText(result);
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setIsTranslating(false);
      setProgressMsg('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(targetText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isTargetUrdu = targetLang === 'Urdu';
  const isTargetHindi = targetLang === 'Hindi';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-dark)' }}>
            Educational Notes & Paper Translator
          </h1>
          <span className="badge badge-blue">Dynamic Live Translation</span>
        </div>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          Translate any custom text, lesson notes, or questions live between English, Urdu (Nastaliq RTL), and Hindi while strictly preserving Markdown headings, bullet points, and numbered lists.
        </p>
      </div>

      {/* Language Switch Bar & Preset Quick-Loaders */}
      <div className="card-glass no-print" style={{
        padding: '18px 24px',
        borderRadius: 'var(--radius-xl)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* From & To Selectors */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.86rem', fontWeight: '600', color: 'var(--text-muted)' }}>From:</span>
              <select
                className="form-select"
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                style={{ minWidth: '140px' }}
              >
                <option value="English">English</option>
                <option value="Urdu">Urdu (اردو)</option>
                <option value="Hindi">Hindi (हिंदी)</option>
              </select>
            </div>

            <button
              onClick={handleSwap}
              className="btn-secondary"
              style={{ padding: '8px 12px' }}
              title="Swap Languages"
            >
              <ArrowRightLeft size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.86rem', fontWeight: '600', color: 'var(--text-muted)' }}>To:</span>
              <select
                className="form-select"
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                style={{ minWidth: '140px' }}
              >
                <option value="Urdu">Urdu (اردو)</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="English">English</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="btn-primary"
              style={{ padding: '10px 22px' }}
            >
              {isTranslating ? (
                <>
                  <RotateCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Translating Live...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Translate Text Now</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="btn-secondary"
              style={{ padding: '10px 16px' }}
              disabled={!targetText}
            >
              <Printer size={16} />
              <span>Print Notes</span>
            </button>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid var(--border-light)', paddingTop: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)' }}>Load Sample Topic:</span>
          {Object.entries(PRESET_TOPICS).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setSourceText(item.text);
                setTargetText('');
              }}
              className="btn-ghost"
              style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'var(--bg-muted)' }}
            >
              {item.title}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setSourceText('');
              setTargetText('');
            }}
            className="btn-ghost"
            style={{ fontSize: '0.78rem', color: 'var(--rose-danger)' }}
          >
            Clear Text
          </button>
        </div>
      </div>

      {/* Side by Side Translation Panes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        alignItems: 'stretch'
      }}>
        {/* Source Text Area */}
        <div className="card-glass" style={{ padding: '24px', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontWeight: '700', fontSize: '0.94rem', color: 'var(--text-dark)' }}>
              Source Notes ({sourceLang})
            </span>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Type or paste any notes here</span>
          </div>

          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Type or paste educational notes, formulas, or question papers to translate..."
            style={{
              flex: 1,
              minHeight: '420px',
              padding: '16px',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.92rem',
              lineHeight: 1.6,
              background: 'var(--bg-subtle)',
              color: 'var(--text-dark)',
              outline: 'none',
              resize: 'vertical',
              fontFamily: sourceLang === 'Urdu' ? 'var(--font-urdu)' : sourceLang === 'Hindi' ? 'var(--font-hindi)' : 'inherit',
              direction: sourceLang === 'Urdu' ? 'rtl' : 'ltr'
            }}
          />
        </div>

        {/* Target Translated Text Area */}
        <div className="card-glass" style={{ padding: '24px', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: '700', fontSize: '0.94rem', color: 'var(--text-dark)' }}>
                Translated Output ({targetLang})
              </span>
              {targetText && (
                <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>Formatting Preserved</span>
              )}
            </div>

            {targetText && (
              <button
                onClick={handleCopy}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                {isCopied ? <Check size={14} color="var(--success-green)" /> : <Copy size={14} />}
                <span>{isCopied ? 'Copied' : 'Copy Output'}</span>
              </button>
            )}
          </div>

          <div
            className={isTargetUrdu ? 'lang-urdu' : isTargetHindi ? 'lang-hindi' : ''}
            style={{
              flex: 1,
              minHeight: '420px',
              padding: '20px 24px',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              background: '#FFFFFF',
              color: 'var(--text-dark)',
              whiteSpace: 'pre-line',
              overflowY: 'auto',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)',
              fontSize: isTargetUrdu ? '1.12rem' : '0.94rem',
              lineHeight: isTargetUrdu ? '2.1' : '1.7'
            }}
          >
            {isTranslating ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px', color: 'var(--primary-blue)' }}>
                <RotateCw size={28} style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{progressMsg}</span>
              </div>
            ) : targetText ? (
              targetText
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-subtle)' }}>
                <Languages size={36} style={{ marginBottom: '8px' }} />
                <span>Click "Translate Text Now" to generate live translation.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
