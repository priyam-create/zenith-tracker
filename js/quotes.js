/**
 * Zenith Life & Wellness OS - Motivational Thoughts Engine
 * Delivers memorable, intense, thought-provoking philosophical reflections
 */

import { MOTIVATIONAL_THOUGHTS } from './data.js';

class QuotesEngine {
  constructor() {
    this.thoughts = MOTIVATIONAL_THOUGHTS;
    this.currentIndex = 0;
    this.historyIndices = [];
    this.init();
  }

  init() {
    // Pick an initial memorable quote
    const savedIdx = parseInt(sessionStorage.getItem('zenith_last_quote_idx'), 10);
    if (!isNaN(savedIdx) && savedIdx >= 0 && savedIdx < this.thoughts.length) {
      this.currentIndex = savedIdx;
    } else {
      this.currentIndex = Math.floor(Math.random() * this.thoughts.length);
      sessionStorage.setItem('zenith_last_quote_idx', this.currentIndex);
    }
    this.historyIndices.push(this.currentIndex);
  }

  getCurrent() {
    return this.thoughts[this.currentIndex] || this.thoughts[0];
  }

  nextThought() {
    if (this.thoughts.length <= 1) return this.getCurrent();

    let candidate = Math.floor(Math.random() * this.thoughts.length);
    // Avoid repeating last 4 quotes if pool allows
    let attempts = 0;
    while (this.historyIndices.slice(-4).includes(candidate) && attempts < 15) {
      candidate = Math.floor(Math.random() * this.thoughts.length);
      attempts++;
    }

    this.currentIndex = candidate;
    this.historyIndices.push(candidate);
    if (this.historyIndices.length > 20) {
      this.historyIndices.shift();
    }
    sessionStorage.setItem('zenith_last_quote_idx', this.currentIndex);
    return this.getCurrent();
  }

  onHabitCheckIn() {
    return this.nextThought();
  }
}

export const quotesEngine = new QuotesEngine();
