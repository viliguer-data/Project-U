// ============================================================
//  PROJECT U — WEAPON MATRIX MODULE
//  Paste this inside a <script> tag in Project_U_beta_1.2.html
//  or load it as: <script src="weapon_matrix.js"></script>
// ============================================================

const WEAPON_DATABASE = {

  // ── 1H MELEE ──────────────────────────────────────────────
  Daga: {
    category:    'Melee',
    handedness:  '1H',
    canDualWield: true,
    baseTypes: [
      {
        name: 'Daga Común',
        requirements: { DEX: 20 },
        unique: false,
      },
      {
        name: 'Daga Ritual',
        requirements: { INT: 25 },
        unique: false,
      },
      {
        name: 'Colmillo Sombrío',
        requirements: { DEX: 40, STR: 10 },
        unique: true,
      },
    ],
    runeSlotSuggestion: (req) => {
      if (req.INT  && req.INT  >= (req.DEX || 0) && req.INT  >= (req.STR || 0)) return { color: 'Azul',  stat: 'INT',  reason: 'Daga mágica — priorizá runas de daño elemental' };
      if (req.STR  && req.STR  >= (req.DEX || 0))                                return { color: 'Rojo',  stat: 'STR',  reason: 'Daga de fuerza — priorizá runas de daño físico' };
      return                                                                             { color: 'Verde', stat: 'DEX',  reason: 'Daga ágil — priorizá runas de velocidad y crítico' };
    },
  },

  Espada: {
    category:    'Melee',
    handedness:  '1H',
    canDualWield: true,
    baseTypes: [
      { name: 'Espada Corta',     requirements: { STR: 15, DEX: 15 }, unique: false },
      { name: 'Espada Larga',     requirements: { STR: 30 },          unique: false },
      { name: 'Espada del Caos',  requirements: { STR: 50, INT: 20 }, unique: true  },
    ],
    runeSlotSuggestion: (req) => {
      if (req.INT && req.INT >= (req.STR || 0)) return { color: 'Azul',  stat: 'INT',  reason: 'Espada arcana — runas de daño mágico' };
      if (req.DEX && req.DEX >= (req.STR || 0)) return { color: 'Verde', stat: 'DEX',  reason: 'Espada ágil — runas de crítico' };
      return                                           { color: 'Rojo',  stat: 'STR',  reason: 'Espada de fuerza — runas de daño físico' };
    },
  },

  Hacha: {
    category:    'Melee',
    handedness:  '1H',
    canDualWield: true,
    baseTypes: [
      { name: 'Hacha de Mano',    requirements: { STR: 25 },          unique: false },
      { name: 'Hacha de Guerra',  requirements: { STR: 40 },          unique: false },
      { name: 'Hacha Maldita',    requirements: { STR: 35, INT: 15 }, unique: true  },
    ],
    runeSlotSuggestion: (req) => {
      if (req.INT && req.INT > (req.DEX || 0)) return { color: 'Azul', stat: 'INT', reason: 'Hacha imbuida — runas de daño elemental' };
      return                                          { color: 'Rojo', stat: 'STR', reason: 'Hacha pura — runas de daño físico bruto' };
    },
  },

  Blunt: {
    category:    'Melee',
    handedness:  '1H',
    canDualWield: true,
    baseTypes: [
      { name: 'Maza',             requirements: { STR: 20 },          unique: false },
      { name: 'Martillo de Mano', requirements: { STR: 30 },          unique: false },
      { name: 'Cetro Oscuro',     requirements: { STR: 25, INT: 20 }, unique: true  },
    ],
    runeSlotSuggestion: (req) => {
      if (req.INT && req.INT >= (req.STR || 0)) return { color: 'Azul', stat: 'INT', reason: 'Blunt mágico — runas de daño de área' };
      return                                          { color: 'Rojo', stat: 'STR', reason: 'Blunt físico — runas de stun y daño bruto' };
    },
  },

  Scepter: {
    category:    'Melee / Casting',
    handedness:  '1H',
    canDualWield: true,
    baseTypes: [
      { name: 'Scepter Básico',   requirements: { INT: 20, STR: 10 }, unique: false },
      { name: 'Scepter Arcano',   requirements: { INT: 40 },          unique: false },
      { name: 'Ojo del Abismo',   requirements: { INT: 55 },          unique: true  },
    ],
    runeSlotSuggestion: () => ({ color: 'Azul', stat: 'INT', reason: 'Scepter — siempre runas de INT y daño mágico' }),
  },

  Wand: {
    category:    'Casting',
    handedness:  '1H',
    canDualWield: true,
    baseTypes: [
      { name: 'Varita de Madera', requirements: { INT: 15 },          unique: false },
      { name: 'Varita de Cristal',requirements: { INT: 35 },          unique: false },
      { name: 'Varita del Vacío', requirements: { INT: 50 },          unique: true  },
    ],
    runeSlotSuggestion: () => ({ color: 'Azul', stat: 'INT', reason: 'Wand — runas de INT, velocidad de cast y daño elemental' }),
  },

  // ── 2H MELEE ──────────────────────────────────────────────
  Staff: {
    category:    'Casting',
    handedness:  '2H',
    canDualWield: false,
    baseTypes: [
      { name: 'Bastón de Roble',  requirements: { INT: 20 },          unique: false },
      { name: 'Bastón de Hueso',  requirements: { INT: 40 },          unique: false },
      { name: 'Bastón del Caos',  requirements: { INT: 60 },          unique: true  },
    ],
    runeSlotSuggestion: () => ({ color: 'Azul', stat: 'INT', reason: 'Staff 2H — máxima prioridad en runas de INT y área de efecto' }),
  },

  'Great Sword': {
    category:    'Melee',
    handedness:  '2H',
    canDualWield: false,
    baseTypes: [
      { name: 'Espadón',          requirements: { STR: 40 },          unique: false },
      { name: 'Espadón Rúnico',   requirements: { STR: 50, INT: 15 }, unique: false },
      { name: 'Filo del Juicio',  requirements: { STR: 65 },          unique: true  },
    ],
    runeSlotSuggestion: (req) => {
      if (req.INT && req.INT >= 15) return { color: 'Rojo', stat: 'STR', reason: 'Great Sword rúnica — runas físicas con bonus elemental' };
      return                               { color: 'Rojo', stat: 'STR', reason: 'Great Sword — máximo daño físico, runas rojas' };
    },
  },

  'Giant Axe': {
    category:    'Melee',
    handedness:  '2H',
    canDualWield: false,
    baseTypes: [
      { name: 'Hacha Gigante',    requirements: { STR: 50 },          unique: false },
      { name: 'Hacha Berserker',  requirements: { STR: 60, DEX: 10 }, unique: false },
      { name: 'Hacha del Titán',  requirements: { STR: 75 },          unique: true  },
    ],
    runeSlotSuggestion: () => ({ color: 'Rojo', stat: 'STR', reason: 'Giant Axe — prioridad absoluta en runas de STR y daño de área' }),
  },

  'Giant Hammer': {
    category:    'Melee',
    handedness:  '2H',
    canDualWield: false,
    baseTypes: [
      { name: 'Gran Martillo',    requirements: { STR: 55 },          unique: false },
      { name: 'Martillo Sísmico', requirements: { STR: 70 },          unique: false },
      { name: 'Puño del Dios',    requirements: { STR: 80 },          unique: true  },
    ],
    runeSlotSuggestion: () => ({ color: 'Rojo', stat: 'STR', reason: 'Giant Hammer — runas de STR, stun y daño de impacto' }),
  },

  // ── RANGED ────────────────────────────────────────────────
  'Long Bow': {
    category:    'Ranged',
    handedness:  '2H',
    canDualWield: false,
    baseTypes: [
      { name: 'Arco Largo',       requirements: { DEX: 30 },          unique: false },
      { name: 'Arco de Yew',      requirements: { DEX: 45 },          unique: false },
      { name: 'Arco Estelar',     requirements: { DEX: 60 },          unique: true  },
    ],
    runeSlotSuggestion: () => ({ color: 'Verde', stat: 'DEX', reason: 'Long Bow — runas de DEX, alcance y daño por proyectil' }),
  },

  'Steel Bow': {
    category:    'Ranged',
    handedness:  '2H',
    canDualWield: false,
    baseTypes: [
      { name: 'Arco de Acero',    requirements: { DEX: 25, STR: 15 }, unique: false },
      { name: 'Arco Compuesto',   requirements: { DEX: 40, STR: 20 }, unique: false },
      { name: 'Arco del Cazador', requirements: { DEX: 55, STR: 25 }, unique: true  },
    ],
    runeSlotSuggestion: (req) => {
      if (req.STR >= req.DEX) return { color: 'Rojo',  stat: 'STR', reason: 'Steel Bow físico — runas de STR y penetración' };
      return                         { color: 'Verde', stat: 'DEX', reason: 'Steel Bow ágil — runas de DEX y velocidad de ataque' };
    },
  },

  BowGun: {
    category:    'Ranged',
    handedness:  '2H',
    canDualWield: false,
    baseTypes: [
      { name: 'Ballesta Ligera',  requirements: { DEX: 20, STR: 10 }, unique: false },
      { name: 'Ballesta Pesada',  requirements: { STR: 30, DEX: 15 }, unique: false },
      { name: 'Ballesta Arcana',  requirements: { INT: 30, DEX: 20 }, unique: true  },
    ],
    runeSlotSuggestion: (req) => {
      if (req.INT && req.INT >= (req.STR || 0) && req.INT >= (req.DEX || 0))
        return { color: 'Azul',  stat: 'INT',  reason: 'BowGun arcana — runas de INT y daño elemental a distancia' };
      if (req.STR >= (req.DEX || 0))
        return { color: 'Rojo',  stat: 'STR',  reason: 'BowGun pesada — runas de STR y perforación' };
      return   { color: 'Verde', stat: 'DEX',  reason: 'BowGun ligera — runas de DEX y cadencia de fuego' };
    },
  },

  // ── OFF-HAND ──────────────────────────────────────────────
  Quiver: {
    category:    'Off-hand',
    handedness:  'Off-hand',
    canDualWield: false,
    pairedWith:  ['Long Bow', 'Steel Bow', 'BowGun'],
    baseTypes: [
      { name: 'Carcaj de Cuero',  requirements: { DEX: 10 },          unique: false },
      { name: 'Carcaj Rúnico',    requirements: { DEX: 25, INT: 10 }, unique: false },
      { name: 'Carcaj Eterno',    requirements: { DEX: 40 },          unique: true  },
    ],
    runeSlotSuggestion: () => ({ color: 'Verde', stat: 'DEX', reason: 'Quiver — runas de DEX para potenciar proyectiles' }),
  },

  Magazine: {
    category:    'Off-hand',
    handedness:  'Off-hand',
    canDualWield: false,
    pairedWith:  ['BowGun'],
    baseTypes: [
      { name: 'Cargador Estándar',requirements: { STR: 10 },          unique: false },
      { name: 'Cargador Arcano',  requirements: { INT: 20 },          unique: false },
      { name: 'Cargador Omega',   requirements: { STR: 25, INT: 15 }, unique: true  },
    ],
    runeSlotSuggestion: (req) => {
      if (req.INT && req.INT >= (req.STR || 0)) return { color: 'Azul', stat: 'INT',  reason: 'Magazine arcano — runas de INT para proyectiles mágicos' };
      return                                          { color: 'Rojo', stat: 'STR',  reason: 'Magazine físico — runas de STR para mayor impacto' };
    },
  },
};


// ============================================================
//  getRuneSuggestion(weaponType, weaponName)
//  Returns rune color suggestion for a given weapon instance.
// ============================================================
function getRuneSuggestion(weaponType, weaponName) {
  const cat = WEAPON_DATABASE[weaponType];
  if (!cat) return null;

  const base = cat.baseTypes.find(w => w.name === weaponName);
  if (!base) return null;

  return cat.runeSlotSuggestion(base.requirements);
}


// ============================================================
//  validateBuild(weapon1, weapon2)
//
//  weapon1 / weapon2 shape:
//  {
//    type: 'Daga',           // key in WEAPON_DATABASE
//    name: 'Daga Ritual',    // must match a baseTypes entry
//  }
//
//  Returns: { valid: bool, errors: string[], warnings: string[], runeAdvice: object }
// ============================================================
function validateBuild(weapon1, weapon2 = null) {
  const msg = {
    es: {
      unknownType: (t) => `Tipo de arma desconocido: "${t}"`,
      notFound: (n,t) => `Arma no encontrada: "${n}" en categoría "${t}"`,
      twoHand: (n) => `"${n}" es un arma a 2 manos — no podés equipar nada en la mano secundaria.`,
      offhandIncompat: (n,t,p,m) => `"${n}" (${t}) solo se puede usar con: ${p.join(', ')}. No es compatible con "${m}".`,
      noDual: (n) => `"${n}" no admite dual wield.`,
      uniqueDup: (n) => `❌ Exclusividad de Único: No podés equipar dos copias de "${n}". Los ítems Únicos no se pueden duplicar en Dual Wield.`,
      statConflict: (n1,s1,n2,s2) => `⚠ Conflicto de stats: "${n1}" prioriza ${s1} pero "${n2}" prioriza ${s2}. Considerá si tu build puede satisfacer ambos requerimientos eficientemente.`,
    },
    en: {
      unknownType: (t) => `Unknown weapon type: "${t}"`,
      notFound: (n,t) => `Weapon not found: "${n}" in category "${t}"`,
      twoHand: (n) => `"${n}" is 2H — cannot equip off-hand.`,
      offhandIncompat: (n,t,p,m) => `"${n}" (${t}) can only be used with: ${p.join(', ')}. Incompatible with "${m}".`,
      noDual: (n) => `"${n}" does not support dual wield.`,
      uniqueDup: (n) => `❌ Unique exclusivity: Cannot equip two copies of "${n}". Uniques cannot be duplicated.`,
      statConflict: (n1,s1,n2,s2) => `⚠ Stat conflict: "${n1}" prioritizes ${s1} but "${n2}" prioritizes ${s2}. Consider if your build can meet both.`,
    },
    ru: {
      unknownType: (t) => `Неизвестный тип оружия: "${t}"`,
      notFound: (n,t) => `Оружие не найдено: "${n}" в категории "${t}"`,
      twoHand: (n) => `"${n}" — двуручное, нельзя экипировать вторую руку.`,
      offhandIncompat: (n,t,p,m) => `"${n}" (${t}) можно использовать только с: ${p.join(', ')}. Несовместимо с "${m}".`,
      noDual: (n) => `"${n}" не поддерживает dual wield.`,
      uniqueDup: (n) => `❌ Эксклюзивность Уника: Нельзя экипировать два "${n}". Уники не дублируются.`,
      statConflict: (n1,s1,n2,s2) => `⚠ Конфликт статов: "${n1}" приоритизирует ${s1}, но "${n2}" — ${s2}. Рассмотри, сможет ли билд удовлетворить оба.`,
    },
    pt: {
      unknownType: (t) => `Tipo de arma desconhecido: "${t}"`,
      notFound: (n,t) => `Arma não encontrada: "${n}" na categoria "${t}"`,
      twoHand: (n) => `"${n}" é arma 2 mãos — não pode equipar secundária.`,
      offhandIncompat: (n,t,p,m) => `"${n}" (${t}) só pode ser usada com: ${p.join(', ')}. Incompatível com "${m}".`,
      noDual: (n) => `"${n}" não suporta dual wield.`,
      uniqueDup: (n) => `❌ Exclusividade Única: Não pode equipar duas cópias de "${n}". Únicos não duplicam.`,
      statConflict: (n1,s1,n2,s2) => `⚠ Conflito de stats: "${n1}" prioriza ${s1} mas "${n2}" prioriza ${s2}. Considere se seu build atende ambos.`,
    }
  };
  const texts = msg[lang] || msg.es;

  const result = { valid: true, errors: [], warnings: [], runeAdvice: {} };

  // ── Validate weapon1 ──────────────────────────────────────
  const cat1 = WEAPON_DATABASE[weapon1.type];
  if (!cat1) {
    result.errors.push(texts.unknownType(weapon1.type));
    result.valid = false;
    return result;
  }

  const base1 = cat1.baseTypes.find(w => w.name === weapon1.name);
  if (!base1) {
    result.errors.push(texts.notFound(weapon1.name, weapon1.type));
    result.valid = false;
    return result;
  }

  result.runeAdvice.mainHand = {
    weapon: weapon1.name,
    ...cat1.runeSlotSuggestion(base1.requirements),
  };

  // ── No off-hand? Return early ─────────────────────────────
  if (!weapon2) return result;

  // ── Validate weapon2 ──────────────────────────────────────
  const cat2 = WEAPON_DATABASE[weapon2.type];
  if (!cat2) {
    result.errors.push(texts.unknownType(weapon2.type) + ' en mano secundaria');
    result.valid = false;
    return result;
  }

  const base2 = cat2.baseTypes.find(w => w.name === weapon2.name);
  if (!base2) {
    result.errors.push(texts.notFound(weapon2.name, weapon2.type));
    result.valid = false;
    return result;
  }

  // ── Rule: 2H weapons can't have an off-hand ───────────────
  if (cat1.handedness === '2H') {
    result.errors.push(texts.twoHand(weapon1.name));
    result.valid = false;
    return result;
  }

  // ── Rule: Off-hand pairing validation ─────────────────────
  if (cat2.handedness === 'Off-hand') {
    const paired = cat2.pairedWith || [];
    if (!paired.includes(weapon1.type)) {
      result.errors.push(texts.offhandIncompat(weapon2.name, weapon2.type, paired, weapon1.type));
      result.valid = false;
      return result;
    }
  }

  // ── Rule: 1H only in off-hand if canDualWield ─────────────
  if (cat2.handedness === '1H' && !cat1.canDualWield) {
    result.errors.push(texts.noDual(weapon1.name));
    result.valid = false;
    return result;
  }

  // ── Rule: Unique exclusivity — no identical uniques ───────
  if (
    base1.unique &&
    base2.unique &&
    weapon1.type === weapon2.type &&
    weapon1.name === weapon2.name
  ) {
    result.errors.push(texts.uniqueDup(weapon1.name));
    result.valid = false;
    return result;
  }

  // ── Rule: Warn if stat requirements conflict badly ─────────
  const req1 = base1.requirements;
  const req2 = base2.requirements;
  const mainStat1 = Object.entries(req1).sort((a,b) => b[1]-a[1])[0][0];
  const mainStat2 = Object.entries(req2).sort((a,b) => b[1]-a[1])[0][0];

  if (mainStat1 !== mainStat2) {
    result.warnings.push(texts.statConflict(weapon1.name, mainStat1, weapon2.name, mainStat2));
  }

  result.runeAdvice.offHand = {
    weapon: weapon2.name,
    ...cat2.runeSlotSuggestion(base2.requirements),
  };

  return result;
}


// ── Quick usage examples (remove in production) ──────────────
/*
// Example 1: Valid Dual Wield
console.log(validateBuild(
  { type: 'Daga', name: 'Daga Ritual' },
  { type: 'Daga', name: 'Daga Común' }
));

// Example 2: Blocked — duplicate Unique
console.log(validateBuild(
  { type: 'Daga', name: 'Colmillo Sombrío' },
  { type: 'Daga', name: 'Colmillo Sombrío' }
));

// Example 3: Blocked — 2H + off-hand
console.log(validateBuild(
  { type: 'Staff', name: 'Bastón del Caos' },
  { type: 'Daga',  name: 'Daga Común' }
));

// Example 4: Ranged + Quiver
console.log(validateBuild(
  { type: 'Long Bow', name: 'Arco Estelar' },
  { type: 'Quiver',   name: 'Carcaj Eterno' }
));

// Example 5: Get rune suggestion only
console.log(getRuneSuggestion('BowGun', 'Ballesta Arcana'));
*/
