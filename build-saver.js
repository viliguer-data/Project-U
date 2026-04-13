/* Project U — build-saver.js — Guardar/Cargar/Exportar builds */

// ══ BUILD SAVER ════════════════════════════════════════════════
function getBuildState() {
  const shield = document.getElementById('wm-shield')?.value || '';
  const stats = {
    STR: document.getElementById('stat-str')?.value || 100,
    DEX: document.getElementById('stat-dex')?.value || 100,
    INT: document.getElementById('stat-int')?.value || 100,
    hp_full: document.getElementById('stat-hpfull')?.checked || false,
  };
  const armor = {};
  document.querySelectorAll('.gear-slot select').forEach(sel => {
    const slot = sel.id.replace('gs-','');
    armor[slot] = sel.value;
  });
  return {
    mainHandType: document.getElementById('wm-type1')?.value || '',
    mainHandName: document.getElementById('wm-name1')?.value || '',
    offHandType:  document.getElementById('wm-type2')?.value || '',
    offHandName:  document.getElementById('wm-name2')?.value || '',
    shield, stats, armor,
    wardrobe: typeof WARDROBE !== 'undefined' ? [...WARDROBE.stored] : [],
    lang,
  };
}

function applyBuildState(state) {
  if (!state) return;
  const set = (id, val) => { const el = document.getElementById(id); if(el) el.value = val; };
  set('wm-type1', state.mainHandType);
  setTimeout(() => { if(typeof wmPopulateNames==='function') wmPopulateNames(1); set('wm-name1', state.mainHandName); }, 100);
  set('wm-type2', state.offHandType);
  setTimeout(() => { if(typeof wmPopulateNames==='function') wmPopulateNames(2); set('wm-name2', state.offHandName); }, 150);
  set('wm-shield', state.shield || '');
  if (state.stats) {
    set('stat-str', state.stats.STR); set('stat-dex', state.stats.DEX); set('stat-int', state.stats.INT);
    const hpEl = document.getElementById('stat-hpfull'); if(hpEl) hpEl.checked = state.stats.hp_full;
    ['stat-str','stat-dex','stat-int','stat-hpfull'].forEach(id => {
      const el = document.getElementById(id); if(el) el.dispatchEvent(new Event('input'));
    });
  }
  setTimeout(() => {
    if (state.armor) Object.entries(state.armor).forEach(([slot, val]) => set('gs-'+slot, val));
    if (state.wardrobe && typeof WARDROBE !== 'undefined' && WARDROBE.loadFromSave) WARDROBE.loadFromSave(state.wardrobe);
  }, 300);
}

function getBuilds() { try { return JSON.parse(localStorage.getItem('projectU_builds') || '{}'); } catch(e) { return {}; } }
function saveBuilds(b) { localStorage.setItem('projectU_builds', JSON.stringify(b)); }

function updateBuildsDropdown() {
  const builds = getBuilds();
  const names = Object.keys(builds);
  [document.getElementById('builds-dropdown'), document.getElementById('delete-build-select')].forEach(sel => {
    if (!sel) return;
    const first = sel.options[0];
    sel.innerHTML = '';
    sel.appendChild(first);
    names.forEach(n => { const o = document.createElement('option'); o.value = n; o.textContent = n; sel.appendChild(o); });
  });
}

function saveCurrentBuild(name) {
  if (!name) name = prompt('Nombre para esta build:');
  if (!name) return;
  const builds = getBuilds();
  builds[name] = getBuildState();
  saveBuilds(builds);
  updateBuildsDropdown();
  showMsg('✓ Build "' + name + '" guardada');
}

function loadBuild(name) {
  const builds = getBuilds();
  if (!builds[name]) return;
  applyBuildState(builds[name]);
  showMsg('✓ Build "' + name + '" cargada');
}

function deleteBuild(name) {
  if (!confirm('¿Eliminar build "' + name + '"?')) return;
  const builds = getBuilds();
  delete builds[name];
  saveBuilds(builds);
  updateBuildsDropdown();
  showMsg('✓ Build "' + name + '" eliminada');
}

function exportBuildToText() {
  const state = getBuildState();
  const date = new Date().toLocaleString();
  const text = [
    '╔══════════════════════════════════════╗',
    '║  🏹 PROJECT U · BUILD EXPORT          ║',
    '╠══════════════════════════════════════╣',
    '║  Arma Principal: ' + (state.mainHandName||'—').padEnd(21) + '║',
    '║  Mano Secundaria: ' + (state.offHandName||'—').padEnd(20) + '║',
    '║  Escudo: ' + (state.shield||'—').padEnd(29) + '║',
    '║  STR:' + String(state.stats.STR).padEnd(6) + 'DEX:' + String(state.stats.DEX).padEnd(6) + 'INT:' + String(state.stats.INT).padEnd(11) + '║',
    '║  Baúl: ' + (state.wardrobe?.length||0) + ' ítem(s) guardado(s)'.padEnd(27) + '║',
    '║  Exportado: ' + date.padEnd(26) + '║',
    '╚══════════════════════════════════════╝',
  ].join('\n');
  navigator.clipboard.writeText(text).then(() => showMsg('📋 Build copiada al portapapeles!')).catch(() => { alert(text); });
}

function resetAllSelections() {
  if (!confirm('⚠️ ¿Resetear TODOS los selects y stats?')) return;
  document.querySelectorAll('select').forEach(sel => { sel.value=''; });
  document.querySelectorAll('input[type="checkbox"]').forEach(chk => { chk.checked=false; });
  ['stat-str','stat-dex','stat-int'].forEach(id => { const el=document.getElementById(id); if(el){el.value=100;el.dispatchEvent(new Event('input'));} });
  showMsg('✓ Todo reseteado');
}

function showMsg(txt) {
  const msg = document.createElement('div');
  msg.textContent = txt;
  msg.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--bg2);color:var(--gold);border:1px solid var(--gold);padding:.5rem 1.2rem;border-radius:2px;font-size:11px;z-index:30000;font-family:Share Tech Mono,monospace';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
}

document.addEventListener('DOMContentLoaded', () => {
  updateBuildsDropdown();
  const saveBtn = document.getElementById('save-build-btn');
  const loadBtn = document.getElementById('load-build-btn');
  const deleteBtn = document.getElementById('delete-build-btn');
  const exportBtn = document.getElementById('export-build-btn');
  const resetBtn = document.getElementById('reset-all-btn');
  if (saveBtn) saveBtn.addEventListener('click', () => saveCurrentBuild());
  if (loadBtn) loadBtn.addEventListener('click', () => {
    const v = document.getElementById('builds-dropdown')?.value;
    if (v) loadBuild(v); else alert('Seleccioná una build para cargar.');
  });
  if (deleteBtn) deleteBtn.addEventListener('click', () => {
    const v = document.getElementById('delete-build-select')?.value;
    if (v) deleteBuild(v); else alert('Seleccioná una build para eliminar.');
  });
  if (exportBtn) exportBtn.addEventListener('click', exportBuildToText);
  if (resetBtn) resetBtn.addEventListener('click', resetAllSelections);
});
// ══ END NEW FEATURES ══════════════════════════════════════════

