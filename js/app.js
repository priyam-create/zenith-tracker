/**
 * Zenith Life & Wellness OS - Main Application Controller
 */

import { storage } from './storage.js';
import { quotesEngine } from './quotes.js';
import { sound } from './audio.js';
import { HabitTracker } from './habits.js';
import { NutritionTracker } from './nutrition.js';
import { AcademicDashboard } from './academics.js';
import { FOOD_DATABASE, PHOTO_SAMPLE_PRESETS } from './data.js';

class ZenithApp {
  constructor() {
    this.currentView = 'overview'; // 'overview' | 'habits' | 'nutrition' | 'academics' | 'settings'
    this.habits = new HabitTracker(this);
    this.nutrition = new NutritionTracker(this);
    this.academics = new AcademicDashboard(this);
    this.init();
  }

  init() {
    this.applyTheme(storage.state.settings.theme || 'sage');
    sound.setEnabled(storage.state.settings.soundEnabled ?? true);

    this.bindNavigation();
    this.bindTopBarEvents();
    this.bindModals();
    this.renderMotivationalBanner(quotesEngine.getCurrent());
    this.switchView('overview');

    // Subscribe to state changes for auto-sync reflection
    storage.subscribe(() => {
      this.updateSyncStatus();
    });

    // Check if initial modal open requested or first visit
    this.updateUserHeader();
  }

  updateSyncStatus() {
    const el = document.getElementById('cloud-sync-status');
    if (!el) return;
    el.innerHTML = '<span class="sync-dot pulsing"></span> Cloud Synced • Just now';
    setTimeout(() => {
      if (el) el.innerHTML = '<span class="sync-dot"></span> Cloud Synced';
    }, 2000);
  }

  updateUserHeader() {
    const user = storage.currentUser || { name: 'Guest Explorer', role: 'Personal OS' };
    const nameEl = document.getElementById('header-user-name');
    const roleEl = document.getElementById('header-user-role');
    const avatarEl = document.getElementById('header-user-avatar');

    if (nameEl) nameEl.textContent = user.name;
    if (roleEl) roleEl.textContent = user.role;
    if (avatarEl && user.avatar) avatarEl.src = user.avatar;
  }

  // --- View Router ---
  switchView(viewName) {
    this.currentView = viewName;

    // Update nav active classes (both sidebar & mobile bottom bar)
    document.querySelectorAll('.nav-link, .mobile-nav-btn').forEach(btn => {
      if (btn.dataset.view === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Hide all view sections, show active
    document.querySelectorAll('.app-view').forEach(view => {
      if (view.id === `view-${viewName}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Render target view
    if (viewName === 'overview') this.renderOverview();
    else if (viewName === 'habits') this.habits.render();
    else if (viewName === 'nutrition') this.nutrition.render();
    else if (viewName === 'academics') this.academics.render();
    else if (viewName === 'settings') this.renderSettings();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  bindNavigation() {
    document.querySelectorAll('[data-view]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        if (view) this.switchView(view);
      });
    });
  }

  bindTopBarEvents() {
    // Theme toggle button in header
    document.getElementById('btn-toggle-theme')?.addEventListener('click', () => {
      const current = storage.state.settings.theme || 'sage';
      const order = ['sage', 'obsidian', 'light', 'ocean'];
      const next = order[(order.indexOf(current) + 1) % order.length];
      this.applyTheme(next);
      this.showToast(`Theme changed to ${this.getThemeDisplayName(next)}`, 'info');
    });

    // Profile button opens auth or profile modal
    document.getElementById('header-profile-btn')?.addEventListener('click', () => {
      this.openAuthModal();
    });

    // Spark Another Thought button
    document.getElementById('btn-spark-quote')?.addEventListener('click', () => {
      const nextThought = quotesEngine.nextThought();
      this.renderMotivationalBanner(nextThought, true);
      sound.playPop();
    });
  }

  getThemeDisplayName(t) {
    switch (t) {
      case 'sage': return 'Nordic Sage (Dark)';
      case 'obsidian': return 'Obsidian Ember (Dark)';
      case 'light': return 'Ethereal Clean (Light)';
      case 'ocean': return 'Oceanic Calm (Dark)';
      default: return t;
    }
  }

  applyTheme(theme) {
    storage.state.settings.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    storage.saveState();
  }

  // --- Motivational Banner ---
  renderMotivationalBanner(thought, animated = false) {
    const banner = document.getElementById('motivational-banner');
    if (!banner) return;

    const quoteEl = banner.querySelector('.quote-text');
    const authorEl = banner.querySelector('.quote-author');
    const categoryEl = banner.querySelector('.quote-category');
    const contextEl = banner.querySelector('.quote-context');

    if (animated) {
      banner.classList.add('quote-updating');
      setTimeout(() => {
        if (quoteEl) quoteEl.textContent = `“${thought.quote}”`;
        if (authorEl) authorEl.textContent = `— ${thought.author}`;
        if (categoryEl) categoryEl.textContent = thought.category;
        if (contextEl) contextEl.textContent = thought.context;
        banner.classList.remove('quote-updating');
      }, 200);
    } else {
      if (quoteEl) quoteEl.textContent = `“${thought.quote}”`;
      if (authorEl) authorEl.textContent = `— ${thought.author}`;
      if (categoryEl) categoryEl.textContent = thought.category;
      if (contextEl) contextEl.textContent = thought.context;
    }
  }

  // --- Overview / Dashboard View ---
  renderOverview() {
    const container = document.getElementById('overview-view-content');
    if (!container) return;

    const habits = this.habits.getHabits();
    const habitStats = this.habits.calculateStats();

    const nutritionTotals = this.nutrition.calculateTotals();
    const nutritionGoals = this.nutrition.getGoals();
    const caloriesLeft = nutritionGoals.calories - nutritionTotals.calories;

    const academics = this.academics.getAcademics();
    const gpaInfo = this.academics.calculateGpa();
    const pendingDeadlines = (academics.deadlines || []).filter(d => !d.completed);
    const pendingDues = (academics.dues || []).filter(d => d.status !== 'Paid');
    const pendingDuesAmount = pendingDues.reduce((acc, d) => acc + Number(d.amount || 0), 0);

    const widgets = storage.state.settings.dashboardWidgets || {
      habits: true, nutrition: true, academics: true, dues: true, water: true
    };

    let html = `
      <!-- Greeting & Daily Status Strip -->
      <div class="overview-welcome-row">
        <div>
          <h2 class="welcome-heading">Welcome back, ${storage.currentUser?.name.split(' ')[0] || 'Friend'}</h2>
          <p class="welcome-sub">Here is your life & wellness snapshot for ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}.</p>
        </div>
        <div class="welcome-quick-actions">
          <button class="btn btn-primary btn-sm" id="btn-dash-quick-log">
            + Log Food
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-dash-new-habit">
            + New Habit
          </button>
        </div>
      </div>

      <!-- Core Vitals Summary Cards (Responsive 4-Grid) -->
      <div class="stats-grid">
        <!-- Habits Today -->
        <div class="stat-card glass-panel cursor-pointer" id="dash-card-habits">
          <div class="stat-header">
            <span class="stat-title">Habits Done</span>
            <span class="stat-icon">🔥</span>
          </div>
          <div class="stat-main">
            <div class="stat-value">${habitStats.completedToday}/${habitStats.total}</div>
            <div class="stat-sub">${habitStats.percentage}% completion today</div>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill progress-emerald" style="width: ${habitStats.percentage}%;"></div>
          </div>
        </div>

        <!-- Calories Remaining -->
        <div class="stat-card glass-panel cursor-pointer" id="dash-card-nutrition">
          <div class="stat-header">
            <span class="stat-title">Energy Consumed</span>
            <span class="stat-icon">🥗</span>
          </div>
          <div class="stat-main">
            <div class="stat-value">${nutritionTotals.calories} <span class="stat-unit">kcal</span></div>
            <div class="stat-sub ${caloriesLeft < 0 ? 'text-danger' : ''}">
              ${caloriesLeft >= 0 ? `${caloriesLeft} kcal left` : `${Math.abs(caloriesLeft)} kcal over`}
            </div>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill progress-amber" style="width: ${Math.min(100, Math.round((nutritionTotals.calories / nutritionGoals.calories) * 100))}%;"></div>
          </div>
        </div>

        <!-- Academic Standing -->
        <div class="stat-card glass-panel cursor-pointer" id="dash-card-academics">
          <div class="stat-header">
            <span class="stat-title">Current GPA</span>
            <span class="stat-icon">🎓</span>
          </div>
          <div class="stat-main">
            <div class="stat-value text-blue">${gpaInfo.gpa}</div>
            <div class="stat-sub">${pendingDeadlines.length} pending deadlines</div>
          </div>
          <div class="stat-badge badge-blue">${academics.courses.length} Active Courses</div>
        </div>

        <!-- Financial Status -->
        <div class="stat-card glass-panel cursor-pointer" id="dash-card-dues">
          <div class="stat-header">
            <span class="stat-title">Pending Dues</span>
            <span class="stat-icon">💳</span>
          </div>
          <div class="stat-main">
            <div class="stat-value ${pendingDuesAmount > 0 ? 'text-amber' : 'text-emerald'}">
              $${pendingDuesAmount.toFixed(2)}
            </div>
            <div class="stat-sub">${pendingDues.length} unresolved campus fees</div>
          </div>
          <div class="stat-badge ${pendingDuesAmount > 0 ? 'badge-amber' : 'badge-emerald'}">
            ${pendingDuesAmount > 0 ? 'Action required' : 'All clear'}
          </div>
        </div>
      </div>

      <!-- Main Dashboard Grid Layout -->
      <div class="dashboard-sections-grid">
        <!-- Left / Top Primary Column -->
        <div class="dashboard-col-main">
          <!-- Widget: Habits Quick Check-in Strip -->
          ${widgets.habits ? `
            <div class="dash-widget glass-panel">
              <div class="widget-header">
                <div>
                  <h3 class="widget-title">Today's Atomic Routines</h3>
                  <p class="widget-sub">1-tap check-in on desktop or phone</p>
                </div>
                <button class="btn-subtle-link" id="link-view-all-habits">View All →</button>
              </div>

              <div class="dash-habits-strip">
                ${habits.slice(0, 5).map(h => {
                  const done = Boolean(h.history && h.history[this.habits.currentDate]);
                  return `
                    <div class="dash-habit-item ${done ? 'item-checked' : ''}" data-id="${h.id}">
                      <button class="habit-quick-check-btn ${done ? 'checked' : ''}" data-id="${h.id}">
                        <span class="habit-icon">${h.icon}</span>
                        <span class="check-indicator">✓</span>
                      </button>
                      <div class="item-text">
                        <span class="item-title">${h.name}</span>
                        <span class="item-meta">🔥 ${h.currentStreak || 0}d streak • ${h.category}</span>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Widget: Nutrition & Macros Quick Overview -->
          ${widgets.nutrition ? `
            <div class="dash-widget glass-panel">
              <div class="widget-header">
                <div>
                  <h3 class="widget-title">Daily Nutrition & Macros</h3>
                  <p class="widget-sub">Target balance: ${nutritionGoals.calories} kcal</p>
                </div>
                <button class="btn-subtle-link" id="link-view-all-nutrition">Food Journal →</button>
              </div>

              <div class="dash-nutrition-row">
                <div class="macro-pill-summary">
                  <span class="macro-badge text-protein">🥩 P: ${nutritionTotals.protein}g / ${nutritionGoals.protein}g</span>
                  <span class="macro-badge text-carbs">🌾 C: ${nutritionTotals.carbs}g / ${nutritionGoals.carbs}g</span>
                  <span class="macro-badge text-fats">🥑 F: ${nutritionTotals.fat}g / ${nutritionGoals.fat}g</span>
                  <span class="macro-badge">🧂 Sodium: ${nutritionTotals.sodium}mg</span>
                </div>
                <div class="dash-food-actions">
                  <button class="btn btn-secondary btn-sm" id="dash-btn-search-food">🔍 Search</button>
                  <button class="btn btn-secondary btn-sm" id="dash-btn-photo-food">📷 Photo Scan</button>
                </div>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Right / Secondary Column -->
        <div class="dashboard-col-side">
          <!-- Widget: Imminent Deadlines -->
          ${widgets.academics ? `
            <div class="dash-widget glass-panel">
              <div class="widget-header">
                <h3 class="widget-title">Upcoming Deadlines</h3>
                <button class="btn-subtle-link" id="link-view-all-deadlines">All Tasks →</button>
              </div>

              <div class="dash-deadlines-list">
                ${pendingDeadlines.slice(0, 3).map(d => `
                  <div class="dash-deadline-card">
                    <div class="dl-top">
                      <span class="course-mini-tag">${d.courseCode}</span>
                      <span class="dl-date">📅 ${d.dueDate}</span>
                    </div>
                    <h5 class="dl-name">${d.title}</h5>
                  </div>
                `).join('') || `
                  <div class="empty-state-sm">No imminent deadlines.</div>
                `}
              </div>
            </div>
          ` : ''}

          <!-- Widget: Quick Water Tracker -->
          ${widgets.water ? `
            <div class="dash-widget glass-panel">
              <div class="widget-header">
                <h3 class="widget-title">Hydration Monitor</h3>
                <span class="water-ml-label">${this.nutrition.getWater()} / ${nutritionGoals.water} ml</span>
              </div>
              <div class="progress-bar-track water-track">
                <div class="progress-bar-fill progress-water" style="width: ${Math.min(100, Math.round((this.nutrition.getWater() / nutritionGoals.water) * 100))}%;"></div>
              </div>
              <div class="water-quick-buttons">
                <button class="btn btn-outline btn-xs" id="dash-water-add-250">+250ml</button>
                <button class="btn btn-outline btn-xs" id="dash-water-add-500">+500ml</button>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.attachOverviewEvents(container);
  }

  attachOverviewEvents(container) {
    // Stat cards navigate to corresponding tabs
    container.querySelector('#dash-card-habits')?.addEventListener('click', () => this.switchView('habits'));
    container.querySelector('#dash-card-nutrition')?.addEventListener('click', () => this.switchView('nutrition'));
    container.querySelector('#dash-card-academics')?.addEventListener('click', () => {
      this.switchView('academics');
      this.academics.activeTab = 'courses';
      this.academics.render();
    });
    container.querySelector('#dash-card-dues')?.addEventListener('click', () => {
      this.switchView('academics');
      this.academics.activeTab = 'dues';
      this.academics.render();
    });

    // Sub-links
    container.querySelector('#link-view-all-habits')?.addEventListener('click', () => this.switchView('habits'));
    container.querySelector('#link-view-all-nutrition')?.addEventListener('click', () => this.switchView('nutrition'));
    container.querySelector('#link-view-all-deadlines')?.addEventListener('click', () => {
      this.switchView('academics');
      this.academics.activeTab = 'deadlines';
      this.academics.render();
    });

    // Quick buttons
    container.querySelector('#btn-dash-quick-log')?.addEventListener('click', () => this.openFoodModal('search'));
    container.querySelector('#btn-dash-new-habit')?.addEventListener('click', () => this.openHabitModal());
    container.querySelector('#dash-btn-search-food')?.addEventListener('click', () => this.openFoodModal('search'));
    container.querySelector('#dash-btn-photo-food')?.addEventListener('click', () => this.openFoodModal('photo'));

    // Habit check-in from dashboard
    container.querySelectorAll('.dash-habit-item .habit-quick-check-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.habits.toggleCheckIn(id);
      });
    });

    // Water buttons
    container.querySelector('#dash-water-add-250')?.addEventListener('click', () => this.nutrition.updateWater(250));
    container.querySelector('#dash-water-add-500')?.addEventListener('click', () => this.nutrition.updateWater(500));
  }

  // --- Settings View ---
  renderSettings() {
    const container = document.getElementById('settings-view-content');
    if (!container) return;

    const s = storage.state.settings;
    const currentTheme = s.theme || 'sage';
    const widgets = s.dashboardWidgets || {
      habits: true, nutrition: true, academics: true, dues: true, water: true
    };

    container.innerHTML = `
      <div class="settings-grid">
        <!-- Appearance & Theme Preferences -->
        <div class="settings-card glass-panel">
          <div class="settings-card-header">
            <h3>🎨 Visual Appearance & Palette</h3>
            <p class="settings-sub">Choose a calming, high-contrast aesthetic that fits your flow.</p>
          </div>

          <div class="theme-options-grid">
            <button class="theme-select-card ${currentTheme === 'sage' ? 'active' : ''}" data-theme="sage">
              <div class="theme-preview sage-preview"></div>
              <span class="theme-name">Nordic Sage</span>
              <span class="theme-desc">Calming slate & eucalyptus (Dark)</span>
            </button>

            <button class="theme-select-card ${currentTheme === 'obsidian' ? 'active' : ''}" data-theme="obsidian">
              <div class="theme-preview obsidian-preview"></div>
              <span class="theme-name">Obsidian Ember</span>
              <span class="theme-desc">Deep obsidian & amber bronze (Dark)</span>
            </button>

            <button class="theme-select-card ${currentTheme === 'light' ? 'active' : ''}" data-theme="light">
              <div class="theme-preview light-preview"></div>
              <span class="theme-name">Ethereal Porcelain</span>
              <span class="theme-desc">Crisp, serene contrast (Light)</span>
            </button>

            <button class="theme-select-card ${currentTheme === 'ocean' ? 'active' : ''}" data-theme="ocean">
              <div class="theme-preview ocean-preview"></div>
              <span class="theme-name">Oceanic Calm</span>
              <span class="theme-desc">Deep navy & seafoam cyan (Dark)</span>
            </button>
          </div>
        </div>

        <!-- Nutrition Targets Settings -->
        <div class="settings-card glass-panel">
          <div class="settings-card-header">
            <h3>🥗 Daily Nutrition & Hydration Goals</h3>
            <p class="settings-sub">Set personalized macronutrient thresholds and calorie budgets.</p>
          </div>

          <form id="settings-nutrition-form" class="settings-form-grid">
            <div class="form-group">
              <label>Daily Calorie Target (kcal)</label>
              <input type="number" id="setting-cal" value="${s.dailyCalorieGoal || 2150}" min="1000" max="6000" class="form-input" />
            </div>

            <div class="form-group">
              <label>Protein Target (g)</label>
              <input type="number" id="setting-protein" value="${s.dailyProteinGoal || 135}" min="20" max="400" class="form-input" />
            </div>

            <div class="form-group">
              <label>Carbohydrates Target (g)</label>
              <input type="number" id="setting-carbs" value="${s.dailyCarbsGoal || 220}" min="20" max="600" class="form-input" />
            </div>

            <div class="form-group">
              <label>Healthy Fats Target (g)</label>
              <input type="number" id="setting-fat" value="${s.dailyFatGoal || 65}" min="15" max="250" class="form-input" />
            </div>

            <div class="form-group">
              <label>Dietary Fiber Target (g)</label>
              <input type="number" id="setting-fiber" value="${s.dailyFiberGoal || 32}" min="10" max="100" class="form-input" />
            </div>

            <div class="form-group">
              <label>Sodium Daily Limit (mg)</label>
              <input type="number" id="setting-sodium" value="${s.dailySodiumMax || 2200}" min="500" max="5000" class="form-input" />
            </div>

            <div class="form-group">
              <label>Hydration Goal (ml)</label>
              <input type="number" id="setting-water" value="${s.dailyWaterGoal || 2500}" min="500" max="6000" step="100" class="form-input" />
            </div>

            <div class="form-actions-full">
              <button type="submit" class="btn btn-primary btn-sm">Save Nutrition Goals</button>
            </div>
          </form>
        </div>

        <!-- Modular Dashboard & Audio Toggles -->
        <div class="settings-card glass-panel">
          <div class="settings-card-header">
            <h3>🧩 Modular Widgets & Feedback</h3>
            <p class="settings-sub">Customize which sections appear on your overview screen.</p>
          </div>

          <div class="toggle-list">
            <label class="toggle-row">
              <div class="toggle-text">
                <span class="toggle-title">Habits Widget</span>
                <span class="toggle-sub">Show atomic routines check-in on overview</span>
              </div>
              <input type="checkbox" id="toggle-widget-habits" class="switch-input" ${widgets.habits ? 'checked' : ''} />
            </label>

            <label class="toggle-row">
              <div class="toggle-text">
                <span class="toggle-title">Nutrition & Macro Balance</span>
                <span class="toggle-sub">Show calories and macro distribution rings</span>
              </div>
              <input type="checkbox" id="toggle-widget-nutrition" class="switch-input" ${widgets.nutrition ? 'checked' : ''} />
            </label>

            <label class="toggle-row">
              <div class="toggle-text">
                <span class="toggle-title">Academic Deadlines</span>
                <span class="toggle-sub">Show exam countdowns and assignment milestones</span>
              </div>
              <input type="checkbox" id="toggle-widget-academics" class="switch-input" ${widgets.academics ? 'checked' : ''} />
            </label>

            <label class="toggle-row">
              <div class="toggle-text">
                <span class="toggle-title">Campus Dues & Billing Alert</span>
                <span class="toggle-sub">Display pending fees balance and payment reminders</span>
              </div>
              <input type="checkbox" id="toggle-widget-dues" class="switch-input" ${widgets.dues ? 'checked' : ''} />
            </label>

            <label class="toggle-row">
              <div class="toggle-text">
                <span class="toggle-title">Audio Feedback & Chimes</span>
                <span class="toggle-sub">Play gentle resonant chord on completing habits</span>
              </div>
              <input type="checkbox" id="toggle-sound" class="switch-input" ${s.soundEnabled ? 'checked' : ''} />
            </label>
          </div>
        </div>

        <!-- Data Management & Privacy -->
        <div class="settings-card glass-panel">
          <div class="settings-card-header">
            <h3>🔒 Account, Data Privacy & Backup</h3>
            <p class="settings-sub">Export your data to JSON, switch accounts, or restore defaults.</p>
          </div>

          <div class="data-actions-grid">
            <div class="data-action-item">
              <div>
                <h5>Export Personal Backup</h5>
                <p>Download a complete JSON snapshot of habits, nutrition, and notes.</p>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-export-json">📥 Export JSON</button>
            </div>

            <div class="data-action-item">
              <div>
                <h5>Restore from Backup</h5>
                <p>Upload a previously exported JSON backup file.</p>
              </div>
              <label class="btn btn-secondary btn-sm file-upload-label">
                📤 Import JSON
                <input type="file" id="file-import-json" accept=".json" style="display: none;" />
              </label>
            </div>

            <div class="data-action-item">
              <div>
                <h5>Reset to Showcase Data</h5>
                <p>Reload realistic sample habits, courses, and meal logs.</p>
              </div>
              <button class="btn btn-outline btn-sm text-amber" id="btn-reset-demo">↺ Reload Demo Data</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach Settings Events
    container.querySelectorAll('.theme-select-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const theme = e.currentTarget.dataset.theme;
        this.applyTheme(theme);
        this.renderSettings();
        this.showToast(`Active theme: ${this.getThemeDisplayName(theme)}`, 'success');
      });
    });

    // Nutrition Form
    container.querySelector('#settings-nutrition-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      storage.state.settings.dailyCalorieGoal = Number(document.getElementById('setting-cal').value);
      storage.state.settings.dailyProteinGoal = Number(document.getElementById('setting-protein').value);
      storage.state.settings.dailyCarbsGoal = Number(document.getElementById('setting-carbs').value);
      storage.state.settings.dailyFatGoal = Number(document.getElementById('setting-fat').value);
      storage.state.settings.dailyFiberGoal = Number(document.getElementById('setting-fiber').value);
      storage.state.settings.dailySodiumMax = Number(document.getElementById('setting-sodium').value);
      storage.state.settings.dailyWaterGoal = Number(document.getElementById('setting-water').value);
      storage.saveState();
      this.showToast('Nutrition goals updated successfully.', 'success');
    });

    // Widget toggles
    const bindToggle = (id, key) => {
      container.querySelector(id)?.addEventListener('change', (e) => {
        storage.state.settings.dashboardWidgets[key] = e.target.checked;
        storage.saveState();
      });
    };
    bindToggle('#toggle-widget-habits', 'habits');
    bindToggle('#toggle-widget-nutrition', 'nutrition');
    bindToggle('#toggle-widget-academics', 'academics');
    bindToggle('#toggle-widget-dues', 'dues');

    container.querySelector('#toggle-sound')?.addEventListener('change', (e) => {
      storage.state.settings.soundEnabled = e.target.checked;
      sound.setEnabled(e.target.checked);
      storage.saveState();
      if (e.target.checked) sound.playChime();
    });

    // Export/Import/Reset
    container.querySelector('#btn-export-json')?.addEventListener('click', () => {
      storage.exportDataJson();
      this.showToast('Data exported successfully.', 'success');
    });

    container.querySelector('#file-import-json')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = storage.importDataJson(event.target.result);
        if (res.success) {
          this.showToast('Data successfully imported!', 'success');
          this.renderSettings();
        } else {
          this.showToast(`Import failed: ${res.message}`, 'error');
        }
      };
      reader.readAsText(file);
    });

    container.querySelector('#btn-reset-demo')?.addEventListener('click', () => {
      if (confirm('Reload the complete sample dataset for this account? Current unbacked changes will be replaced with fresh showcase data.')) {
        storage.resetCurrentUserData();
        this.renderSettings();
        this.renderOverview();
        this.showToast('Reset to rich demo data.', 'success');
      }
    });
  }

  // --- Modals Controller ---
  bindModals() {
    // ESC and backdrop click handling for all dialog elements
    document.querySelectorAll('dialog').forEach(dialog => {
      dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX && e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
          dialog.close();
        }
      });

      dialog.querySelectorAll('.btn-close-dialog').forEach(btn => {
        btn.addEventListener('click', () => dialog.close());
      });
    });

    this.bindHabitModal();
    this.bindFoodModal();
    this.bindCourseModal();
    this.bindDeadlineModal();
    this.bindDueModal();
    this.bindNoteModal();
    this.bindAuthModal();
  }

  // --- Habit Modal ---
  openHabitModal(existingHabit = null) {
    const dialog = document.getElementById('habit-dialog');
    if (!dialog) return;

    const titleEl = dialog.querySelector('#habit-modal-title');
    const form = dialog.querySelector('#habit-form');
    form.reset();

    if (existingHabit) {
      titleEl.textContent = 'Edit Atomic Habit';
      form.dataset.editId = existingHabit.id;
      document.getElementById('habit-input-name').value = existingHabit.name;
      document.getElementById('habit-input-category').value = existingHabit.category;
      document.getElementById('habit-input-icon').value = existingHabit.icon;
      document.getElementById('habit-input-time').value = existingHabit.targetTime;
      document.getElementById('habit-input-freq').value = existingHabit.frequency;
      document.getElementById('habit-check-today-wrap').style.display = 'none';
    } else {
      titleEl.textContent = 'Forge a New Habit';
      delete form.dataset.editId;
      document.getElementById('habit-check-today-wrap').style.display = 'block';
    }

    dialog.showModal();
  }

  bindHabitModal() {
    const dialog = document.getElementById('habit-dialog');
    const form = dialog?.querySelector('#habit-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const habitData = {
        name: document.getElementById('habit-input-name').value,
        category: document.getElementById('habit-input-category').value,
        icon: document.getElementById('habit-input-icon').value,
        targetTime: document.getElementById('habit-input-time').value,
        frequency: document.getElementById('habit-input-freq').value,
        checkedToday: document.getElementById('habit-check-today')?.checked
      };

      if (form.dataset.editId) {
        this.habits.updateHabit(form.dataset.editId, habitData);
      } else {
        this.habits.createHabit(habitData);
      }

      dialog.close();
    });
  }

  // --- Food Modal (Search, Photo AI Scan, Manual) ---
  openFoodModal(activeTab = 'search') {
    const dialog = document.getElementById('food-dialog');
    if (!dialog) return;

    this.switchFoodModalTab(activeTab);
    this.renderFoodDatabaseResults('');
    dialog.showModal();
  }

  switchFoodModalTab(tabName) {
    const dialog = document.getElementById('food-dialog');
    if (!dialog) return;

    dialog.querySelectorAll('.modal-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    dialog.querySelectorAll('.food-tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `food-pane-${tabName}`);
    });
  }

  bindFoodModal() {
    const dialog = document.getElementById('food-dialog');
    if (!dialog) return;

    // Tab buttons
    dialog.querySelectorAll('.modal-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchFoodModalTab(e.currentTarget.dataset.tab);
      });
    });

    // 1. Search Database Tab
    const searchInput = dialog.querySelector('#food-db-search-input');
    searchInput?.addEventListener('input', (e) => {
      this.renderFoodDatabaseResults(e.target.value);
    });

    // 2. Photo Scan Tab Preset Buttons
    this.renderPhotoPresets();

    // Custom File upload / Camera take photo input
    const photoInput = dialog.querySelector('#food-camera-input');
    photoInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        this.simulatePhotoAnalysis({
          label: file.name,
          imageUrl: event.target.result,
          detectedFood: 'Home-Prepared Balanced Dish',
          confidence: 82,
          portion: '1 bowl / plate (approx 340g)',
          estimatedCalories: 460,
          protein: 30,
          carbs: 45,
          fat: 16,
          fiber: 5,
          sodium: 480,
          notes: 'Estimated from visual contours and portion density. Please verify components before logging.'
        });
      };
      reader.readAsDataURL(file);
    });

    // Manual Food Form
    const manualForm = dialog.querySelector('#food-manual-form');
    manualForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.nutrition.addFoodLog({
        mealType: document.getElementById('food-manual-type').value,
        name: document.getElementById('food-manual-name').value,
        portion: document.getElementById('food-manual-portion').value,
        calories: document.getElementById('food-manual-cal').value,
        protein: document.getElementById('food-manual-protein').value,
        carbs: document.getElementById('food-manual-carbs').value,
        fat: document.getElementById('food-manual-fat').value,
        fiber: document.getElementById('food-manual-fiber').value,
        sodium: document.getElementById('food-manual-sodium').value,
        isEstimate: false,
        source: 'Manual'
      });
      dialog.close();
    });
  }

  renderFoodDatabaseResults(query) {
    const list = document.getElementById('food-db-results-list');
    if (!list) return;

    const q = query.trim().toLowerCase();
    const filtered = q
      ? FOOD_DATABASE.filter(f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q))
      : FOOD_DATABASE;

    list.innerHTML = filtered.map(item => `
      <div class="food-db-item" data-id="${item.id}">
        <span class="food-db-icon">${item.icon}</span>
        <div class="food-db-info">
          <span class="food-db-name">${item.name}</span>
          <span class="food-db-portion">⚖️ ${item.portion} • ${item.category}</span>
        </div>
        <div class="food-db-macros">
          <span class="food-db-cal"><strong>${item.calories}</strong> kcal</span>
          <span class="food-db-pcf">P: ${item.protein}g | C: ${item.carbs}g | F: ${item.fat}g</span>
        </div>
        <button class="btn btn-primary btn-xs btn-log-db-food" data-id="${item.id}">
          + Log
        </button>
      </div>
    `).join('');

    list.querySelectorAll('.btn-log-db-food').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const item = FOOD_DATABASE.find(f => f.id === id);
        if (item) {
          const mealType = document.getElementById('food-db-meal-type')?.value || item.category;
          this.nutrition.addFoodLog({
            ...item,
            mealType,
            isEstimate: false,
            source: 'Database'
          });
          document.getElementById('food-dialog')?.close();
        }
      });
    });
  }

  renderPhotoPresets() {
    const mount = document.getElementById('photo-presets-mount');
    if (!mount) return;

    mount.innerHTML = PHOTO_SAMPLE_PRESETS.map(p => `
      <div class="photo-preset-card" data-id="${p.id}">
        <img src="${p.imageUrl}" alt="${p.label}" class="preset-img" />
        <span class="preset-title">${p.label}</span>
      </div>
    `).join('');

    mount.querySelectorAll('.photo-preset-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const preset = PHOTO_SAMPLE_PRESETS.find(p => p.id === id);
        if (preset) {
          this.simulatePhotoAnalysis(preset);
        }
      });
    });
  }

  simulatePhotoAnalysis(preset) {
    const analysisCard = document.getElementById('photo-analysis-results-card');
    if (!analysisCard) return;

    // Show simulated AI scanning animation
    analysisCard.innerHTML = `
      <div class="photo-scanning-animation">
        <div class="scanner-spinner"></div>
        <h4>Analyzing Visual Portions & Density...</h4>
        <p>Detecting macronutrient markers and volumetric contours</p>
      </div>
    `;
    analysisCard.style.display = 'block';

    setTimeout(() => {
      analysisCard.innerHTML = `
        <div class="analysis-result-box">
          <div class="analysis-preview-row">
            <img src="${preset.imageUrl}" class="analyzed-dish-thumb" alt="Dish photo" />
            <div class="analysis-dish-details">
              <div class="confidence-badge">
                <span class="confidence-dot"></span>
                <span>Visual Estimation: ~${preset.confidence}% confidence</span>
              </div>
              <h4 class="detected-title">${preset.detectedFood}</h4>
              <p class="detected-notes">${preset.notes}</p>
            </div>
          </div>

          <!-- Medical Disclaimer for Photo Results -->
          <div class="modal-disclaimer-callout">
            ⚠️ <strong>Approximation Notice:</strong> Photographic volume heuristics provide broad estimates. Actual caloric and macronutrient density depends on preparation and oils. <em>Adjust portions and values below before logging.</em>
          </div>

          <!-- Editable Fields Before Saving -->
          <form id="form-confirm-photo-food" class="photo-confirm-grid">
            <div class="form-group">
              <label>Meal Category</label>
              <select id="photo-confirm-meal-type" class="form-select">
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch" selected>Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>
            </div>

            <div class="form-group">
              <label>Dish Description</label>
              <input type="text" id="photo-confirm-name" value="${preset.detectedFood}" class="form-input" />
            </div>

            <div class="form-group">
              <label>Serving Portion</label>
              <input type="text" id="photo-confirm-portion" value="${preset.portion}" class="form-input" />
            </div>

            <div class="form-group">
              <label>Estimated Calories (kcal)</label>
              <input type="number" id="photo-confirm-cal" value="${preset.estimatedCalories}" class="form-input" />
            </div>

            <div class="form-group">
              <label>Protein (g)</label>
              <input type="number" id="photo-confirm-protein" value="${preset.protein}" class="form-input" />
            </div>

            <div class="form-group">
              <label>Carbohydrates (g)</label>
              <input type="number" id="photo-confirm-carbs" value="${preset.carbs}" class="form-input" />
            </div>

            <div class="form-group">
              <label>Fat (g)</label>
              <input type="number" id="photo-confirm-fat" value="${preset.fat}" class="form-input" />
            </div>

            <div class="form-group">
              <label>Fiber (g)</label>
              <input type="number" id="photo-confirm-fiber" value="${preset.fiber}" class="form-input" />
            </div>

            <div class="form-actions-full">
              <button type="submit" class="btn btn-primary btn-sm">
                ✓ Confirm & Log Estimated Meal
              </button>
            </div>
          </form>
        </div>
      `;

      analysisCard.querySelector('#form-confirm-photo-food')?.addEventListener('submit', (ev) => {
        ev.preventDefault();
        this.nutrition.addFoodLog({
          mealType: document.getElementById('photo-confirm-meal-type').value,
          name: document.getElementById('photo-confirm-name').value,
          portion: document.getElementById('photo-confirm-portion').value,
          calories: document.getElementById('photo-confirm-cal').value,
          protein: document.getElementById('photo-confirm-protein').value,
          carbs: document.getElementById('photo-confirm-carbs').value,
          fat: document.getElementById('photo-confirm-fat').value,
          fiber: document.getElementById('photo-confirm-fiber').value,
          sodium: preset.sodium,
          isEstimate: true,
          confidence: preset.confidence,
          source: 'Photo Estimate'
        });
        document.getElementById('food-dialog')?.close();
      });
    }, 600);
  }

  // --- Course Modal ---
  openCourseModal() {
    const dialog = document.getElementById('course-dialog');
    dialog?.querySelector('#course-form')?.reset();
    dialog?.showModal();
  }

  bindCourseModal() {
    const dialog = document.getElementById('course-dialog');
    const form = dialog?.querySelector('#course-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.academics.addCourse({
        code: document.getElementById('course-input-code').value,
        name: document.getElementById('course-input-name').value,
        professor: document.getElementById('course-input-prof').value,
        credits: document.getElementById('course-input-credits').value,
        currentGrade: document.getElementById('course-input-grade').value,
        gradePercentage: document.getElementById('course-input-pct').value,
        color: document.getElementById('course-input-color').value,
        schedule: document.getElementById('course-input-schedule').value,
        location: document.getElementById('course-input-loc').value
      });
      dialog.close();
    });
  }

  // --- Deadline Modal ---
  openDeadlineModal() {
    const dialog = document.getElementById('deadline-dialog');
    const select = dialog?.querySelector('#deadline-course-select');
    if (select) {
      const courses = this.academics.getAcademics().courses || [];
      select.innerHTML = courses.map(c => `<option value="${c.code}">${c.code} - ${c.name}</option>`).join('') || '<option value="General">General Academic</option>';
    }
    // Set default due date to 3 days from now
    const d = new Date();
    d.setDate(d.getDate() + 3);
    const dateInput = dialog?.querySelector('#deadline-due-date');
    if (dateInput) dateInput.value = d.toISOString().split('T')[0];

    dialog?.showModal();
  }

  bindDeadlineModal() {
    const dialog = document.getElementById('deadline-dialog');
    const form = dialog?.querySelector('#deadline-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.academics.addDeadline({
        courseCode: document.getElementById('deadline-course-select').value,
        title: document.getElementById('deadline-title').value,
        dueDate: document.getElementById('deadline-due-date').value,
        type: document.getElementById('deadline-type').value,
        priority: document.getElementById('deadline-priority').value,
        weight: document.getElementById('deadline-weight').value
      });
      dialog.close();
    });
  }

  // --- Due Modal ---
  openDueModal() {
    const dialog = document.getElementById('due-dialog');
    const form = dialog?.querySelector('#due-form');
    form?.reset();
    const d = new Date();
    d.setDate(d.getDate() + 14);
    const dateInput = dialog?.querySelector('#due-input-date');
    if (dateInput) dateInput.value = d.toISOString().split('T')[0];

    dialog?.showModal();
  }

  bindDueModal() {
    const dialog = document.getElementById('due-dialog');
    const form = dialog?.querySelector('#due-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.academics.addDue({
        title: document.getElementById('due-input-title').value,
        category: document.getElementById('due-input-category').value,
        amount: document.getElementById('due-input-amount').value,
        currency: document.getElementById('due-input-currency').value,
        dueDate: document.getElementById('due-input-date').value,
        institution: document.getElementById('due-input-inst').value,
        notes: document.getElementById('due-input-notes').value
      });
      dialog.close();
    });
  }

  // --- Note Modal ---
  openNoteModal() {
    const dialog = document.getElementById('note-dialog');
    const select = dialog?.querySelector('#note-course-select');
    if (select) {
      const courses = this.academics.getAcademics().courses || [];
      select.innerHTML = '<option value="General">General / Cross-Disciplinary</option>' +
        courses.map(c => `<option value="${c.code}">${c.code} - ${c.name}</option>`).join('');
    }
    dialog?.querySelector('#note-form')?.reset();
    dialog?.showModal();
  }

  bindNoteModal() {
    const dialog = document.getElementById('note-dialog');
    const form = dialog?.querySelector('#note-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const tagsRaw = document.getElementById('note-tags').value;
      const tags = tagsRaw.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);

      const fileInput = document.getElementById('note-attachment-file');
      let attachment = null;
      if (fileInput?.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const isPdf = file.name.endsWith('.pdf');
        attachment = {
          name: file.name,
          type: isPdf ? 'pdf' : 'image',
          size: `${(file.size / 1024).toFixed(0)} KB`,
          previewUrl: isPdf ? null : URL.createObjectURL(file)
        };
      }

      this.academics.addNote({
        title: document.getElementById('note-title').value,
        courseCode: document.getElementById('note-course-select').value,
        folder: document.getElementById('note-folder-select').value,
        tags: tags.length ? tags : ['Study'],
        content: document.getElementById('note-content').value,
        attachment
      });

      dialog.close();
    });
  }

  // --- Note Preview Modal ---
  openNotePreviewModal(note) {
    const dialog = document.getElementById('note-preview-dialog');
    if (!dialog) return;

    dialog.querySelector('#preview-note-title').textContent = note.title;
    dialog.querySelector('#preview-note-course').textContent = note.courseCode;
    dialog.querySelector('#preview-note-folder').textContent = `📁 ${note.folder}`;
    dialog.querySelector('#preview-note-date').textContent = `🗓️ ${note.date}`;

    // Render markdown-like content cleanly
    const contentMount = dialog.querySelector('#preview-note-body');
    const parsed = note.content
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '<br><br>');
    contentMount.innerHTML = parsed;

    // Attachment section
    const attachMount = dialog.querySelector('#preview-note-attachment');
    if (note.attachment) {
      if (note.attachment.type === 'image' && note.attachment.previewUrl) {
        attachMount.innerHTML = `
          <div class="note-attached-image-view">
            <span class="attach-label">🖼️ Attached Diagram / Image (${note.attachment.name}):</span>
            <img src="${note.attachment.previewUrl}" alt="Note attachment" class="full-note-img" />
          </div>
        `;
      } else {
        attachMount.innerHTML = `
          <div class="note-attached-doc-view">
            <span class="doc-icon">📕</span>
            <div>
              <strong>${note.attachment.name}</strong> (${note.attachment.size})
              <p class="doc-hint">Native PDF Document • Secured in browser memory</p>
            </div>
            <button class="btn btn-secondary btn-xs" onclick="alert('Viewing PDF document in sandbox...')">Open PDF</button>
          </div>
        `;
      }
      attachMount.style.display = 'block';
    } else {
      attachMount.style.display = 'none';
      attachMount.innerHTML = '';
    }

    dialog.showModal();
  }

  // --- Auth & Account Modal ---
  openAuthModal() {
    const dialog = document.getElementById('auth-dialog');
    if (!dialog) return;

    const users = storage.getUsers();
    const usersMount = dialog.querySelector('#auth-existing-users-list');
    if (usersMount) {
      usersMount.innerHTML = users.map(u => `
        <div class="user-switch-item ${u.id === storage.activeUserId ? 'active-user' : ''}" data-id="${u.id}">
          <img src="${u.avatar}" class="user-item-avatar" alt="${u.name}" />
          <div class="user-item-info">
            <span class="user-item-name">${u.name} ${u.id === storage.activeUserId ? '(Active)' : ''}</span>
            <span class="user-item-email">${u.email}</span>
          </div>
          ${u.id !== storage.activeUserId ? `
            <button class="btn btn-secondary btn-xs btn-switch-user" data-id="${u.id}">Switch</button>
          ` : ''}
        </div>
      `).join('');

      usersMount.querySelectorAll('.btn-switch-user').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          storage.activeUserId = id;
          storage.currentUser = storage.getUsers().find(u => u.id === id);
          localStorage.setItem('zenith_active_user_id', id);
          storage.loadActiveUserState();
          storage.notifyListeners();
          this.updateUserHeader();
          this.switchView(this.currentView);
          this.showToast(`Switched account to ${storage.currentUser.name}`, 'success');
          dialog.close();
        });
      });
    }

    dialog.showModal();
  }

  bindAuthModal() {
    const dialog = document.getElementById('auth-dialog');
    if (!dialog) return;

    // Login Form
    dialog.querySelector('#auth-login-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-login-email').value;
      const pass = document.getElementById('auth-login-password').value;
      const res = storage.login(email, pass);
      if (res.success) {
        this.updateUserHeader();
        this.switchView(this.currentView);
        this.showToast(`Welcome back, ${res.user.name}!`, 'success');
        dialog.close();
      } else {
        this.showToast(res.message, 'error');
      }
    });

    // Sign Up Form
    dialog.querySelector('#auth-signup-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('auth-signup-name').value;
      const email = document.getElementById('auth-signup-email').value;
      const pass = document.getElementById('auth-signup-password').value;
      const res = storage.signUp(name, email, pass);
      if (res.success) {
        this.updateUserHeader();
        this.switchView('overview');
        this.showToast(`Account created for ${res.user.name}!`, 'success');
        dialog.close();
      } else {
        this.showToast(res.message, 'error');
      }
    });

    // 1-Click Demo Login
    dialog.querySelector('#btn-auth-demo-instant')?.addEventListener('click', () => {
      const res = storage.loginDemo();
      if (res.success) {
        this.updateUserHeader();
        this.switchView(this.currentView);
        this.showToast(`Loaded demo session for Alex Chen!`, 'success');
        dialog.close();
      }
    });

    // Forgot Password simulation
    dialog.querySelector('#btn-forgot-password')?.addEventListener('click', () => {
      const email = prompt('Enter your registered email address for password reset instructions:');
      if (email) {
        this.showToast(`Reset link simulated for ${email}. (Demo password is "demo123")`, 'info');
      }
    });
  }

  // --- Toast Notification System ---
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    const icons = { success: '✓', error: '⚠️', info: '💡' };
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || '•'}</span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }
}

// Instantiate and attach globally
window.addEventListener('DOMContentLoaded', () => {
  window.zenith = new ZenithApp();
});
