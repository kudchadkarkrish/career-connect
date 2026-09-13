/**
 * ============================================================================
 * PLACEMENT DRIVE TRACKER - STORAGE SERVICE
 * ============================================================================
 * Handles browser localStorage persistence for Companies, Students, and Drives.
 * Seeds realistic demo data on initial app launch and supports one-click reset.
 * ============================================================================
 */

import {
  INITIAL_COMPANIES,
  INITIAL_STUDENTS,
  INITIAL_DRIVES
} from '../data/mockData.js';

const STORAGE_KEYS = {
  COMPANIES: 'pdt_demo_companies_v1',
  STUDENTS: 'pdt_demo_students_v1',
  DRIVES: 'pdt_demo_drives_v1'
};

/**
 * Safely parse JSON from localStorage with fallback
 */
const safeGet = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    console.warn(`[StorageService] Failed to parse key "${key}":`, error);
    return fallback;
  }
};

/**
 * Safely save data to localStorage
 */
const safeSet = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`[StorageService] Failed to set key "${key}":`, error);
  }
};

/**
 * Initialize storage with demo seed data if not present
 */
export const initStorage = () => {
  const existingCompanies = localStorage.getItem(STORAGE_KEYS.COMPANIES);
  const existingStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS);
  const existingDrives = localStorage.getItem(STORAGE_KEYS.DRIVES);

  if (!existingCompanies) {
    safeSet(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
  }
  if (!existingStudents) {
    safeSet(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
  }
  if (!existingDrives) {
    safeSet(STORAGE_KEYS.DRIVES, INITIAL_DRIVES);
  }

  return {
    companies: getCompanies(),
    students: getStudents(),
    drives: getDrives()
  };
};

/**
 * Reset all entities back to the original demo dataset
 */
export const resetToDemoData = () => {
  safeSet(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
  safeSet(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
  safeSet(STORAGE_KEYS.DRIVES, INITIAL_DRIVES);

  return {
    companies: [...INITIAL_COMPANIES],
    students: [...INITIAL_STUDENTS],
    drives: [...INITIAL_DRIVES]
  };
};

/* ============================================================================
 * COMPANIES CRUD
 * ============================================================================ */

export const getCompanies = () => safeGet(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);

export const saveCompanies = (companies) => {
  safeSet(STORAGE_KEYS.COMPANIES, companies);
};

export const addCompany = (companyData) => {
  const companies = getCompanies();
  const newCompany = {
    ...companyData,
    id: companyData.id || `comp-${Date.now()}`
  };
  const updated = [newCompany, ...companies];
  saveCompanies(updated);
  return newCompany;
};

export const updateCompany = (id, updatedFields) => {
  const companies = getCompanies();
  const updated = companies.map((c) => (c.id === id ? { ...c, ...updatedFields } : c));
  saveCompanies(updated);
  return updated.find((c) => c.id === id);
};

export const deleteCompany = (id) => {
  const companies = getCompanies();
  const filtered = companies.filter((c) => c.id !== id);
  saveCompanies(filtered);
  return filtered;
};

/* ============================================================================
 * STUDENTS CRUD
 * ============================================================================ */

export const getStudents = () => safeGet(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);

export const saveStudents = (students) => {
  safeSet(STORAGE_KEYS.STUDENTS, students);
};

export const addStudent = (studentData) => {
  const students = getStudents();
  const newStudent = {
    ...studentData,
    id: studentData.id || `std-${Date.now()}`
  };
  const updated = [newStudent, ...students];
  saveStudents(updated);
  return newStudent;
};

export const updateStudent = (id, updatedFields) => {
  const students = getStudents();
  const updated = students.map((s) => (s.id === id ? { ...s, ...updatedFields } : s));
  saveStudents(updated);
  return updated.find((s) => s.id === id);
};

export const deleteStudent = (id) => {
  const students = getStudents();
  const filtered = students.filter((s) => s.id !== id);
  saveStudents(filtered);
  return filtered;
};

/* ============================================================================
 * DRIVES CRUD
 * ============================================================================ */

export const getDrives = () => safeGet(STORAGE_KEYS.DRIVES, INITIAL_DRIVES);

export const saveDrives = (drives) => {
  safeSet(STORAGE_KEYS.DRIVES, drives);
};

export const addDrive = (driveData) => {
  const drives = getDrives();
  const newDrive = {
    ...driveData,
    id: driveData.id || `drv-${Date.now()}`
  };
  const updated = [newDrive, ...drives];
  saveDrives(updated);
  return newDrive;
};

export const updateDrive = (id, updatedFields) => {
  const drives = getDrives();
  const updated = drives.map((d) => (d.id === id ? { ...d, ...updatedFields } : d));
  saveDrives(updated);
  return updated.find((d) => d.id === id);
};

export const deleteDrive = (id) => {
  const drives = getDrives();
  const filtered = drives.filter((d) => d.id !== id);
  saveDrives(filtered);
  return filtered;
};
