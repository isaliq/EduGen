/**
 * EduGen AI - Comprehensive Curriculum & Syllabus Data Engine
 * Covers Classes 1–10 across JKBOSE, CBSE, and State Boards
 * English, Urdu, Hindi language support
 */

export const BOARDS = [
  { id: 'JKBOSE', name: 'JKBOSE (Jammu & Kashmir Board)', emblem: '🏔️' },
  { id: 'CBSE', name: 'CBSE (Central Board of Secondary Education)', emblem: '🏛️' },
  { id: 'Custom', name: 'Custom / State Board', emblem: '🎓' }
];

export const CLASSES = [
  { id: '1', name: 'Class 1', grade: 'Primary' },
  { id: '2', name: 'Class 2', grade: 'Primary' },
  { id: '3', name: 'Class 3', grade: 'Primary' },
  { id: '4', name: 'Class 4', grade: 'Primary' },
  { id: '5', name: 'Class 5', grade: 'Primary' },
  { id: '6', name: 'Class 6', grade: 'Middle' },
  { id: '7', name: 'Class 7', grade: 'Middle' },
  { id: '8', name: 'Class 8', grade: 'Middle' },
  { id: '9', name: 'Class 9', grade: 'Secondary' },
  { id: '10', name: 'Class 10', grade: 'Secondary (Board)' }
];

export const SUBJECTS = [
  { id: 'Science', name: 'Science', icon: 'Atom', color: '#4F46E5', classes: ['3','4','5','6','7','8','9','10'] },
  { id: 'Mathematics', name: 'Mathematics', icon: 'Calculator', color: '#7C3AED', classes: ['1','2','3','4','5','6','7','8','9','10'] },
  { id: 'Social Science', name: 'Social Science', icon: 'Globe', color: '#059669', classes: ['6','7','8','9','10'] },
  { id: 'English', name: 'English Literature & Grammar', icon: 'BookOpen', color: '#D97706', classes: ['1','2','3','4','5','6','7','8','9','10'] },
  { id: 'Urdu', name: 'Urdu (اردو)', icon: 'Feather', color: '#0284C7', classes: ['1','2','3','4','5','6','7','8','9','10'] },
  { id: 'Hindi', name: 'Hindi (हिंदी)', icon: 'Languages', color: '#DC2626', classes: ['1','2','3','4','5','6','7','8','9','10'] },
  { id: 'EVS', name: 'Environmental Studies (EVS)', icon: 'Leaf', color: '#10B981', classes: ['1','2','3','4','5'] },
  { id: 'Computer Science', name: 'Computer Science / IT', icon: 'Cpu', color: '#6366F1', classes: ['3','4','5','6','7','8','9','10'] }
];

export const EXAM_TYPES = [
  { id: 'Annual', name: 'Annual Examination (Session End)', defaultMarks: 100, time: '3 Hours' },
  { id: 'MidTerm', name: 'Mid-Term / T1 Examination', defaultMarks: 50, time: '2 Hours' },
  { id: 'PreBoard', name: 'Pre-Board Model Examination', defaultMarks: 100, time: '3 Hours' },
  { id: 'UnitTest', name: 'Unit Test / Periodic Assessment', defaultMarks: 25, time: '1 Hour' },
  { id: 'Diagnostic', name: 'Diagnostic Readiness Assessment', defaultMarks: 50, time: '1.5 Hours' }
];

export const DIFFICULTIES = [
  { id: 'Easy', name: 'Foundational (Easy)', desc: 'Knowledge & Recall emphasis (70% Direct)' },
  { id: 'Balanced', name: 'Standard Board (Balanced)', desc: 'Standard board mix: 40% Easy, 40% Moderate, 20% HOTS' },
  { id: 'Hard', name: 'Advanced / HOTS Intensive', desc: 'Critical thinking, application & complex proofs' }
];

export const LANGUAGES = [
  { id: 'English', name: 'English' },
  { id: 'Urdu', name: 'Urdu (اردو)' },
  { id: 'Hindi', name: 'Hindi (हिंदी)' }
];

/**
 * Chapter matrix categorized by Subject and Class
 */
export const CHAPTER_DATABASE = {
  // Class 8 Science (Flagship JKBOSE / CBSE syllabus)
  '8_Science': [
    { id: 'c1', name: 'Crop Production and Management', weightage: '12%' },
    { id: 'c2', name: 'Microorganisms: Friend and Foe', weightage: '14%' },
    { id: 'c3', name: 'Coal and Petroleum', weightage: '10%' },
    { id: 'c4', name: 'Combustion and Flame', weightage: '12%' },
    { id: 'c5', name: 'Conservation of Plants and Animals', weightage: '10%' },
    { id: 'c6', name: 'Reproduction in Animals', weightage: '14%' },
    { id: 'c7', name: 'Reaching the Age of Adolescence', weightage: '10%' },
    { id: 'c8', name: 'Force and Pressure', weightage: '15%' },
    { id: 'c9', name: 'Friction', weightage: '10%' },
    { id: 'c10', name: 'Sound', weightage: '12%' },
    { id: 'c11', name: 'Chemical Effects of Electric Current', weightage: '11%' },
    { id: 'c12', name: 'Some Natural Phenomena (Lightning & Earthquakes)', weightage: '9%' },
    { id: 'c13', name: 'Light (Reflection, Dispersion & Human Eye)', weightage: '15%' }
  ],
  // Class 10 Science (Board standard)
  '10_Science': [
    { id: 'c1', name: 'Chemical Reactions and Equations', weightage: '12%' },
    { id: 'c2', name: 'Acids, Bases and Salts', weightage: '12%' },
    { id: 'c3', name: 'Metals and Non-metals', weightage: '14%' },
    { id: 'c4', name: 'Carbon and its Compounds', weightage: '15%' },
    { id: 'c5', name: 'Life Processes (Nutrition, Respiration, Transport)', weightage: '18%' },
    { id: 'c6', name: 'Control and Coordination', weightage: '12%' },
    { id: 'c7', name: 'How do Organisms Reproduce?', weightage: '14%' },
    { id: 'c8', name: 'Heredity and Evolution', weightage: '10%' },
    { id: 'c9', name: 'Light - Reflection and Refraction', weightage: '16%' },
    { id: 'c10', name: 'The Human Eye and the Colourful World', weightage: '10%' },
    { id: 'c11', name: 'Electricity', weightage: '14%' },
    { id: 'c12', name: 'Magnetic Effects of Electric Current', weightage: '12%' },
    { id: 'c13', name: 'Our Environment', weightage: '8%' }
  ],
  // Class 8 Mathematics
  '8_Mathematics': [
    { id: 'c1', name: 'Rational Numbers', weightage: '10%' },
    { id: 'c2', name: 'Linear Equations in One Variable', weightage: '15%' },
    { id: 'c3', name: 'Understanding Quadrilaterals', weightage: '12%' },
    { id: 'c4', name: 'Data Handling (Bar Graphs & Pie Charts)', weightage: '10%' },
    { id: 'c5', name: 'Squares and Square Roots', weightage: '12%' },
    { id: 'c6', name: 'Cubes and Cube Roots', weightage: '10%' },
    { id: 'c7', name: 'Comparing Quantities (Percentage, Profit & Loss, Compound Interest)', weightage: '16%' },
    { id: 'c8', name: 'Algebraic Expressions and Identities', weightage: '15%' },
    { id: 'c9', name: 'Mensuration (Area & Volume)', weightage: '18%' },
    { id: 'c10', name: 'Exponents and Powers', weightage: '10%' },
    { id: 'c11', name: 'Direct and Inverse Proportions', weightage: '10%' },
    { id: 'c12', name: 'Factorisation', weightage: '14%' }
  ],
  // Class 10 Mathematics
  '10_Mathematics': [
    { id: 'c1', name: 'Real Numbers & Fundamental Theorem of Arithmetic', weightage: '8%' },
    { id: 'c2', name: 'Polynomials', weightage: '10%' },
    { id: 'c3', name: 'Pair of Linear Equations in Two Variables', weightage: '14%' },
    { id: 'c4', name: 'Quadratic Equations', weightage: '14%' },
    { id: 'c5', name: 'Arithmetic Progressions (AP)', weightage: '12%' },
    { id: 'c6', name: 'Triangles (Similarity & BPT)', weightage: '16%' },
    { id: 'c7', name: 'Coordinate Geometry', weightage: '10%' },
    { id: 'c8', name: 'Introduction to Trigonometry', weightage: '16%' },
    { id: 'c9', name: 'Some Applications of Trigonometry (Heights & Distances)', weightage: '12%' },
    { id: 'c10', name: 'Circles (Tangents & Theorems)', weightage: '12%' },
    { id: 'c11', name: 'Areas Related to Circles', weightage: '10%' },
    { id: 'c12', name: 'Surface Areas and Volumes', weightage: '15%' },
    { id: 'c13', name: 'Statistics', weightage: '14%' },
    { id: 'c14', name: 'Probability', weightage: '8%' }
  ],
  // Class 8 Social Science
  '8_Social Science': [
    { id: 'c1', name: 'How, When and Where (History)', weightage: '10%' },
    { id: 'c2', name: 'From Trade to Territory: The Company Establishes Power', weightage: '15%' },
    { id: 'c3', name: 'When People Rebel: 1857 and After', weightage: '16%' },
    { id: 'c4', name: 'Civilising the Native, Educating the Nation', weightage: '10%' },
    { id: 'c5', name: 'Women, Caste and Reform', weightage: '14%' },
    { id: 'c6', name: 'The Making of the National Movement: 1870s-1947', weightage: '18%' },
    { id: 'c7', name: 'Resources: Types and Conservation (Geography)', weightage: '14%' },
    { id: 'c8', name: 'Land, Soil, Water, Natural Vegetation and Wildlife', weightage: '16%' },
    { id: 'c9', name: 'Agriculture & Major Crops of India & J&K', weightage: '15%' },
    { id: 'c10', name: 'The Indian Constitution (Civics)', weightage: '14%' },
    { id: 'c11', name: 'Understanding Secularism', weightage: '10%' },
    { id: 'c12', name: 'Judiciary and the Rule of Law', weightage: '12%' }
  ],
  // Class 8 English
  '8_English': [
    { id: 'c1', name: 'The Best Christmas Present in the World', weightage: '12%' },
    { id: 'c2', name: 'Poem: The Ant and the Cricket', weightage: '8%' },
    { id: 'c3', name: 'The Tsunami', weightage: '12%' },
    { id: 'c4', name: 'Poem: Geography Lesson', weightage: '8%' },
    { id: 'c5', name: 'Glimpses of the Past', weightage: '12%' },
    { id: 'c6', name: 'Bepin Choudhury’s Lapse of Memory', weightage: '14%' },
    { id: 'c7', name: 'Poem: The Last Bargain', weightage: '8%' },
    { id: 'c8', name: 'Grammar: Active and Passive Voice', weightage: '15%' },
    { id: 'c9', name: 'Grammar: Direct and Indirect Speech', weightage: '15%' },
    { id: 'c10', name: 'Grammar: Tenses, Modals & Determiners', weightage: '14%' },
    { id: 'c11', name: 'Writing Skills: Formal Letter, Notice & Essay Writing', weightage: '20%' }
  ],
  // Class 8 Urdu
  '8_Urdu': [
    { id: 'c1', name: 'حمد باری تعالیٰ (Hamd)', weightage: '10%' },
    { id: 'c2', name: 'نعتِ رسولِ مقبول ﷺ (Naat)', weightage: '10%' },
    { id: 'c3', name: 'علامہ اقبال کی شاعری اور پیغام (Allama Iqbal)', weightage: '15%' },
    { id: 'c4', name: 'کشمیر کے تاریخی باغات (Historical Gardens of Kashmir)', weightage: '15%' },
    { id: 'c5', name: 'قومی یکجہتی (National Integration)', weightage: '12%' },
    { id: 'c6', name: 'غالب کی حسِ مزاح (Humour of Ghalib)', weightage: '14%' },
    { id: 'c7', name: 'اردو قواعد: اسم، صفت، ضمیر اور فعل (Grammar)', weightage: '18%' },
    { id: 'c8', name: 'خطوط نگاری اور مضمون نویسی (Letter & Essay Writing)', weightage: '20%' }
  ],
  // Class 5 EVS
  '5_EVS': [
    { id: 'c1', name: 'Super Senses (How animals smell, hear and see)', weightage: '15%' },
    { id: 'c2', name: 'A Snake Charmer’s Story', weightage: '12%' },
    { id: 'c3', name: 'From Tasting to Digesting', weightage: '15%' },
    { id: 'c4', name: 'Mangoes Round the Year (Food Preservation)', weightage: '12%' },
    { id: 'c5', name: 'Seeds and Seeds (Seed Dispersal)', weightage: '14%' },
    { id: 'c6', name: 'Every Drop Counts (Water Conservation & Baolis)', weightage: '16%' },
    { id: 'c7', name: 'Experiments with Water (Floating and Sinking)', weightage: '12%' },
    { id: 'c8', name: 'A Treat for Mosquitoes (Malaria & Health)', weightage: '14%' },
    { id: 'c9', name: 'Up You Go! (Mountaineering & Bachendri Pal)', weightage: '12%' },
    { id: 'c10', name: 'Walls Tell Stories (Golconda Fort)', weightage: '12%' }
  ]
};

// Fallback generic generator for classes / subjects without a dedicated matrix
export function getChaptersForClassAndSubject(cls, subject) {
  const key = `${cls}_${subject}`;
  if (CHAPTER_DATABASE[key]) {
    return CHAPTER_DATABASE[key];
  }

  // Generates 8 standard curriculum units tailored to class and subject
  return [
    { id: 'u1', name: `Unit 1: Fundamentals of ${subject} (Level ${cls})`, weightage: '12%' },
    { id: 'u2', name: `Unit 2: Core Concepts & Principles`, weightage: '14%' },
    { id: 'u3', name: `Unit 3: Structural Analysis & Dynamics`, weightage: '12%' },
    { id: 'u4', name: `Unit 4: Methods, Experiments & Calculations`, weightage: '15%' },
    { id: 'u5', name: `Unit 5: Real-World Applications & Case Studies`, weightage: '14%' },
    { id: 'u6', name: `Unit 6: Critical Inquiries & Investigations`, weightage: '12%' },
    { id: 'u7', name: `Unit 7: Quantitative Problem Solving`, weightage: '11%' },
    { id: 'u8', name: `Unit 8: Advanced Synthesis & Review`, weightage: '10%' }
  ];
}
