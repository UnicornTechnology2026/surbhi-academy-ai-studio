import { FacultyMember } from '../types';

export const FACULTY_DATA: FacultyMember[] = [
  {
    id: 'f1',
    name: 'Mr. Sandeep Panchabhai',
    role: 'Founder & Head of Mathematics',
    department: 'Mathematics',
    qualifications: 'Ph.D. in Applied Mathematics, M.Sc. (Gold Medalist), B.Ed.',
    experience: '18+ Years of Academic Mentorship',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    bio: 'Founder of Surabhi Coaching Academy with a passionate mission to eliminate math phobia. Over 18 years, Dr. Sharma has personally mentored over 8,000 students, guiding 40+ city toppers to perfect 100/100 scores in Board & Competitive exams.',
    achievements: [
      'Authored 4 bestselling Board Mathematics preparation reference guidebooks',
      'Honored with the "Excellence in Pedagogy" State Teacher Award (2022)',
      'Mentored over 350 students who scored 99%+ in Class 10 & 12 Boards'
    ],
    subjectsTaught: ['Class 10 Advanced Mathematics', 'Class 11-12 Higher Calculus & Algebra', 'Olympiad IOQM/PRMO'],
    displayOrder: 1,
    status: 'active'
  },
  {
    id: 'f2',
    name: 'Prof. Sandhya Mehra',
    role: 'Head of Physics Department',
    department: 'Physics',
    qualifications: 'M.Sc. Physics (IIT Roorkee Alumnus), B.Ed., NET Qualified',
    experience: '14+ Years in Senior Secondary Coaching',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    bio: 'Renowned for her dynamic, visual approach to complex mechanics and electrodynamics. Prof. Mehra breaks down abstract physics theories into relatable everyday phenomena, making physics intuitive and exciting.',
    achievements: [
      'Ex-Faculty at Premier National Institutes with 99.4 percentile physics students',
      'Developed Surabhi Academy’s signature "Visual Derivations" physics compendium',
      'Specialist in board answer formatting and numerical accuracy'
    ],
    subjectsTaught: ['Class 11 Physics (Mechanics & Waves)', 'Class 12 Physics (Electromagnetism & Optics)', 'NEET/JEE Physics'],
    displayOrder: 2,
    status: 'active'
  },
  {
    id: 'f3',
    name: 'Dr. Vivek K. Sinha',
    role: 'Senior Professor of Chemistry',
    department: 'Chemistry',
    qualifications: 'Ph.D. in Organic Chemistry, M.Sc. Chemistry, CSIR NET (AIR 48)',
    experience: '15+ Years in Medical & Board Coaching',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Sinha specializes in making organic reaction mechanisms and chemical bonding crystal clear. His structured reaction flowcharts and mnemonic charts are student favorites across all batches.',
    achievements: [
      'Published 12 research papers in international chemistry journals',
      'Trained 25+ students who achieved 99+ marks in Class 12 CBSE Board Chemistry',
      'Conducted 50+ experimental chemistry workshops for foundation learners'
    ],
    subjectsTaught: ['Class 10 Science (Chemistry)', 'Class 11-12 Organic & Inorganic Chemistry', 'Physical Chemistry Problem Solving'],
    displayOrder: 3,
    status: 'active'
  },
  {
    id: 'f4',
    name: 'CA Amitav Bose',
    role: 'Head of Commerce & Accountancy',
    department: 'Commerce',
    qualifications: 'FCA (Fellow Chartered Accountant), B.Com (Hons), DISA',
    experience: '12+ Years in Professional & Board Education',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    bio: 'A practicing Chartered Accountant with deep passion for teaching. CA Bose brings real corporate financial scenarios into the classroom, enabling commerce students to easily master complex balance sheets and partnership accounts.',
    achievements: [
      'Mentored multiple State Rank 1s in Class 12 Commerce Board Exams',
      'Over 90% students under his guidance achieve distinction in Accountancy',
      'Lead mentor for CA Foundation & CUET Commerce batches'
    ],
    subjectsTaught: ['Class 11 & 12 Financial Accounting', 'Company Accounts & Analysis', 'CA Foundation Fundamentals'],
    displayOrder: 4,
    status: 'active'
  },
  {
    id: 'f5',
    name: 'Dr. Neelam Deshpande',
    role: 'Senior Faculty of Biology & Biotechnology',
    department: 'Biology',
    qualifications: 'M.Sc. Life Sciences, Ph.D. in Botany, Gold Medalist',
    experience: '13+ Years in Academic & Pre-Medical Mentorship',
    image: 'https://images.unsplash.com/photo-1580894732488-bf12185292fa?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Neelam is acclaimed for her detailed biological illustrations, line-by-line NCERT decoding, and deep conceptual clarity in genetics, human physiology, and ecology.',
    achievements: [
      'Mentored 120+ students selected in prestigious Government Medical Colleges',
      'Creator of Surabhi "Diagram Mastery" handbook for 10th & 12th Board exams',
      'Specialist in scoring 350+ in NEET Biology and 98%+ in Board Biology'
    ],
    subjectsTaught: ['Class 10 Biology', 'Class 11-12 Botany & Zoology', 'NEET Pre-Medical Biology'],
    displayOrder: 5,
    status: 'active'
  },
  {
    id: 'f6',
    name: 'Prof. Rajesh K. Tiwari',
    role: 'Senior Mentor - Foundation & Social Sciences',
    department: 'Foundation',
    qualifications: 'M.A. Economics & History, M.Ed., UGC NET Qualified',
    experience: '16+ Years in Foundation & NTSE Coaching',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    bio: 'Prof. Tiwari brings history, civics, economics, and geography to life through storytelling, case studies, and structured mind mapping that makes social science easy to remember and score full marks.',
    achievements: [
      'Guided over 200 NTSE Stage 1 and Stage 2 successful scholars',
      'Developed the "Zero-Stress Board Social Science" answer-writing framework',
      'Student rating consistently 4.95/5 over the last 8 academic years'
    ],
    subjectsTaught: ['Class 9 & 10 Social Science', 'NTSE Social Studies & Mental Aptitude', 'Junior Foundation Humanities'],
    displayOrder: 6,
    status: 'active'
  }
];
