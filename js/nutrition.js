/**
 * Zenith Life & Wellness OS - Food, Calorie & Nutrition Tracker
 */

import { storage } from './storage.js';
import { sound } from './audio.js';
import { FOOD_DATABASE, PHOTO_SAMPLE_PRESETS } from './data.js';

export class NutritionTracker {
  constructor(app) {
    this.app = app;
    this.activeMealFilter = 'All';
  }

  getLogs() {
    return (storage.state.nutrition && storage.state.nutrition.logs) || [];
  }

  getWater() {
    return (storage.state.nutrition && storage.state.nutrition.waterMl) || 0;
  }

  getGoals() {
    return {
      calories: storage.state.settings.dailyCalorieGoal || 2150,
      protein: storage.state.settings.dailyProteinGoal || 135,
      carbs: storage.state.settings.dailyCarbsGoal || 220,
      fat: storage.state.settings.dailyFatGoal || 65,
      fiber: storage.state.settings.dailyFiberGoal || 32,
      sodium: storage.state.settings.dailySodiumMax || 2200,
      water: storage.state.settings.dailyWaterGoal || 2500
    };
  }

  calculateTotals() {
    const logs = this.getLogs();
    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sodium: 0
    };

    logs.forEach(item => {
      totals.calories += Number(item.calories || 0);
      totals.protein += Number(item.protein || 0);
      totals.carbs += Number(item.carbs || 0);
      totals.fat += Number(item.fat || 0);
      totals.fiber += Number(item.fiber || 0);
      totals.sodium += Number(item.sodium || 0);
    });

    return totals;
  }

  addFoodLog(entry) {
    const newLog = {
      id: 'meal_' + Date.now(),
      mealType: entry.mealType || 'Breakfast',
      name: entry.name.trim(),
      portion: entry.portion || '1 serving',
      calories: Math.round(Number(entry.calories) || 0),
      protein: Math.round(Number(entry.protein) || 0),
      carbs: Math.round(Number(entry.carbs) || 0),
      fat: Math.round(Number(entry.fat) || 0),
      fiber: Math.round(Number(entry.fiber) || 0),
      sodium: Math.round(Number(entry.sodium) || 0),
      isEstimate: Boolean(entry.isEstimate),
      confidence: entry.confidence ? Math.round(entry.confidence) : null,
      source: entry.source || 'Manual',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    if (!storage.state.nutrition.logs) {
      storage.state.nutrition.logs = [];
    }

    storage.state.nutrition.logs.push(newLog);
    storage.saveState();
    sound.playPop();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Logged "${newLog.name}" (${newLog.calories} kcal)`, 'success');
    return newLog;
  }

  removeFoodLog(logId) {
    const logs = this.getLogs();
    const item = logs.find(l => l.id === logId);
    storage.state.nutrition.logs = logs.filter(l => l.id !== logId);
    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Removed ${item ? item.name : 'item'}`, 'info');
  }

  updateWater(deltaMl) {
    let current = this.getWater();
    if (deltaMl === 'reset') {
      current = 0;
    } else {
      current = Math.max(0, current + deltaMl);
    }
    storage.state.nutrition.waterMl = current;
    storage.saveState();
    sound.playWaterSip();
    this.renderWaterSection();
    this.app.renderOverview();
  }

  render() {
    const container = document.getElementById('nutrition-view-content');
    if (!container) return;

    const totals = this.calculateTotals();
    const goals = this.getGoals();
    const remainingCalories = goals.calories - totals.calories;
    const calPercentage = Math.min(100, Math.round((totals.calories / goals.calories) * 100));

    const proteinPct = Math.min(100, Math.round((totals.protein / goals.protein) * 100));
    const carbsPct = Math.min(100, Math.round((totals.carbs / goals.carbs) * 100));
    const fatPct = Math.min(100, Math.round((totals.fat / goals.fat) * 100));
    const fiberPct = Math.min(100, Math.round((totals.fiber / goals.fiber) * 100));
    const sodiumPct = Math.min(100, Math.round((totals.sodium / goals.sodium) * 100));

    const logs = this.getLogs();

    let html = `
      <!-- Mobile Quick Action Banner -->
      <div class="nutrition-quick-bar glass-panel">
        <div class="quick-bar-left">
          <span class="quick-badge">Quick Log</span>
          <span class="quick-hint">Choose logging method:</span>
        </div>
        <div class="quick-bar-buttons">
          <button class="btn btn-primary btn-sm" id="btn-quick-search-food">
            🔍 Search Food
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-quick-photo-food">
            📷 Photo Scan (Est.)
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-quick-manual-food">
            ✍️ Custom Entry
          </button>
        </div>
      </div>

      <!-- Macro and Calorie Progress Dashboard -->
      <div class="nutrition-overview-grid">
        <!-- Calorie Ring Card -->
        <div class="calorie-summary-card glass-panel">
          <div class="calorie-card-header">
            <h3>Daily Energy Balance</h3>
            <span class="card-tag">Goal: ${goals.calories} kcal</span>
          </div>

          <div class="calorie-ring-wrapper">
            <svg class="calorie-svg-ring" viewBox="0 0 160 160">
              <circle class="ring-bg" cx="80" cy="80" r="68"></circle>
              <circle class="ring-fg" cx="80" cy="80" r="68"
                      stroke-dasharray="427.25"
                      stroke-dashoffset="${427.25 - (427.25 * calPercentage) / 100}"></circle>
            </svg>
            <div class="calorie-ring-center">
              <span class="ring-number">${totals.calories}</span>
              <span class="ring-label">Consumed (kcal)</span>
              <span class="ring-remaining ${remainingCalories < 0 ? 'text-danger' : ''}">
                ${remainingCalories >= 0 ? `${remainingCalories} remaining` : `${Math.abs(remainingCalories)} over goal`}
              </span>
            </div>
          </div>

          <div class="calorie-footer-stats">
            <div class="cal-mini-stat">
              <span class="mini-lbl">Base Goal</span>
              <span class="mini-val">${goals.calories}</span>
            </div>
            <div class="cal-mini-stat">
              <span class="mini-lbl">Logged</span>
              <span class="mini-val text-emerald">${totals.calories}</span>
            </div>
            <div class="cal-mini-stat">
              <span class="mini-lbl">Progress</span>
              <span class="mini-val">${calPercentage}%</span>
            </div>
          </div>
        </div>

        <!-- Macronutrients & Micronutrients Breakdown -->
        <div class="macros-summary-card glass-panel">
          <div class="macros-header">
            <h3>Macronutrients</h3>
            <span class="card-tag">Target Ratios</span>
          </div>

          <div class="macro-bars-list">
            <!-- Protein -->
            <div class="macro-bar-item">
              <div class="macro-bar-info">
                <span class="macro-name text-protein">🥩 Protein</span>
                <span class="macro-stat"><strong>${totals.protein}g</strong> / ${goals.protein}g (${proteinPct}%)</span>
              </div>
              <div class="progress-bar-track">
                <div class="progress-bar-fill progress-protein" style="width: ${proteinPct}%;"></div>
              </div>
            </div>

            <!-- Carbohydrates -->
            <div class="macro-bar-item">
              <div class="macro-bar-info">
                <span class="macro-name text-carbs">🌾 Carbohydrates</span>
                <span class="macro-stat"><strong>${totals.carbs}g</strong> / ${goals.carbs}g (${carbsPct}%)</span>
              </div>
              <div class="progress-bar-track">
                <div class="progress-bar-fill progress-carbs" style="width: ${carbsPct}%;"></div>
              </div>
            </div>

            <!-- Healthy Fats -->
            <div class="macro-bar-item">
              <div class="macro-bar-info">
                <span class="macro-name text-fats">🥑 Healthy Fats</span>
                <span class="macro-stat"><strong>${totals.fat}g</strong> / ${goals.fat}g (${fatPct}%)</span>
              </div>
              <div class="progress-bar-track">
                <div class="progress-bar-fill progress-fats" style="width: ${fatPct}%;"></div>
              </div>
            </div>
          </div>

          <!-- Micronutrients row -->
          <div class="micros-divider"></div>
          <div class="micros-grid">
            <div class="micro-badge">
              <span class="micro-title">🌾 Dietary Fiber</span>
              <span class="micro-val"><strong>${totals.fiber}g</strong> / ${goals.fiber}g</span>
              <div class="progress-bar-track mini-track">
                <div class="progress-bar-fill progress-fiber" style="width: ${fiberPct}%;"></div>
              </div>
            </div>
            <div class="micro-badge">
              <span class="micro-title">🧂 Sodium Limit</span>
              <span class="micro-val"><strong>${totals.sodium}mg</strong> / ${goals.sodium}mg</span>
              <div class="progress-bar-track mini-track">
                <div class="progress-bar-fill ${totals.sodium > goals.sodium ? 'progress-danger' : 'progress-amber'}" style="width: ${sodiumPct}%;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Water Tracker Card -->
      <div id="water-tracker-mount"></div>

      <!-- Transparency & Medical Disclaimer Banner -->
      <div class="transparency-disclaimer-banner glass-panel">
        <div class="disclaimer-icon">ℹ️</div>
        <div class="disclaimer-content">
          <h4>Nutritional Estimation Transparency & Medical Disclaimer</h4>
          <p>
            Photo-based recognition and visual portion tools calculate <strong>approximate estimations</strong> using geometric volume heuristics. Actual calories and micronutrient bioavailability vary significantly by ingredients, cooking oils, and individual metabolisms. These metrics are designed for personal habit awareness and are <strong>not medically precise</strong>. Always adjust portion sizes and ingredients to reflect your exact meal.
          </p>
        </div>
      </div>

      <!-- Meals Logged Timeline -->
      <div class="meals-timeline-section">
        <div class="timeline-header">
          <h3>Today's Food Journal</h3>
          <div class="meal-filter-tabs">
            ${['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'].map(m => `
              <button class="meal-tab-btn ${this.activeMealFilter === m ? 'active' : ''}" data-meal="${m}">${m}</button>
            `).join('')}
          </div>
        </div>

        <div class="meals-list" id="meals-list-container">
          ${this.renderMealsList(logs)}
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.renderWaterSection();
    this.attachEventListeners();
  }

  renderWaterSection() {
    const mount = document.getElementById('water-tracker-mount');
    if (!mount) return;

    const currentMl = this.getWater();
    const goalMl = this.getGoals().water;
    const pct = Math.min(100, Math.round((currentMl / goalMl) * 100));

    mount.innerHTML = `
      <div class="water-card glass-panel">
        <div class="water-info">
          <div class="water-header">
            <span class="water-icon">💧</span>
            <div>
              <h4>Hydration Target</h4>
              <p class="water-sub">${currentMl} ml of ${goalMl} ml daily goal (${pct}%)</p>
            </div>
          </div>
          <div class="progress-bar-track water-track">
            <div class="progress-bar-fill progress-water" style="width: ${pct}%;"></div>
          </div>
        </div>
        <div class="water-actions">
          <button class="btn btn-outline btn-sm" id="btn-add-water-250">+250 ml</button>
          <button class="btn btn-outline btn-sm" id="btn-add-water-500">+500 ml</button>
          <button class="btn btn-subtle btn-sm" id="btn-reset-water" title="Reset water intake">↺</button>
        </div>
      </div>
    `;

    mount.querySelector('#btn-add-water-250')?.addEventListener('click', () => this.updateWater(250));
    mount.querySelector('#btn-add-water-500')?.addEventListener('click', () => this.updateWater(500));
    mount.querySelector('#btn-reset-water')?.addEventListener('click', () => {
      if (confirm('Reset today\'s logged water to 0ml?')) this.updateWater('reset');
    });
  }

  renderMealsList(logs) {
    const filtered = this.activeMealFilter === 'All'
      ? logs
      : logs.filter(l => l.mealType === this.activeMealFilter);

    if (filtered.length === 0) {
      return `
        <div class="empty-state glass-panel">
          <div class="empty-icon">🥗</div>
          <h4>No meals logged ${this.activeMealFilter !== 'All' ? `for ${this.activeMealFilter}` : 'today'}</h4>
          <p>Tap "Search Food" or "Photo Scan" above to log what you nourish your body with.</p>
        </div>
      `;
    }

    return filtered.map(item => `
      <div class="meal-log-card glass-panel" data-id="${item.id}">
        <div class="meal-type-pill pill-${item.mealType.toLowerCase()}">${item.mealType}</div>
        <div class="meal-main-info">
          <div class="meal-title-row">
            <span class="meal-name">${item.name}</span>
            ${item.isEstimate ? `
              <span class="estimate-tag" title="Visual estimate with ${item.confidence || 85}% algorithmic confidence">
                📷 Est. ${item.confidence ? `${item.confidence}%` : ''}
              </span>
            ` : ''}
          </div>
          <div class="meal-meta-row">
            <span>⚖️ ${item.portion}</span>
            <span>🕒 ${item.time}</span>
            ${item.source ? `<span class="source-tag">${item.source}</span>` : ''}
          </div>
        </div>

        <div class="meal-macro-badges">
          <div class="macro-cell">
            <span class="lbl">KCAL</span>
            <span class="val text-emerald">${item.calories}</span>
          </div>
          <div class="macro-cell">
            <span class="lbl">P</span>
            <span class="val text-protein">${item.protein}g</span>
          </div>
          <div class="macro-cell">
            <span class="lbl">C</span>
            <span class="val text-carbs">${item.carbs}g</span>
          </div>
          <div class="macro-cell">
            <span class="lbl">F</span>
            <span class="val text-fats">${item.fat}g</span>
          </div>
        </div>

        <button class="btn-icon btn-delete-meal" data-id="${item.id}" title="Remove entry">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    `).join('');
  }

  attachEventListeners() {
    const container = document.getElementById('nutrition-view-content');
    if (!container) return;

    // Quick action buttons
    container.querySelector('#btn-quick-search-food')?.addEventListener('click', () => {
      this.app.openFoodModal('search');
    });
    container.querySelector('#btn-quick-photo-food')?.addEventListener('click', () => {
      this.app.openFoodModal('photo');
    });
    container.querySelector('#btn-quick-manual-food')?.addEventListener('click', () => {
      this.app.openFoodModal('manual');
    });

    // Meal filter tabs
    container.querySelectorAll('.meal-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeMealFilter = e.currentTarget.dataset.meal;
        this.render();
      });
    });

    // Delete meal buttons
    container.querySelectorAll('.btn-delete-meal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.removeFoodLog(id);
      });
    });
  }
}
