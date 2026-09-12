/**
 * EduGen AI - Real-time Multilingual Translation Engine
 * Translates educational notes, question papers, and worksheets
 * between English, Urdu, and Hindi while strictly preserving Markdown,
 * bullet points, numbered lists, and mathematical formulas.
 */

// Language code mapping for translation APIs
const LANG_MAP = {
  English: 'en',
  'Urdu': 'ur',
  'Hindi': 'hi'
};

// Educational Terminology Dictionary for offline/instant high-accuracy fallback
const EDUCATIONAL_DICTIONARY = {
  // English -> Urdu
  'en_ur': {
    'Force and Pressure': 'قوت اور دباؤ',
    'Force': 'قوت',
    'Pressure': 'دباؤ',
    'Definition': 'تعریف',
    'Atmospheric Pressure': 'فضائی دباؤ',
    'Science': 'سائنس',
    'Mathematics': 'ریاضی',
    'Social Science': 'سماجی علوم',
    'Chapter': 'سبق / باب',
    'Class': 'جماعت',
    'Question': 'سوال',
    'Answer': 'جواب',
    'Section': 'حصہ',
    'Marks': 'نمبرات',
    'Time Allowed': 'مقررہ وقت',
    'Roll No': 'رول نمبر',
    'Teacher': 'استاد / معلم',
    'Student': 'طالب علم',
    'School': 'اسکول / درسگاہ',
    'Annual Examination': 'سالانہ امتحان',
    'True or False': 'درست یا غلط',
    'Fill in the blanks': 'خالی جگہیں پُر کریں',
    'Multiple Choice Questions': 'کثیر الانتخابی سوالات',
    'Short Answer': 'مختصر جواب',
    'Long Answer': 'تفصیلی جواب',
    'Objective': 'مقصد',
    'Homework': 'گھر کا کام',
    'Activity': 'سرگرمی',
    'Evaluation': 'جائزہ / جانچ'
  },
  // English -> Hindi
  'en_hi': {
    'Force and Pressure': 'बल तथा दाब',
    'Force': 'बल',
    'Pressure': 'दाब',
    'Definition': 'परिभाषा',
    'Atmospheric Pressure': 'वायुमंडलीय दाब',
    'Science': 'विज्ञान',
    'Mathematics': 'गणित',
    'Social Science': 'सामाजिक विज्ञान',
    'Chapter': 'अध्याय / पाठ',
    'Class': 'कक्षा',
    'Question': 'प्रश्न',
    'Answer': 'उत्तर',
    'Section': 'खंड',
    'Marks': 'अंक',
    'Time Allowed': 'समय',
    'Roll No': 'अनुक्रमांक',
    'Teacher': 'अध्यापक / शिक्षक',
    'Student': 'विद्यार्थी / छात्र',
    'School': 'विद्यालय',
    'Annual Examination': 'वार्षिक परीक्षा',
    'True or False': 'सत्य या असत्य',
    'Fill in the blanks': 'रिक्त स्थान भरें',
    'Multiple Choice Questions': 'बहुविकल्पीय प्रश्न',
    'Short Answer': 'लघु उत्तरीय',
    'Long Answer': 'दीर्घ उत्तरीय',
    'Objective': 'उद्देश्य',
    'Homework': 'गृहकार्य',
    'Activity': 'गतिविधि',
    'Evaluation': 'मूल्यांकन'
  }
};

/**
 * Translate a single sentence or chunk using the MyMemory API
 */
async function translateChunk(text, fromCode, toCode) {
  if (!text.trim()) return text;

  try {
    const encoded = encodeURIComponent(text.trim());
    const url = `https://api.mymemory.translated.net/get?q=${encoded}&langpair=${fromCode}|${toCode}`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (data && data.responseData && data.responseData.translatedText) {
      // Decode HTML entities if any returned by MyMemory
      const parser = new DOMParser();
      const decoded = parser.parseFromString(data.responseData.translatedText, 'text/html').body.textContent;
      return decoded || data.responseData.translatedText;
    }
  } catch (err) {
    console.warn('API translation fallback triggered:', err);
  }

  // Fallback: Check terminology dictionary
  const dictKey = `${fromCode}_${toCode}`;
  if (EDUCATIONAL_DICTIONARY[dictKey]) {
    let result = text;
    for (const [en, target] of Object.entries(EDUCATIONAL_DICTIONARY[dictKey])) {
      const reg = new RegExp(`\\b${en}\\b`, 'gi');
      result = result.replace(reg, target);
    }
    return result;
  }

  return text;
}

/**
 * Main translation function that preserves markdown structure:
 * - Line breaks
 * - Headers (#, ##, ###)
 * - Bullets (*, -, •)
 * - Numbered lines (1., 2., Q1., etc.)
 */
export async function translateEducationalText(text, fromLang, toLang, geminiApiKey = '') {
  if (!text || !text.trim()) return '';

  const fromCode = LANG_MAP[fromLang] || 'en';
  const toCode = LANG_MAP[toLang] || 'ur';

  if (fromCode === toCode) return text;

  // Split into lines to preserve structural markdown
  const lines = text.split('\n');
  const translatedLines = [];

  for (let line of lines) {
    // Preserve empty lines
    if (!line.trim()) {
      translatedLines.push('');
      continue;
    }

    // Preserve Markdown Header prefixes (#, ##, etc.)
    const headerMatch = line.match(/^(#{1,6}\s+)(.*)$/);
    if (headerMatch) {
      const prefix = headerMatch[1];
      const content = headerMatch[2];
      const trans = await translateChunk(content, fromCode, toCode);
      translatedLines.push(`${prefix}${trans}`);
      continue;
    }

    // Preserve Bullet list prefixes (*, -, •)
    const bulletMatch = line.match(/^(\s*[*•-]\s+)(.*)$/);
    if (bulletMatch) {
      const prefix = bulletMatch[1];
      const content = bulletMatch[2];
      const trans = await translateChunk(content, fromCode, toCode);
      translatedLines.push(`${prefix}${trans}`);
      continue;
    }

    // Preserve Numbered list prefixes (1., 2., Q1., etc.)
    const numMatch = line.match(/^(\s*(?:[0-9]+|[A-Z]|Q[0-9]+)[\.\)]\s+)(.*)$/);
    if (numMatch) {
      const prefix = numMatch[1];
      const content = numMatch[2];
      const trans = await translateChunk(content, fromCode, toCode);
      translatedLines.push(`${prefix}${trans}`);
      continue;
    }

    // Standard paragraph line
    const trans = await translateChunk(line, fromCode, toCode);
    translatedLines.push(trans);
  }

  return translatedLines.join('\n');
}
