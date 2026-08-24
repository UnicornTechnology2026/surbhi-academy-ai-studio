import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'c1',
    slug: 'class 8 junior-foundation',
    title: 'Class 8 Junior Foundation Program',
    category: 'foundation',
    categoryLabel: 'School Programs',
    gradeLevel: 'Class 8',
    duration: '1 Year (Annual Integrated)',
    badge: 'Popular for Young Minds',
    shortDescription: 'Building rock-solid fundamentals in Mathematics, Science, and Logical Aptitude for middle school learners.',
    fullDescription: 'The Junior Foundation program is meticulously structured for students of Classes 6, 7, and 8. It focuses on developing conceptual clarity, curiosity, and critical thinking. Rather than rote memorization, students are introduced to experiential science demonstrations, analytical math problems, and mental aptitude skills that prepare them for Olympiads and future competitive exams.',
    subjects: ['Mathematics', 'Science (Physics, Chem, Bio)', 'Logical Reasoning & Mental Ability', 'English Grammar Foundation'],
    features: [
      'Concept-first visual teaching pedagogy',
      'Regular diagnostic tests with detailed parental feedback',
      'Special sessions for Olympiad & NTSE foundation',
      'Small batch size ensuring 1-on-1 attention',
      'Daily Practice Problem (DPP) booklets'
    ],
    eligibility: 'Students studying in or entering Class 6, 7, or 8 (CBSE / ICSE / State Board)',
    classTiming: 'Evening Batches: 4:30 PM – 7:00 PM (Mon to Fri)',
    batchSize: '25 Students maximum per batch',
    materialsIncluded: [
      'Comprehensive Theory & Workbooks',
      'Monthly Concept Mastery Sheets',
      'Olympiad Prep Guidebook',
      'Parent Progress Diary'
    ],
    curriculumHighlights: [
      {
        title: 'Number Systems & Algebraic Foundations',
        description: 'Mastering mental math shortcuts, algebraic equations, geometry constructions, and real-world arithmetic.'
      },
      {
        title: 'Fundamental Physical & Chemical Sciences',
        description: 'Hands-on scientific principles, atomic structures, forces, energy transformations, and ecosystem biology.'
      },
      {
        title: 'Logical Aptitude & Problem Solving',
        description: 'Spatial reasoning, pattern recognition, coding-decoding, and puzzle-solving drills to sharpen analytical intellect.'
      }
    ],
    targetedExams: ['School Board Exams', 'IMO (Math Olympiad)', 'NSO (Science Olympiad)', 'NSTSE'],
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
    feesInfo: 'Contact for Fee Structure & Merit Scholarship',
    status: 'active',
    displayOrder: 1
  },
  {
    id: 'c2',
    slug: 'class-9-pre-board-foundation',
    title: 'Class 9 Pre-Board & Concept Mastery',
    category: 'foundation',
    categoryLabel: 'School Programs',
    gradeLevel: 'Class 9',
    duration: '1 Academic Year',
    badge: 'High Impact',
    shortDescription: 'In-depth conceptual mastery for Class 9 syllabus with early bridge training for senior secondary success.',
    fullDescription: 'Class 9 is the pivotal bridge between middle school and secondary board exams. Our curriculum covers the entire syllabus with greater depth, linking fundamental Class 9 concepts with high-level senior secondary applications in physics, chemistry, and mathematics. Continuous evaluation and remedial sessions ensure zero backlog.',
    subjects: ['Advanced Mathematics', 'Physics', 'Chemistry', 'Biology', 'Social Science'],
    features: [
      'Complete CBSE / State Board NCERT syllabus mastery',
      'Weekly chapter-end subjective and objective assessments',
      'Special focus on HOTS (High Order Thinking Skills)',
      '1-on-1 personal mentorship and dedicated doubt clinics'
    ],
    eligibility: 'Students passed Class 8 with minimum 60% aggregate',
    classTiming: 'Morning: 6:30 AM – 8:30 AM or Evening: 4:30 PM – 7:30 PM',
    batchSize: '28 Students per batch',
    materialsIncluded: [
      'Surbhi Class 9 Modular Study Guides (5 Volumes)',
      'NCERT Exemplar Solutions & Graded Question Bank',
      'Formula Maps & Quick Revision Handouts'
    ],
    curriculumHighlights: [
      {
        title: 'Physics Mechanics & Thermodynamics Basics',
        description: 'Equations of Motion, Force and Laws of Motion, Gravitation, Work, Energy, and Sound wave mechanics.'
      },
      {
        title: 'Matter, Atoms & Molecular Structures',
        description: 'Matter in Our Surroundings, Is Matter Around Us Pure, Atoms and Molecules, Structure of the Atom.'
      },
      {
        title: 'Coordinate Geometry, Polynomials & Circles',
        description: 'Step-by-step rigorous geometric proofs, linear equations in two variables, and surface area & volume modeling.'
      }
    ],
    targetedExams: ['Class 9 Annual Examinations', 'NTSE Stage 1', 'Maths & Science Olympiads'],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    feesInfo: 'Contact for Fee Structure & Installment Options',
    status: 'active',
    displayOrder: 2
  },
  {
    id: 'c3',
    slug: 'class-10-board-excellence',
    title: 'Class 10 Board Excellence & Merit Batch',
    category: 'foundation',
    categoryLabel: 'Board Excellence',
    gradeLevel: 'Class 10',
    duration: '1 Academic Year + Board Crash Course',
    badge: 'Flagship Program (99.2% Top Score)',
    shortDescription: 'Our premier Class 10 Board program designed to convert potential into 95%+ board toppers and state ranks.',
    fullDescription: 'The Class 10 Board Excellence Batch is Surbhi Academy’s hallmark program. Built on over 29 years of proven board pedagogical experience, this program pairs rigorous conceptual training with structured answer-writing practice, continuous pre-board simulations, examiner rubric feedback, and personalized stress management.',
    subjects: ['Mathematics (Standard / Basic)', 'Science (Physics, Chem, Bio)', 'Social Science', 'English Language & Lit'],
    features: [
      'Comprehensive syllabus completion by October',
      '3-Tier Structured Revision Cycle before Final Boards',
      '15 Full-length Board Simulation Pre-Board Exams with Evaluation',
      'Individual board paper presentation clinics by senior evaluators',
      'Dedicated mental wellness & exam time management coaching'
    ],
    eligibility: 'Students entering or appearing for Class 10 Board (CBSE / ICSE / State Board)',
    classTiming: 'Morning: 6:30 AM – 9:00 AM | Evening: 4:00 PM – 8:00 PM',
    batchSize: '30 Students Maximum',
    materialsIncluded: [
      'Surbhi 10th Board Complete Question Bank (Last 10 Years Solved)',
      'NCERT Line-by-Line Highlight Modules',
      'Board Master Formula Pocket Book',
      'Model Answer Keys with Step-by-Step Marking Breakdown'
    ],
    curriculumHighlights: [
      {
        title: 'Trigonometry, Calculus Foundations & Coordinate Geometry',
        description: 'Deep mastery of real numbers, quadratic equations, arithmetic progressions, triangles, circles, and surface areas.'
      },
      {
        title: 'Chemical Reactions, Carbon Compounds, Electricity & Optics',
        description: 'Complete experimental chemistry equations, ray optics, magnetic effects, heredity, and human physiology.'
      },
      {
        title: 'Answer-Writing & Presentation Mastery',
        description: 'Techniques for point-wise drafting, diagram labeling, numerical layout, and time management per 3-hour paper.'
      }
    ],
    targetedExams: ['CBSE Class 10 Board', 'ICSE Class 10', 'Maharashtra State Board SSC'],
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1000&q=80',
    feesInfo: 'Contact for Fee Structure & Merit Scholarship',
    status: 'active',
    displayOrder: 3
  },
  {
    id: 'c4',
    slug: 'class-11-12-science-pcm-pcb',
    title: 'Class 11 & 12 Science (PCM / PCB / PCMB)',
    category: 'science',
    categoryLabel: 'Senior Secondary Science',
    gradeLevel: 'Class 11 & 12 Science',
    duration: '2-Year Integrated Program / 1-Year Fastrack',
    badge: 'Comprehensive Senior Science',
    shortDescription: 'Rigorous board syllabus coaching integrated with foundation mastery for JEE Main, NEET, and MHT-CET.',
    fullDescription: 'Our Senior Secondary Science program empowers 11th and 12th graders with dual focus: exceptional board examination performance and solid conceptual grounding for engineering (JEE Main) and medical (NEET) entrance exams. Led by veteran senior professors with extensive experience in coaching toppers.',
    subjects: ['Physics', 'Chemistry', 'Mathematics / Applied Maths', 'Biology (Botany & Zoology)', 'English & Informatics'],
    features: [
      'Synchronized board and competitive entrance concept mapping',
      'Topic-wise Daily Practice Problem (DPP) sets with video/live solutions',
      'Specialized Numerical Problem-Solving Masterclasses',
      'Micro-level performance analytics and continuous doubt clinics'
    ],
    eligibility: 'Class 10 passed with minimum 70% in Science and Mathematics',
    classTiming: 'Morning Batches: 7:00 AM – 11:30 AM | Evening: 3:30 PM – 8:00 PM',
    batchSize: '28 Students per batch',
    materialsIncluded: [
      'Surbhi 6-Volume Senior Science Master Study Modules',
      'Previous 15 Years Board & Entrance Solved Compendium',
      'Quick Formula & Reaction Mechanism Handbook'
    ],
    curriculumHighlights: [
      {
        title: 'Mechanics, Electromagnetism, Modern Physics & Optics',
        description: 'Comprehensive mathematical physics derivation, circuit analysis, rotational dynamics, wave optics, and quantum theory.'
      },
      {
        title: 'Physical, Inorganic & Organic Reaction Pathways',
        description: 'Thermodynamics, chemical equilibrium, coordinate chemistry, organic conversions, mechanisms, and stereochemistry.'
      },
      {
        title: 'Calculus, Vectors, Probability & Biological Systems',
        description: 'Differentiation, integration, differential equations, genetics, biotechnology, human physiology, and plant metabolism.'
      }
    ],
    targetedExams: ['Class 12 CBSE / State Board', 'JEE Main', 'NEET UG', 'MHT-CET', 'BITSAT'],
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
    feesInfo: 'Contact for Fee Structure, Installments & Scholarships',
    status: 'active',
    displayOrder: 4
  },

  {
    id: 'c7',
    slug: 'jee-main-advanced-engineering',
    title: 'JEE Main & Advanced Engineering Entrance Program',
    category: 'competitive',
    categoryLabel: 'Engineering Entrance',
    gradeLevel: 'Class 11 & 12 (PCM)',
    duration: '2-Year Integrated Program / 1-Year Crash Course',
    badge: 'IIT-JEE Mentorship Track',
    shortDescription: 'Intensive Physics, Chemistry & Mathematics coaching engineered to crack JEE Main and JEE Advanced with top All-India ranks.',
    fullDescription: 'The JEE Main & Advanced program is built for students with serious engineering ambitions. It combines rigorous concept-building in Physics, Chemistry, and Mathematics with relentless problem-solving practice, weekly All-India-level mock tests, rank-predictor analytics, and one-on-one mentorship from IIT alumni faculty. The curriculum is paced to complete the full JEE syllabus well ahead of board exams, leaving dedicated time for revision and advanced problem sets.',
    subjects: ['Physics (Mechanics to Modern)', 'Chemistry (Physical, Organic & Inorganic)', 'Mathematics (Algebra to Calculus)'],
    features: [
      'IIT-alumni faculty with proven JEE Advanced mentoring record',
      'Weekly All-India Test Series (AITS) with percentile & rank analysis',
      'Topic-wise Daily Practice Problem (DPP) sets of JEE difficulty level',
      'Dedicated Advanced-level problem-solving marathons on weekends',
      'Personalized rank-improvement roadmap & doubt-clearing sessions'
    ],
    eligibility: 'Class 10 passed with strong aptitude in Physics, Chemistry & Mathematics',
    classTiming: 'Morning Batches: 6:30 AM – 11:00 AM | Evening: 3:00 PM – 8:00 PM',
    batchSize: '25 Students per batch',
    materialsIncluded: [
      'Surbhi JEE Master Modules (Physics, Chemistry & Maths)',
      '15-Year Solved JEE Main & Advanced Question Bank',
      'Formula & Concept Revision Handbook',
      'AITS Performance Analytics Report Cards'
    ],
    curriculumHighlights: [
      {
        title: 'Mechanics, Electrodynamics & Modern Physics',
        description: 'Kinematics, Laws of Motion, Rotational Dynamics, Electromagnetism, Optics, and Quantum & Nuclear Physics for JEE-level mastery.',
        duration: '8 Months',
        topics: ['Kinematics & Newtonian Mechanics', 'Electrostatics & Magnetism', 'Wave & Ray Optics', 'Modern Physics']
      },
      {
        title: 'Physical, Organic & Inorganic Chemistry',
        description: 'Thermodynamics, Chemical Kinetics, Equilibrium, Reaction Mechanisms, Coordination Compounds, and Periodic Properties.',
        duration: '8 Months',
        topics: ['Physical Chemistry Fundamentals', 'Organic Reaction Mechanisms', 'Inorganic Chemistry & Periodicity']
      },
      {
        title: 'Advanced Calculus, Algebra & Coordinate Geometry',
        description: 'Differentiation, Integration, Vectors, 3D Geometry, Probability, and Complex Numbers with JEE Advanced-level problem sets.',
        duration: '8 Months',
        topics: ['Calculus & Differential Equations', 'Algebra & Complex Numbers', 'Coordinate & 3D Geometry']
      }
    ],
    targetedExams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'State CETs'],
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1000&q=80',
    feesInfo: 'Contact for Fee Structure, Installments & Merit Scholarships',
    status: 'active',
    displayOrder: 7
  },
  // Add this as the 8th entry in COURSES_DATA (src/data/courses.ts), right after the c7 course object.
  // Change the closing `}` of c7 to `},` and add this block before the final `];`

  {
    id: 'c8',
    slug: 'neet-ug-medical-entrance',
    title: 'NEET UG Medical Entrance Program',
    category: 'competitive',
    categoryLabel: 'Medical Entrance',
    gradeLevel: 'Class 11 & 12 (PCB)',
    duration: '2-Year Integrated Program / 1-Year Crash Course',
    badge: 'NEET Topper Track',
    shortDescription: 'Focused Physics, Chemistry & Biology coaching designed to help students secure top NEET UG ranks for MBBS/BDS admission.',
    fullDescription: 'The NEET UG program is built for students aiming for a career in medicine. It delivers deep NCERT-aligned conceptual clarity in Biology, Physics, and Chemistry alongside relentless MCQ practice, weekly All-India-level mock tests, and personalized rank-improvement mentorship from experienced medical-entrance faculty. The syllabus is paced for early completion, leaving ample time for full-length revision and high-yield topic drilling before the final exam.',
    subjects: ['Biology (Botany & Zoology)', 'Physics (Mechanics to Modern)', 'Chemistry (Physical, Organic & Inorganic)'],
    features: [
      'NCERT-line-by-line mastery with high-yield NEET topic weightage focus',
      'Weekly All-India Test Series (AITS) with percentile & rank analysis',
      'Topic-wise Daily Practice Problem (DPP) MCQ sets of NEET difficulty level',
      'Dedicated Biology diagram & terminology memory-retention drills',
      'Personalized rank-improvement roadmap & doubt-clearing sessions'
    ],
    eligibility: 'Class 10 passed with strong aptitude in Physics, Chemistry & Biology',
    classTiming: 'Morning Batches: 6:30 AM – 11:00 AM | Evening: 3:00 PM – 8:00 PM',
    batchSize: '25 Students per batch',
    materialsIncluded: [
      'Surbhi NEET Master Modules (Biology, Physics & Chemistry)',
      '15-Year Solved NEET UG Question Bank',
      'NCERT-Based Quick Revision & Diagram Handbook',
      'AITS Performance Analytics Report Cards'
    ],
    curriculumHighlights: [
      {
        title: 'Human Physiology, Genetics & Plant Biology',
        description: 'Complete NCERT Botany & Zoology coverage including cell biology, genetics, ecology, and human physiological systems.',
        duration: '8 Months',
        topics: ['Cell Biology & Genetics', 'Human Physiology', 'Plant Physiology & Ecology', 'Biotechnology']
      },
      {
        title: 'Mechanics, Electrodynamics & Modern Physics',
        description: 'Kinematics, Laws of Motion, Electromagnetism, Optics, and Modern Physics tailored to NEET-level numerical application.',
        duration: '8 Months',
        topics: ['Kinematics & Newtonian Mechanics', 'Electrostatics & Magnetism', 'Wave & Ray Optics', 'Modern Physics']
      },
      {
        title: 'Physical, Organic & Inorganic Chemistry',
        description: 'Thermodynamics, Chemical Kinetics, Equilibrium, Reaction Mechanisms, and Periodic Properties with NEET-focused MCQ drills.',
        duration: '8 Months',
        topics: ['Physical Chemistry Fundamentals', 'Organic Reaction Mechanisms', 'Inorganic Chemistry & Periodicity']
      }
    ],
    targetedExams: ['NEET UG', 'AIIMS Entrance', 'State Medical CETs'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    feesInfo: 'Contact for Fee Structure, Installments & Merit Scholarships',
    status: 'active',
    displayOrder: 8
  }
];