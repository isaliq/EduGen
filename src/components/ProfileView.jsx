import React, { useState } from 'react';
import { 
  UserCheck, 
  School, 
  BookOpen, 
  Layers, 
  Save, 
  Key, 
  Check, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { CLASSES, SUBJECTS, BOARDS, LANGUAGES } from '../data/curriculumData';
import { storageService } from '../services/storageService';

export default function ProfileView({ profile, onUpdateProfile }) {
  const [formData, setFormData] = useState({ ...profile });
  const [isSaved, setIsSaved] = useState(false);

  const toggleClass = (clsId) => {
    const clsName = `Class ${clsId}`;
    const exists = formData.classesTaught?.includes(clsName);
    const updated = exists 
      ? formData.classesTaught.filter(c => c !== clsName)
      : [...(formData.classesTaught || []), clsName];
    setFormData({ ...formData, classesTaught: updated });
  };

  const toggleSubject = (subName) => {
    const exists = formData.subjects?.includes(subName);
    const updated = exists 
      ? formData.subjects.filter(s => s !== subName)
      : [...(formData.subjects || []), subName];
    setFormData({ ...formData, subjects: updated });
  };

  const handleSave = (e) => {
    e.preventDefault();
    storageService.saveProfile(formData);
    if (onUpdateProfile) {
      onUpdateProfile(formData);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-dark)' }}>
            Teacher Profile & Institutional Settings
          </h1>
          <span className="badge badge-green">Verified Faculty</span>
        </div>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          Configure your personal details, teaching subjects, and default examination board preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="card-glass" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
        {/* Basic Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div className="form-group">
            <label className="form-label">Teacher's Full Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Designation / Role</label>
            <input
              type="text"
              className="form-input"
              value={formData.role || ''}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
          </div>
        </div>

        {/* School / Institution Name */}
        <div className="form-group" style={{ marginBottom: '24px' }}>
          <label className="form-label">School / Institution Name (Appears on Exam Papers)</label>
          <input
            type="text"
            className="form-input"
            value={formData.school || ''}
            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
            required
          />
        </div>

        {/* Board & Default Language */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <div className="form-group">
            <label className="form-label">Preferred Examination Board</label>
            <select
              className="form-select"
              value={formData.preferredBoard || 'JKBOSE'}
              onChange={(e) => setFormData({ ...formData, preferredBoard: e.target.value })}
            >
              {BOARDS.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Preferred Medium of Instruction</label>
            <select
              className="form-select"
              value={formData.preferredLanguage || 'English'}
              onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
            >
              {LANGUAGES.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Classes Taught Chips */}
        <div style={{ marginBottom: '24px' }}>
          <label className="form-label" style={{ marginBottom: '10px' }}>
            Classes Taught (Classes 1–10)
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {CLASSES.map(c => {
              const clsName = `Class ${c.id}`;
              const isSelected = formData.classesTaught?.includes(clsName);
              return (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => toggleClass(c.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: isSelected ? '1px solid var(--primary-blue)' : '1px solid var(--border-light)',
                    background: isSelected ? 'var(--primary-blue)' : 'var(--bg-card)',
                    color: isSelected ? '#FFFFFF' : 'var(--text-body)',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? '700' : '500',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subjects Taught Chips */}
        <div style={{ marginBottom: '28px' }}>
          <label className="form-label" style={{ marginBottom: '10px' }}>
            Assigned Subjects
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {SUBJECTS.map(s => {
              const isSelected = formData.subjects?.includes(s.name);
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => toggleSubject(s.name)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: isSelected ? '1px solid var(--purple-accent)' : '1px solid var(--border-light)',
                    background: isSelected ? 'var(--purple-accent)' : 'var(--bg-card)',
                    color: isSelected ? '#FFFFFF' : 'var(--text-body)',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? '700' : '500',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Gemini AI Key field */}
        <div style={{
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Key size={18} color="var(--primary-blue)" />
            <span style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-dark)' }}>
              Optional Google Gemini API Key
            </span>
            <span className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>Optional</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            EduGen includes an offline curriculum generation engine with 1,400+ questions out of the box. You can optionally plug in your personal Gemini API key for live real-time LLM prompting.
          </p>
          <input
            type="password"
            placeholder="AIzaSy..."
            className="form-input"
            value={formData.geminiApiKey || ''}
            onChange={(e) => setFormData({ ...formData, geminiApiKey: e.target.value })}
          />
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '14px' }}>
          {isSaved && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success-green)', fontSize: '0.88rem', fontWeight: '600' }}>
              <CheckCircle2 size={16} />
              <span>Profile Settings Saved Successfully!</span>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '12px 28px' }}
          >
            <Save size={16} />
            <span>Save Teacher Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
