# CareerConnect

> **Training & Placement Management Portal**

CareerConnect is a modern, responsive web application designed for collegiate Training and Placement Offices (TPOs). It provides a unified dashboard to manage recruiting companies, student academic records, on-campus placement drives, candidate eligibility evaluations, and placement analytics.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-6366f1?style=flat&logo=vercel)](https://placement-drive-tracker-xi.vercel.app)

---

## Live Demo

Experience the live application deployed on Vercel:
**[https://placement-drive-tracker-xi.vercel.app](https://placement-drive-tracker-xi.vercel.app)**

---

## Project Overview

Managing campus placements involves balancing student credentials, company requirements, multiple concurrent recruitment drives, and complex eligibility criteria. 

CareerConnect solves this by providing placement teams with a single, cohesive portal to:
- Maintain an up-to-date registry of corporate recruiting partners and compensation tiers.
- Track student academic profiles, technical skillsets, and real-time placement statuses.
- Schedule, monitor, and manage recruitment drives with customized cutoff requirements.
- Automatically evaluate candidate eligibility for specific drives against transparent academic rules.
- View interactive analytics on department-wise placement performance, compensation packages, and drive distribution.

---

## Key Features

- **Executive KPI Dashboard**: Instant visibility into key metrics including total recruiting partners, enrolled students, active drives, placed students, average compensation package, and upcoming drive schedules.
- **Company Management**: Complete directory of recruiting partners with tier classifications (Dream, Core, Mass Recruiter), industry sectors, location details, hiring roles, and package ranges. Supports grid/table views and full CRUD operations.
- **Student Management**: Centralized repository of student profiles displaying registration numbers, engineering branches, CGPA, backlogs, technical skill tags, and placement status (Placed, Seeking, Opted Out). Supports multi-parameter search and department filtering.
- **Placement Drive Management**: Full lifecycle management of on-campus placement drives, including role definitions, CTC packages, locations, deadlines, and tracking registered versus selected candidates. Supports both registered directory companies and custom company entries.
- **Interactive Eligibility Checker**: Rule-based evaluation engine that validates student qualifications against drive-specific criteria in real time, presenting clear pass/fail status and criterion-by-criterion explanations.
- **Comprehensive Placement Analytics**: Visual analytics powered by Recharts, showcasing overall placement rates, department-wise placement comparisons (bar charts), drive status breakdown (donut charts), and department-level compensation summaries.
- **Dark & Light Mode**: Complete theme support with persistent user preference storage, optimized contrast ratios, and tailored chart themes.
- **Browser-Local Data Persistence**: Built using an isolated `localStorage` service layer, ensuring immediate state reactivity and persistent browser storage without requiring an external backend.

---

## Eligibility Evaluation Logic

The automated **Eligibility Checker** evaluates candidate eligibility for any placement drive based on three strict criteria:

1. **Minimum CGPA**: The student's cumulative grade point average must be greater than or equal to the minimum cutoff configured for the drive ($\text{CGPA} \ge \text{Min CGPA}$).
2. **Maximum Allowed Backlogs**: The student's active backlog count must be less than or equal to the maximum permitted by the recruiter ($\text{Backlogs} \le \text{Max Backlogs}$).
3. **Eligible Departments / Branches**: The student's academic branch (e.g., CSE, IT, ECE, ME, CE) must be explicitly included in the drive's list of eligible branches.

A candidate is marked **Eligible** only when all three criteria pass. The interface renders an individual breakdown for each criterion, making results transparent and easy to explain.

---

## Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Language**: JavaScript (ES6+)
- **Data Storage**: Browser `localStorage` API

---

## Project Structure

```
placement-drive-tracker/
├── index.html                      # HTML shell & page metadata
├── package.json                    # Project dependencies and npm scripts
├── vite.config.js                  # Vite configuration with React & Tailwind plugins
└── src/
    ├── App.jsx                     # Root application layout and state-based navigation
    ├── main.jsx                    # Application entry point with ThemeProvider wrapper
    ├── index.css                   # Global styles & Tailwind v4 dark mode configuration
    ├── context/
    │   └── ThemeContext.jsx        # Dark/Light theme state and persistence hook
    ├── data/
    │   └── mockData.js             # Initial synthetic dataset for companies, students, and drives
    ├── services/
    │   ├── storageService.js       # LocalStorage CRUD abstraction for all entities
    │   └── checkEligibility.js     # Pure functional evaluation logic for drive eligibility
    └── components/
        ├── layout/
        │   └── Navbar.jsx          # Header navigation, brand wordmark, theme switch
        ├── common/
        │   ├── Badge.jsx           # Reusable status and department badge component
        │   └── Modal.jsx           # Accessible modal container with portal backdrop
        ├── dashboard/
        │   └── Dashboard.jsx       # Overview KPI cards, placement charts & drive list
        ├── companies/
        │   ├── CompanyList.jsx     # Company directory, search, filter & view toggles
        │   ├── CompanyCard.jsx     # Grid card component for company records
        │   ├── CompanyTable.jsx    # Tabular recruiter directory layout
        │   ├── CompanyModal.jsx    # Add/Edit company form modal
        │   └── DeleteConfirmModal.jsx # Company deletion confirmation dialog
        ├── students/
        │   ├── StudentList.jsx     # Student directory, search, filter & quick stats
        │   ├── StudentCard.jsx     # Card component for student profile records
        │   ├── StudentTable.jsx    # Tabular student record layout
        │   ├── StudentModal.jsx    # Add/Edit student form modal
        │   └── StudentDeleteModal.jsx # Student deletion confirmation dialog
        ├── drives/
        │   ├── DriveList.jsx       # Placement drive schedule, search & status filters
        │   ├── DriveCard.jsx       # Card component for drive details
        │   ├── DriveTable.jsx      # Tabular drive schedule layout
        │   ├── DriveModal.jsx      # Create/Edit drive form with custom company support
        │   └── DriveDeleteModal.jsx # Drive deletion confirmation dialog
        ├── eligibility/
        │   └── EligibilityChecker.jsx # Student & drive evaluation selector and verdict UI
        └── analytics/
            └── Analytics.jsx       # Recharts bar/donut charts & department summary table
```

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or later) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kudchadkarkrish/career-connect.git
   cd career-connect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## Production Build

To generate an optimized production bundle:

```bash
npm run build
```

The output artifacts will be written to the `dist/` directory, ready to be served statically or deployed to platforms like Vercel, Netlify, or GitHub Pages.

To preview the production build locally:

```bash
npm run preview
```

---

## Important Project Note

All records (companies, students, and placement drives) included in this repository are **synthetic sample data** curated exclusively for demonstration and portfolio review purposes. All creation, modification, and deletion actions occur locally in the user's browser session via `localStorage`.

---

## Future Improvements

- **Backend & Database Integration**: Connect to a persistent database (PostgreSQL, Supabase, or Firebase) via a REST/GraphQL API.
- **Authentication & RBAC**: Role-based access control distinguishing between TPO administrators, company recruiters, and student applicants.
- **Resume & Document Management**: Support for uploading, storing, and reviewing student resumes and transcripts.
- **Automated Communication**: Automated email notifications for drive registrations, shortlist announcements, and schedule changes.

---

## Author

**Krish Kudchadkar**
