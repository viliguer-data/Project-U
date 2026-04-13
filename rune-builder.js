/* Project U — rune-builder.js — Render de runas + hover tooltip */

function renderRunePanel() {
  const skillContainer = document.getElementById('skill-runes-container');
  const linkContainer  = document.getElementById('link-runes-container');
  if (!skillContainer || !linkContainer) return;
  if (typeof skillRunes === 'undefined' || typeof linkRunes === 'undefined') return;

  const l = typeof lang !== 'undefined' ? lang : 'en';

  // Skill Runes
  skillContainer.innerHTML = skillRunes.map(r => {
    const name     = r.name[l]  || r.name.en;
    const logic    = r.logic[l] || r.logic.en;
    const tags     = r.tags.map(t => `<span class="rune-tag">${t}</span>`).join('');
    const stats    = Object.entries(r.stats).map(([k,v]) =>
      `<span style="color:var(--cyan);font-size:9px;margin-right:.5rem">${k}: ${v}</span>`).join('');
    const bgColor  = r.color === 'green' ? '#2ecc71' : r.color === 'blue' ? '#3498db' : '#e74c3c';
    const colorDot = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:4px;background:${bgColor}"></span>`;
    // Tooltip: stats summary
    const statsTooltip = Object.entries(r.stats).map(([k,v]) => `${k}: ${v}`).join(' | ');
    const tooltip = `${name} — ${statsTooltip}`;

    return `<div class="skill-rune-card" data-tooltip="${tooltip.replace(/"/g,"'")}">
      <img src="${r.image}" alt="${name}" onerror="this.style.display='none'">
      <div class="skill-rune-info">
        <div class="skill-rune-name">${colorDot}${name}${r.grade ? ` <span style="font-size:9px;color:var(--gold)">★ ${r.grade}</span>` : ''}</div>
        <div style="margin-bottom:.3rem">${stats}</div>
        <div class="skill-rune-tags">${tags}</div>
        <div class="skill-rune-logic">${logic}</div>
      </div>
    </div>`;
  }).join('');

  // Link Runes
  linkContainer.innerHTML = linkRunes.map(r => {
    const logic    = r.logic[l] || r.logic.en;
    const statsStr = Object.entries(r.stats).map(([k,v]) => `${k}: ${v}`).join(' · ');
    const tooltip  = `${r.name} — ${statsStr}`;

    return `<div class="link-rune-card ${r.color}" data-tooltip="${tooltip.replace(/"/g,"'")}">
      <img src="${r.image}" alt="${r.name}" onerror="this.style.display='none'">
      <div>
        <div class="link-rune-name">${r.name}</div>
        <div class="link-rune-stats">${statsStr}</div>
        <div class="link-rune-logic">${logic}</div>
      </div>
    </div>`;
  }).join('');
}

// Render on load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(renderRunePanel, 100);
  setTimeout(renderRunePanel, 600);
});

// Re-render on lang change
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-toggle [data-lang]').forEach(btn => {
    btn.addEventListener('click', () => setTimeout(renderRunePanel, 50));
  });
});
