/**
 * auth.js — Handles login, logout, and session management.
 *
 * Session is stored in localStorage as "erp_session" containing:
 *   { studentId, loginTime }
 *
 * EXTENDING: To add faculty/admin roles, add a "role" field to the
 * session object and branch logic in redirectAfterLogin().
 */

// ─── Session helpers ──────────────────────────────────────────────────────────

/**
 * Returns the current session object, or null if not logged in.
 */
function getSession() {
  const raw = localStorage.getItem("erp_session");
  return raw ? JSON.parse(raw) : null;
}

/**
 * Saves a new session after successful login.
 * @param {string} studentId
 */
function createSession(studentId) {
  const session = {
    studentId: studentId,
    loginTime: new Date().toISOString()
  };
  localStorage.setItem("erp_session", JSON.stringify(session));
}

/**
 * Destroys the session (logout).
 * Call this then redirect to index.html.
 */
function destroySession() {
  localStorage.removeItem("erp_session");
}

// ─── Guard: call on student.html to block unauthenticated access ──────────────
/**
 * Redirects to login page if no valid session exists.
 * Should be called at the very top of student.js / student.html.
 */
function requireAuth() {
  if (!getSession()) {
    window.location.href = "index.html";
  }
}

// ─── Login logic (used by index.html) ────────────────────────────────────────
/**
 * Attempts to log in with the provided credentials.
 * @param {string} studentId
 * @param {string} password
 * @returns {{ success: boolean, error?: string }}
 */
function attemptLogin(studentId, password) {
  // Basic empty-field validation
  if (!studentId.trim()) {
    return { success: false, error: "Student ID is required." };
  }
  if (!password.trim()) {
    return { success: false, error: "Password is required." };
  }

  // Look up students from localStorage (seeded by data.js)
  const students = getData("erp_students");
  if (!students) {
    return { success: false, error: "Data not loaded. Please refresh." };
  }

  // Find a matching student
  const student = students.find(
    s => s.id === studentId.trim() && s.password === password
  );

  if (!student) {
    return { success: false, error: "Invalid Student ID or Password. Please try again." };
  }

  // Credentials matched — create session and return success
  createSession(student.id);
  return { success: true };
}

/**
 * Returns the full student object for the currently logged-in user.
 * Returns null if not logged in or student not found.
 */
function getCurrentStudent() {
  const session = getSession();
  if (!session) return null;

  const students = getData("erp_students");
  return students ? students.find(s => s.id === session.studentId) || null : null;
}

/**
 * Logs out the current user and redirects to login.
 */
function logout() {
  destroySession();
  window.location.href = "index.html";
}
