/**
 * Zenith Life & Wellness OS - Storage & Multi-user Authentication Manager
 */

import { getInitialDemoState } from './data.js';

const USERS_KEY = 'zenith_registered_users';
const ACTIVE_USER_ID_KEY = 'zenith_active_user_id';
const DATA_PREFIX = 'zenith_data_';

export class StorageManager {
  constructor() {
    this.activeUserId = null;
    this.currentUser = null;
    this.state = null;
    this.listeners = new Set();
    this.init();
  }

  init() {
    this.ensureDefaultUsers();
    const savedActiveId = localStorage.getItem(ACTIVE_USER_ID_KEY);
    const users = this.getUsers();

    if (savedActiveId && users.find(u => u.id === savedActiveId)) {
      this.activeUserId = savedActiveId;
    } else if (users.length > 0) {
      this.activeUserId = users[0].id;
      localStorage.setItem(ACTIVE_USER_ID_KEY, this.activeUserId);
    }

    this.currentUser = users.find(u => u.id === this.activeUserId) || null;
    this.loadActiveUserState();
  }

  ensureDefaultUsers() {
    const rawUsers = localStorage.getItem(USERS_KEY);
    if (!rawUsers) {
      const demoUser = {
        id: 'usr_alex_chen',
        name: 'Alex Chen',
        email: 'alex.chen@university.edu',
        passwordHash: 'demo123', // Demo password
        role: 'Computer Science & Bioengineering Student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        joinedDate: '2025-09-01'
      };
      localStorage.setItem(USERS_KEY, JSON.stringify([demoUser]));
      
      // Ensure initial demo state exists for Alex
      const demoDataKey = DATA_PREFIX + demoUser.id;
      if (!localStorage.getItem(demoDataKey)) {
        localStorage.setItem(demoDataKey, JSON.stringify(getInitialDemoState()));
      }
    }
  }

  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    } catch {
      return [];
    }
  }

  saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  loadActiveUserState() {
    if (!this.activeUserId) {
      this.state = getInitialDemoState();
      return;
    }

    const dataKey = DATA_PREFIX + this.activeUserId;
    const raw = localStorage.getItem(dataKey);
    if (raw) {
      try {
        this.state = JSON.parse(raw);
      } catch (e) {
        console.error('Failed to parse state for user:', this.activeUserId, e);
        this.state = getInitialDemoState();
      }
    } else {
      this.state = getInitialDemoState();
      this.state.user = { ...this.currentUser };
      this.saveState();
    }
  }

  saveState() {
    if (!this.activeUserId || !this.state) return;
    try {
      const dataKey = DATA_PREFIX + this.activeUserId;
      localStorage.setItem(dataKey, JSON.stringify(this.state));
      this.notifyListeners();
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        console.error('State subscriber error:', err);
      }
    }
  }

  // --- Auth Methods ---
  login(email, password) {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      return { success: false, message: 'Account not found. Please sign up or try Demo account.' };
    }

    if (user.passwordHash !== password) {
      return { success: false, message: 'Invalid password. Please check your credentials.' };
    }

    this.activeUserId = user.id;
    this.currentUser = user;
    localStorage.setItem(ACTIVE_USER_ID_KEY, user.id);
    this.loadActiveUserState();
    this.notifyListeners();
    return { success: true, user };
  }

  signUp(name, email, password) {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newId = 'usr_' + Date.now();
    const newUser = {
      id: newId,
      name: name.trim() || 'New Explorer',
      email: cleanEmail,
      passwordHash: password,
      role: 'Lifelong Learner',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      joinedDate: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    this.saveUsers(users);

    // Initialize fresh personalized state
    const initialState = getInitialDemoState();
    initialState.user = { ...newUser };
    
    // Customize habits for a fresh start while leaving sample templates
    initialState.nutrition.logs = [];
    initialState.nutrition.waterMl = 500;

    localStorage.setItem(DATA_PREFIX + newId, JSON.stringify(initialState));

    this.activeUserId = newId;
    this.currentUser = newUser;
    localStorage.setItem(ACTIVE_USER_ID_KEY, newId);
    this.loadActiveUserState();
    this.notifyListeners();

    return { success: true, user: newUser };
  }

  loginDemo() {
    const users = this.getUsers();
    const demoUser = users.find(u => u.id === 'usr_alex_chen') || users[0];
    if (demoUser) {
      this.activeUserId = demoUser.id;
      this.currentUser = demoUser;
      localStorage.setItem(ACTIVE_USER_ID_KEY, demoUser.id);
      this.loadActiveUserState();
      this.notifyListeners();
      return { success: true, user: demoUser };
    }
    return { success: false, message: 'Demo account unavailable.' };
  }

  logout() {
    this.activeUserId = null;
    this.currentUser = null;
    localStorage.removeItem(ACTIVE_USER_ID_KEY);
    this.loadActiveUserState();
    this.notifyListeners();
  }

  resetCurrentUserData() {
    if (!this.activeUserId) return;
    const fresh = getInitialDemoState();
    if (this.currentUser) {
      fresh.user = { ...this.currentUser };
    }
    this.state = fresh;
    this.saveState();
  }

  exportDataJson() {
    if (!this.state) return;
    const blob = new Blob([JSON.stringify(this.state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zenith_backup_${this.currentUser ? this.currentUser.name.replace(/\s+/g, '_') : 'user'}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importDataJson(jsonText) {
    try {
      const imported = JSON.parse(jsonText);
      if (!imported.habits || !imported.nutrition || !imported.academics) {
        throw new Error('Invalid schema: Missing essential trackers.');
      }
      this.state = imported;
      this.saveState();
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message || 'Malformed JSON file.' };
    }
  }
}

export const storage = new StorageManager();
