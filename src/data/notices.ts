import { Notice } from '../types';

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'n1',
    title: 'Admissions Open for Academic Session 2026–2027: Early Bird Scholarship',
    description: 'Registrations are now open for Class 8, 9, 10 Board Excellence Batches and Class 11-12 Science/Commerce Streams. Avail up to 35% merit-based scholarship on registration before the commencement date.',
    date: '2026-03-15',
    priority: 'urgent',
    category: 'admissions',
    categoryLabel: 'Admissions 2026-27',
    attachmentUrl: '#',
    status: 'published',
    isNew: true
  },
  {
    id: 'n2',
    title: 'Commencement of Special Class 10 Board Revision & Pre-Board Series',
    description: 'Daily revision sessions and intensive doubt clinics for Class 10 CBSE & State Board students will begin next Monday. Comprehensive subject kits and 5-year solved papers will be distributed.',
    date: '2026-03-01',
    priority: 'important',
    category: 'batch',
    categoryLabel: 'Batch Schedule',
    status: 'published',
    isNew: true
  },
  {
    id: 'n3',
    title: 'Parent-Teacher Academic Review Meeting Schedule (Term 2)',
    description: 'Quarterly individual progress discussions between parents and senior subject mentors scheduled for this coming Saturday from 10:00 AM to 4:00 PM at Main Campus.',
    date: '2026-02-20',
    priority: 'normal',
    category: 'academic',
    categoryLabel: 'Academic Notice',
    status: 'published',
    isNew: false
  },
  {
    id: 'n4',
    title: 'National Science Olympiad (NSO) & Maths Olympiad Foundation Boot Camp',
    description: 'Special weekend coaching for registered Olympiad aspirants of Classes 6 to 9 starting from first week of next month. High-order thinking problem worksheets included.',
    date: '2026-02-10',
    priority: 'important',
    category: 'academic',
    categoryLabel: 'Special Program',
    status: 'published',
    isNew: false
  },
  {
    id: 'n5',
    title: 'Notice regarding Academy Timings and Extended Reference Library Hours',
    description: 'The air-conditioned reference reading room and quiet self-study library will now remain open from 7:30 AM until 9:30 PM with on-duty faculty assistance for doubts.',
    date: '2026-01-25',
    priority: 'normal',
    category: 'academic',
    categoryLabel: 'General Update',
    status: 'published',
    isNew: false
  }
];
