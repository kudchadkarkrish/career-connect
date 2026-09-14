/**
 * ============================================================================
 * ELIGIBILITY CHECKER SERVICE
 * ============================================================================
 * Pure function — no side effects, no state.
 * Takes a student object and a drive object and returns a structured result
 * describing whether the student is eligible and why/why not for each criterion.
 *
 * Interview explanation:
 *   1. We check three independent criteria: CGPA, backlogs, department.
 *   2. Each criterion returns { label, studentValue, requirement, passed, note }.
 *   3. The overall result is "Eligible" only if ALL three pass.
 *   4. We handle missing/invalid data gracefully with sensible defaults.
 * ============================================================================
 */

/**
 * Check a single student's eligibility for a single drive.
 *
 * @param {object} student  - Student record from localStorage / state
 * @param {object} drive    - Drive record from localStorage / state
 * @returns {object} result - { eligible: boolean, criteria: Array<CriterionResult> }
 */
export const checkEligibility = (student, drive) => {
  // Guard: if either argument is missing, return a safe "unknown" result
  if (!student || !drive) {
    return { eligible: false, criteria: [] };
  }

  // ── Criterion 1: CGPA ────────────────────────────────────────────────────
  const studentCgpa  = typeof student.cgpa === 'number' ? student.cgpa : null;
  const requiredCgpa = typeof drive.minCGPA === 'number' ? drive.minCGPA : 0;
  const cgpaPassed   = studentCgpa !== null && studentCgpa >= requiredCgpa;

  const cgpaCriterion = {
    key: 'cgpa',
    label: 'CGPA',
    studentValue: studentCgpa !== null ? studentCgpa.toFixed(2) : 'N/A',
    requirement: `≥ ${requiredCgpa.toFixed(2)}`,
    passed: cgpaPassed,
    failReason: cgpaPassed ? null : `CGPA ${studentCgpa !== null ? studentCgpa.toFixed(2) : 'N/A'} is below the required ${requiredCgpa.toFixed(2)}`,
  };

  // ── Criterion 2: Active Backlogs ─────────────────────────────────────────
  const studentBacklogs = typeof student.backlogs === 'number' ? student.backlogs : 0;
  const maxBacklogs     = typeof drive.maxBacklogs === 'number' ? drive.maxBacklogs : 0;
  const backlogsPassed  = studentBacklogs <= maxBacklogs;

  const backlogsCriterion = {
    key: 'backlogs',
    label: 'Active Backlogs',
    studentValue: String(studentBacklogs),
    requirement: `≤ ${maxBacklogs}`,
    passed: backlogsPassed,
    failReason: backlogsPassed ? null : `${studentBacklogs} backlog${studentBacklogs !== 1 ? 's' : ''} exceeds the allowed maximum of ${maxBacklogs}`,
  };

  // ── Criterion 3: Department / Branch ────────────────────────────────────
  const studentBranch     = student.branch || null;
  const eligibleBranches  = Array.isArray(drive.eligibleBranches) && drive.eligibleBranches.length > 0
    ? drive.eligibleBranches
    : null;

  let branchPassed;
  let branchRequirement;

  if (!eligibleBranches) {
    // Drive has no branch restriction — all departments eligible
    branchPassed     = true;
    branchRequirement = 'All departments';
  } else if (!studentBranch) {
    // Student has no department on record
    branchPassed     = false;
    branchRequirement = eligibleBranches.join(', ');
  } else {
    branchPassed     = eligibleBranches.includes(studentBranch);
    branchRequirement = eligibleBranches.join(', ');
  }

  const branchCriterion = {
    key: 'branch',
    label: 'Department',
    studentValue: studentBranch || 'Not set',
    requirement: branchRequirement,
    passed: branchPassed,
    failReason: branchPassed
      ? null
      : `${studentBranch || 'Unknown'} is not in the eligible departments: ${branchRequirement}`,
  };

  // ── Overall result ───────────────────────────────────────────────────────
  const criteria = [cgpaCriterion, backlogsCriterion, branchCriterion];
  const eligible = criteria.every((c) => c.passed);

  return { eligible, criteria };
};
