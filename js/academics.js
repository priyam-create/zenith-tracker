/**
 * Zenith Life & Wellness OS - Academic Dashboard & Knowledge Repository
 */

import { storage } from './storage.js';
import { sound } from './audio.js';

export class AcademicDashboard {
  constructor(app) {
    this.app = app;
    this.activeTab = 'courses'; // 'courses' | 'deadlines' | 'dues' | 'notes'
    this.notesSearchQuery = '';
    this.notesSelectedFolder = 'All';
    this.notesSelectedCourse = 'All';
  }

  getAcademics() {
    return storage.state.academics || { courses: [], deadlines: [], todos: [], dues: [], notes: [] };
  }

  calculateGpa() {
    const courses = this.getAcademics().courses || [];
    if (courses.length === 0) return { gpa: '0.00', totalCredits: 0 };

    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(c => {
      const credits = Number(c.credits) || 3;
      const points = gradePoints[c.currentGrade] !== undefined ? gradePoints[c.currentGrade] : 3.5;
      totalPoints += points * credits;
      totalCredits += credits;
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    return { gpa, totalCredits };
  }

  // --- Course Operations ---
  addCourse(course) {
    const academics = this.getAcademics();
    const newCourse = {
      id: 'crs_' + Date.now(),
      code: course.code.trim().toUpperCase(),
      name: course.name.trim(),
      professor: course.professor || 'Faculty Lead',
      credits: Number(course.credits) || 3,
      currentGrade: course.currentGrade || 'A',
      gradePercentage: Number(course.gradePercentage) || 92,
      color: course.color || '#34d399',
      schedule: course.schedule || 'TBA',
      location: course.location || 'Campus Center'
    };

    academics.courses.push(newCourse);
    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Enrolled in ${newCourse.code}`, 'success');
  }

  deleteCourse(courseId) {
    const academics = this.getAcademics();
    academics.courses = academics.courses.filter(c => c.id !== courseId);
    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast('Course removed.', 'info');
  }

  // --- Deadline & Task Operations ---
  addDeadline(deadline) {
    const academics = this.getAcademics();
    const newDl = {
      id: 'dl_' + Date.now(),
      courseCode: deadline.courseCode,
      title: deadline.title.trim(),
      dueDate: deadline.dueDate,
      type: deadline.type || 'Assignment',
      priority: deadline.priority || 'Medium',
      completed: false,
      weight: deadline.weight || '10%'
    };

    academics.deadlines.push(newDl);
    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Deadline added: ${newDl.title}`, 'success');
  }

  toggleDeadline(id) {
    const dl = (this.getAcademics().deadlines || []).find(d => d.id === id);
    if (!dl) return;
    dl.completed = !dl.completed;
    storage.saveState();
    if (dl.completed) sound.playChime();
    else sound.playPop();
    this.render();
    this.app.renderOverview();
  }

  deleteDeadline(id) {
    const academics = this.getAcademics();
    academics.deadlines = academics.deadlines.filter(d => d.id !== id);
    storage.saveState();
    this.render();
    this.app.renderOverview();
  }

  // --- To-Do Operations ---
  addTodo(title, course = 'General') {
    if (!title.trim()) return;
    const academics = this.getAcademics();
    academics.todos.push({
      id: 'td_' + Date.now(),
      title: title.trim(),
      course: course,
      dueDate: new Date().toISOString().split('T')[0],
      completed: false
    });
    storage.saveState();
    this.render();
    this.app.renderOverview();
  }

  toggleTodo(id) {
    const td = (this.getAcademics().todos || []).find(t => t.id === id);
    if (!td) return;
    td.completed = !td.completed;
    storage.saveState();
    if (td.completed) sound.playChime();
    else sound.playPop();
    this.render();
  }

  deleteTodo(id) {
    const academics = this.getAcademics();
    academics.todos = academics.todos.filter(t => t.id !== id);
    storage.saveState();
    this.render();
  }

  // --- Dues & Payments Operations ---
  addDue(dueData) {
    const academics = this.getAcademics();
    const newDue = {
      id: 'due_' + Date.now(),
      title: dueData.title.trim(),
      category: dueData.category || 'Tuition',
      amount: Number(dueData.amount) || 0,
      currency: dueData.currency || '$',
      dueDate: dueData.dueDate,
      status: dueData.status || 'Pending',
      institution: dueData.institution || 'University Bursar',
      notes: dueData.notes || ''
    };

    academics.dues.push(newDue);
    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Recorded fee: ${newDue.title}`, 'success');
  }

  markDuePaid(id) {
    const due = (this.getAcademics().dues || []).find(d => d.id === id);
    if (!due) return;
    due.status = 'Paid';
    storage.saveState();
    sound.playChime();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Marked ${due.title} as Paid!`, 'success');
  }

  deleteDue(id) {
    const academics = this.getAcademics();
    academics.dues = academics.dues.filter(d => d.id !== id);
    storage.saveState();
    this.render();
    this.app.renderOverview();
  }

  // --- Notes Library Operations ---
  addNote(noteData) {
    const academics = this.getAcademics();
    const newNote = {
      id: 'note_' + Date.now(),
      title: noteData.title.trim(),
      courseCode: noteData.courseCode || 'General',
      folder: noteData.folder || 'Lecture Notes',
      tags: noteData.tags || ['Study'],
      date: new Date().toISOString().split('T')[0],
      content: noteData.content || '',
      attachment: noteData.attachment || null
    };

    academics.notes.unshift(newNote);
    storage.saveState();
    this.render();
    this.app.showToast(`Saved note: "${newNote.title}"`, 'success');
    return newNote;
  }

  deleteNote(id) {
    const academics = this.getAcademics();
    academics.notes = academics.notes.filter(n => n.id !== id);
    storage.saveState();
    this.render();
    this.app.showToast('Note deleted.', 'info');
  }

  getFilteredNotes() {
    const notes = this.getAcademics().notes || [];
    const query = this.notesSearchQuery.trim().toLowerCase();

    return notes.filter(note => {
      // Folder filter
      if (this.notesSelectedFolder !== 'All' && note.folder !== this.notesSelectedFolder) {
        return false;
      }
      // Course filter
      if (this.notesSelectedCourse !== 'All' && note.courseCode !== this.notesSelectedCourse) {
        return false;
      }
      // Search query
      if (query) {
        const inTitle = note.title.toLowerCase().includes(query);
        const inCourse = note.courseCode.toLowerCase().includes(query);
        const inFolder = note.folder.toLowerCase().includes(query);
        const inContent = note.content.toLowerCase().includes(query);
        const inTags = (note.tags || []).some(t => t.toLowerCase().includes(query));
        return inTitle || inCourse || inFolder || inContent || inTags;
      }
      return true;
    });
  }

  render() {
    const container = document.getElementById('academics-view-content');
    if (!container) return;

    const { gpa, totalCredits } = this.calculateGpa();
    const academics = this.getAcademics();

    let html = `
      <!-- Academic Top Banner & Sub-Tabs -->
      <div class="academics-header-card glass-panel">
        <div class="academic-brand-col">
          <div class="gpa-badge-box">
            <span class="gpa-score">${gpa}</span>
            <div class="gpa-meta">
              <span class="gpa-lbl">Cumulative GPA</span>
              <span class="gpa-credits">${totalCredits} Enrolled Credits</span>
            </div>
          </div>
          <div class="academic-stats-mini">
            <span class="stat-pill">📚 ${academics.courses.length} Active Courses</span>
            <span class="stat-pill">⏳ ${academics.deadlines.filter(d => !d.completed).length} Upcoming Deadlines</span>
            <span class="stat-pill">📂 ${academics.notes.length} Knowledge Files</span>
          </div>
        </div>

        <!-- Academic Module Navigation Tabs -->
        <div class="academic-subnav-tabs">
          <button class="subnav-tab ${this.activeTab === 'courses' ? 'active' : ''}" data-tab="courses">
            📖 Courses & Records
          </button>
          <button class="subnav-tab ${this.activeTab === 'deadlines' ? 'active' : ''}" data-tab="deadlines">
            ⏳ Deadlines & To-Dos
          </button>
          <button class="subnav-tab ${this.activeTab === 'dues' ? 'active' : ''}" data-tab="dues">
            💳 Dues & Payments
          </button>
          <button class="subnav-tab ${this.activeTab === 'notes' ? 'active' : ''}" data-tab="notes">
            📑 Notes & Documents
          </button>
        </div>
      </div>

      <!-- Tab Content Mount -->
      <div class="academic-tab-body">
    `;

    if (this.activeTab === 'courses') {
      html += this.renderCoursesTab();
    } else if (this.activeTab === 'deadlines') {
      html += this.renderDeadlinesTab();
    } else if (this.activeTab === 'dues') {
      html += this.renderDuesTab();
    } else if (this.activeTab === 'notes') {
      html += this.renderNotesTab();
    }

    html += `</div>`;
    container.innerHTML = html;
    this.attachEventListeners();
  }

  renderCoursesTab() {
    const courses = this.getAcademics().courses || [];
    return `
      <div class="section-actions-bar">
        <div>
          <h3>Course Enrollment & Academic Standings</h3>
          <p class="section-subtitle">Real-time GPA projection and syllabus records</p>
        </div>
        <button class="btn btn-primary btn-sm" id="btn-open-add-course">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add Course
        </button>
      </div>

      <div class="courses-grid">
        ${courses.length === 0 ? `
          <div class="empty-state glass-panel">
            <div class="empty-icon">🎓</div>
            <h4>No courses enrolled yet</h4>
            <p>Add your semester subjects to calculate cumulative GPA and track assignments.</p>
          </div>
        ` : courses.map(c => `
          <div class="course-card glass-panel" style="border-top: 4px solid ${c.color}">
            <div class="course-card-top">
              <span class="course-code-pill" style="background: ${c.color}22; color: ${c.color}">
                ${c.code}
              </span>
              <div class="grade-pill">
                <span class="grade-letter">${c.currentGrade}</span>
                <span class="grade-pct">${c.gradePercentage}%</span>
              </div>
            </div>

            <h4 class="course-title">${c.name}</h4>
            <div class="course-instructor">👨‍🏫 ${c.professor}</div>

            <div class="course-schedule-row">
              <span>🗓️ ${c.schedule}</span>
              <span>📍 ${c.location}</span>
            </div>

            <div class="course-card-footer">
              <span class="credits-badge">${c.credits} Credits</span>
              <button class="btn-icon btn-delete-course" data-id="${c.id}" title="Remove course">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderDeadlinesTab() {
    const academics = this.getAcademics();
    const deadlines = academics.deadlines || [];
    const todos = academics.todos || [];

    // Sort deadlines: pending first, then by date
    const sortedDeadlines = [...deadlines].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    return `
      <div class="deadlines-container-grid">
        <!-- Main Deadlines Column -->
        <div class="deadlines-main-col glass-panel">
          <div class="section-actions-bar">
            <div>
              <h3>Major Academic Deadlines</h3>
              <p class="section-subtitle">Exams, problem sets, and milestones</p>
            </div>
            <button class="btn btn-primary btn-sm" id="btn-open-add-deadline">
              + New Deadline
            </button>
          </div>

          <div class="deadlines-list">
            ${sortedDeadlines.length === 0 ? `
              <div class="empty-state">
                <div class="empty-icon">🎉</div>
                <h4>Zero pending deadlines</h4>
                <p>Enjoy your downtime or prepare ahead for upcoming exams.</p>
              </div>
            ` : sortedDeadlines.map(d => {
              const daysLeft = Math.ceil((new Date(d.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
              let urgencyClass = 'badge-normal';
              let countdownText = `${daysLeft} days left`;
              if (daysLeft < 0) {
                urgencyClass = 'badge-overdue';
                countdownText = 'Overdue';
              } else if (daysLeft === 0) {
                urgencyClass = 'badge-urgent';
                countdownText = 'Due Today!';
              } else if (daysLeft <= 2) {
                urgencyClass = 'badge-urgent';
                countdownText = `In ${daysLeft} days`;
              }

              return `
                <div class="deadline-item ${d.completed ? 'deadline-done' : ''}" data-id="${d.id}">
                  <button class="checkbox-circle ${d.completed ? 'checked' : ''}" data-id="${d.id}" aria-label="Mark completed">
                    ${d.completed ? '✓' : ''}
                  </button>
                  <div class="deadline-body">
                    <div class="deadline-title-line">
                      <span class="deadline-name">${d.title}</span>
                      <span class="course-mini-tag">${d.courseCode}</span>
                    </div>
                    <div class="deadline-meta-line">
                      <span class="countdown-badge ${urgencyClass}">${countdownText}</span>
                      <span>📅 Due: ${d.dueDate}</span>
                      <span class="weight-badge">${d.weight}</span>
                      <span class="type-badge">${d.type}</span>
                    </div>
                  </div>
                  <button class="btn-icon btn-delete-deadline" data-id="${d.id}" title="Remove">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Academic To-Do List Sidebar -->
        <div class="todos-sidebar-col glass-panel">
          <div class="sidebar-header">
            <h4>Quick Academic Tasks</h4>
            <span class="badge-count">${todos.filter(t => !t.completed).length} pending</span>
          </div>

          <div class="add-todo-form">
            <input type="text" id="quick-todo-input" placeholder="Add study task..." class="form-input-sm" />
            <button class="btn btn-secondary btn-sm" id="btn-add-quick-todo">Add</button>
          </div>

          <div class="todos-list">
            ${todos.map(t => `
              <div class="todo-item ${t.completed ? 'todo-done' : ''}" data-id="${t.id}">
                <button class="todo-check-btn ${t.completed ? 'checked' : ''}" data-id="${t.id}">
                  ${t.completed ? '✓' : ''}
                </button>
                <div class="todo-info">
                  <span class="todo-text">${t.title}</span>
                  <span class="todo-sub">${t.course}</span>
                </div>
                <button class="btn-icon-subtle btn-delete-todo" data-id="${t.id}">×</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderDuesTab() {
    const dues = this.getAcademics().dues || [];
    const totalDues = dues.reduce((acc, d) => acc + Number(d.amount || 0), 0);
    const paidDues = dues.filter(d => d.status === 'Paid').reduce((acc, d) => acc + Number(d.amount || 0), 0);
    const pendingDues = totalDues - paidDues;

    return `
      <!-- Financial Summary Cards -->
      <div class="stats-grid">
        <div class="stat-card glass-panel">
          <div class="stat-header">
            <span class="stat-title">Pending Balance</span>
            <span class="stat-icon">💳</span>
          </div>
          <div class="stat-main">
            <div class="stat-value text-amber">$${pendingDues.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <div class="stat-sub">Outstanding dues requiring clearance</div>
          </div>
        </div>

        <div class="stat-card glass-panel">
          <div class="stat-header">
            <span class="stat-title">Total Paid to Date</span>
            <span class="stat-icon">✅</span>
          </div>
          <div class="stat-main">
            <div class="stat-value text-emerald">$${paidDues.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <div class="stat-sub">Tuition & campus fees resolved</div>
          </div>
        </div>

        <div class="stat-card glass-panel">
          <div class="stat-header">
            <span class="stat-title">Cumulative Records</span>
            <span class="stat-icon">📑</span>
          </div>
          <div class="stat-main">
            <div class="stat-value">$${totalDues.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <div class="stat-sub">${dues.length} total billing transactions</div>
          </div>
        </div>
      </div>

      <div class="section-actions-bar">
        <div>
          <h3>Tuition, Dues & Campus Payments</h3>
          <p class="section-subtitle">Keep your academic accounts in good financial standing</p>
        </div>
        <button class="btn btn-primary btn-sm" id="btn-open-add-due">
          + Record New Fee
        </button>
      </div>

      <div class="dues-table-card glass-panel">
        <div class="dues-list">
          ${dues.length === 0 ? `
            <div class="empty-state">
              <div class="empty-icon">🧾</div>
              <h4>No dues or payments recorded</h4>
              <p>Add tuition installments, lab deposits, or student association memberships.</p>
            </div>
          ` : dues.map(d => {
            const isPaid = d.status === 'Paid';
            return `
              <div class="due-item-row ${isPaid ? 'due-settled' : ''}" data-id="${d.id}">
                <div class="due-info-col">
                  <span class="due-title">${d.title}</span>
                  <div class="due-meta">
                    <span class="due-category-pill">${d.category}</span>
                    <span>🏛️ ${d.institution}</span>
                    <span>📅 Due: ${d.dueDate}</span>
                    ${d.notes ? `<span>📝 ${d.notes}</span>` : ''}
                  </div>
                </div>

                <div class="due-amount-col">
                  <span class="due-amount-value">${d.currency}${Number(d.amount).toFixed(2)}</span>
                  <span class="status-pill ${isPaid ? 'status-paid' : 'status-pending'}">
                    ${d.status}
                  </span>
                </div>

                <div class="due-actions-col">
                  ${!isPaid ? `
                    <button class="btn btn-emerald btn-sm btn-mark-due-paid" data-id="${d.id}">
                      ✓ Mark Paid
                    </button>
                  ` : `
                    <span class="receipt-stamp">Cleared</span>
                  `}
                  <button class="btn-icon btn-delete-due" data-id="${d.id}" title="Remove entry">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  renderNotesTab() {
    const notes = this.getFilteredNotes();
    const academics = this.getAcademics();
    const courses = academics.courses || [];

    const folders = ['All', 'Lecture Notes', 'Study Guides', 'Cheatsheets', 'Research'];
    const courseCodes = ['All', ...courses.map(c => c.code)];

    return `
      <!-- Search, Filter & Upload Bar -->
      <div class="notes-library-controls glass-panel">
        <div class="search-input-wrap">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="notes-search-input" placeholder="Search notes, tags, concepts, or courses..." value="${this.notesSearchQuery}" class="search-field" />
        </div>

        <div class="notes-filter-dropdowns">
          <select id="notes-folder-select" class="form-select-sm">
            ${folders.map(f => `<option value="${f}" ${this.notesSelectedFolder === f ? 'selected' : ''}>Folder: ${f}</option>`).join('')}
          </select>

          <select id="notes-course-select" class="form-select-sm">
            ${courseCodes.map(c => `<option value="${c}" ${this.notesSelectedCourse === c ? 'selected' : ''}>Course: ${c}</option>`).join('')}
          </select>
        </div>

        <button class="btn btn-primary btn-sm" id="btn-open-upload-note">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          New Note
        </button>
      </div>

      <!-- Notes Grid -->
      <div class="notes-cards-grid">
        ${notes.length === 0 ? `
          <div class="empty-state glass-panel full-width">
            <div class="empty-icon">📁</div>
            <h4>No documents found matching "${this.notesSearchQuery || this.notesSelectedFolder}"</h4>
            <p>Upload a new PDF/image or adjust your search filters.</p>
          </div>
        ` : notes.map(note => `
          <div class="note-card glass-panel" data-id="${note.id}">
            <div class="note-card-header">
              <span class="course-mini-tag">${note.courseCode}</span>
              <span class="folder-pill">📁 ${note.folder}</span>
            </div>

            <h4 class="note-title">${note.title}</h4>
            <p class="note-snippet">${note.content.substring(0, 140).replace(/#/g, '')}...</p>

            ${note.attachment ? `
              <div class="attachment-pill" title="Attachment: ${note.attachment.name}">
                <span class="attach-icon">${note.attachment.type === 'pdf' ? '📕' : '🖼️'}</span>
                <span class="attach-name">${note.attachment.name}</span>
                <span class="attach-size">${note.attachment.size}</span>
              </div>
            ` : ''}

            <div class="note-tags-row">
              ${(note.tags || []).map(t => `<span class="note-tag">#${t}</span>`).join('')}
            </div>

            <div class="note-card-footer">
              <span class="note-date">🗓️ ${note.date}</span>
              <div class="note-action-btns">
                <button class="btn btn-secondary btn-xs btn-preview-note" data-id="${note.id}">
                  Read / Preview
                </button>
                <button class="btn-icon-subtle btn-delete-note" data-id="${note.id}" title="Delete">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  attachEventListeners() {
    const container = document.getElementById('academics-view-content');
    if (!container) return;

    // Sub-nav tab switching
    container.querySelectorAll('.subnav-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.activeTab = e.currentTarget.dataset.tab;
        this.render();
      });
    });

    // Courses events
    container.querySelector('#btn-open-add-course')?.addEventListener('click', () => {
      this.app.openCourseModal();
    });
    container.querySelectorAll('.btn-delete-course').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (confirm('Drop this course? Associated grades will be removed.')) {
          this.deleteCourse(e.currentTarget.dataset.id);
        }
      });
    });

    // Deadlines events
    container.querySelector('#btn-open-add-deadline')?.addEventListener('click', () => {
      this.app.openDeadlineModal();
    });
    container.querySelectorAll('.checkbox-circle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.toggleDeadline(e.currentTarget.dataset.id);
      });
    });
    container.querySelectorAll('.btn-delete-deadline').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.deleteDeadline(e.currentTarget.dataset.id);
      });
    });

    // To-Do events
    const todoInput = container.querySelector('#quick-todo-input');
    const btnAddTodo = container.querySelector('#btn-add-quick-todo');
    if (btnAddTodo && todoInput) {
      const handleAdd = () => {
        if (todoInput.value.trim()) {
          this.addTodo(todoInput.value.trim());
          todoInput.value = '';
        }
      };
      btnAddTodo.addEventListener('click', handleAdd);
      todoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleAdd();
      });
    }
    container.querySelectorAll('.todo-check-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.toggleTodo(e.currentTarget.dataset.id));
    });
    container.querySelectorAll('.btn-delete-todo').forEach(btn => {
      btn.addEventListener('click', (e) => this.deleteTodo(e.currentTarget.dataset.id));
    });

    // Dues events
    container.querySelector('#btn-open-add-due')?.addEventListener('click', () => {
      this.app.openDueModal();
    });
    container.querySelectorAll('.btn-mark-due-paid').forEach(btn => {
      btn.addEventListener('click', (e) => this.markDuePaid(e.currentTarget.dataset.id));
    });
    container.querySelectorAll('.btn-delete-due').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (confirm('Delete this financial billing record?')) {
          this.deleteDue(e.currentTarget.dataset.id);
        }
      });
    });

    // Notes events
    const searchInput = container.querySelector('#notes-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.notesSearchQuery = e.target.value;
        const grid = container.querySelector('.notes-cards-grid');
        if (grid) {
          const notes = this.getFilteredNotes();
          if (notes.length === 0) {
            grid.innerHTML = `
              <div class="empty-state glass-panel full-width">
                <div class="empty-icon">📁</div>
                <h4>No documents found matching "${this.notesSearchQuery}"</h4>
                <p>Adjust your search query.</p>
              </div>
            `;
          } else {
            grid.innerHTML = notes.map(note => `
              <div class="note-card glass-panel" data-id="${note.id}">
                <div class="note-card-header">
                  <span class="course-mini-tag">${note.courseCode}</span>
                  <span class="folder-pill">📁 ${note.folder}</span>
                </div>
                <h4 class="note-title">${note.title}</h4>
                <p class="note-snippet">${note.content.substring(0, 140).replace(/#/g, '')}...</p>
                ${note.attachment ? `
                  <div class="attachment-pill">
                    <span class="attach-icon">${note.attachment.type === 'pdf' ? '📕' : '🖼️'}</span>
                    <span class="attach-name">${note.attachment.name}</span>
                    <span class="attach-size">${note.attachment.size}</span>
                  </div>
                ` : ''}
                <div class="note-tags-row">
                  ${(note.tags || []).map(t => `<span class="note-tag">#${t}</span>`).join('')}
                </div>
                <div class="note-card-footer">
                  <span class="note-date">🗓️ ${note.date}</span>
                  <div class="note-action-btns">
                    <button class="btn btn-secondary btn-xs btn-preview-note" data-id="${note.id}">Read / Preview</button>
                    <button class="btn-icon-subtle btn-delete-note" data-id="${note.id}">×</button>
                  </div>
                </div>
              </div>
            `).join('');
            this.attachNoteActionListeners();
          }
        }
      });
    }

    container.querySelector('#notes-folder-select')?.addEventListener('change', (e) => {
      this.notesSelectedFolder = e.target.value;
      this.render();
    });

    container.querySelector('#notes-course-select')?.addEventListener('change', (e) => {
      this.notesSelectedCourse = e.target.value;
      this.render();
    });

    container.querySelector('#btn-open-upload-note')?.addEventListener('click', () => {
      this.app.openNoteModal();
    });

    this.attachNoteActionListeners();
  }

  attachNoteActionListeners() {
    const container = document.getElementById('academics-view-content');
    if (!container) return;

    container.querySelectorAll('.btn-preview-note').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const note = (this.getAcademics().notes || []).find(n => n.id === id);
        if (note) this.app.openNotePreviewModal(note);
      });
    });

    container.querySelectorAll('.btn-delete-note').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (confirm('Permanently delete this note?')) {
          this.deleteNote(e.currentTarget.dataset.id);
        }
      });
    });
  }
}
