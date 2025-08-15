/**
 * Theme Management System
 * Handles dark/light theme switching with persistence and OS preference detection
 */

class ThemeManager {
  constructor() {
    this.currentTheme = this.getInitialTheme();
    this.init();
  }

  /**
   * Initialize theme management
   */
  init() {
    this.applyTheme(this.currentTheme);
    this.createThemeToggle();
    this.setupEventListeners();
  }

  /**
   * Get initial theme based on localStorage or OS preference
   */
  getInitialTheme() {
    // Check localStorage first
    const savedTheme = localStorage.getItem('nba-api-theme');
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      return savedTheme;
    }

    // Check OS preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    // Default to dark
    return 'dark';
  }

  /**
   * Apply theme to document
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    
    // Save to localStorage
    localStorage.setItem('nba-api-theme', theme);
    
    // Update toggle button if it exists
    this.updateToggleButton();
  }

  /**
   * Toggle between themes
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  /**
   * Create theme toggle button
   */
  createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle theme');
    toggle.setAttribute('title', 'Toggle between dark and light themes');
    
    const icon = document.createElement('span');
    icon.className = 'theme-toggle-icon';
    
    const text = document.createElement('span');
    text.className = 'theme-toggle-text';
    
    toggle.appendChild(icon);
    toggle.appendChild(text);
    
    // Add to body
    document.body.appendChild(toggle);
    
    this.toggleButton = toggle;
    this.updateToggleButton();
  }

  /**
   * Update toggle button appearance
   */
  updateToggleButton() {
    if (!this.toggleButton) return;
    
    const icon = this.toggleButton.querySelector('.theme-toggle-icon');
    const text = this.toggleButton.querySelector('.theme-toggle-text');
    
    if (this.currentTheme === 'dark') {
      icon.textContent = '☀️';
      text.textContent = 'Light';
      this.toggleButton.setAttribute('aria-label', 'Switch to light theme');
    } else {
      icon.textContent = '🌙';
      text.textContent = 'Dark';
      this.toggleButton.setAttribute('aria-label', 'Switch to dark theme');
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Theme toggle click
    document.addEventListener('click', (e) => {
      if (e.target.closest('.theme-toggle')) {
        this.toggleTheme();
      }
    });

    // Listen for OS theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('nba-api-theme')) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }

    // Keyboard support for theme toggle
    document.addEventListener('keydown', (e) => {
      if (e.target.closest('.theme-toggle') && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  /**
   * Get current theme
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Set theme programmatically
   */
  setTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
      this.applyTheme(theme);
    }
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}