/* Project U — theme.js — Dark/Light mode */

// ══ THEME TOGGLE (BOMBILLA) ═══════════════════════════════════
(function(){
  const themeToggle = document.getElementById('themeToggle');
  const tooltipBombilla = document.getElementById('tooltipBombilla');
  const clickSound = new Audio('switch.mp3');

  function setTheme(isLight) {
    if (isLight) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      if(themeToggle) themeToggle.textContent = '🌙';
      if(tooltipBombilla) tooltipBombilla.textContent = 'Too bright? Back to the shadows';
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
      if(themeToggle) themeToggle.textContent = '💡';
      if(tooltipBombilla) tooltipBombilla.textContent = 'Feeling the web is too dark? Turn the lights ON';
    }
  }

  // Restore saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') setTheme(true);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
      setTheme(!document.body.classList.contains('light-mode'));
    });
  }
})();

// ══ SHIELD LOGIC (2H DISABLES SHIELD) ════════════════════════
