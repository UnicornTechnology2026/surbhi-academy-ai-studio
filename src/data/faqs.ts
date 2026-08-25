import { FAQ } from '../types';

export const INITIAL_FAQS: FAQ[] = [
  {
    id: 'f1',
    question: 'How do I enroll my child at Surabhi Coaching Academy?',
    answer: 'Enrolling is simple: 1) Fill out our online Enquiry Form or visit either of our campus in Nagpur. 2) Schedule an academic diagnostic & counseling session. 3) Avail our complimentary 2-day classroom trial pass. 4) Complete the admission form and collect your course kit.',
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
    question: 'What courses and subjects are offered at Surabhi Coaching Academy?',
    answer: 'We offer comprehensive coaching for Class 8 to 10 (Foundation in Science, Maths, English, Social Science), Class 11-12 Science (Physics, Chemistry, Maths, Biology) and competitive foundation programs.',
    category: 'academics',
    displayOrder: 3,
    status: 'active'
  },
  {
    id: 'f4',
    question: 'How are student doubts resolved if they do not understand a topic in class?',
    answer: 'In addition to interactive in-class discussions, we conduct dedicated daily 1-on-1 Doubt Clearing Clinics with subject experts. Students can also request personal revision sessions for challenging chapters.',
    category: 'academics',
    displayOrder: 4,
    status: 'active'
  },
  {
    id: 'f6',
    question: 'How are parents kept informed about student attendance and academic progress?',
    answer: 'Parents receive daily attendance updates. Detailed academic progress cards, chapter-wise test evaluations, and teacher feedback reports are shared directly through the surabhi academy app.',
    category: 'facilities',
    displayOrder: 5,
    status: 'active'
  },
  {
    id: 'f8',
    question: 'What are the Academy operating and class timings?',
    answer: 'Our campuses are open Monday to Saturday from 8:00 AM to 8:30 PM, and Sundays from 9:00 AM to 2:00 PM for counseling. Morning batches operate from 6:30 AM to 9:00 AM, while evening batches run from 4:00 PM to 8:30 PM to suit regular school schedules.',
    category: 'general',
    displayOrder: 6,
    status: 'active'
  }
];
