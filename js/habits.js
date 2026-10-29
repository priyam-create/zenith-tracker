/**
 * Zenith Life & Wellness OS - Habit Tracker Controller
 */

import { storage } from './storage.js';
import { quotesEngine } from './quotes.js';
import { sound } from './audio.js';

export class HabitTracker {
  constructor(app) {
    this.app = app;
    this.selectedCategory = 'All';
    this.currentDate = new Date().toISOString().split('T')[0];
  }

  getHabits() {
    return storage.state.habits || [];
  }

  getFilteredHabits() {
    const habits = this.getHabits();
    if (this.selectedCategory === 'All') return habits;
    return habits.filter(h => h.category === this.selectedCategory);
  }

  getHabitCategories() {
    const habits = this.getHabits();
    const cats = new Set(['All']);
    habits.forEach(h => {
      if (h.category) cats.add(h.category);
    });
    return Array.from(cats);
  }

  toggleCheckIn(habitId, date = this.currentDate) {
    const habit = this.getHabits().find(h => h.id === habitId);
    if (!habit) return false;

    if (!habit.history) habit.history = {};
    const wasChecked = Boolean(habit.history[date]);
    const newState = !wasChecked;
    habit.history[date] = newState;

    // Recalculate streak
    this.recalculateStreaks(habit);

    storage.saveState();

    if (newState) {
      sound.playChime();
      this.triggerConfetti();
      // Rotate motivational thought on completion
      const newThought = quotesEngine.onHabitCheckIn();
      this.app.renderMotivationalBanner(newThought, true);
      this.app.showToast(`Completed: ${habit.name}! 🔥 ${habit.currentStreak} day streak`, 'success');
    } else {
      sound.playPop();
    }

    this.render();
    this.app.renderOverview();
    return true;
  }

  recalculateStreaks(habit) {
    const today = new Date();
    let currentStreak = 0;
    let checkDate = new Date(today);

    // If today is checked, start streak count.
    // If today is not checked yet, check if yesterday was checked (streak is still alive today).
    const todayStr = checkDate.toISOString().split('T')[0];
    if (habit.history[todayStr]) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    // Traverse backward continuously
    while (true) {
      const dStr = checkDate.toISOString().split('T')[0];
      if (habit.history[dStr]) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    habit.currentStreak = currentStreak;
    if (currentStreak > (habit.bestStreak || 0)) {
      habit.bestStreak = currentStreak;
    }
  }

  createHabit(habitData) {
    const newHabit = {
      id: 'hab_' + Date.now(),
      name: habitData.name.trim(),
      category: habitData.category || 'Productivity',
      icon: habitData.icon || '⭐',
      targetTime: habitData.targetTime || 'Anytime',
      frequency: habitData.frequency || 'Everyday',
      currentStreak: 0,
      bestStreak: 0,
      history: {}
    };

    if (habitData.checkedToday) {
      newHabit.history[this.currentDate] = true;
      newHabit.currentStreak = 1;
      newHabit.bestStreak = 1;
    }

    storage.state.habits.push(newHabit);
    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Habit "${newHabit.name}" created!`, 'success');
    return newHabit;
  }

  updateHabit(habitId, updatedData) {
    const habits = this.getHabits();
    const index = habits.findIndex(h => h.id === habitId);
    if (index === -1) return false;

    habits[index] = {
      ...habits[index],
      name: updatedData.name.trim(),
      category: updatedData.category || habits[index].category,
      icon: updatedData.icon || habits[index].icon,
      targetTime: updatedData.targetTime || habits[index].targetTime,
      frequency: updatedData.frequency || habits[index].frequency
    };

    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast('Habit updated successfully.', 'success');
    return true;
  }

  deleteHabit(habitId) {
    const habits = this.getHabits();
    const habit = habits.find(h => h.id === habitId);
    storage.state.habits = habits.filter(h => h.id !== habitId);
    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Removed habit: ${habit ? habit.name : ''}`, 'info');
  }

  getPastDates(daysCount = 7) {
    const list = [];
    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      list.push({
        dateStr: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: d.getDate(),
        isToday: i === 0
      });
    }
    return list;
  }

  calculateStats() {
    const habits = this.getHabits();
    if (habits.length === 0) {
      return { total: 0, completedToday: 0, percentage: 0, totalStreaks: 0, bestStreak: 0 };
    }

    const todayStr = this.currentDate;
    let completedToday = 0;
    let totalStreaks = 0;
    let bestStreak = 0;

    habits.forEach(h => {
      if (h.history && h.history[todayStr]) completedToday++;
      totalStreaks += h.currentStreak || 0;
      if ((h.bestStreak || 0) > bestStreak) bestStreak = h.bestStreak;
    });

    const percentage = Math.round((completedToday / habits.length) * 100);

    return {
      total: habits.length,
      completedToday,
      percentage,
      totalStreaks,
      bestStreak
    };
  }

  triggerConfetti() {
    const container = document.getElementById('confetti-canvas-container');
    if (!container) return;

    // Fast particle burst
    for (let i = 0; i < 28; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      const colors = ['#34d399', '#38bdf8', '#fbbf24', '#f43f5e', '#a78bfa', '#10b981'];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${50 + (Math.random() - 0.5) * 60}%`;
      particle.style.top = `${40 + (Math.random() - 0.5) * 30}%`;
      particle.style.setProperty('--dx', `${(Math.random() - 0.5) * 260}px`);
      particle.style.setProperty('--dy', `${(Math.random() - 0.5) * 260 - 80}px`);
      particle.style.setProperty('--dr', `${(Math.random() - 0.5) * 720}deg`);
      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1000);
    }
  }

  render() {
    const container = document.getElementById('habits-view-content');
    if (!container) return;

    const habits = this.getFilteredHabits();
    const categories = this.getHabitCategories();
    const past7Days = this.getPastDates(7);
    const stats = this.calculateStats();

    let html = `
      <!-- Stats & Summary Row -->
      <div class="stats-grid">
        <div class="stat-card glass-panel">
          <div class="stat-header">
            <span class="stat-title">Today's Completion</span>
            <span class="stat-icon">🎯</span>
          </div>
          <div class="stat-main">
            <div class="stat-value">${stats.percentage}%</div>
            <div class="stat-sub">${stats.completedToday} of ${stats.total} habits finished</div>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill progress-emerald" style="width: ${stats.percentage}%;"></div>
          </div>
        </div>

        <div class="stat-card glass-panel">
          <div class="stat-header">
            <span class="stat-title">Active Streaks</span>
            <span class="stat-icon">🔥</span>
          </div>
          <div class="stat-main">
            <div class="stat-value">${stats.totalStreaks} <span class="stat-unit">days</span></div>
            <div class="stat-sub">Combined active momentum</div>
          </div>
          <div class="stat-badge badge-streak">All systems active</div>
        </div>

        <div class="stat-card glass-panel">
          <div class="stat-header">
            <span class="stat-title">Personal Record</span>
            <span class="stat-icon">🏆</span>
          </div>
          <div class="stat-main">
            <div class="stat-value">${stats.bestStreak} <span class="stat-unit">days</span></div>
            <div class="stat-sub">Longest continuous consistency</div>
          </div>
          <div class="stat-badge badge-gold">Benchmark</div>
        </div>
      </div>

      <!-- Category Filter Pills and Add Action -->
      <div class="section-actions-bar">
        <div class="filter-pills" id="habit-category-pills">
          ${categories.map(cat => `
            <button class="pill-btn ${this.selectedCategory === cat ? 'active' : ''}" data-cat="${cat}">
              ${cat}
            </button>
          `).join('')}
        </div>
        <button class="btn btn-primary btn-sm" id="btn-open-create-habit">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          New Habit
        </button>
      </div>

      <!-- Quick 7-Day Calendar Strip Header -->
      <div class="habits-list-container glass-panel">
        <div class="habits-table-header">
          <div class="col-habit-info">Habit & Frequency</div>
          <div class="col-habit-days">
            ${past7Days.map(d => `
              <div class="day-header-cell ${d.isToday ? 'today-cell' : ''}">
                <span class="day-lbl">${d.dayName}</span>
                <span class="day-num">${d.dayNumber}</span>
              </div>
            `).join('')}
          </div>
          <div class="col-habit-streak">Streak</div>
          <div class="col-habit-actions"></div>
        </div>

        <!-- Habits List Body -->
        <div class="habits-list-body">
    `;

    if (habits.length === 0) {
      html += `
        <div class="empty-state">
          <div class="empty-icon">🌱</div>
          <h3>No habits in this category</h3>
          <p>Create your first habit to build atomic momentum daily.</p>
          <button class="btn btn-secondary btn-sm" id="btn-empty-create-habit">Create Habit</button>
        </div>
      `;
    } else {
      habits.forEach(habit => {
        const isTodayDone = Boolean(habit.history && habit.history[this.currentDate]);
        html += `
          <div class="habit-row ${isTodayDone ? 'row-completed' : ''}" data-id="${habit.id}">
            <div class="col-habit-info">
              <button class="habit-quick-check-btn ${isTodayDone ? 'checked' : ''}" data-id="${habit.id}" aria-label="Toggle ${habit.name}">
                <span class="habit-icon">${habit.icon}</span>
                <span class="check-indicator">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
              </button>
              <div class="habit-details">
                <span class="habit-name">${habit.name}</span>
                <div class="habit-meta">
                  <span class="habit-badge">${habit.category}</span>
                  <span class="habit-time">🕒 ${habit.targetTime}</span>
                  <span class="habit-freq">${habit.frequency}</span>
                </div>
              </div>
            </div>

            <!-- 7-Day Check-in Dots -->
            <div class="col-habit-days">
              ${past7Days.map(d => {
                const checked = Boolean(habit.history && habit.history[d.dateStr]);
                return `
                  <button class="day-dot-btn ${checked ? 'dot-active' : ''} ${d.isToday ? 'dot-today' : ''}"
                          data-id="${habit.id}" data-date="${d.dateStr}"
                          title="${habit.name} on ${d.dateStr}: ${checked ? 'Completed' : 'Missed'}">
                    ${checked ? '✓' : ''}
                  </button>
                `;
              }).join('')}
            </div>

            <div class="col-habit-streak">
              <div class="streak-badge ${habit.currentStreak > 0 ? 'streak-active' : 'streak-dormant'}">
                <span class="flame-icon">🔥</span>
                <span class="streak-num">${habit.currentStreak || 0}</span>
              </div>
              <span class="streak-best" title="Best streak">Best: ${habit.bestStreak || 0}d</span>
            </div>

            <div class="col-habit-actions">
              <button class="btn-icon btn-edit-habit" data-id="${habit.id}" title="Edit habit">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button class="btn-icon btn-delete-habit" data-id="${habit.id}" title="Delete habit">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        `;
      });
    }

    html += `
        </div>
      </div>

      <!-- Monthly Mini-Heatmap Consistency Grid -->
      <div class="heatmap-panel glass-panel">
        <div class="heatmap-header">
          <div>
            <h4 class="heatmap-title">30-Day Consistency Matrix</h4>
            <p class="heatmap-desc">Visual density of atomic routine execution</p>
          </div>
          <div class="heatmap-legend">
            <span>Less</span>
            <span class="legend-box level-0"></span>
            <span class="legend-box level-1"></span>
            <span class="legend-box level-2"></span>
            <span class="legend-box level-3"></span>
            <span class="legend-box level-4"></span>
            <span>More</span>
          </div>
        </div>
        <div class="heatmap-grid" id="habit-heatmap-grid">
          ${this.renderHeatmapBoxes(habits)}
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.attachEventListeners();
  }

  renderHeatmapBoxes(habits) {
    let boxes = '';
    const totalHabits = Math.max(1, habits.length);
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dStr = d.toISOString().split('T')[0];
      
      let doneCount = 0;
      habits.forEach(h => {
        if (h.history && h.history[dStr]) doneCount++;
      });

      const ratio = doneCount / totalHabits;
      let level = 0;
      if (doneCount > 0 && ratio <= 0.25) level = 1;
      else if (ratio > 0.25 && ratio <= 0.5) level = 2;
      else if (ratio > 0.5 && ratio <= 0.8) level = 3;
      else if (ratio > 0.8) level = 4;

      boxes += `
        <div class="heatmap-cell level-${level}" title="${dStr}: ${doneCount}/${totalHabits} habits (${Math.round(ratio * 100)}%)"></div>
      `;
    }
    return boxes;
  }

  attachEventListeners() {
    const container = document.getElementById('habits-view-content');
    if (!container) return;

    // Filter pills
    container.querySelectorAll('#habit-category-pills .pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.selectedCategory = e.currentTarget.dataset.cat;
        this.render();
      });
    });

    // Quick 1-tap check-in buttons
    container.querySelectorAll('.habit-quick-check-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.toggleCheckIn(id, this.currentDate);
      });
    });

    // 7-day dot clicks
    container.querySelectorAll('.day-dot-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const date = e.currentTarget.dataset.date;
        this.toggleCheckIn(id, date);
      });
    });

    // Create buttons
    const btnCreate = container.querySelector('#btn-open-create-habit');
    if (btnCreate) {
      btnCreate.addEventListener('click', () => this.app.openHabitModal());
    }
    const btnEmptyCreate = container.querySelector('#btn-empty-create-habit');
    if (btnEmptyCreate) {
      btnEmptyCreate.addEventListener('click', () => this.app.openHabitModal());
    }

    // Edit button
    container.querySelectorAll('.btn-edit-habit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const habit = this.getHabits().find(h => h.id === id);
        if (habit) this.app.openHabitModal(habit);
      });
    });

    // Delete button
    container.querySelectorAll('.btn-delete-habit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        if (confirm('Are you sure you want to remove this habit?')) {
          this.deleteHabit(id);
        }
      });
    });
  }
}
