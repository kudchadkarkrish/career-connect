/**
 * ============================================================================
 * PLACEMENT DRIVE TRACKER - DEMO DATASET
 * ============================================================================
 * NOTE: All data below is purely synthetic and curated for portfolio demo
 * purposes. It does not represent actual student records or college drives.
 * ============================================================================
 */

export const INITIAL_COMPANIES = [
  {
    id: 'comp-1',
    name: 'Google India',
    industry: 'Product / Big Tech',
    tier: 'Tier-1 Dream',
    website: 'https://careers.google.com',
    location: 'Bengaluru / Hyderabad',
    rolesOffered: ['Software Development Engineer', 'Cloud Technical Resident'],
    basePackageLPA: 22.0,
    maxPackageLPA: 28.5,
    contactEmail: 'campus-recruiting@google.com',
    status: 'Active Partner'
  },
  {
    id: 'comp-2',
    name: 'Microsoft',
    industry: 'Product / Cloud',
    tier: 'Tier-1 Dream',
    website: 'https://careers.microsoft.com',
    location: 'Hyderabad / Noida',
    rolesOffered: ['Software Engineer', 'Support Engineer'],
    basePackageLPA: 18.0,
    maxPackageLPA: 24.0,
    contactEmail: 'india-campus@microsoft.com',
    status: 'Active Partner'
  },
  {
    id: 'comp-3',
    name: 'Texas Instruments',
    industry: 'Semiconductor / Hardware',
    tier: 'Tier-1 Core',
    website: 'https://careers.ti.com',
    location: 'Bengaluru',
    rolesOffered: ['Embedded Software Engineer', 'Analog Design Trainee'],
    basePackageLPA: 16.0,
    maxPackageLPA: 20.0,
    contactEmail: 'univ-relations@ti.com',
    status: 'Active Partner'
  },
  {
    id: 'comp-4',
    name: 'Cisco Systems',
    industry: 'Networking / Enterprise',
    tier: 'Tier-1',
    website: 'https://cisco.com/careers',
    location: 'Bengaluru',
    rolesOffered: ['Systems Software Engineer', 'Technical Consulting Engineer'],
    basePackageLPA: 14.5,
    maxPackageLPA: 17.5,
    contactEmail: 'cisco-placements@cisco.com',
    status: 'Active Partner'
  },
  {
    id: 'comp-5',
    name: 'Deloitte USI',
    industry: 'Consulting / Technology',
    tier: 'Tier-2',
    website: 'https://deloitte.com/careers',
    location: 'Mumbai / Bengaluru / Hyderabad',
    rolesOffered: ['Technology Analyst', 'Cyber Risk Consultant'],
    basePackageLPA: 8.5,
    maxPackageLPA: 10.5,
    contactEmail: 'campus-deloitte@deloitte.com',
    status: 'Active Partner'
  },
  {
    id: 'comp-6',
    name: 'Zomato',
    industry: 'Consumer Internet / Product',
    tier: 'Tier-1',
    website: 'https://zomato.com/careers',
    location: 'Gurugram',
    rolesOffered: ['Associate Software Engineer', 'Data Analyst'],
    basePackageLPA: 13.0,
    maxPackageLPA: 16.0,
    contactEmail: 'talent@zomato.com',
    status: 'Active Partner'
  },
  {
    id: 'comp-7',
    name: 'Tata Consultancy Services',
    industry: 'IT Services / Consulting',
    tier: 'Mass Recruiter',
    website: 'https://tcs.com/careers',
    location: 'Pan India (Pune / Mumbai / Chennai)',
    rolesOffered: ['Digital Developer', 'Ninja Trainee'],
    basePackageLPA: 3.6,
    maxPackageLPA: 7.2,
    contactEmail: 'tcs.campus@tcs.com',
    status: 'Active Partner'
  },
  {
    id: 'comp-8',
    name: 'Larsen & Toubro (L&T)',
    industry: 'Heavy Engineering / Infra',
    tier: 'Tier-2 Core',
    website: 'https://larsentoubro.com',
    location: 'Chennai / Vadodara / Mumbai',
    rolesOffered: ['Graduate Engineer Trainee (Mechanical)', 'Civil Project Engineer'],
    basePackageLPA: 6.5,
    maxPackageLPA: 7.8,
    contactEmail: 'careers@larsentoubro.com',
    status: 'Active Partner'
  },
  {
    id: 'comp-9',
    name: 'Cognizant',
    industry: 'IT Services / Enterprise',
    tier: 'Mass Recruiter',
    website: 'https://cognizant.com',
    location: 'Chennai / Coimbatore / Bengaluru',
    rolesOffered: ['GenC Next Developer', 'GenC Elevate Analyst'],
    basePackageLPA: 4.5,
    maxPackageLPA: 6.75,
    contactEmail: 'genc.campus@cognizant.com',
    status: 'Active Partner'
  }
];

export const INITIAL_DRIVES = [
  {
    id: 'drv-1',
    companyId: 'comp-1',
    companyName: 'Google India',
    role: 'Software Development Engineer',
    packageLPA: 24.5,
    driveDate: '2026-08-15',
    deadline: '2026-08-10',
    location: 'Virtual / Campus Auditorium',
    status: 'Completed',
    minCGPA: 8.0,
    maxBacklogs: 0,
    eligibleBranches: ['CSE', 'IT', 'ECE'],
    registeredCount: 42,
    selectedCount: 3,
    rounds: ['Online Coding Assessment', 'Technical Interview 1', 'Technical Interview 2', 'Googliness & Leadership'],
    description: 'Premier campus recruitment for full-time 2027 graduating batch.'
  },
  {
    id: 'drv-2',
    companyId: 'comp-2',
    companyName: 'Microsoft',
    role: 'Software Engineer',
    packageLPA: 21.0,
    driveDate: '2026-08-25',
    deadline: '2026-08-20',
    location: 'Online Assessment & Virtual Rounds',
    status: 'Completed',
    minCGPA: 7.8,
    maxBacklogs: 0,
    eligibleBranches: ['CSE', 'IT'],
    registeredCount: 38,
    selectedCount: 2,
    rounds: ['Codility Test', 'System Design Round', 'Core Problem Solving', 'AA & Fitment'],
    description: 'Engineering campus drive for Azure and Office365 engineering units.'
  },
  {
    id: 'drv-3',
    companyId: 'comp-4',
    companyName: 'Cisco Systems',
    role: 'Systems Software Engineer',
    packageLPA: 16.5,
    driveDate: '2026-09-05',
    deadline: '2026-09-01',
    location: 'Campus Computing Center Lab 3',
    status: 'Completed',
    minCGPA: 7.2,
    maxBacklogs: 0,
    eligibleBranches: ['CSE', 'IT', 'ECE'],
    registeredCount: 55,
    selectedCount: 4,
    rounds: ['Aptitude & Networking MCQ', 'Technical Interview', 'Managerial Interview'],
    description: 'Hiring for routing, switching, and cloud security platforms.'
  },
  {
    id: 'drv-4',
    companyId: 'comp-3',
    companyName: 'Texas Instruments',
    role: 'Embedded Software Engineer',
    packageLPA: 18.0,
    driveDate: '2026-09-14',
    deadline: '2026-09-12',
    location: 'Electronics Block Seminar Hall',
    status: 'Ongoing',
    minCGPA: 7.5,
    maxBacklogs: 0,
    eligibleBranches: ['ECE', 'CSE'],
    registeredCount: 31,
    selectedCount: 0,
    rounds: ['Analog/Digital Hardware Test', 'Firmware Coding Round', 'Technical Panel'],
    description: 'Core hardware and low-level firmware engineering drive.'
  },
  {
    id: 'drv-5',
    companyId: 'comp-6',
    companyName: 'Zomato',
    role: 'Associate Software Engineer',
    packageLPA: 14.0,
    driveDate: '2026-09-20',
    deadline: '2026-09-17',
    location: 'Virtual Hackathon',
    status: 'Upcoming',
    minCGPA: 7.0,
    maxBacklogs: 1,
    eligibleBranches: ['CSE', 'IT', 'ECE'],
    registeredCount: 48,
    selectedCount: 0,
    rounds: ['Online Proctored Hackathon', 'Rapid Fire Tech Interview', 'Culture Interview'],
    description: 'Consumer backend and high-scale mobile engineering roles.'
  },
  {
    id: 'drv-6',
    companyId: 'comp-5',
    companyName: 'Deloitte USI',
    role: 'Technology Analyst',
    packageLPA: 9.5,
    driveDate: '2026-09-28',
    deadline: '2026-09-24',
    location: 'Main Auditorium',
    status: 'Upcoming',
    minCGPA: 6.8,
    maxBacklogs: 0,
    eligibleBranches: ['CSE', 'IT', 'ECE', 'ME', 'CE'],
    registeredCount: 78,
    selectedCount: 0,
    rounds: ['Cognitive & Aptitude Test', 'Business Case Study', 'HR Interview'],
    description: 'Consulting technology practice open to all core engineering streams.'
  },
  {
    id: 'drv-7',
    companyId: 'comp-8',
    companyName: 'Larsen & Toubro (L&T)',
    role: 'Graduate Engineer Trainee (Mechanical & Civil)',
    packageLPA: 7.0,
    driveDate: '2026-10-06',
    deadline: '2026-10-01',
    location: 'Civil/Mechanical Block',
    status: 'Upcoming',
    minCGPA: 6.5,
    maxBacklogs: 1,
    eligibleBranches: ['ME', 'CE'],
    registeredCount: 34,
    selectedCount: 0,
    rounds: ['Domain Technical Test', 'Group Discussion', 'Personal Interview'],
    description: 'Flagship core engineering campus recruitment for heavy infra projects.'
  }
];

export const INITIAL_STUDENTS = [
  // CSE Branch Students
  {
    id: 'std-1',
    name: 'Aarav Sharma',
    rollNo: '2022CSB001',
    email: 'aarav.s@college.edu',
    branch: 'CSE',
    cgpa: 9.45,
    backlogs: 0,
    skills: ['C++', 'Python', 'System Design', 'Docker'],
    status: 'Placed',
    placedDetails: {
      companyId: 'comp-1',
      companyName: 'Google India',
      role: 'Software Development Engineer',
      packageLPA: 24.5,
      driveId: 'drv-1',
      offerDate: '2026-08-16'
    }
  },
  {
    id: 'std-2',
    name: 'Diya Patel',
    rollNo: '2022CSB002',
    email: 'diya.p@college.edu',
    branch: 'CSE',
    cgpa: 9.12,
    backlogs: 0,
    skills: ['Java', 'Spring Boot', 'Kubernetes', 'MySQL'],
    status: 'Placed',
    placedDetails: {
      companyId: 'comp-2',
      companyName: 'Microsoft',
      role: 'Software Engineer',
      packageLPA: 21.0,
      driveId: 'drv-2',
      offerDate: '2026-08-26'
    }
  },
  {
    id: 'std-3',
    name: 'Rohan Deshmukh',
    rollNo: '2022CSB003',
    email: 'rohan.d@college.edu',
    branch: 'CSE',
    cgpa: 8.65,
    backlogs: 0,
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    status: 'Placed',
    placedDetails: {
      companyId: 'comp-1',
      companyName: 'Google India',
      role: 'Software Development Engineer',
      packageLPA: 24.5,
      driveId: 'drv-1',
      offerDate: '2026-08-16'
    }
  },
  {
    id: 'std-4',
    name: 'Sneha Iyer',
    rollNo: '2022CSB004',
    email: 'sneha.i@college.edu',
    branch: 'CSE',
    cgpa: 8.42,
    backlogs: 0,
    skills: ['Python', 'FastAPI', 'Redis', 'AWS'],
    status: 'Placed',
    placedDetails: {
      companyId: 'comp-4',
      companyName: 'Cisco Systems',
      role: 'Systems Software Engineer',
      packageLPA: 16.5,
      driveId: 'drv-3',
      offerDate: '2026-09-06'
    }
  },
  {
    id: 'std-5',
    name: 'Vikram Joshi',
    rollNo: '2022CSB005',
    email: 'vikram.j@college.edu',
    branch: 'CSE',
    cgpa: 7.85,
    backlogs: 0,
    skills: ['Java', 'Data Structures', 'Git', 'Linux'],
    status: 'Unplaced',
    placedDetails: null
  },
  {
    id: 'std-6',
    name: 'Ananya Verma',
    rollNo: '2022CSB006',
    email: 'ananya.v@college.edu',
    branch: 'CSE',
    cgpa: 7.40,
    backlogs: 0,
    skills: ['JavaScript', 'HTML/CSS', 'MongoDB', 'Express'],
    status: 'Unplaced',
    placedDetails: null
  },
  {
    id: 'std-7',
    name: 'Kunal Roy',
    rollNo: '2022CSB007',
    email: 'kunal.r@college.edu',
    branch: 'CSE',
    cgpa: 6.95,
    backlogs: 1,
    skills: ['Python', 'Django', 'SQL'],
    status: 'Unplaced',
    placedDetails: null
  },
  {
    id: 'std-8',
    name: 'Pooja Nair',
    rollNo: '2022CSB008',
    email: 'pooja.n@college.edu',
    branch: 'CSE',
    cgpa: 8.10,
    backlogs: 0,
    skills: ['C++', 'Algorithms', 'Computer Networks'],
    status: 'Unplaced',
    placedDetails: null
  },

  // IT Branch Students
  {
    id: 'std-9',
    name: 'Aditya Sen',
    rollNo: '2022ITB001',
    email: 'aditya.s@college.edu',
    branch: 'IT',
    cgpa: 8.90,
    backlogs: 0,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    status: 'Placed',
    placedDetails: {
      companyId: 'comp-1',
      companyName: 'Google India',
      role: 'Software Development Engineer',
      packageLPA: 24.5,
      driveId: 'drv-1',
      offerDate: '2026-08-16'
    }
  },
  {
    id: 'std-10',
    name: 'Meera Kulkarni',
    rollNo: '2022ITB002',
    email: 'meera.k@college.edu',
    branch: 'IT',
    cgpa: 8.55,
    backlogs: 0,
    skills: ['Java', 'Spring Boot', 'Microservices', 'Docker'],
    status: 'Placed',
    placedDetails: {
      companyId: 'comp-2',
      companyName: 'Microsoft',
      role: 'Software Engineer',
      packageLPA: 21.0,
      driveId: 'drv-2',
      offerDate: '2026-08-26'
    }
  },
  {
    id: 'std-11',
    name: 'Varun Reddy',
    rollNo: '2022ITB003',
    email: 'varun.r@college.edu',
    branch: 'IT',
    cgpa: 7.75,
    backlogs: 0,
    skills: ['Python', 'Data Analytics', 'Pandas', 'Tableau'],
    status: 'Unplaced',
    placedDetails: null
  },
  {
    id: 'std-12',
    name: 'Tanvi Agarwal',
    rollNo: '2022ITB004',
    email: 'tanvi.a@college.edu',
    branch: 'IT',
    cgpa: 7.30,
    backlogs: 0,
    skills: ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
    status: 'Unplaced',
    placedDetails: null
  },
  {
    id: 'std-13',
    name: 'Harsh Mehta',
    rollNo: '2022ITB005',
    email: 'harsh.m@college.edu',
    branch: 'IT',
    cgpa: 6.60,
    backlogs: 2,
    skills: ['Python', 'Linux Administration', 'Git'],
    status: 'Unplaced',
    placedDetails: null
  },

  // ECE Branch Students
  {
    id: 'std-14',
    name: 'Siddharth Rao',
    rollNo: '2022ECB001',
    email: 'siddharth.r@college.edu',
    branch: 'ECE',
    cgpa: 8.85,
    backlogs: 0,
    skills: ['Embedded C', 'RTOS', 'ARM Cortex', 'IoT'],
    status: 'Placed',
    placedDetails: {
      companyId: 'comp-4',
      companyName: 'Cisco Systems',
      role: 'Systems Software Engineer',
      packageLPA: 16.5,
      driveId: 'drv-3',
      offerDate: '2026-09-06'
    }
  },
  {
    id: 'std-15',
    name: 'Kavya Menon',
    rollNo: '2022ECB002',
    email: 'kavya.m@college.edu',
    branch: 'ECE',
    cgpa: 8.40,
    backlogs: 0,
    skills: ['Verilog', 'VLSI Design', 'MATLAB', 'Digital Signal Processing'],
    status: 'Unplaced',
    placedDetails: null
  },
  {
    id: 'std-16',
    name: 'Nikhil Bansal',
    rollNo: '2022ECB003',
    email: 'nikhil.b@college.edu',
    branch: 'ECE',
    cgpa: 7.90,
    backlogs: 0,
    skills: ['C++', 'Microcontrollers', 'PCB Design', 'SPI/I2C'],
    status: 'Placed',
    placedDetails: {
      companyId: 'comp-4',
      companyName: 'Cisco Systems',
      role: 'Systems Software Engineer',
      packageLPA: 16.5,
      driveId: 'drv-3',
      offerDate: '2026-09-06'
    }
  },
  {
    id: 'std-17',
    name: 'Ritu Chaudhary',
    rollNo: '2022ECB004',
    email: 'ritu.c@college.edu',
    branch: 'ECE',
    cgpa: 7.15,
    backlogs: 0,
    skills: ['Python', 'Arduino', 'Sensors', 'Wireless Comms'],
    status: 'Unplaced',
    placedDetails: null
  },
  {
    id: 'std-18',
    name: 'Gaurav Bhat',
    rollNo: '2022ECB005',
    email: 'gaurav.b@college.edu',
    branch: 'ECE',
    cgpa: 6.80,
    backlogs: 1,
    skills: ['C', 'VLSI Basics', 'Oscilloscopes'],
    status: 'Unplaced',
    placedDetails: null
  },

  // ME (Mechanical) Branch Students
  {
    id: 'std-19',
    name: 'Arjun Singhania',
    rollNo: '2022MEB001',
    email: 'arjun.s@college.edu',
    branch: 'ME',
    cgpa: 8.70,
    backlogs: 0,
    skills: ['SolidWorks', 'ANSYS', 'AutoCAD', 'Thermodynamics'],
    status: 'Unplaced',
    placedDetails: null
  },
  {
    id: 'std-20',
    name: 'Priyanka Das',
    rollNo: '2022MEB002',
    email: 'priyanka.d@college.edu',
    branch: 'ME',
    cgpa: 8.25,
    backlogs: 0,
    skills: ['CATIA', 'Finite Element Analysis', 'MATLAB', 'Lean Mfg'],
    status: 'Unplaced',
    placedDetails: null
  },
  {
    id: 'std-21',
    name: 'Manish Pandey',
    rollNo: '2022MEB003',
    email: 'manish.p@college.edu',
    branch: 'ME',
    cgpa: 7.45,
    backlogs: 0,
    skills: ['AutoCAD', 'Fluid Mechanics', 'Python Scripting'],
    status: 'Unplaced',
    placedDetails: null
  },
  {
    id: 'std-22',
    name: 'Shreya Saxena',
    rollNo: '2022MEB004',
    email: 'shreya.s@college.edu',
    branch: 'ME',
    cgpa: 6.90,
    backlogs: 1,
    skills: ['AutoCAD', 'CNC Machining', 'Quality Control'],
    status: 'Unplaced',
    placedDetails: null
  },
  {
    id: 'std-23',
    name: 'Abhishek Tiwari',
    rollNo: '2022MEB005',
    email: 'abhishek.t@college.edu',
    branch: 'ME',
    cgpa: 6.40,
    backlogs: 0,
    skills: ['Mechanical Design', 'HVAC Basics', 'MS Excel'],
    status: 'Unplaced',
    placedDetails: null
  },

  // CE (Civil) Branch Students
  {
    id: 'std-24',
    name: 'Ishaan Gupta',
    rollNo: '2022CEB001',
    email: 'ishaan.g@college.edu',
    branch: 'CE',
    cgpa: 8.60,
    backlogs: 0,
    skills: ['AutoCAD Civil 3D', 'STAAD Pro', 'Structural Analysis', 'Revit'],
    status: 'Unplaced',
    placedDetails: null
  },
  {
    id: 'std-25',
    name: 'Deepika Murthy',
    rollNo: '2022CEB002',
    email: 'deepika.m@college.edu',
    branch: 'CE',
    cgpa: 8.15,
    backlogs: 0,
    skills: ['STAAD Pro', 'GIS Mapping', 'Surveying', 'Quantity Estimation'],
    status: 'Unplaced',
    placedDetails: null
  },
  {
    id: 'std-26',
    name: 'Karthik Pillai',
    rollNo: '2022CEB003',
    email: 'karthik.p@college.edu',
    branch: 'CE',
    cgpa: 7.50,
    backlogs: 0,
    skills: ['AutoCAD', 'Concrete Technology', 'Geotechnical Testing'],
    status: 'Unplaced',
    placedDetails: null
  },
  {
    id: 'std-27',
    name: 'Neha Chawla',
    rollNo: '2022CEB004',
    email: 'neha.c@college.edu',
    branch: 'CE',
    cgpa: 6.75,
    backlogs: 1,
    skills: ['Surveying', 'AutoCAD', 'Construction Management'],
    status: 'Unplaced',
    placedDetails: null
  },
  {
    id: 'std-28',
    name: 'Tarun Mathur',
    rollNo: '2022CSB009',
    email: 'tarun.m@college.edu',
    branch: 'CSE',
    cgpa: 8.35,
    backlogs: 0,
    skills: ['Golang', 'Kubernetes', 'Linux', 'GCP'],
    status: 'Placed',
    placedDetails: {
      companyId: 'comp-4',
      companyName: 'Cisco Systems',
      role: 'Systems Software Engineer',
      packageLPA: 16.5,
      driveId: 'drv-3',
      offerDate: '2026-09-06'
    }
  }
];

export const AVAILABLE_DEPARTMENTS = ['CSE', 'IT', 'ECE', 'ME', 'CE'];
export const DRIVE_STATUSES = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];
