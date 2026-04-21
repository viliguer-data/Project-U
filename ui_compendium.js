/* Project U — ui_compendium.js — Gestión del Compendio Global v2.6 */

// ============================================================
// UTILIDADES
// ============================================================

function getItemName(item, lang) {
  const currentLang = lang || window.lang || 'es';
  if (!item) return '—';
  
  const key = `item.${item.id}`;
  if (typeof T_raw !== 'undefined' && T_raw[currentLang] && T_raw[currentLang][key]) {
    return T_raw[currentLang][key];
  }
  
  if (item.name && typeof item.name === 'object') {
    return item.name[currentLang] || item.name['en'] || item.id;
  }
  
  return item.name || item.id.replace('item.', '').replace(/_/g, ' ');
}

function getItemImage(item) {
  if (typeof COMPENDIUM_ASSETS === 'undefined') {
    console.warn('COMPENDIUM_ASSETS no está cargado');
    return null;
  }
  
  if (!item) {
    console.warn('getItemImage: item es null/undefined');
    return null;
  }
  
  // 🔹 PRIORIDAD 1: Buscar por ID (más confiable)
  let imageFile = COMPENDIUM_ASSETS[item.id];
  
  // 🔹 PRIORIDAD 2: Buscar por nombre del ítem
  if (!imageFile) {
    imageFile = COMPENDIUM_ASSETS[item.name];
  }
  
  // 🔹 PRIORIDAD 3: Buscar por nombre en inglés (si es objeto)
  if (!imageFile && item.name && typeof item.name === 'object') {
    imageFile = COMPENDIUM_ASSETS[item.name.en];
  }
  
  console.log(`🔍 Item: ${item.id} | Nombre: "${item.name}" | Imagen: ${imageFile || 'NO ENCONTRADA'}`);
  
  return imageFile || null;
}

// ============================================================
// 1. WEAPON MATRIX (Armas Principal + Secundaria + Escudo)
// ============================================================

function buildWeaponMatrixUI() {
  // Buscar o crear contenedor para las armas
  let container = document.getElementById('weapon-matrix-container');
  if (!container) {
    const paneArmas = document.getElementById('pane-armas');
    if (paneArmas) {
      const existingGrid = document.getElementById('grid-armas');
      container = document.createElement('div');
      container.id = 'weapon-matrix-container';
      container.style.marginBottom = '1.5rem';
      container.style.padding = '1rem';
      container.style.border = '1px solid var(--border)';
      container.style.borderRadius = '2px';
      container.style.background = 'var(--bg2)';
      
      if (existingGrid) {
        paneArmas.insertBefore(container, existingGrid);
      } else {
        paneArmas.appendChild(container);
      }
    }
  }
  
  if (!container) return;
  
  const currentLang = window.lang || 'es';
  
  // HTML del Weapon Matrix
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
      <div>
        <div class="gear-slot-label">${T_raw[currentLang]?.['weapon.main.type'] || 'Mano Principal · Tipo'}</div>
        <select id="wm-type1" class="tracker-select" style="width:100%">
          <option value="">— ${T_raw[currentLang]?.['weapon.type.placeholder'] || 'Tipo de arma'} —</option>
        </select>
      </div>
      <div>
        <div class="gear-slot-label">${T_raw[currentLang]?.['weapon.main.name'] || 'Mano Principal · Nombre'}</div>
        <select id="wm-name1" class="tracker-select" style="width:100%">
          <option value="">— ${T_raw[currentLang]?.['weapon.name.placeholder'] || 'Seleccionar arma'} —</option>
        </select>
        <div id="weapon-preview" style="margin-top: 10px; min-height: 70px; display: flex; justify-content: center; align-items: center; background: rgba(0,0,0,.2); border-radius: 4px; padding: 4px;"></div>
      </div>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
      <div>
        <div class="gear-slot-label">${T_raw[currentLang]?.['weapon.off.type'] || 'Mano Secundaria · Tipo'}</div>
        <select id="wm-type2" class="tracker-select" style="width:100%">
          <option value="">— ${T_raw[currentLang]?.['weapon.type.placeholder'] || 'Tipo de arma'} —</option>
          <option value="__none__">— ${T_raw[currentLang]?.['weapon.off.none'] || 'Sin mano secundaria'} —</option>
        </select>
      </div>
      <div>
        <div class="gear-slot-label">${T_raw[currentLang]?.['weapon.off.name'] || 'Mano Secundaria · Nombre'}</div>
        <select id="wm-name2" class="tracker-select" style="width:100%">
          <option value="">— ${T_raw[currentLang]?.['weapon.name.placeholder'] || 'Seleccionar arma'} —</option>
        </select>
      </div>
    </div>
    <div style="margin-top: 0.5rem;">
      <div class="gear-slot-label">${T_raw[currentLang]?.['shield.label'] || '🛡️ Escudo'}</div>
      <select id="wm-shield" class="tracker-select" style="width:100%">
        <option value="">— ${T_raw[currentLang]?.['shield.none'] || 'Ninguno'} —</option>
      </select>
    </div>
    <button type="button" onclick="wmValidate()" class="btn-analizar" style="margin-top: 1rem;">⟶ ${T_raw[currentLang]?.['btn.validate'] || 'Validar Combinación'}</button>
  `;
  
  // Poblar los selects
  populateWeaponTypes();
  populateShieldSelect();
  
  // Event listeners
  document.getElementById('wm-type1')?.addEventListener('change', () => {
    wmPopulateNames(1);
    updateWeaponCompatibility();
  });
  document.getElementById('wm-type2')?.addEventListener('change', () => wmPopulateNames(2));
  
  // 🔹 Mostrar imagen del arma principal al seleccionar
  const name1Select = document.getElementById('wm-name1');
  const previewDiv = document.getElementById('weapon-preview');
  
  if (name1Select && previewDiv) {
    name1Select.addEventListener('change', () => {
      const selectedOption = name1Select.options[name1Select.selectedIndex];
      const itemId = selectedOption.value;
      if (itemId && typeof COMPENDIUM !== 'undefined' && COMPENDIUM[itemId]) {
        const item = COMPENDIUM[itemId];
        const imgPath = getItemImage(item);
        if (imgPath) {
          const reqLevel = item.requirements?.level || '?';
          const reqStr = item.requirements?.STR || '-';
          const reqDex = item.requirements?.DEX || '-';
          const reqInt = item.requirements?.INT || '-';
          
          const statsList = Object.entries(item.stats || {}).slice(0, 3)
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join('-') : v}`)
            .join('<br>');
          
          const tooltipContent = `
            <strong>${getItemName(item, window.lang)}</strong><br>
            📦 Nivel: ${reqLevel}<br>
            ⚔️ STR: ${reqStr} | 🏹 DEX: ${reqDex} | 🔮 INT: ${reqInt}<br>
            📊 ${statsList || 'Sin stats'}
          `;
          
          previewDiv.innerHTML = `
            <div style="position: relative; display: inline-block;">
              <img src="${imgPath}" style="max-width: 70px; max-height: 70px; border: 1px solid var(--gold); border-radius: 4px; cursor: help;">
              <div class="item-hover-tooltip" style="display: none; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: var(--bg2); color: var(--gold); border: 1px solid var(--gold); padding: 8px 12px; border-radius: 4px; font-size: 10px; font-family: 'Share Tech Mono', monospace; white-space: nowrap; z-index: 1000; margin-bottom: 8px;">
                ${tooltipContent}
              </div>
            </div>
          `;
          
          const containerDiv = previewDiv.querySelector('div');
          const tooltip = containerDiv?.querySelector('.item-hover-tooltip');
          if (containerDiv && tooltip) {
            containerDiv.addEventListener('mouseenter', () => { tooltip.style.display = 'block'; });
            containerDiv.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });
          }
        } else {
          previewDiv.innerHTML = '<span style="color:var(--dim);font-size:10px;">🖼️ Sin imagen</span>';
        }
      } else {
        previewDiv.innerHTML = '';
      }
    });
  }
  
  // 🔹 Mostrar imagen del arma secundaria al seleccionar
  const name2Select = document.getElementById('wm-name2');
  const previewDiv2 = document.createElement('div');
  previewDiv2.id = 'weapon-preview-offhand';
  previewDiv2.style.cssText = 'margin-top: 10px; min-height: 70px; display: flex; justify-content: center; align-items: center; background: rgba(0,0,0,.2); border-radius: 4px; padding: 4px;';
  
  if (name2Select && name2Select.parentNode) {
    name2Select.parentNode.appendChild(previewDiv2);
  }
  
  if (name2Select && previewDiv2) {
    name2Select.addEventListener('change', () => {
      const selectedOption = name2Select.options[name2Select.selectedIndex];
      const itemId = selectedOption.value;
      if (itemId && typeof COMPENDIUM !== 'undefined' && COMPENDIUM[itemId]) {
        const item = COMPENDIUM[itemId];
        const imgPath = getItemImage(item);
        if (imgPath) {
          const reqLevel = item.requirements?.level || '?';
          const reqStr = item.requirements?.STR || '-';
          const reqDex = item.requirements?.DEX || '-';
          const reqInt = item.requirements?.INT || '-';
          
          const statsList = Object.entries(item.stats || {}).slice(0, 3)
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join('-') : v}`)
            .join('<br>');
          
          const tooltipContent = `
            <strong>${getItemName(item, window.lang)}</strong><br>
            📦 Nivel: ${reqLevel}<br>
            ⚔️ STR: ${reqStr} | 🏹 DEX: ${reqDex} | 🔮 INT: ${reqInt}<br>
            📊 ${statsList || 'Sin stats'}
          `;
          
          previewDiv2.innerHTML = `
            <div style="position: relative; display: inline-block;">
              <img src="${imgPath}" style="max-width: 70px; max-height: 70px; border: 1px solid var(--gold); border-radius: 4px; cursor: help;">
              <div class="item-hover-tooltip" style="display: none; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: var(--bg2); color: var(--gold); border: 1px solid var(--gold); padding: 8px 12px; border-radius: 4px; font-size: 10px; font-family: 'Share Tech Mono', monospace; white-space: nowrap; z-index: 1000; margin-bottom: 8px;">
                ${tooltipContent}
              </div>
            </div>
          `;
          
          const containerDiv = previewDiv2.querySelector('div');
          const tooltip = containerDiv?.querySelector('.item-hover-tooltip');
          if (containerDiv && tooltip) {
            containerDiv.addEventListener('mouseenter', () => { tooltip.style.display = 'block'; });
            containerDiv.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });
          }
        } else {
          previewDiv2.innerHTML = '<span style="color:var(--dim);font-size:10px;">🖼️ Sin imagen</span>';
        }
      } else {
        previewDiv2.innerHTML = '';
      }
    });
  }
  
  // Inicializar compatibilidad
  setTimeout(() => updateWeaponCompatibility(), 50);
}

function populateWeaponTypes() {
  if (typeof COMPENDIUM === 'undefined') return;
  
  const currentLang = window.lang || 'es';
  
  // 🔹 DEFINIR MANUALMENTE TODOS LOS TIPOS DE ARMAS POSIBLES
  const weaponSlots = [
    'crossbow',        // ← NUEVO
    'bow',           // Arco
    'crossbow',      // Ballesta (nuevo)
    'dagger',        // Daga
    'sword',         // Espada
    'two-handed sword', // Espadón
    'blunt',         // Arma contundente
    'wand',          // Vara
    'scepter',       // Cetro
    'axe',           // Hacha
    'mace',          // Mazo
    'quiver',        // Carcaj (para arcos)
    'magazine'       // Cargador (para ballestas)
  ];
  
  ['wm-type1', 'wm-type2'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    
    const current = sel.value;
    // Mantener opciones vacías y "sin mano secundaria"
    const options = Array.from(sel.options).filter(o => o.value === '' || o.value === '__none__');
    sel.innerHTML = '';
    options.forEach(o => sel.appendChild(o));
    
    weaponSlots.forEach(slot => {
      const o = document.createElement('option');
      o.value = slot;
      // Traducir el nombre del slot
      let displayName = T_raw[currentLang]?.[`item.slot.${slot}`] || slot;
      // Capitalizar primera letra
      displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
      o.textContent = displayName;
      sel.appendChild(o);
    });
    
    if (current && current !== '__none__') sel.value = current;
  });
}

function wmPopulateNames(hand) {
  if (typeof COMPENDIUM === 'undefined') return;
  
  const currentLang = window.lang || 'es';
  const typeSel = document.getElementById('wm-type' + hand);
  const nameSel = document.getElementById('wm-name' + hand);
  if (!typeSel || !nameSel) return;
  
  const selectedSlot = typeSel.value;
  nameSel.innerHTML = `<option value="">— ${T_raw[currentLang]?.['weapon.name.placeholder'] || 'Seleccionar arma'} —</option>`;
  
  if (!selectedSlot || selectedSlot === '__none__') return;
  
  // 🔹 Buscar items que coincidan con el slot (type puede ser 'weapon' O 'off-hand')
  Object.values(COMPENDIUM).forEach(item => {
    if (item.slot === selectedSlot) {
      const o = document.createElement('option');
      o.value = item.id;
      o.textContent = getItemName(item, currentLang);
      nameSel.appendChild(o);
    }
  });
}

function populateShieldSelect() {
  const shieldSel = document.getElementById('wm-shield');
  if (!shieldSel || typeof COMPENDIUM === 'undefined') return;
  
  const currentLang = window.lang || 'es';
  const currentValue = shieldSel.value;
  
  shieldSel.innerHTML = `<option value="">— ${T_raw[currentLang]?.['shield.none'] || 'Ninguno'} —</option>`;
  
  Object.values(COMPENDIUM).forEach(item => {
    if (item.slot === 'shield') {
      const o = document.createElement('option');
      o.value = item.id;
      o.textContent = getItemName(item, currentLang);
      shieldSel.appendChild(o);
    }
  });
  
  if (currentValue) shieldSel.value = currentValue;
}

// ============================================================
// 2. ARMADURAS Y ACCESORIOS (GEAR GRIDS)
// ============================================================

function populateGearGrids() {
  if (typeof COMPENDIUM === 'undefined') return;
  
  const currentLang = window.lang || 'es';
  
  // Armaduras
  const armorGrid = document.getElementById('grid-armaduras');
  if (armorGrid) {
    armorGrid.innerHTML = '';
    const armorSlots = ['helmet', 'chest', 'spaulders', 'gloves', 'boots'];
    
    armorSlots.forEach(slot => {
      const slotDiv = document.createElement('div');
      slotDiv.className = 'gear-slot';
      slotDiv.innerHTML = `
        <div class="gear-slot-label">${T_raw[currentLang]?.[`item.slot.${slot}`] || slot.toUpperCase()}</div>
        <select id="gs-${slot}" data-slot="${slot}" class="tracker-select" style="width:100%">
          <option value="">— ${T_raw[currentLang]?.['ui.placeholder.select'] || 'Seleccionar'} —</option>
        </select>
        <div class="item-preview" style="margin-top: 8px; min-height: 50px; display: flex; justify-content: center;"></div>
      `;
      armorGrid.appendChild(slotDiv);
      
      const select = slotDiv.querySelector('select');
      const previewDiv = slotDiv.querySelector('.item-preview');
      const items = Object.values(COMPENDIUM).filter(item => item.slot === slot);
      
      items.forEach(item => {
        const o = document.createElement('option');
        o.value = item.id;
        o.textContent = getItemName(item, currentLang);
        
        // Guardar la imagen como atributo
        const imgPath = getItemImage(item);
        if (imgPath) o.setAttribute('data-img', imgPath);
        
        select.appendChild(o);
      });
      
      // Mostrar imagen al seleccionar
      select.addEventListener('change', () => {
        const selected = select.options[select.selectedIndex];
        const imgPath = selected.getAttribute('data-img');
        if (imgPath && previewDiv) {
          previewDiv.innerHTML = `<img src="${imgPath}" style="max-width: 48px; max-height: 48px; border: 1px solid var(--border); border-radius: 4px;">`;
        } else if (previewDiv) {
          previewDiv.innerHTML = '';
        }
      });
    });
  }
  
  // Accesorios (misma lógica)
  const accGrid = document.getElementById('grid-accesorios');
  if (accGrid) {
    accGrid.innerHTML = '';
    const accSlots = ['necklace', 'belt', 'ring'];
    
    accSlots.forEach(slot => {
      const slotDiv = document.createElement('div');
      slotDiv.className = 'gear-slot';
      if (slot === 'ring') slotDiv.classList.add('dual');
      slotDiv.innerHTML = `
        <div class="gear-slot-label">${T_raw[currentLang]?.[`item.slot.${slot}`] || slot.toUpperCase()}</div>
        <select id="gs-${slot}" data-slot="${slot}" class="tracker-select" style="width:100%">
          <option value="">— ${T_raw[currentLang]?.['ui.placeholder.select'] || 'Seleccionar'} —</option>
        </select>
        <div class="item-preview" style="margin-top: 8px; min-height: 50px; display: flex; justify-content: center;"></div>
      `;
      accGrid.appendChild(slotDiv);
      
      const select = slotDiv.querySelector('select');
      const previewDiv = slotDiv.querySelector('.item-preview');
      const items = Object.values(COMPENDIUM).filter(item => item.slot === slot);
      
      items.forEach(item => {
        const o = document.createElement('option');
        o.value = item.id;
        o.textContent = getItemName(item, currentLang);
        
        const imgPath = getItemImage(item);
        if (imgPath) o.setAttribute('data-img', imgPath);
        
        select.appendChild(o);
      });
      
      select.addEventListener('change', () => {
        const selected = select.options[select.selectedIndex];
        const imgPath = selected.getAttribute('data-img');
        if (imgPath && previewDiv) {
          previewDiv.innerHTML = `<img src="${imgPath}" style="max-width: 48px; max-height: 48px; border: 1px solid var(--border); border-radius: 4px;">`;
        } else if (previewDiv) {
          previewDiv.innerHTML = '';
        }
      });
    });
  }
}

// ============================================================
// 3. TABLA DEL COMPENDIO
// ============================================================

function updateCompendiumTable() {
  const tbody = document.getElementById('compendium-tbody');
  if (!tbody || typeof COMPENDIUM === 'undefined') return;
  
  const currentLang = window.lang || 'es';
  const searchTerm = document.getElementById('compendium-search')?.value.toLowerCase() || "";
  
  const filtered = Object.values(COMPENDIUM).filter(item => {
    const name = getItemName(item, currentLang).toLowerCase();
    return name.includes(searchTerm) || item.id.toLowerCase().includes(searchTerm);
  });
  
  tbody.innerHTML = '';
  
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:2rem;">No se encontraron ítems.</td></tr>';
    return;
  }
  
  filtered.forEach(item => {
    const tr = document.createElement('tr');
    const nameDisplay = getItemName(item, currentLang);
    const slotKey = `item.slot.${item.slot}`;
    const slotDisplay = (T_raw?.[currentLang]?.[slotKey]) || item.slot;
    const imgPath = getItemImage(item);
    
    tr.innerHTML = `
      <td class="td-img">${imgPath ? `<img src="${imgPath}" width="32" onerror="this.style.display='none'">` : '—'} </td>
      <td class="td-name"><strong>${nameDisplay}</strong></td>
      <td class="td-slot"><span class="badge-slot">${slotDisplay}</span></td>
      <td class="td-type">${item.type?.toUpperCase() || '—'}</td>
    `;
    tr.setAttribute('data-item-id', item.id);
    tbody.appendChild(tr);
  });
}

// ============================================================
// 4. COMP TABS
// ============================================================

function compTab(pane, btn) {
  document.querySelectorAll('.comp-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.comp-tab').forEach(b => b.classList.remove('active'));
  const target = document.getElementById('pane-' + pane);
  if (target) target.classList.add('active');
  if (btn) btn.classList.add('active');
}

// ============================================================
// 5. VALIDACIÓN
// ============================================================

function wmValidate() {
  const t1 = document.getElementById('wm-type1')?.value;
  const n1 = document.getElementById('wm-name1')?.value;
  const t2 = document.getElementById('wm-type2')?.value;
  const n2 = document.getElementById('wm-name2')?.value;
  const shield = document.getElementById('wm-shield')?.value;
  
  let errors = [];
  let warnings = [];

const crossbows = ['crossbow', 'bowgun', 'arbalest'];
const isCrossbow = crossbows.includes(t1);

if (isCrossbow) {
  if (t2 && t2 !== '' && t2 !== '__none__' && t2 !== 'magazine') {
    errors.push('❌ Las ballestas solo permiten Cargador (Magazine) como mano secundaria.');
  }
  if (shield && shield !== '') {
    errors.push('❌ Las ballestas no son compatibles con escudo.');
  }
}

  // Validación 1: Arma principal obligatoria
  if (!t1 || !n1) {
    errors.push('❌ Seleccioná el tipo y nombre del arma principal.');
  }
  
  // Validación 2: Armas de dos manos
  const twoHanded = ['two-handed sword', 'two-handed axe', 'two-handed mace'];
  const bows = ['bow'];
  const isTwoHanded = twoHanded.includes(t1);
  const isBow = bows.includes(t1);
  
  if (isTwoHanded) {
    if (t2 && t2 !== '' && t2 !== '__none__') {
      errors.push('❌ Las armas de dos manos no permiten mano secundaria.');
    }
    if (shield && shield !== '') {
      errors.push('❌ Las armas de dos manos no son compatibles con escudo.');
    }
  }
  
  // Validación 3: Arcos solo permiten carcaj
  if (isBow) {
    if (t2 && t2 !== '' && t2 !== '__none__' && t2 !== 'quiver') {
      errors.push('❌ Los arcos solo permiten Carcaj (Quiver) como mano secundaria.');
    }
    if (shield && shield !== '') {
      errors.push('❌ Los arcos no son compatibles con escudo.');
    }
  }
  
  // Validación 4: Mano secundaria sin tipo pero con nombre
  if ((!t2 || t2 === '' || t2 === '__none__') && n2 && n2 !== '') {
    warnings.push('⚠️ Tenés un arma secundaria seleccionada pero el tipo está vacío.');
  }
  
  // Mostrar resultado en el panel flotante
  const panel = document.getElementById('wm-result');
  const body = document.getElementById('wm-result-body');
  
  if (panel && body) {
    let html = '';
    
    if (errors.length === 0) {
      html += '<div style="margin-bottom:.8rem;color:#00ff41;font-family:Cinzel,serif;">✓ BUILD VÁLIDA</div>';
    } else {
      html += '<div style="margin-bottom:.8rem;color:var(--red2);font-family:Cinzel,serif;">✕ BUILD INVÁLIDA</div>';
    }
    
    errors.forEach(e => {
      html += `<div style="display:flex;gap:.5rem;margin-bottom:.4rem;padding:.5rem .7rem;border-left:2px solid var(--red2);background:rgba(192,57,43,.07)">
        <span style="color:var(--red2);">⚠</span>
        <span style="color:#c0c0d8;">${e}</span>
      </div>`;
    });
    
    warnings.forEach(w => {
      html += `<div style="display:flex;gap:.5rem;margin-bottom:.4rem;padding:.5rem .7rem;border-left:2px solid var(--gold);background:rgba(201,168,76,.05)">
        <span style="color:var(--gold);">⚡</span>
        <span style="color:#c0c0d8;">${w}</span>
      </div>`;
    });
    
    body.innerHTML = html;
    panel.style.display = 'block';
    
    // Auto-ocultar después de 4 segundos
    setTimeout(() => {
      if (panel) panel.style.display = 'none';
    }, 4000);
  }
}

// Actualizar compatibilidad según arma principal
function updateWeaponCompatibility() {
  const t1 = document.getElementById('wm-type1')?.value;
  const type2Select = document.getElementById('wm-type2');
  const name2Select = document.getElementById('wm-name2');
  const shieldSelect = document.getElementById('wm-shield');
  
  // Definiciones
  const twoHanded = ['two-handed sword', 'two-handed axe', 'two-handed mace'];
  const bows = ['bow'];           // Arcos → solo quiver
  const crossbows = ['crossbow', 'bowgun', 'arbalest']; // Ballestas → solo magazine
  const oneHanded = ['sword', 'dagger', 'wand', 'scepter', 'blunt', 'axe', 'mace', 'claw'];
  
  const isTwoHanded = twoHanded.includes(t1);
  const isBow = bows.includes(t1);
  const isCrossbow = crossbows.includes(t1);
  const isOneHanded = oneHanded.includes(t1) || (!isTwoHanded && !isBow && !isCrossbow);
  
  // 1. Armas de dos manos: deshabilitar todo
  if (isTwoHanded) {
    if (type2Select) {
      type2Select.disabled = true;
      type2Select.value = '__none__';
    }
    if (name2Select) {
      name2Select.disabled = true;
      name2Select.innerHTML = '<option value="">— No compatible —</option>';
      name2Select.value = '';
    }
    if (shieldSelect) {
      shieldSelect.disabled = true;
      shieldSelect.value = '';
    }
  }
  
  // 2. Arcos: solo permitir quiver
  else if (isBow) {
    if (type2Select) {
      type2Select.disabled = false;
      // Filtrar opciones: solo mostrar "quiver"
      const options = Array.from(type2Select.options);
      options.forEach(opt => {
        const isQuiver = opt.value === 'quiver';
        opt.style.display = (opt.value === '' || opt.value === '__none__' || isQuiver) ? '' : 'none';
      });
      if (type2Select.value !== '' && type2Select.value !== '__none__' && type2Select.value !== 'quiver') {
        type2Select.value = '__none__';
      }
    }
    if (shieldSelect) {
      shieldSelect.disabled = true;
      shieldSelect.value = '';
    }
    if (name2Select) name2Select.disabled = false;
  }
  
  // 3. Ballestas/Crossbows: solo permitir magazine
  else if (isCrossbow) {
    if (type2Select) {
      type2Select.disabled = false;
      // Filtrar opciones: solo mostrar "magazine"
      const options = Array.from(type2Select.options);
      options.forEach(opt => {
        const isMagazine = opt.value === 'magazine';
        opt.style.display = (opt.value === '' || opt.value === '__none__' || isMagazine) ? '' : 'none';
      });
      if (type2Select.value !== '' && type2Select.value !== '__none__' && type2Select.value !== 'magazine') {
        type2Select.value = '__none__';
      }
    }
    if (shieldSelect) {
      shieldSelect.disabled = true;
      shieldSelect.value = '';
    }
    if (name2Select) name2Select.disabled = false;
  }
  
  // 4. Armas de una mano: todo habilitado
  else {
    if (type2Select) {
      type2Select.disabled = false;
      // Restaurar visibilidad de todas las opciones
      Array.from(type2Select.options).forEach(opt => {
        opt.style.display = '';
      });
    }
    if (name2Select) name2Select.disabled = false;
    if (shieldSelect) shieldSelect.disabled = false;
  }
  
  // Mostrar mensaje de advertencia
  showCompatibilityWarning(isTwoHanded, isBow, isCrossbow);
}

// Actualizar la función de mensaje para incluir ballestas
function showCompatibilityWarning(isTwoHanded, isBow, isCrossbow) {
  let warningMsg = document.getElementById('compatibility-warning');
  const currentLang = window.lang || 'es';
  
  const messages = {
    twoHanded: {
      es: '⚠️ Arma de dos manos detectada. Mano secundaria y escudo deshabilitados.',
      en: '⚠️ Two-handed weapon detected. Off-hand and shield disabled.'
    },
    bow: {
      es: '🏹 Arco detectado. Solo se permite Carcaj (Quiver) como mano secundaria.',
      en: '🏹 Bow detected. Only Quiver allowed as off-hand.'
    },
    crossbow: {
      es: '🏹 Ballesta detectada. Solo se permite Cargador (Magazine) como mano secundaria.',
      en: '🏹 Crossbow detected. Only Magazine allowed as off-hand.'
    }
  };
  
  if (!warningMsg) {
    warningMsg = document.createElement('div');
    warningMsg.id = 'compatibility-warning';
    warningMsg.style.cssText = 'color:var(--gold);font-size:10px;margin-top:.5rem;padding:.3rem;border-left:2px solid var(--gold);background:rgba(201,168,76,.1);';
    const container = document.getElementById('wm-type1')?.closest('.gear-slot')?.parentNode;
    if (container) container.appendChild(warningMsg);
  }
  
  if (isTwoHanded) {
    warningMsg.innerHTML = messages.twoHanded[currentLang] || messages.twoHanded.es;
    warningMsg.style.display = 'block';
  } 
  else if (isBow) {
    warningMsg.innerHTML = messages.bow[currentLang] || messages.bow.es;
    warningMsg.style.display = 'block';
  }
  else if (isCrossbow) {
    warningMsg.innerHTML = messages.crossbow[currentLang] || messages.crossbow.es;
    warningMsg.style.display = 'block';
  }
  else {
    warningMsg.style.display = 'none';
  }
}

// ============================================================
// 6. INICIALIZACIÓN PRINCIPAL
// ============================================================

let initialized = false;

function initCompendium() {
  if (initialized) return;
  if (typeof COMPENDIUM === 'undefined') {
    setTimeout(initCompendium, 300);
    return;
  }
  
  buildWeaponMatrixUI();
  populateGearGrids();
  updateCompendiumTable();
  
  // Event listener para búsqueda
  document.getElementById('compendium-search')?.addEventListener('input', updateCompendiumTable);
  
  initialized = true;
  console.log('📚 Compendium inicializado correctamente');
}

function refreshAll() {
  if (typeof COMPENDIUM === 'undefined') return;
  
  // Recargar todo con el nuevo idioma
  buildWeaponMatrixUI();
  populateGearGrids();
  updateCompendiumTable();
  
  // Refrescar runas si existe la función
  if (typeof renderRunePanel === 'function') renderRunePanel();
}

// Exponer funciones globales
window.getItemName = getItemName;
window.wmPopulateNames = wmPopulateNames;
window.updateCompendiumTable = updateCompendiumTable;
window.compTab = compTab;
window.wmValidate = wmValidate;
window.initCompendium = initCompendium;
window.refreshAll = refreshAll;

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initCompendium, 500);
});