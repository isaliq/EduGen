import React, { useState } from 'react';
import { 
  FolderArchive, 
  Search, 
  Filter, 
  Printer, 
  Copy, 
  Trash2, 
  Edit3, 
  FileText, 
  Calendar, 
  BookOpen, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { storageService } from '../services/storageService';

export default function SavedPapersView({ papers, onSelectPaper, onReloadPapers }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [boardFilter, setBoardFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');

  const filteredPapers = papers.filter(p => {
    const matchesSearch = 
      p.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.examType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBoard = boardFilter === 'all' || p.board === boardFilter;
    const matchesClass = classFilter === 'all' || p.cls === classFilter;

    return matchesSearch && matchesBoard && matchesClass;
  });

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this saved question paper?')) {
      storageService.deletePaper(id);
      if (onReloadPapers) onReloadPapers();
    }
  };

  const handleDuplicate = (id, e) => {
    e.stopPropagation();
    storageService.duplicatePaper(id);
    if (onReloadPapers) onReloadPapers();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-dark)' }}>
            Saved Papers Archive
          </h1>
          <span className="badge badge-blue">{papers.length} Papers Saved</span>
        </div>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          Manage your institution's examination papers. Re-download printouts, clone existing test papers, or edit questions.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="card-glass" style={{
        padding: '16px 20px',
        borderRadius: 'var(--radius-xl)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', top: '11px', left: '12px' }} />
          <input
            type="text"
            placeholder="Search school, subject, or exam type..."
            className="form-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', paddingLeft: '34px', fontSize: '0.85rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Board:</span>
            <select
              className="form-select"
              value={boardFilter}
              onChange={(e) => setBoardFilter(e.target.value)}
              style={{ fontSize: '0.82rem', padding: '6px 12px' }}
            >
              <option value="all">All Boards</option>
              <option value="JKBOSE">JKBOSE</option>
              <option value="CBSE">CBSE</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Class:</span>
            <select
              className="form-select"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              style={{ fontSize: '0.82rem', padding: '6px 12px' }}
            >
              <option value="all">All Classes</option>
              {['1','2','3','4','5','6','7','8','9','10'].map(c => (
                <option key={c} value={c}>Class {c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Papers Grid */}
      {filteredPapers.length === 0 ? (
        <div className="card-glass" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <FileText size={42} color="var(--text-subtle)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '4px' }}>
            No Saved Papers Found
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Try adjusting your search filters or generate a new paper in the Question Paper Studio.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
          {filteredPapers.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectPaper(p)}
              className="card-glass card-interactive"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '230px'
              }}
            >
              <div>
                {/* Badges */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span className="badge badge-blue">{p.board}</span>
                    <span className="badge badge-purple">Class {p.cls}</span>
                  </div>
                  <span className="badge badge-green">{p.totalMarks} Marks</span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.08rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '4px' }}>
                  {p.schoolName}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {p.examType} • {p.subject}
                </p>

                {/* Chapters */}
                <div style={{ fontSize: '0.78rem', color: 'var(--text-body)', lineHeight: 1.4, marginBottom: '14px' }}>
                  <strong>Chapters:</strong> {p.chapters ? p.chapters.slice(0, 3).join(', ') : 'All Syllabus'}
                  {p.chapters && p.chapters.length > 3 && ` +${p.chapters.length - 3} more`}
                </div>
              </div>

              {/* Card Footer & Actions */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--border-light)',
                paddingTop: '12px',
                marginTop: '6px'
              }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                  {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'Recent'}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={(e) => handleDuplicate(p.id, e)}
                    className="btn-ghost"
                    title="Duplicate this paper"
                    style={{ padding: '6px' }}
                  >
                    <Copy size={15} />
                  </button>

                  <button
                    onClick={(e) => handleDelete(p.id, e)}
                    className="btn-ghost"
                    title="Delete paper"
                    style={{ padding: '6px', color: 'var(--rose-danger)' }}
                  >
                    <Trash2 size={15} />
                  </button>

                  <button
                    onClick={() => onSelectPaper(p)}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <span>Open Paper</span>
                    <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
