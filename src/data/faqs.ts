import { FAQ } from '../types';

export const INITIAL_FAQS: FAQ[] = [
  {
    id: 'f1',
    question: 'How do I enroll my child at Surbhi Coaching Academy?',
    answer: 'Enrolling is simple: 1) Fill out our online Enquiry Form or visit either of our campuses in Nagpur. 2) Schedule an academic diagnostic & counseling session. 3) Avail our complimentary 2-day classroom trial pass. 4) Complete the admission form and collect your course kit.',
    category: 'admissions',
    displayOrder: 1,
    status: 'active'
  },
  {
    id: 'f2',
    question: 'What is the maximum batch size in each class?',
    answer: 'We strictly maintain small batch sizes capped at 25 to 30 students per classroom. This ensures that every child receives individualized attention from the faculty and can comfortably ask questions without hesitation.',
    category: 'academics',
    displayOrder: 2,
    status: 'active'
  },
  {
    id: 'f3',
    question: 'What courses and subjects are offered at Surbhi Coaching Academy?',
    answer: 'We offer comprehensive coaching for Class 6 to 10 (Foundation in Science, Maths, English, Social Science), Class 11-12 Science (Physics, Chemistry, Maths, Biology), Class 11-12 Commerce (Accountancy, Economics, Business Studies, Applied Maths), and competitive foundation programs for Olympiads and NTSE.',
    category: 'academics',
    displayOrder: 3,
    status: 'active'
  },
  {
    id: 'f4',
    question: 'How are student doubts resolved if they do not understand a topic in class?',
    answer: 'In addition to interactive in-class discussions, we conduct dedicated daily 1-on-1 Doubt Clearing Clinics with subject experts between 4:00 PM and 7:00 PM. Students can also request personal revision sessions for challenging chapters.',
    category: 'academics',
    displayOrder: 4,
    status: 'active'
  },
  {
    id: 'f5',
    question: 'Are there merit scholarships or sibling discounts available?',
    answer: 'Yes! Surbhi Academy offers merit scholarships of up to 40% based on the student\'s previous academic scores or performance in our Academy Diagnostic Assessment. We also offer special concessions for siblings and early-bird registrants.',
    category: 'admissions',
    displayOrder: 5,
    status: 'active'
  },
  {
    id: 'f6',
    question: 'How are parents kept informed about student attendance and academic progress?',
    answer: 'Parents receive real-time SMS and WhatsApp attendance updates daily. Detailed academic progress cards, chapter-wise test evaluations, and teacher feedback reports are shared during quarterly Parent-Teacher Meetings (PTMs) and through our direct counseling line.',
    category: 'facilities',
    displayOrder: 6,
    status: 'active'
  },
  {
    id: 'f7',
    question: 'Is printed study material and reference books provided?',
    answer: 'Yes, every enrolled student receives a comprehensive Surbhi Learning Kit consisting of chapter-wise theory modules, Daily Practice Problems (DPPs), solved past 10-year question banks, formula booklets, and mind maps curated by senior examiners.',
    category: 'facilities',
    displayOrder: 7,
    status: 'active'
  },
  {
    id: 'f8',
    question: 'What are the Academy operating and class timings?',
    answer: 'Our campuses are open Monday to Saturday from 8:00 AM to 8:30 PM, and Sundays from 9:00 AM to 2:00 PM for counseling. Morning batches operate from 6:30 AM to 9:00 AM, while evening batches run from 4:00 PM to 8:30 PM to suit regular school schedules.',
    category: 'general',
    displayOrder: 8,
    status: 'active'
  }
];
