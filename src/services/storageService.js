/**
 * EduGen AI - Local Storage & Persistence Service
 * Manages saved papers, custom question drafts, profile settings, and initial seeds.
 */

const STORAGE_KEYS = {
  PAPERS: 'edugen_saved_papers',
  PROFILE: 'edugen_teacher_profile',
  WORKSHEETS: 'edugen_saved_worksheets',
  LESSON_PLANS: 'edugen_saved_lesson_plans',
  SETTINGS: 'edugen_app_settings'
};

// High-fidelity preloaded sample papers
const DEFAULT_SAVED_PAPERS = [
  {
    id: 'paper_seed_jkbose_8',
    schoolName: 'Govt. Model Higher Secondary School, Srinagar',
    examType: 'Annual Examination (Session 2025–2026)',
    cls: '8',
    subject: 'Science',
    board: 'JKBOSE',
    chapters: ['Microorganisms: Friend and Foe', 'Force and Pressure', 'Combustion and Flame', 'Light'],
    totalMarks: 100,
    difficulty: 'Balanced',
    language: 'English',
    timeAllowed: '3 Hours',
    createdAt: '2026-03-01T10:30:00.000Z',
    isFavorite: true,
    sections: [
      {
        id: 'sec_A',
        title: 'SECTION A — Multiple Choice Questions',
        instruction: 'Choose the single correct option for each question.',
        marks: 20,
        questions: Array.from({ length: 20 }, (_, i) => ({
          id: `seed_q_mcq_${i + 1}`,
          number: i + 1,
          chapter: i % 2 === 0 ? 'Force and Pressure' : 'Microorganisms: Friend and Foe',
          question: i === 0 
            ? 'The pressure exerted by a liquid at the bottom of a container depends directly on:' 
            : i === 1 
            ? 'Which bacterium is responsible for the formation of curd from milk?' 
            : `Question ${i + 1}: Under standard conditions, atmospheric pressure at sea level is approximately equal to:`,
          options: i === 0 
            ? ['Area of the base', 'Height of the liquid column', 'Nature of the glass', 'Shape of the container']
            : i === 1 
            ? ['Rhizobium', 'Lactobacillus', 'Spirogyra', 'Amoeba']
            : ['100 kPa', '10 kPa', '1000 kPa', '1 kPa'],
          correctAnswer: i === 0 ? 'B' : i === 1 ? 'B' : 'A',
          marks: 1
        }))
      },
      {
        id: 'sec_B',
        title: 'SECTION B — Fill in the Blanks',
        instruction: 'Fill in the blanks with suitable words.',
        marks: 10,
        questions: Array.from({ length: 10 }, (_, i) => ({
          id: `seed_q_blk_${i + 1}`,
          number: 21 + i,
          chapter: 'Microorganisms: Friend and Foe',
          question: i === 0 
            ? 'The process of conversion of sugar into alcohol is called __________.' 
            : `Statement #${i + 1}: The force acting on a unit area of a surface is known as __________.`,
          answer: i === 0 ? 'Fermentation' : 'Pressure',
          marks: 1
        }))
      },
      {
        id: 'sec_C',
        title: 'SECTION C — True or False Statements',
        instruction: 'State True (T) or False (F).',
        marks: 10,
        questions: Array.from({ length: 10 }, (_, i) => ({
          id: `seed_q_tf_${i + 1}`,
          number: 31 + i,
          statement: i === 0 
            ? 'Friction always opposes the relative motion between two surfaces in contact.' 
            : `Statement #${i + 1}: Viruses can reproduce outside living host cells independently.`,
          isTrue: i === 0,
          marks: 1
        }))
      },
      {
        id: 'sec_D',
        title: 'SECTION D — Very Short Answer Questions',
        instruction: 'Answer in one word or one short sentence each.',
        marks: 10,
        questions: Array.from({ length: 10 }, (_, i) => ({
          id: `seed_q_vsa_${i + 1}`,
          number: 41 + i,
          question: i === 0 
            ? 'Name the gas that is essential for combustion to take place.' 
            : `Identify the primary microorganism used in the commercial production of bread.`,
          marks: 1
        }))
      },
      {
        id: 'sec_E',
        title: 'SECTION E — Short Answer Questions',
        instruction: 'Answer in 40 to 60 words each (4 Marks each).',
        marks: 20,
        questions: [
          {
            id: 'seed_sa_1',
            number: 51,
            question: 'Why do porters place a round piece of cloth on their heads when they have to carry heavy loads?',
            marks: 4
          },
          {
            id: 'seed_sa_2',
            number: 52,
            question: 'Explain why water is not used to control fires involving electrical equipment and petrol.',
            marks: 4
          },
          {
            id: 'seed_sa_3',
            number: 53,
            question: 'Differentiate between communicable and non-communicable diseases with two examples each.',
            marks: 4
          },
          {
            id: 'seed_sa_4',
            number: 54,
            question: 'Describe an activity to show that liquids exert equal pressure at the same depth.',
            marks: 4
          },
          {
            id: 'seed_sa_5',
            number: 55,
            question: 'What is regular and diffused reflection? Draw a ray diagram for diffused reflection.',
            marks: 4
          }
        ]
      },
      {
        id: 'sec_F',
        title: 'SECTION F — Long Answer Questions (With Internal Choice)',
        instruction: 'Answer in 100 to 150 words each (5 Marks each).',
        marks: 20,
        questions: [
          {
            id: 'seed_la_1',
            number: 56,
            question: 'Describe the human eye with the help of a neat labelled diagram. Explain how the eye focuses on objects at varying distances.',
            orQuestion: 'OR: State the Laws of Reflection. Explain the construction and working of a Periscope with an annotated diagram.',
            marks: 5
          },
          {
            id: 'seed_la_2',
            number: 57,
            question: 'What is atmospheric pressure? How does a rubber sucker stick to a smooth surface? Calculate the pressure if a force of 200 N acts on an area of 0.05 m².',
            orQuestion: 'OR: Explain the role of Rhizobium bacteria in the nitrogen cycle with a complete flow chart.',
            marks: 5
          },
          {
            id: 'seed_la_3',
            number: 58,
            question: 'Discuss various zones of a candle flame with a labelled diagram. Why do goldsmiths blow the outermost zone of a flame for melting gold?',
            orQuestion: 'OR: What are antibiotics? What precautions must be taken while taking antibiotics?',
            marks: 5
          },
          {
            id: 'seed_la_4',
            number: 59,
            question: 'Explain the difference between contact and non-contact forces. Give two verified experimental illustrations for each category.',
            orQuestion: 'OR: How does friction cause wear and tear in machinery? Describe three methods used in industry to minimize friction.',
            marks: 5
          }
        ]
      },
      {
        id: 'sec_G',
        title: 'SECTION G — Higher Order Thinking & Application Questions (HOTS)',
        instruction: 'Critical thinking and analytical reasoning (5 Marks each).',
        marks: 10,
        questions: [
          {
            id: 'seed_hots_1',
            number: 60,
            question: 'A mountaineer at high altitude experiences nose bleeding, while a diver deep underwater requires special pressurized suits. Analyze the physical principles of pressure acting on both individuals and propose safety measures.',
            marks: 5
          },
          {
            id: 'seed_hots_2',
            number: 61,
            question: 'If all nitrogen-fixing bacteria in the soil of the Kashmir valley were eliminated due to chemical contamination, predict the sequential chain of effects on apple orchards, legume crops, and the local food web over three seasons.',
            marks: 5
          }
        ]
      }
    ]
  }
];

const DEFAULT_PROFILE = {
  name: 'Prof. Tariq Ahmad Mir',
  school: 'Govt. Higher Secondary School, Srinagar',
  classesTaught: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
  subjects: ['Science', 'Mathematics', 'Urdu'],
  preferredBoard: 'JKBOSE',
  preferredLanguage: 'English',
  geminiApiKey: '',
  email: 'tariq.edugen@school.edu.in',
  role: 'Senior PGT & Academic Coordinator'
};

export const storageService = {
  // Papers
  getPapers() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PAPERS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.PAPERS, JSON.stringify(DEFAULT_SAVED_PAPERS));
        return DEFAULT_SAVED_PAPERS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading papers from localStorage', e);
      return DEFAULT_SAVED_PAPERS;
    }
  },

  savePaper(paper) {
    try {
      const papers = this.getPapers();
      const existingIdx = papers.findIndex(p => p.id === paper.id);
      if (existingIdx >= 0) {
        papers[existingIdx] = { ...paper, updatedAt: new Date().toISOString() };
      } else {
        papers.unshift({ ...paper, createdAt: new Date().toISOString() });
      }
      localStorage.setItem(STORAGE_KEYS.PAPERS, JSON.stringify(papers));
      return true;
    } catch (e) {
      console.error('Error saving paper', e);
      return false;
    }
  },

  deletePaper(id) {
    try {
      const papers = this.getPapers().filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEYS.PAPERS, JSON.stringify(papers));
      return papers;
    } catch (e) {
      console.error('Error deleting paper', e);
      return [];
    }
  },

  duplicatePaper(id) {
    try {
      const papers = this.getPapers();
      const target = papers.find(p => p.id === id);
      if (target) {
        const copy = {
          ...target,
          id: `paper_${Date.now()}`,
          schoolName: `${target.schoolName} (Copy)`,
          createdAt: new Date().toISOString()
        };
        papers.unshift(copy);
        localStorage.setItem(STORAGE_KEYS.PAPERS, JSON.stringify(papers));
        return copy;
      }
    } catch (e) {
      console.error('Error duplicating paper', e);
    }
    return null;
  },

  // Profile
  getProfile() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
        return DEFAULT_PROFILE;
      }
      return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
      return true;
    } catch (e) {
      return false;
    }
  }
};
