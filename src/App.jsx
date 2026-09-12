import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import DashboardCards from './components/DashboardCards';
import PaperGeneratorView from './components/PaperGeneratorView';
import WorksheetGeneratorView from './components/WorksheetGeneratorView';
import LessonPlanView from './components/LessonPlanView';
import QuestionBankView from './components/QuestionBankView';
import AnswerKeyView from './components/AnswerKeyView';
import PaperCheckerView from './components/PaperCheckerView';
import TranslateNotesView from './components/TranslateNotesView';
import SavedPapersView from './components/SavedPapersView';
import ProfileView from './components/ProfileView';
import Footer from './components/Footer';
import HowItWorksModal from './components/HowItWorksModal';
import UpgradeModal from './components/UpgradeModal';
import { storageService } from './services/storageService';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [papers, setPapers] = useState([]);
  const [profile, setProfile] = useState(null);
  const [activePaperToEdit, setActivePaperToEdit] = useState(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Load persistent papers and profile
  useEffect(() => {
    const loadedPapers = storageService.getPapers();
    const loadedProfile = storageService.getProfile();
    setPapers(loadedPapers);
    setProfile(loadedProfile);
  }, []);

  const showToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const handlePaperSaved = (newPaper) => {
    storageService.savePaper(newPaper);
    const refreshed = storageService.getPapers();
    setPapers(refreshed);
    showToast(`✓ "${newPaper.schoolName}" saved to your archive!`);
  };

  const handleReloadPapers = () => {
    const refreshed = storageService.getPapers();
    setPapers(refreshed);
  };

  const handleSelectPaperFromArchive = (paper) => {
    setActivePaperToEdit(paper);
    setActiveTab('generate');
  };

  const handleProfileUpdated = (updatedProfile) => {
    setProfile(updatedProfile);
    showToast('✓ Teacher profile updated successfully');
  };

  // Keyboard shortcut Ctrl+K to jump to search/home
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.app-navbar input');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-container">
      {/* Fixed Desktop Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenUpgrade={() => setIsUpgradeOpen(true)}
      />

      {/* Main Content Area */}
      <div className="main-content-wrapper">
        {/* Sticky Top Navigation */}
        <Navbar 
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          profile={profile}
        />

        {/* Scrollable View Container */}
        <main className="main-scroll-area">
          {/* 1. Home Dashboard */}
          {activeTab === 'home' && (
            <div>
              <HeroBanner 
                onGenerateClick={() => setActiveTab('generate')}
                onWatchClick={() => setIsHowItWorksOpen(true)}
              />
              <DashboardCards 
                onSelectCard={(tab) => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                savedPapers={papers}
              />
            </div>
          )}

          {/* 2. Flagship 100-Mark Question Paper Studio */}
          {activeTab === 'generate' && (
            <PaperGeneratorView 
              onPaperSaved={handlePaperSaved}
              initialPaper={activePaperToEdit}
            />
          )}

          {/* 3. Worksheet Generator */}
          {activeTab === 'worksheet' && (
            <WorksheetGeneratorView />
          )}

          {/* 4. Lesson Plan Generator */}
          {activeTab === 'lesson-plan' && (
            <LessonPlanView />
          )}

          {/* 5. Massive Question Bank Repository */}
          {activeTab === 'question-bank' && (
            <QuestionBankView />
          )}

          {/* 6. Answer Key & Step-Wise Marking Scheme */}
          {activeTab === 'answer-key' && (
            <AnswerKeyView />
          )}

          {/* 7. AI Paper Checker (Handwriting OCR) */}
          {activeTab === 'paper-checker' && (
            <PaperCheckerView />
          )}

          {/* 8. Translate Educational Notes (English/Urdu/Hindi) */}
          {activeTab === 'translate' && (
            <TranslateNotesView />
          )}

          {/* 9. Saved Papers Archive */}
          {activeTab === 'saved-papers' && (
            <SavedPapersView 
              papers={papers}
              onSelectPaper={handleSelectPaperFromArchive}
              onReloadPapers={handleReloadPapers}
            />
          )}

          {/* 10. Teacher Profile & Settings */}
          {activeTab === 'profile' && (
            <ProfileView 
              profile={profile}
              onUpdateProfile={handleProfileUpdated}
            />
          )}

          {/* Footer on All Pages */}
          <Footer />
        </main>
      </div>

      {/* Interactive Modals */}
      <HowItWorksModal 
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        onStartGenerating={() => {
          setIsHowItWorksOpen(false);
          setActiveTab('generate');
        }}
      />

      <UpgradeModal 
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
      />

      {/* Floating Toast Alerts */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
