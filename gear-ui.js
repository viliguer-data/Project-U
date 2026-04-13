/* Project U — gear-ui.js — UI de armaduras, accesorios y condicionales */

const ARMOR_SLOTS = ['Casco', 'Pechera', 'Hombreras', 'Guantes', 'Botas'];
const ACC_SLOTS   = ['Necklace', 'Cinturón', 'Anillo'];

function gearBuildSlots(slots, containerId) {
  if (typeof GEAR_DATABASE === 'undefined') return;
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  slots.forEach(slotName => {
    const cat = GEAR_DATABASE[slotName];
    if (!cat) return;
    const isDual = cat.dualSlot;
    const instances = isDual ? [1, 2] : [0];
    instances.forEach(idx => {
      const uid   = isDual ? slotName + idx : slotName;
      const label = isDual ? slotName + ' ' + idx : slotName;
      const div = document.createElement('div');
      div.className = 'gear-slot' + (isDual ? ' dual' : '');
      
      // TRADUCCIÓN DEL NOMBRE DEL SLOT
      const translatedLabel = (T[lang] && T[lang][`gear.slot.${slotName.toLowerCase()}`]) 
        ? T[lang][`gear.slot.${slotName.toLowerCase()}`] 
        : label;
      
      div.innerHTML = `
        <div class="gear-slot-label">${translatedLabel}</div>
        <select class="tracker-select" id="gs-${uid}" onchange="gearSelectChange('${slotName}','${uid}')">
          <option value="">— ${slotName} —</option>
          ${cat.baseTypes.map(b => `<option value="${b.name}">${b.name}${b.unique ? ' ★' : ''}</option>`).join('')}
        </select>
        <div id="gd-${uid}"></div>
      `;
      container.appendChild(div);
    });
  });
}

function gearSelectChange(slotName, uid) {
  const sel  = document.getElementById('gs-' + uid);
  const disp = document.getElementById('gd-' + uid);
  if (!sel || !disp) return;
  const name = sel.value;
  if (!name) { disp.innerHTML = ''; return; }
  const cat  = GEAR_DATABASE[slotName];
  const base = cat?.baseTypes.find(b => b.name === name);
  if (!base) { disp.innerHTML = ''; return; }
  const stored   = WARDROBE.isStored(slotName, name);
  const togClass = stored ? 'wardrobe-toggle stored' : 'wardrobe-toggle';
  const togLabel = stored ? '✦ Guardado en el Baúl (bufo activo)' : '○ Guardar en el Baúl';
  let html = '';
  if (base.unique) {
    const reqPills = Object.entries(base.requirements).map(([s, v]) => {
      const cls = s === 'STR' ? 'str' : s === 'DEX' ? 'dex' : 'int';
      return `<span class="item-req-pill ${cls}">${s} ${v}</span>`;
    }).join('');
    html = `<div class="unique-card" style="margin-top:.6rem">
      <div class="unique-card-header"><span class="unique-badge">Único</span><span class="unique-name">${base.name}</span></div>
      <div class="item-req" style="margin-top:.3rem">${reqPills}</div>
      <div class="item-lore"><div class="item-lore-flavor">${base.lore.flavor}</div><div class="item-lore-passive">${base.lore.passive}</div></div>
      <label class="${togClass}" id="wt-${uid}">
        <input type="checkbox" ${stored ? 'checked' : ''} onchange="wardrobeToggle('${slotName}','${name}','${uid}')">
        <span>${togLabel}</span>
      </label></div>`;
  } else {
    html = `<label class="wardrobe-toggle" id="wt-${uid}" style="margin-top:.5rem">
      <input type="checkbox" ${stored ? 'checked' : ''} onchange="wardrobeToggle('${slotName}','${name}','${uid}')">
      <span>${stored ? '✦ Guardado en el Baúl' : '○ Guardar en el Baúl'}</span></label>`;
  }
  disp.innerHTML = html;
  refreshWardrobeSummary();
  if (slotName === 'Anillo') {
    const r1 = document.getElementById('gs-Anillo1')?.value;
    const r2 = document.getElementById('gs-Anillo2')?.value;
    if (r1 && r2) {
      const errs = validateGearSlots(r1, r2);
      errs.forEach(e => {
        const panel = document.getElementById('wm-result');
        const body  = document.getElementById('wm-result-body');
        if (panel && body) { body.innerHTML = `<div style="color:var(--red2);padding:.4rem 0">${e}</div>`; panel.style.display = 'block'; }
      });
    }
  }
}

function wardrobeToggle(slotName, itemName, uid) {
  const isNowStored = WARDROBE.toggle(slotName, itemName);
  const label = document.querySelector(`#wt-${uid} span`);
  const wrap  = document.getElementById('wt-' + uid);
  if (label) label.textContent = isNowStored ? '✦ Guardado en el Baúl (bufo activo)' : '○ Guardar en el Baúl';
  if (wrap)  wrap.className    = isNowStored ? 'wardrobe-toggle stored' : 'wardrobe-toggle';
  refreshWardrobeSummary();
}

function refreshWardrobeSummary() {
  const buffs = WARDROBE.activeBuffs();
  const armorBufTarget = document.getElementById('ws-armor-body');
  const armorWrap      = document.getElementById('ws-armor');
  const accBufTarget   = document.getElementById('ws-acc-body');
  const accWrap        = document.getElementById('ws-acc');
  let armorHtml = '', accHtml = '';
  buffs.forEach(({ slot, name, buff }) => {
    const isArmor = ARMOR_SLOTS.includes(slot);
    const cond = buff.condition ? `<span class="ws-buff-cond">(${buff.condition})</span>` : '';
    const line = `<div class="ws-buff"><span style="color:var(--dim)">${slot}:</span><span>${name}</span><span class="ws-buff-val">${buff.value} ${buff.stat}</span>${cond}</div>`;
    if (isArmor) armorHtml += line; else accHtml += line;
  });
  if (armorBufTarget) armorBufTarget.innerHTML = armorHtml || '<div style="color:var(--dim);font-size:10px">Sin ítems guardados.</div>';
  if (armorWrap)      armorWrap.classList.toggle('has-items', buffs.some(b =>  ARMOR_SLOTS.includes(b.slot)));
  if (accBufTarget)   accBufTarget.innerHTML   = accHtml   || '<div style="color:var(--dim);font-size:10px">Sin ítems guardados.</div>';
  if (accWrap)        accWrap.classList.toggle('has-items', buffs.some(b => !ARMOR_SLOTS.includes(b.slot)));
}

// ── updateConditionals — GLOBAL (llamada desde main.js y lang buttons) ──
function updateConditionals() {
  const stats = {
    STR:     parseInt(document.getElementById('stat-str')?.value  || 0),
    DEX:     parseInt(document.getElementById('stat-dex')?.value  || 0),
    INT:     parseInt(document.getElementById('stat-int')?.value  || 0),
    hp_full: document.getElementById('stat-hpfull')?.checked || false,
  };
  const valStr    = document.getElementById('val-str');
  const valDex    = document.getElementById('val-dex');
  const valInt    = document.getElementById('val-int');
  const valHpfull = document.getElementById('val-hpfull');
  if (valStr)    valStr.textContent    = stats.STR;
  if (valDex)    valDex.textContent    = stats.DEX;
  if (valInt)    valInt.textContent    = stats.INT;
  if (valHpfull) valHpfull.textContent = stats.hp_full ? 'Yes' : 'No';
  if (typeof GEAR_DATABASE === 'undefined') return;
  document.querySelectorAll('.gear-slot select').forEach(sel => {
    const slotName = sel.id.replace('gs-', '');
    const name     = sel.value;
    if (!name) return;
    const cat  = GEAR_DATABASE[slotName];
    const base = cat?.baseTypes.find(b => b.name === name);
    if (!base || !base.conditionals?.length) return;
    const disp = document.getElementById('gd-' + slotName);
    if (!disp) return;
    const activeConds = evaluateConditionals(base, stats);
    let condHtml = '';
    base.conditionals.forEach(c => {
      const isActive = activeConds.some(ac => ac.then === c.then);
      const label    = c.label[lang] || c.label.es || c.label;
      const cls      = isActive ? 'cond-active' : 'cond-inactive';
      condHtml += `<div class="${cls}">⚡ ${label}</div>`;
    });
    let existingConds = disp.querySelector('.conditionals-display');
    if (!existingConds) {
      existingConds = document.createElement('div');
      existingConds.className = 'conditionals-display';
      disp.appendChild(existingConds);
    }
    existingConds.innerHTML = condHtml || `<div style="color:var(--dim);font-size:9px;font-style:italic;">${T[lang]?.['no.conditionals'] || 'No conditionals'}</div>`;
  });
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Esperar un poco para asegurar que GEAR_DATABASE esté cargado
  function tryBuild() {
    if (typeof GEAR_DATABASE !== 'undefined') {
      gearBuildSlots(ARMOR_SLOTS, 'grid-armaduras');
      gearBuildSlots(ACC_SLOTS, 'grid-accesorios');
    } else {
      setTimeout(tryBuild, 100); // Reintentar después de 100ms
    }
  }
  tryBuild();

  // ... el resto (updateConditionals, etc.)
});
