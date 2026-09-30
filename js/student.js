/**
 * student.js — All logic for the student dashboard.
 *
 * Sections handled:
 *   1. dashboard   — stats cards + latest notices
 *   2. profile     — view & edit contact info
 *   3. attendance  — per-subject table with progress bars
 *   4. marks       — semester dropdown, grade table, SGPA
 *   5. timetable   — weekly grid, current day highlighted
 *   6. fees        — totals, history, Pay Now button
 *   7. notices     — searchable, filterable list
 *
 * EXTENDING: Add a new section by:
 *   1. Adding a nav-item with data-section="yourSection" in student.html
 *   2. Adding a <section id="sec-yourSection"> in student.html
 *   3. Adding a case in renderSection() below
 */

// ─── Init (runs when DOM is ready) ───────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {

  // Guard: redirect to login if not authenticated
  requireAuth();

  // Load student object for this session
  const student = getCurrentStudent();
  if (!student) { logout(); return; }   // safety fallback

  // Populate topbar
  document.getElementById("topbarAvatar").textContent = student.avatar;
  document.getElementById("topbarName").textContent   = student.name;
  document.getElementById("topbarDept").textContent   = student.department;

  // Set sidebar page title on first render
  updatePageTitle("Dashboard");

  // Render first section
  renderSection("dashboard");

  // ── Sidebar navigation ────────────────────────────────────────────────
  const navItems = document.querySelectorAll(".nav-item[data-section]");

  navItems.forEach(item => {
    // Shared activation logic (used by click & keyboard)
    const activateItem = () => {
      const section = item.dataset.section;
      navItems.forEach(n => {
        n.classList.remove("active");
        n.removeAttribute("aria-current");
      });
      item.classList.add("active");
      item.setAttribute("aria-current", "page");
      updatePageTitle(item.dataset.title || section);
      closeMobileSidebar();
      renderSection(section);
    };

    item.addEventListener("click", activateItem);

    // Keyboard accessibility: activate on Enter or Space
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateItem();
      }
    });
  });

  // ── Mobile sidebar toggle ─────────────────────────────────────────────
  const menuToggle    = document.getElementById("menuToggle");
  const sidebar       = document.getElementById("sidebar");
  const sidebarOverlay= document.getElementById("sidebarOverlay");

  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    sidebarOverlay.classList.toggle("open");
  });

  sidebarOverlay.addEventListener("click", closeMobileSidebar);

  function closeMobileSidebar() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("open");
  }

  // ── Logout button ─────────────────────────────────────────────────────
  document.getElementById("logoutBtn").addEventListener("click", () => {
    logout();   // from auth.js
  });

});

// ─── Top bar title helper ─────────────────────────────────────────────────────
function updatePageTitle(title) {
  document.getElementById("pageTitle").textContent = title;
}

// ─── Section router ───────────────────────────────────────────────────────────
/**
 * Shows the requested section panel and hides all others,
 * then calls the appropriate render function.
 */
function renderSection(sectionId) {
  // Toggle visibility of panels
  document.querySelectorAll(".section-panel").forEach(panel => {
    panel.classList.toggle("active", panel.id === "sec-" + sectionId);
  });

  // Call the matching renderer
  switch (sectionId) {
    case "dashboard":  renderDashboard();  break;
    case "profile":    renderProfile();    break;
    case "attendance": renderAttendance(); break;
    case "marks":      renderMarks();      break;
    case "timetable":  renderTimetable();  break;
    case "fees":       renderFees();       break;
    case "notices":    renderNotices();    break;
  }
}

// ─── 1. DASHBOARD ─────────────────────────────────────────────────────────────
function renderDashboard() {
  const student   = getCurrentStudent();
  const feesData  = getData("erp_fees")[student.id];
  const attData   = getData("erp_attendance")[student.id];
  const notices   = getData("erp_notices");

  // Calculate overall attendance %
  let totalClasses = 0, totalAttended = 0;
  attData.forEach(s => { totalClasses += s.total; totalAttended += s.attended; });
  const attPct = Math.round((totalAttended / totalClasses) * 100);

  // Pending fees
  const pendingFees = feesData.totalFees - feesData.paidAmount;

  // Stat cards
  document.getElementById("dash-cgpa").textContent       = student.cgpa.toFixed(1);
  document.getElementById("dash-attendance").textContent  = attPct + "%";
  document.getElementById("dash-semester").textContent    = student.semester + " / 8";
  document.getElementById("dash-pending-fee").textContent = "₹" + pendingFees.toLocaleString("en-IN");

  // Colour the attendance stat red if below 75%
  const attCard = document.getElementById("dash-attendance-card");
  attCard.style.setProperty("--accent-color", attPct < 75 ? "var(--danger)" : "var(--success)");
  document.getElementById("dash-attendance").style.color = attPct < 75 ? "var(--danger)" : "var(--success)";

  // Latest 3 notices
  const latestNotices = notices.slice(0, 3);
  const noticeGrid = document.getElementById("dash-notices");
  noticeGrid.innerHTML = latestNotices.map(n => `
    <div class="notice-card">
      <div class="notice-title">${escHtml(n.title)}</div>
      <div class="notice-meta">
        <span class="category-badge cat-${n.category}">${n.category}</span>
        &nbsp;${formatDate(n.date)}
      </div>
    </div>
  `).join("");
}

// ─── 2. PROFILE ───────────────────────────────────────────────────────────────
function renderProfile() {
  const student = getCurrentStudent();

  document.getElementById("prof-avatar").textContent   = student.avatar;
  document.getElementById("prof-name").textContent     = student.name;
  document.getElementById("prof-dept").textContent     = student.department + " · " + student.year;
  document.getElementById("prof-roll").textContent     = student.rollNumber;
  document.getElementById("prof-dept-val").textContent = student.department;
  document.getElementById("prof-year").textContent     = student.year;
  document.getElementById("prof-semester").textContent = "Semester " + student.semester;
  document.getElementById("prof-cgpa").textContent     = student.cgpa.toFixed(2);

  // Editable fields
  document.getElementById("prof-email").value = student.email;
  document.getElementById("prof-phone").value = student.phone;

  // Save handler (re-attach each render to avoid stacking)
  const saveBtn = document.getElementById("profileSaveBtn");
  saveBtn.replaceWith(saveBtn.cloneNode(true));    // clone removes old listeners
  document.getElementById("profileSaveBtn").addEventListener("click", saveProfile);
}

function saveProfile() {
  const emailInput = document.getElementById("prof-email");
  const phoneInput = document.getElementById("prof-phone");
  const emailErrEl = document.getElementById("prof-email-error");
  const phoneErrEl = document.getElementById("prof-phone-error");

  // Reset errors
  emailErrEl.style.display = "none";
  phoneErrEl.style.display = "none";

  const newEmail = emailInput.value.trim();
  const newPhone = phoneInput.value.trim();

  let valid = true;

  // Basic email validation
  if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
    emailErrEl.textContent = "Please enter a valid email address.";
    emailErrEl.style.display = "block";
    valid = false;
  }

  // Phone validation (10 digits)
  if (!newPhone || !/^\d{10}$/.test(newPhone)) {
    phoneErrEl.textContent = "Phone must be a 10-digit number.";
    phoneErrEl.style.display = "block";
    valid = false;
  }

  if (!valid) return;

  // Update localStorage
  const session  = getSession();
  const students = getData("erp_students");
  const idx      = students.findIndex(s => s.id === session.studentId);
  if (idx === -1) return;

  students[idx].email = newEmail;
  students[idx].phone = newPhone;
  setData("erp_students", students);

  showToast("✅ Profile updated successfully!");
}

// ─── 3. ATTENDANCE ────────────────────────────────────────────────────────────
function renderAttendance() {
  const student = getCurrentStudent();
  const attData = getData("erp_attendance")[student.id];

  let totalClasses = 0, totalAttended = 0;
  attData.forEach(s => { totalClasses += s.total; totalAttended += s.attended; });
  const overallPct = Math.round((totalAttended / totalClasses) * 100);

  // Overall summary
  document.getElementById("att-overall").textContent = overallPct + "%";
  document.getElementById("att-overall").style.color =
    overallPct < 75 ? "var(--danger)" : "var(--success)";

  const tbody = document.getElementById("att-tbody");
  tbody.innerHTML = attData.map(subject => {
    const pct       = Math.round((subject.attended / subject.total) * 100);
    const isLow     = pct < 75;
    const barClass  = pct < 75 ? "danger" : pct < 85 ? "warning" : "";
    // How many more classes needed to reach 75%
    const needed    = Math.max(0, Math.ceil((0.75 * subject.total - subject.attended) / 0.25));

    return `
      <tr class="${isLow ? "below-75" : ""}">
        <td>${escHtml(subject.subject)}</td>
        <td>${subject.attended}</td>
        <td>${subject.total}</td>
        <td>
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="progress-bar-wrap" style="flex:1">
              <div
                class="progress-bar-fill ${barClass}"
                data-pct="${pct}"
                style="width:0%"
              ></div>
            </div>
            <span style="font-weight:600;min-width:36px;text-align:right">${pct}%</span>
          </div>
        </td>
        <td>${isLow
          ? `<span style="color:var(--danger);font-size:0.82rem;">⚠️ Need ${needed} more class${needed === 1 ? "" : "es"}</span>`
          : `<span style="color:var(--success);font-size:0.82rem;">✅ Good</span>`}
        </td>
      </tr>
    `;
  }).join("");

  // Animate progress bars after DOM is painted
  requestAnimationFrame(() => {
    document.querySelectorAll(".progress-bar-fill[data-pct]").forEach(bar => {
      setTimeout(() => { bar.style.width = bar.dataset.pct + "%"; }, 80);
    });
  });
}

// ─── 4. MARKS / RESULTS ───────────────────────────────────────────────────────
function renderMarks() {
  const student   = getCurrentStudent();
  const allMarks  = getData("erp_marks")[student.id];

  // Build semester dropdown options from available semesters
  const semSelect = document.getElementById("sem-select");
  // Only populate once
  if (semSelect.options.length === 0) {
    const sems = Object.keys(allMarks).map(Number).sort((a, b) => b - a);
    sems.forEach(sem => {
      const opt = document.createElement("option");
      opt.value = sem;
      opt.textContent = "Semester " + sem;
      semSelect.appendChild(opt);
    });
    // Default: current (highest) semester
    semSelect.value = sems[0];
  }

  // Render table for selected semester
  renderMarksTable(allMarks, Number(semSelect.value));

  // Change handler
  semSelect.onchange = () => renderMarksTable(allMarks, Number(semSelect.value));
}

function renderMarksTable(allMarks, sem) {
  const subjects = allMarks[sem] || [];

  // Calculate SGPA
  let totalCredits = 0, weightedSum = 0;
  subjects.forEach(s => {
    const gp = GRADE_POINTS[s.grade] ?? 0;
    const credit = 4;                // uniform 4-credit assumption for demo
    totalCredits  += credit;
    weightedSum   += gp * credit;
  });
  const sgpa = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : "N/A";
  document.getElementById("sgpa-display").textContent = "SGPA: " + sgpa;

  const tbody = document.getElementById("marks-tbody");
  tbody.innerHTML = subjects.map((s, i) => {
    const gradeClass = gradeToClass(s.grade);
    return `
      <tr>
        <td>${i + 1}</td>
        <td>${escHtml(s.subject)}</td>
        <td>${s.internal}</td>
        <td>${s.external}</td>
        <td><strong>${s.total}</strong></td>
        <td><span class="grade-badge ${gradeClass}">${s.grade}</span></td>
        <td>${GRADE_POINTS[s.grade] ?? "—"}</td>
      </tr>
    `;
  }).join("");
}

/** Maps a grade string to a CSS class for the badge. */
function gradeToClass(grade) {
  const map = { "O": "grade-O", "A+": "grade-Ap", "A": "grade-A",
                "B+": "grade-Bp", "B": "grade-B", "C": "grade-C", "F": "grade-F" };
  return map[grade] || "grade-B";
}

// ─── 5. TIMETABLE ─────────────────────────────────────────────────────────────
function renderTimetable() {
  const student = getCurrentStudent();
  const slots   = getData("erp_timetable")[student.id];

  // Days of week (0=Sun…6=Sat); map to column keys and headers
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const jsDay = new Date().getDay();          // 0=Sun
  // Convert JS day to Mon=0 index; Sat=5; Sun→Mon (show Monday as "today" on weekends)
  let todayIdx = jsDay - 1;                   // Mon=0 … Fri=4 … Sat=5
  if (todayIdx < 0 || todayIdx === 6) todayIdx = -1; // Sun → no highlight

  const thead = document.getElementById("tt-head");
  const tbody = document.getElementById("tt-body");

  // Header row
  thead.innerHTML = `
    <tr>
      <th class="time-col">Time</th>
      ${days.map((d, i) => `<th class="${i === todayIdx ? "today-col" : ""}">${d}${i === todayIdx ? " ★" : ""}</th>`).join("")}
    </tr>
  `;

  // Body rows
  tbody.innerHTML = slots.map(slot => `
    <tr>
      <td class="time-col">${escHtml(slot.time)}</td>
      ${days.map((d, i) => {
        const cell = slot[d] || "—";
        const isLunch = cell === "LUNCH";
        const cls = isLunch ? "lunch" : (i === todayIdx ? "today-col" : "");
        return `<td class="${cls}">${escHtml(cell)}</td>`;
      }).join("")}
    </tr>
  `).join("");
}

// ─── 6. FEES ──────────────────────────────────────────────────────────────────
function renderFees() {
  const student  = getCurrentStudent();
  const feesData = getData("erp_fees")[student.id];

  const due = feesData.totalFees - feesData.paidAmount;

  document.getElementById("fee-total").textContent  = "₹" + feesData.totalFees.toLocaleString("en-IN");
  document.getElementById("fee-paid").textContent   = "₹" + feesData.paidAmount.toLocaleString("en-IN");
  document.getElementById("fee-due").textContent    = "₹" + due.toLocaleString("en-IN");

  // Color the due amount
  document.getElementById("fee-due").style.color = due > 0 ? "var(--danger)" : "var(--success)";

  // Payment history table
  const tbody = document.getElementById("fees-tbody");
  tbody.innerHTML = feesData.history.map(row => `
    <tr>
      <td>${formatDate(row.date)}</td>
      <td>${escHtml(row.description)}</td>
      <td>₹${row.amount.toLocaleString("en-IN")}</td>
      <td>
        <span class="status-badge status-${row.status.toLowerCase()}">${row.status}</span>
      </td>
      <td>
        ${row.status === "Pending"
          ? `<button class="btn-pay" onclick="payFee(this, '${escHtml(row.description)}')">Pay Now</button>`
          : `<span style="color:var(--text-light);font-size:0.85rem;">—</span>`}
      </td>
    </tr>
  `).join("");
}

/**
 * Mock payment: marks the row as Paid and updates localStorage.
 * @param {HTMLElement} btn   — the Pay Now button that was clicked
 * @param {string} description — the fee description to match
 */
function payFee(btn, description) {
  const student  = getCurrentStudent();
  const feesData = getData("erp_fees");
  const sData    = feesData[student.id];

  // Find the pending record
  const record = sData.history.find(h => h.description === description && h.status === "Pending");
  if (!record) return;

  // Update record
  record.status       = "Paid";
  sData.paidAmount   += record.amount;

  // Persist
  feesData[student.id] = sData;
  setData("erp_fees", feesData);

  // Re-render fees section
  renderFees();
  showToast("✅ Payment of ₹" + record.amount.toLocaleString("en-IN") + " successful!");
}

// ─── 7. NOTICES ───────────────────────────────────────────────────────────────
function renderNotices() {
  const notices = getData("erp_notices");

  // Wire up search and filter — only attach once
  const searchInput = document.getElementById("notice-search");
  const catFilter   = document.getElementById("notice-cat");

  // Remove previous listeners by cloning
  const newSearch = searchInput.cloneNode(true);
  const newCat    = catFilter.cloneNode(true);
  searchInput.replaceWith(newSearch);
  catFilter.replaceWith(newCat);

  newSearch.addEventListener("input", filterNotices);
  newCat.addEventListener("change",  filterNotices);

  // Initial render (no filter)
  displayNotices(notices);
}

function filterNotices() {
  const query  = document.getElementById("notice-search").value.toLowerCase();
  const cat    = document.getElementById("notice-cat").value;
  const notices = getData("erp_notices");

  const filtered = notices.filter(n => {
    const matchesQuery = n.title.toLowerCase().includes(query) ||
                         n.content.toLowerCase().includes(query);
    const matchesCat   = !cat || n.category === cat;
    return matchesQuery && matchesCat;
  });

  displayNotices(filtered);
}

function displayNotices(notices) {
  const container = document.getElementById("notices-list");

  if (notices.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <p>No notices found matching your search.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = notices.map(n => `
    <div class="notice-item">
      <div class="notice-item-header">
        <span class="notice-item-title">${escHtml(n.title)}</span>
        <span class="category-badge cat-${n.category}">${n.category}</span>
      </div>
      <div style="font-size:0.78rem;color:var(--text-light);margin-bottom:8px;">
        📅 ${formatDate(n.date)}
      </div>
      <div class="notice-item-body">${escHtml(n.content)}</div>
    </div>
  `).join("");
}

// ─── Utility functions ─────────────────────────────────────────────────────────

/** Escape HTML to prevent XSS from data strings. */
function escHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

/** Format ISO date string to "15 Mar 2024" style. */
function formatDate(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** Show a toast notification for 3 seconds. */
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
