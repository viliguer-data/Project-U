/* Project U — build-saver.js — Guardar/Cargar/Exportar builds — v2.4 Final */

// ══ ESTRUCTURA DE DATOS Y CAPTURA ════════════════════════════════
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
    shield, 
    stats, 
    armor,
    wardrobe: typeof WARDROBE !== 'undefined' ? [...WARDROBE.stored] : [],
    lang: typeof lang !== 'undefined' ? lang : 'es',
    version: "2.4"
  };
}

// ══ LÓGICA DE CARGA Y MIGRACIÓN ══════════════════════════════════
function applyBuildState(state) {
  if (!state) return;

  const set = (id, val) => { 
    const el = document.getElementById(id); 
    if(el) el.value = val; 
  };

  // --- 1. MIGRACIÓN DE IDS (Limpieza de "Ruido" v2.3 -> v2.4) ---
  const migrateId = (id) => {
    const map = {
      'want': 'wand', // Corrección de la Vara
      'sandglass': 'bound_sandglass',
      'celestial_orb': 'bound_celestial_orb',
      'mirasetis_wave': 'bound_mirasetis_wave',
      'seeping_ray_of_light': 'bound_seeping_ray_of_light',
      'big_saver': 'build_saver'
    };
    return map[id] || id;
  };

  // --- 2. PROCESAMIENTO DE ARMAS ---
  set('wm-type1', state.mainHandType);
  setTimeout(() => { 
    if(typeof wmPopulateNames==='function') wmPopulateNames(1); 
    set('wm-name1', migrateId(state.mainHandName)); 
  }, 100);

  set('wm-type2', state.offHandType);
  setTimeout(() => { 
    if(typeof wmPopulateNames==='function') wmPopulateNames(2); 
    set('wm-name2', migrateId(state.offHandName)); 
  }, 150);

  set('wm-shield', migrateId(state.shield) || '');

  // --- 3. PROCESAMIENTO DE STATS ---
  if (state.stats) {
    set('stat-str', state.stats.STR); 
    set('stat-dex', state.stats.DEX); 
    set('stat-int', state.stats.INT);
    const hpEl = document.getElementById('stat-hpfull'); 
    if(hpEl) hpEl.checked = state.stats.hp_full;

    ['stat-str','stat-dex','stat-int','stat-hpfull'].forEach(id => {
      const el = document.getElementById(id); 
      if(el) el.dispatchEvent(new Event('input'));
    });
  }

  // --- 4. ARMADURAS Y SLOTS CORREGIDOS ---
  setTimeout(() => {
    if (state.armor) {
      Object.entries(state.armor).forEach(([slot, val]) => {
        let targetSlot = slot;
        if (slot === 'chest') targetSlot = 'armor';
        if (slot === 'shoulder') targetSlot = 'spaulders';

        set('gs-' + targetSlot, migrateId(val));
      });
    }
    
    if (state.wardrobe && typeof WARDROBE !== 'undefined' && WARDROBE.loadFromSave) {
      WARDROBE.loadFromSave(state.wardrobe);
    }
    
    if (typeof updateUI === 'function') updateUI();
  }, 300);
}

// ══ PERSISTENCIA (LOCALSTORAGE) ══════════════════════════════════
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
    names.forEach(n => { 
        const o = document.createElement('option'); 
        o.value = n; 
        o.textContent = n; 
        sel.appendChild(o); 
    });
  });
}

// ══ ACCIONES DE USUARIO ══════════════════════════════════════════
function saveCurrentBuild(name) {
  if (!name) name = prompt(T[lang]?.['build.save.prompt'] || 'Nombre para esta build:');
  if (!name) return;
  const builds = getBuilds();
  builds[name] = getBuildState();
  saveBuilds(builds);
  updateBuildsDropdown();
  showMsg(`✓ Build "${name}" guardada`);
}

function loadBuild(name) {
  const builds = getBuilds();
  if (!builds[name]) return;
  applyBuildState(builds[name]);
  showMsg(`✓ Build "${name}" cargada`);
}

function exportBuildToText() {
  const state = getBuildState();
  const date = new Date().toLocaleString();
  const text = [
    '╔══════════════════════════════════════╗',
    '║  🏹 PROJECT U · BUILD EXPORT          ║',
    '╠══════════════════════════════════════╣',
    `║  Arma Principal: ${(state.mainHandName||'—').padEnd(21)}║`,
    `║  Mano Secundaria: ${(state.offHandName||'—').padEnd(20)}║`,
    `║  STR:${String(state.stats.STR).padEnd(6)} DEX:${String(state.stats.DEX).padEnd(6)} INT:${String(state.stats.INT).padEnd(9)}║`,
    `║  Exportado: ${date.padEnd(26)}║`,
    '╚══════════════════════════════════════╝',
  ].join('\n');
  
  navigator.clipboard.writeText(text).then(() => {
    showMsg('📋 Exportado al portapapeles');
  }).catch(() => { alert(text); });
}

// ══ VALIDACIÓN Y UTILIDADES ══════════════════════════════════════
function wmValidate() {
    const currentBuild = getBuildState();
    console.log("Matrix Validada:", currentBuild);
    showMsg("BUILD VALIDADA CORRECTAMENTE");
}

function showMsg(txt) {
  const msg = document.createElement('div');
  msg.textContent = txt;
  msg.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--bg2);color:var(--gold);border:1px solid var(--gold);padding:.5rem 1.2rem;border-radius:2px;font-size:11px;z-index:30000;font-family:Share Tech Mono,monospace';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
}

// ══ INICIALIZACIÓN ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  updateBuildsDropdown();
  
  document.getElementById('save-build-btn')?.addEventListener('click', () => saveCurrentBuild());
  document.getElementById('load-build-btn')?.addEventListener('click', () => {
    const v = document.getElementById('builds-dropdown')?.value;
    if (v) loadBuild(v);
  });
  document.getElementById('export-build-btn')?.addEventListener('click', exportBuildToText);
  
  // 🔹 AGREGAR: Botón Eliminar
  document.getElementById('delete-build-btn')?.addEventListener('click', () => {
    const select = document.getElementById('delete-build-select');
    const name = select?.value;
    if (!name) {
      showMsg('⚠️ Seleccioná una build para eliminar.');
      return;
    }
    if (confirm(`¿Eliminar la build "${name}"?`)) {
      const builds = getBuilds();
      delete builds[name];
      saveBuilds(builds);
      updateBuildsDropdown();
      // También actualizar el select de eliminación
      const deleteSelect = document.getElementById('delete-build-select');
      if (deleteSelect) {
        deleteSelect.innerHTML = '<option value="">— Eliminar build —</option>';
        Object.keys(builds).forEach(n => {
          const o = document.createElement('option');
          o.value = n;
          o.textContent = n;
          deleteSelect.appendChild(o);
        });
      }
      showMsg(`✓ Build "${name}" eliminada`);
    }
  });
  
  // 🔹 AGREGAR: Botón Reset (si existe)
  document.getElementById('reset-all-btn')?.addEventListener('click', () => {
    if (confirm('⚠️ ¿Resetear TODOS los selects y stats?')) {
      // Resetear selects de armas
      document.getElementById('wm-type1') && (document.getElementById('wm-type1').value = '');
      document.getElementById('wm-name1') && (document.getElementById('wm-name1').innerHTML = '<option value="">— Seleccionar arma —</option>');
      document.getElementById('wm-type2') && (document.getElementById('wm-type2').value = '');
      document.getElementById('wm-name2') && (document.getElementById('wm-name2').innerHTML = '<option value="">— Seleccionar arma —</option>');
      document.getElementById('wm-shield') && (document.getElementById('wm-shield').value = '');
      
      // Resetear stats
      document.getElementById('stat-str') && (document.getElementById('stat-str').value = 100);
      document.getElementById('stat-dex') && (document.getElementById('stat-dex').value = 100);
      document.getElementById('stat-int') && (document.getElementById('stat-int').value = 100);
      document.getElementById('stat-hpfull') && (document.getElementById('stat-hpfull').checked = false);
      
      // Disparar eventos input para actualizar UI
      ['stat-str', 'stat-dex', 'stat-int', 'stat-hpfull'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.dispatchEvent(new Event('input'));
      });
      
      showMsg('✓ Todo reseteado');
    }
  });
});