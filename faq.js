/* Project U — faq.js — Acordeón FAQ */

// ══ FAQ ACCORDION ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-question').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling.style.display = 'none';
      });
      // Toggle clicked
      if (!isOpen) {
        btn.classList.add('open');
        answer.style.display = 'block';
      }
    });
  });
});

// ══ BUILD SAVER ════════════════════════════════════════════════
