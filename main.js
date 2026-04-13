document.addEventListener('DOMContentLoaded', () => {
  if (typeof updateText === 'function') updateText();

  document.querySelectorAll('.lang-toggle [data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.lang;
      lang = selected;
      document.documentElement.lang = selected;
      if (typeof updateText === 'function') updateText();
      if (typeof updateConditionals === 'function') updateConditionals();
      document.querySelectorAll('.faq-question').forEach(b => {
        b.classList.remove('open');
        const ans = b.nextElementSibling;
        if (ans) ans.style.display = 'none';
      });
      document.querySelectorAll('.lang-toggle [data-lang]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      setTimeout(() => { if (typeof renderRunePanel === 'function') renderRunePanel(); }, 50);
    });
  });

  const analyzeBtn = document.querySelector('.btn-analizar');
  if (analyzeBtn && typeof analizar === 'function') {
    analyzeBtn.addEventListener('click', analizar);
  }
});