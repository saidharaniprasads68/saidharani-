/**
 * data.js — Mock data for the College ERP demo.
 * On first load this seeds localStorage so the rest of the app
 * can read/write without a backend.
 *
 * EXTENDING: Add more students here and they will automatically
 * appear in the login validation (auth.js checks this array).
 */

// ─── Student accounts (used for login) ───────────────────────────────────────
const STUDENTS_DATA = [
  {
    id: "STU001",
    password: "pass123",
    name: "Aarav Sharma",
    rollNumber: "2021CS001",
    department: "Computer Science",
    year: "3rd Year",
    email: "aarav.sharma@yourcollege.edu",
    phone: "9876543210",
    avatar: "AS",          // initials used as avatar placeholder
    cgpa: 8.7,
    semester: 5
  },
  {
    id: "STU002",
    password: "pass456",
    name: "Priya Patel",
    rollNumber: "2021EC002",
    department: "Electronics & Communication",
    year: "3rd Year",
    email: "priya.patel@yourcollege.edu",
    phone: "9123456780",
    avatar: "PP",
    cgpa: 9.1,
    semester: 5
  },
  {
    id: "STU003",
    password: "pass789",
    name: "Rohan Mehta",
    rollNumber: "2022ME003",
    department: "Mechanical Engineering",
    year: "2nd Year",
    email: "rohan.mehta@yourcollege.edu",
    phone: "9988776655",
    avatar: "RM",
    cgpa: 7.4,
    semester: 3
  }
];

// ─── Attendance data per student ─────────────────────────────────────────────
const ATTENDANCE_DATA = {
  STU001: [
    { subject: "Data Structures",       total: 60, attended: 55 },
    { subject: "Operating Systems",     total: 58, attended: 40 }, // below 75%
    { subject: "Database Management",   total: 62, attended: 58 },
    { subject: "Computer Networks",     total: 55, attended: 38 }, // below 75%
    { subject: "Software Engineering",  total: 50, attended: 47 },
    { subject: "Mathematics III",       total: 60, attended: 52 }
  ],
  STU002: [
    { subject: "Digital Electronics",   total: 60, attended: 57 },
    { subject: "Signal Processing",     total: 58, attended: 56 },
    { subject: "Microprocessors",       total: 62, attended: 45 }, // below 75%
    { subject: "Communication Theory",  total: 55, attended: 52 },
    { subject: "Control Systems",       total: 50, attended: 48 },
    { subject: "Mathematics III",       total: 60, attended: 59 }
  ],
  STU003: [
    { subject: "Thermodynamics",        total: 60, attended: 44 }, // below 75%
    { subject: "Fluid Mechanics",       total: 58, attended: 55 },
    { subject: "Machine Design",        total: 62, attended: 60 },
    { subject: "Manufacturing Proc.",   total: 55, attended: 50 },
    { subject: "Engineering Mechanics", total: 50, attended: 32 }, // below 75%
    { subject: "Mathematics III",       total: 60, attended: 56 }
  ]
};

// ─── Marks / Results per student, keyed by semester ──────────────────────────
const MARKS_DATA = {
  STU001: {
    5: [
      { subject: "Data Structures",      internal: 28, external: 62, total: 90, grade: "O"  },
      { subject: "Operating Systems",    internal: 22, external: 48, total: 70, grade: "B"  },
      { subject: "Database Management",  internal: 26, external: 58, total: 84, grade: "A"  },
      { subject: "Computer Networks",    internal: 20, external: 50, total: 70, grade: "B"  },
      { subject: "Software Engineering", internal: 27, external: 60, total: 87, grade: "A+" },
      { subject: "Mathematics III",      internal: 25, external: 55, total: 80, grade: "A"  }
    ],
    4: [
      { subject: "Theory of Computation", internal: 29, external: 65, total: 94, grade: "O"  },
      { subject: "Computer Architecture", internal: 24, external: 56, total: 80, grade: "A"  },
      { subject: "Discrete Mathematics",  internal: 27, external: 61, total: 88, grade: "A+" },
      { subject: "Java Programming",      internal: 30, external: 68, total: 98, grade: "O"  },
      { subject: "Probability & Stats",   internal: 23, external: 52, total: 75, grade: "B+" }
    ]
  },
  STU002: {
    5: [
      { subject: "Digital Electronics",   internal: 29, external: 66, total: 95, grade: "O"  },
      { subject: "Signal Processing",     internal: 28, external: 63, total: 91, grade: "O"  },
      { subject: "Microprocessors",       internal: 21, external: 49, total: 70, grade: "B"  },
      { subject: "Communication Theory",  internal: 27, external: 62, total: 89, grade: "A+" },
      { subject: "Control Systems",       internal: 26, external: 60, total: 86, grade: "A"  },
      { subject: "Mathematics III",       internal: 30, external: 67, total: 97, grade: "O"  }
    ],
    4: [
      { subject: "Analog Electronics",    internal: 28, external: 64, total: 92, grade: "O"  },
      { subject: "Network Theory",        internal: 25, external: 57, total: 82, grade: "A"  },
      { subject: "Electromagnetic Fields",internal: 27, external: 60, total: 87, grade: "A+" },
      { subject: "Digital Comm.",         internal: 29, external: 65, total: 94, grade: "O"  },
      { subject: "Engineering Maths II",  internal: 26, external: 59, total: 85, grade: "A"  }
    ]
  },
  STU003: {
    3: [
      { subject: "Thermodynamics",        internal: 22, external: 50, total: 72, grade: "B"  },
      { subject: "Fluid Mechanics",       internal: 25, external: 57, total: 82, grade: "A"  },
      { subject: "Machine Design",        internal: 27, external: 61, total: 88, grade: "A+" },
      { subject: "Manufacturing Proc.",   internal: 24, external: 55, total: 79, grade: "B+" },
      { subject: "Engineering Mechanics", internal: 20, external: 48, total: 68, grade: "B"  },
      { subject: "Mathematics III",       internal: 23, external: 53, total: 76, grade: "B+" }
    ],
    2: [
      { subject: "Engineering Physics",   internal: 25, external: 58, total: 83, grade: "A"  },
      { subject: "Engineering Chemistry", internal: 24, external: 55, total: 79, grade: "B+" },
      { subject: "Workshop Practice",     internal: 29, external: 64, total: 93, grade: "O"  },
      { subject: "Basic Electronics",     internal: 22, external: 50, total: 72, grade: "B"  },
      { subject: "Engineering Maths II",  internal: 26, external: 58, total: 84, grade: "A"  }
    ]
  }
};

// ─── Fees data per student ────────────────────────────────────────────────────
const FEES_DATA = {
  STU001: {
    totalFees: 85000,
    paidAmount: 60000,
    history: [
      { date: "2024-01-15", description: "Tuition Fee – Sem 5", amount: 35000, status: "Paid" },
      { date: "2023-08-10", description: "Tuition Fee – Sem 4", amount: 25000, status: "Paid" },
      { date: "2023-07-05", description: "Hostel Fee",          amount: 12000, status: "Paid" },
      { date: "2024-03-01", description: "Exam Fee – Sem 5",    amount:  5000, status: "Pending" },
      { date: "2024-03-01", description: "Library Fine",        amount:   500, status: "Pending" }
    ]
  },
  STU002: {
    totalFees: 85000,
    paidAmount: 85000,
    history: [
      { date: "2024-01-10", description: "Tuition Fee – Sem 5", amount: 35000, status: "Paid" },
      { date: "2023-08-08", description: "Tuition Fee – Sem 4", amount: 25000, status: "Paid" },
      { date: "2023-07-01", description: "Hostel Fee",          amount: 12000, status: "Paid" },
      { date: "2024-02-20", description: "Exam Fee – Sem 5",    amount:  5000, status: "Paid" },
      { date: "2024-01-05", description: "Sports Fee",          amount:  3000, status: "Paid" },
      { date: "2024-02-01", description: "Lab Fee",             amount:  5000, status: "Paid" }
    ]
  },
  STU003: {
    totalFees: 75000,
    paidAmount: 40000,
    history: [
      { date: "2024-01-20", description: "Tuition Fee – Sem 3", amount: 30000, status: "Paid" },
      { date: "2023-08-15", description: "Tuition Fee – Sem 2", amount: 25000, status: "Paid" },
      { date: "2024-03-05", description: "Hostel Fee",          amount: 12000, status: "Pending" },
      { date: "2024-03-05", description: "Exam Fee – Sem 3",    amount:  5000, status: "Pending" },
      { date: "2024-03-05", description: "Sports Fee",          amount:  3000, status: "Pending" }
    ]
  }
};

// ─── Timetable (same structure for all students for simplicity) ───────────────
// Each slot: { time, Mon, Tue, Wed, Thu, Fri, Sat }
const TIMETABLE_DATA = {
  STU001: [
    { time: "9:00–10:00",  Mon: "Data Structures",     Tue: "OS Lab",              Wed: "Database Mgmt",     Thu: "Computer Networks", Fri: "Maths III",          Sat: "—"             },
    { time: "10:00–11:00", Mon: "Operating Systems",   Tue: "Data Structures",     Wed: "Software Engg",     Thu: "Database Mgmt",     Fri: "Computer Networks",  Sat: "—"             },
    { time: "11:00–12:00", Mon: "Maths III",           Tue: "Software Engg",       Wed: "OS Lab",            Thu: "Maths III",         Fri: "Data Structures",    Sat: "Library"       },
    { time: "12:00–1:00",  Mon: "LUNCH",               Tue: "LUNCH",               Wed: "LUNCH",             Thu: "LUNCH",             Fri: "LUNCH",              Sat: "—"             },
    { time: "1:00–2:00",   Mon: "DB Lab",              Tue: "Computer Networks",   Wed: "Data Structures",   Thu: "Software Engg",     Fri: "Operating Systems",  Sat: "—"             },
    { time: "2:00–3:00",   Mon: "Computer Networks",   Tue: "Database Mgmt",       Wed: "Maths III",         Thu: "Data Structures",   Fri: "DB Lab",             Sat: "—"             },
    { time: "3:00–4:00",   Mon: "Software Engg",       Tue: "Maths III",           Wed: "Computer Networks", Thu: "OS Lab",            Fri: "Database Mgmt",      Sat: "—"             }
  ],
  STU002: [
    { time: "9:00–10:00",  Mon: "Digital Electronics", Tue: "Signal Lab",          Wed: "Microprocessors",   Thu: "Comm. Theory",      Fri: "Maths III",          Sat: "—"             },
    { time: "10:00–11:00", Mon: "Signal Processing",   Tue: "Digital Electronics", Wed: "Control Systems",   Thu: "Microprocessors",   Fri: "Comm. Theory",       Sat: "—"             },
    { time: "11:00–12:00", Mon: "Maths III",           Tue: "Control Systems",     Wed: "Signal Lab",        Thu: "Maths III",         Fri: "Digital Electronics", Sat: "Library"      },
    { time: "12:00–1:00",  Mon: "LUNCH",               Tue: "LUNCH",               Wed: "LUNCH",             Thu: "LUNCH",             Fri: "LUNCH",              Sat: "—"             },
    { time: "1:00–2:00",   Mon: "Micro Lab",           Tue: "Comm. Theory",        Wed: "Digital Electronics",Thu: "Control Systems",  Fri: "Signal Processing",  Sat: "—"             },
    { time: "2:00–3:00",   Mon: "Comm. Theory",        Tue: "Microprocessors",     Wed: "Maths III",         Thu: "Digital Electronics",Fri: "Micro Lab",          Sat: "—"             },
    { time: "3:00–4:00",   Mon: "Control Systems",     Tue: "Maths III",           Wed: "Comm. Theory",      Thu: "Signal Lab",        Fri: "Microprocessors",    Sat: "—"             }
  ],
  STU003: [
    { time: "9:00–10:00",  Mon: "Thermodynamics",      Tue: "Fluid Lab",           Wed: "Machine Design",    Thu: "Manufacturing",     Fri: "Maths III",          Sat: "—"             },
    { time: "10:00–11:00", Mon: "Fluid Mechanics",     Tue: "Thermodynamics",      Wed: "Eng. Mechanics",    Thu: "Machine Design",    Fri: "Manufacturing",      Sat: "—"             },
    { time: "11:00–12:00", Mon: "Maths III",           Tue: "Eng. Mechanics",      Wed: "Fluid Lab",         Thu: "Maths III",         Fri: "Thermodynamics",     Sat: "Library"       },
    { time: "12:00–1:00",  Mon: "LUNCH",               Tue: "LUNCH",               Wed: "LUNCH",             Thu: "LUNCH",             Fri: "LUNCH",              Sat: "—"             },
    { time: "1:00–2:00",   Mon: "Machine Lab",         Tue: "Manufacturing",       Wed: "Thermodynamics",    Thu: "Eng. Mechanics",    Fri: "Fluid Mechanics",    Sat: "—"             },
    { time: "2:00–3:00",   Mon: "Manufacturing",       Tue: "Machine Design",      Wed: "Maths III",         Thu: "Thermodynamics",    Fri: "Machine Lab",        Sat: "—"             },
    { time: "3:00–4:00",   Mon: "Eng. Mechanics",      Tue: "Maths III",           Wed: "Manufacturing",     Thu: "Fluid Lab",         Fri: "Machine Design",     Sat: "—"             }
  ]
};

// ─── Notices ──────────────────────────────────────────────────────────────────
const NOTICES_DATA = [
  {
    id: 1,
    title: "End Semester Exam Schedule Released",
    category: "Exam",
    date: "2024-03-28",
    content: "The end semester examination schedule for all departments has been released. Students are advised to download their hall tickets from the portal before April 10th. Examinations commence from April 15th."
  },
  {
    id: 2,
    title: "Sports Day 2024 – Registrations Open",
    category: "Event",
    date: "2024-03-25",
    content: "Annual Sports Day will be held on April 5th, 2024. Students interested in participating in various sports events can register through the Sports Department office before March 31st."
  },
  {
    id: 3,
    title: "Fee Payment Deadline – Last Date April 5th",
    category: "Fee",
    date: "2024-03-22",
    content: "Students with pending fees are reminded that the last date for payment without late fine is April 5th, 2024. A late fine of ₹100 per day will be charged thereafter."
  },
  {
    id: 4,
    title: "Campus Placement Drive – TechCorp",
    category: "Placement",
    date: "2024-03-20",
    content: "TechCorp Pvt. Ltd. will be conducting a campus placement drive on April 8th, 2024. Final year students with CGPA ≥ 7.5 are eligible. Register with the Placement Cell by April 3rd."
  },
  {
    id: 5,
    title: "Library Book Submission Reminder",
    category: "General",
    date: "2024-03-18",
    content: "All students are requested to return borrowed library books before March 30th to avoid fines. New books for the next semester will be available from April 20th."
  },
  {
    id: 6,
    title: "Workshop on Artificial Intelligence",
    category: "Event",
    date: "2024-03-15",
    content: "A one-day workshop on Artificial Intelligence and Machine Learning will be conducted on April 2nd. Registration fee is ₹200. Limited seats available — register early."
  },
  {
    id: 7,
    title: "Attendance Shortage Warning",
    category: "General",
    date: "2024-03-10",
    content: "Students with attendance below 75% in any subject have been notified through email. They must submit an attendance shortage application to the HOD within 5 working days."
  },
  {
    id: 8,
    title: "Scholarship Applications – Last Date Extended",
    category: "General",
    date: "2024-03-05",
    content: "The last date for submitting scholarship applications has been extended to April 15th. Students belonging to SC/ST/OBC categories must attach all required documents."
  }
];

// ─── Grade → Grade Point mapping ──────────────────────────────────────────────
const GRADE_POINTS = {
  "O":  10,
  "A+": 9,
  "A":  8,
  "B+": 7,
  "B":  6,
  "C":  5,
  "F":  0
};

// ─── Seed localStorage on first load ─────────────────────────────────────────
/**
 * seedData() runs once (checked via a flag in localStorage).
 * Call this before any other module tries to read data.
 */
function seedData() {
  if (localStorage.getItem("erp_seeded")) return; // already seeded

  localStorage.setItem("erp_students",   JSON.stringify(STUDENTS_DATA));
  localStorage.setItem("erp_attendance", JSON.stringify(ATTENDANCE_DATA));
  localStorage.setItem("erp_marks",      JSON.stringify(MARKS_DATA));
  localStorage.setItem("erp_fees",       JSON.stringify(FEES_DATA));
  localStorage.setItem("erp_timetable",  JSON.stringify(TIMETABLE_DATA));
  localStorage.setItem("erp_notices",    JSON.stringify(NOTICES_DATA));
  localStorage.setItem("erp_seeded",     "true");

  console.log("[ERP] Mock data seeded to localStorage.");
}

// ─── Helper: read from localStorage ──────────────────────────────────────────
function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Run seed immediately when the script loads
seedData();
