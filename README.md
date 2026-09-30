# College ERP — Demo Web App

A fully client-side College ERP portal built with plain HTML, CSS, and vanilla JavaScript.  
No backend, no build step — just open `index.html` in any modern browser.

---

## 🚀 How to Run

1. Clone or download this repository.
2. Open **`index.html`** directly in your browser (double-click, or `File → Open`).
   - No local server needed for basic use.
   - If you hit CORS issues with some browsers loading from `file://`, start a tiny server:
     ```bash
     # Python 3
     python -m http.server 8080
     # then open http://localhost:8080
     ```
3. Log in with one of the demo accounts below.

---

## 🔑 Demo Credentials

| Student ID | Password | Student Name         | Department                  |
|------------|----------|----------------------|-----------------------------|
| STU001     | pass123  | Aarav Sharma         | Computer Science            |
| STU002     | pass456  | Priya Patel          | Electronics & Communication |
| STU003     | pass789  | Rohan Mehta          | Mechanical Engineering      |

---

## 📁 File Structure

```
/
├── index.html        # Login page
├── student.html      # Student dashboard (SPA)
├── css/
│   └── style.css     # Unified responsive stylesheet
├── js/
│   ├── data.js       # Mock data + localStorage seeding
│   ├── auth.js       # Session management (login/logout/guard)
│   └── student.js    # All dashboard section logic
└── README.md
```

---

## 🗺️ Feature Map

### Login Portal (`index.html`)
- Student ID + Password fields with show/hide toggle
- Inline field validation and credential error messages
- "Forgot Password?" UI-only modal
- Demo credentials hint box
- Auto-redirects to dashboard if already logged in

### Student Dashboard (`student.html`)
| Section       | Features |
|---------------|----------|
| **Dashboard** | CGPA, Attendance %, Pending Fees, Latest Notices cards |
| **Profile**   | Read-only fields; editable Email & Phone with validation |
| **Attendance**| Subject-wise table, animated progress bars, <75% highlighted red |
| **Marks**     | Semester dropdown, internal/external/total/grade, SGPA calculation |
| **Timetable** | Weekly grid, today's column highlighted in blue |
| **Fees**      | Total/Paid/Due summary, payment history, "Pay Now" updates localStorage |
| **Notices**   | Live search + category filter |

---

## 🔒 Session Guard

`student.html` calls `requireAuth()` (from `auth.js`) on load.  
If no session exists in `localStorage`, the user is immediately redirected to `index.html`.

---

## 🛠️ How to Extend

### Add a new student account
Open `js/data.js` and add an entry to `STUDENTS_DATA`:
```js
{
  id: "STU004",
  password: "newpass",
  name: "New Student",
  rollNumber: "2023XX004",
  department: "Civil Engineering",
  year: "1st Year",
  email: "new@yourcollege.edu",
  phone: "9000000000",
  avatar: "NS",
  cgpa: 8.0,
  semester: 1
}
```
Then add matching entries in `ATTENDANCE_DATA`, `MARKS_DATA`, `FEES_DATA`, and `TIMETABLE_DATA`.

> **Tip:** After editing `data.js`, clear `localStorage` in DevTools (`Application → Storage → Clear site data`) so the new seed data is loaded.

### Add a Faculty Portal
1. Add a `role` field (`"student"` / `"faculty"`) to each user in `data.js`.
2. In `auth.js → attemptLogin()`, save `role` in the session object.
3. Create `faculty.html` (mirroring `student.html` structure).
4. After login, branch in `index.html`: if `role === "faculty"` → redirect to `faculty.html`.

### Add a new Dashboard section
1. Add a `<div class="nav-item" data-section="yourSection" data-title="...">` to the sidebar in `student.html`.
2. Add `<section id="sec-yourSection" class="section-panel">` in the main content area.
3. Add a `case "yourSection": renderYourSection(); break;` inside the `renderSection()` switch in `student.js`.
4. Write `renderYourSection()` following the existing patterns.

---

## 🧰 Tech Stack

| Layer | Choice |
|-------|--------|
| Markup   | Plain HTML5 |
| Styling  | CSS3 (custom properties, grid, flexbox, animations) |
| Logic    | Vanilla ES6+ JavaScript |
| Storage  | Browser `localStorage` |
| Fonts    | System font stack (no download needed) |

---

## ⚠️ Limitations (Demo)

- Data resets if the user clears `localStorage`.
- No real authentication — passwords are stored in plain text in `data.js` (mock only).
- "Pay Now" and "Forgot Password" are UI-only and do not contact any server.

---

*Built as a demo for educational purposes. Not intended for production use.*
