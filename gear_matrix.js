 // ============================================================
//  PROJECT U — GEAR & ACCESSORY MATRIX
//  Slots: Casco, Pechera, Hombreras, Guantes, Botas,
//         Necklace, Cinturón, Anillo x2
//  Load AFTER weapon_matrix.js
// ============================================================

const GEAR_DATABASE = {

  // ── ARMOR SLOTS ──────────────────────────────────────────
  Casco: {
    slot:      'armor',
    baseTypes: [
      {
        name:         'Corona del Rey Caído',
        unique:       true,
        requirements: { STR: 150, INT: 50 },
        wardrobeBuff: { stat: { es: 'Daño Crítico', en: 'Critical Damage', ru: 'Критический урон', pt: 'Dano Crítico' }, value: '+10%', condition: { es: 'HP al máximo', en: 'HP full', ru: 'HP полное', pt: 'HP cheio' } },
        lore: {
          flavor:  { es: '"Una corona pesada para una cabeza que ya no existe."', en: '"A heavy crown for a head that no longer exists."', ru: '"Тяжёлая корона для головы, которой больше нет."', pt: '"Uma coroa pesada para uma cabeça que não existe mais."' },
          passive: { es: '+10% de Daño Crítico si tu vida está al máximo.', en: '+10% Critical Damage if HP is full.', ru: '+10% Критического урона если HP полное.', pt: '+10% Dano Crítico se HP estiver cheio.' },
        },
        conditionals: [
          { if: 'hp_full', then: 'crit_dmg', value: 10, label: { es: 'Si HP al máximo: +10% Daño Crítico', en: 'If HP full: +10% Critical Damage', ru: 'Если HP полное: +10% Критический урон', pt: 'Se HP cheio: +10% Dano Crítico' } },
        ],
      },
    ],
  },

  Pechera: {
    slot:      'armor',
    baseTypes: [
      {
        name:         'Placa de Asalto',
        unique:       true,
        requirements: { STR: 200 },
        wardrobeBuff: { stat: { es: 'Daño Crítico', en: 'Critical Damage', ru: 'Критический урон', pt: 'Dano Crítico' }, value: '+10%', condition: { es: 'HP al máximo', en: 'HP full', ru: 'HP полное', pt: 'HP cheio' } },
        lore: {
          flavor:  { es: '"Brilla con la energía de mil batallas olvidadas."', en: '"Shines with the energy of a thousand forgotten battles."', ru: '"Светится энергией тысячи забытых битв."', pt: '"Brilha com a energia de mil batalhas esquecidas."' },
          passive: { es: 'Genera una explosión de energía al recibir un golpe crítico.', en: 'Generates energy explosion on critical hit taken.', ru: 'Генерирует взрыв энергии при получении крита.', pt: 'Gera explosão de energia ao receber crítico.' },
        },
        conditionals: [],
      },
      {
        name:         'Túnica del Sabio',
        unique:       true,
        requirements: { INT: 150 },
        wardrobeBuff: { stat: 'Regeneración de Maná', value: '+20%', condition: null },
        lore: {
          flavor:  '"El hilo es seda, el poder es eterno."',
          passive: '+20% Regeneración de Maná. +5% Velocidad de Cast.',
        },
        conditionals: [],
      },
    ],
  },

  Hombreras: {
    slot:      'armor',
    baseTypes: [
      {
        name:         'Protección del Augurio',
        unique:       true,
        requirements: { DEX: 150 },
        wardrobeBuff: { stat: { es: 'Esquiva', en: 'Dodge', ru: 'Уклонение', pt: 'Esquiva' }, value: '+10%', condition: { es: 'Moviéndose', en: 'Moving', ru: 'В движении', pt: 'Movendo-se' } },
        lore: {
          flavor: { es: '"El peso del destino descansa sobre los hombros."', en: '"The weight of fate rests on the shoulders."', ru: '"Вес судьбы лежит на плечах."', pt: '"O peso do destino repousa nos ombros."' },
          passive: { es: '+10% Probabilidad de Esquiva si te has movido recientemente.', en: '+10% Dodge Chance if moved recently.', ru: '+10% Шанс уклонения если двигались недавно.', pt: '+10% Chance de Esquiva se movido recentemente.' },
        },
        conditionals: [
          { if: 'DEX > STR', then: 'immune_chill', label: { es: 'Si DEX > STR: Inmunidad a Ralentización', en: 'If DEX > STR: Chill Immunity', ru: 'Если DEX > STR: Иммунитет к Замедлению', pt: 'Se DEX > STR: Imunidade a Lentidão' } },
        ],
      },
    ],
  },

  Guantes: {
    slot:      'armor',
    baseTypes: [
      {
        name:         'Guantes del Ejecutor',
        unique:       true,
        requirements: { STR: 180, DEX: 60 },
        wardrobeBuff: { stat: { es: 'Velocidad de Ataque', en: 'Attack Speed', ru: 'Скорость Атаки', pt: 'Velocidade de Ataque' }, value: '+6%', condition: null },
        lore: {
          flavor: { es: '"Cada dedo es una sentencia."', en: '"Each finger is a sentence."', ru: '"Каждый палец — приговор."', pt: '"Cada dedo é uma sentença."' },
          passive: { es: '+6% Velocidad de Ataque. Si STR > DEX: +4% Daño Físico adicional.', en: '+6% Attack Speed. If STR > DEX: +4% Physical Damage.', ru: '+6% Скорости Атаки. Если STR > DEX: +4% Физического урона.', pt: '+6% Velocidade de Ataque. Se STR > DEX: +4% Dano Físico.' },
        },
        conditionals: [
          { if: 'STR > DEX', then: 'phys_dmg_bonus', value: 4, label: { es: 'Si STR > DEX: +4% Daño Físico adicional', en: 'If STR > DEX: +4% Physical Damage bonus', ru: 'Если STR > DEX: +4% Доп. Физического урона', pt: 'Se STR > DEX: +4% Dano Físico adicional' } },
        ],
      },
    ],
  },

  Botas: {
    slot:      'armor',
    baseTypes: [
      {
        name:         'Pasos del Viento',
        unique:       true,
        requirements: { DEX: 250 },
        wardrobeBuff: { stat: { es: 'Resistencia a Ralentización', en: 'Slow Resistance', ru: 'Сопротивление Замедлению', pt: 'Resistência a Lentidão' }, value: 'Inmune', condition: { es: '5s de movimiento', en: '5s movement', ru: '5с движения', pt: '5s de movimento' } },
        lore: {
          flavor: { es: '"El suelo es solo una sugerencia para quien corre con el aire."', en: '"The ground is just a suggestion for those who run with the wind."', ru: '"Земля — лишь совет для бегущего с ветром."', pt: '"O chão é só uma sugestão para quem corre com o ar."' },
          passive: { es: 'Inmunidad a Ralentización si te has movido durante 5 segundos consecutivos.', en: 'Slow Immunity after 5s continuous movement.', ru: 'Иммунитет к Замедлению после 5с непрерывного движения.', pt: 'Imunidade a Lentidão após 5s de movimento contínuo.' },
        },
        conditionals: [
          { if: 'DEX >= 250', then: 'immune_slow', label: { es: 'Requiere DEX ≥ 250 para activar inmunidad', en: 'Requires DEX ≥ 250 to activate immunity', ru: 'Требует DEX ≥ 250 для активации иммунитета', pt: 'Requer DEX ≥ 250 para ativar imunidade' } },
        ],
      },
    ],
  },

  // ── ACCESSORY SLOTS ──────────────────────────────────────
  Necklace: {
    slot:      'accessory',
    baseTypes: [
      {
        name:         'Collar de la Verdad',
        unique:       true,
        requirements: { INT: 280 },
        wardrobeBuff: { stat: { es: 'Velocidad de Lanzamiento', en: 'Cast Speed', ru: 'Скорость Заклинаний', pt: 'Velocidade de Lançamento' }, value: '+12%', condition: null },
        lore: {
          flavor: { es: '"La mentira se deshace ante el brillo de la razón."', en: '"Lies dissolve before the brilliance of reason."', ru: '"Ложь тает перед сиянием разума."', pt: '"A mentira se desfaz diante do brilho da razão."' },
          passive: { es: '+12% Velocidad de Lanzamiento de Hechizos.', en: '+12% Spell Cast Speed.', ru: '+12% Скорости заклинаний.', pt: '+12% Velocidade de Lançamento de Feitiços.' },
        },
        conditionals: [
          { if: 'INT > STR && INT > DEX', then: 'cast_speed', value: 12, label: { es: 'Máximo efecto si INT es el stat dominante', en: 'Max effect if INT is dominant stat', ru: 'Макс эффект если INT доминирует', pt: 'Efeito máx se INT dominante' } },
        ],
      },
      {
        name:         'Colgante de Ámbar',
        unique:       true,
        requirements: { INT: 80, DEX: 40 },
        wardrobeBuff: { stat: { es: 'Resistencia al Rayo', en: 'Lightning Resistance', ru: 'Сопротивление Молнии', pt: 'Resistência a Raio' }, value: '+10%', condition: null },
        lore: {
          flavor: { es: '"Atrapa la luz de un sol muerto."', en: '"Captures the light of a dead sun."', ru: '"Ловит свет мёртвого солнца."', pt: '"Captura a luz de um sol morto."' },
          passive: { es: '+10% Resistencia al Rayo. Si INT > DEX: +5% adicional.', en: '+10% Lightning Res. If INT > DEX: +5% more.', ru: '+10% Сопротивления Молнии. Если INT > DEX: +5% дополнительно.', pt: '+10% Res. Raio. Se INT > DEX: +5% a mais.' },
        },
        conditionals: [
          { if: 'INT > DEX', then: 'lightning_res', value: 5, label: { es: 'Si INT > DEX: +5% Res. Rayo adicional', en: 'If INT > DEX: +5% Lightning Res bonus', ru: 'Если INT > DEX: +5% доп. Сопротивления Молнии', pt: 'Se INT > DEX: +5% Res. Raio adicional' } },
        ],
      },
    ],
  },

  Cinturón: {
    slot:      'accessory',
    baseTypes: [
      {
        name:         'Banda de Cuero Reforzada',
        unique:       true,
        requirements: { STR: 100 },
        wardrobeBuff: { stat: 'HP Máximo', value: '+150', condition: null },
        lore: {
          flavor:  '"Lo simple dura. Lo complicado se rompe."',
          passive: '+150 HP Máximo. +5% Resistencia al Fuego.',
        },
        conditionals: [],
      },
    ],
  },

  Anillo: {
    slot:      'accessory',
    dualSlot:  true,
    baseTypes: [
      {
        name:         'Sello de Lazo de Sangre',
        unique:       true,
        requirements: { STR: 300 },
        wardrobeBuff: { stat: { es: 'Daño Físico', en: 'Physical Damage', ru: 'Физический урон', pt: 'Dano Físico' }, value: '+15%', condition: { es: 'STR > 300', en: 'STR > 300', ru: 'STR > 300', pt: 'STR > 300' } },
        lore: {
          flavor: { es: '"La hermandad se sella con el hierro de la sangre."', en: '"Brotherhood sealed with iron blood."', ru: '"Братство запечатано железом крови."', pt: '"A irmandade selada com ferro do sangue."' },
          passive: { es: 'Si STR > 300: +15% Daño Físico y Robo de Vida.', en: 'If STR > 300: +15% Physical Damage & Lifesteal.', ru: 'Если STR > 300: +15% Физического урона и Кража Жизни.', pt: 'Se STR > 300: +15% Dano Físico e Roubo de Vida.' },
        },
        conditionals: [
          { if: 'STR > 300', then: 'phys_dmg + lifesteal', label: { es: 'El efecto solo se activa si STR supera 300', en: 'Effect activates only if STR exceeds 300', ru: 'Эффект активируется только если STR > 300', pt: 'Efeito ativa só se STR > 300' } },
        ],
      },
      {
        name:         'Sello de la Vorágine',
        unique:       true,
        requirements: { INT: 100 },
        wardrobeBuff: { stat: { es: 'Velocidad de Lanzamiento', en: 'Cast Speed', ru: 'Скорость Заклинаний', pt: 'Velocidade de Lançamento' }, value: '+5%', condition: null },
        lore: {
          flavor: { es: '"El vacío cabe en un dedo."', en: '"The void fits on a finger."', ru: '"Пустота помещается на палец."', pt: '"O vazio cabe em um dedo."' },
          passive: { es: '+5% Velocidad de Lanzamiento.', en: '+5% Cast Speed.', ru: '+5% Скорости заклинаний.', pt: '+5% Velocidade de Lançamento.' },
        },
        conditionals: [],
      },
    ],
  },
};


// ============================================================

//  WARDROBE STATE
//  Tracks which gear items are stored in the permanent chest.
//  Buffs are active only while stored. When removed → buff gone.
// ============================================================
const WARDROBE = {
  _state: {},

  toggle(slot, name) {
    const key = `${slot}::${name}`;
    this._state[key] = !this._state[key];
    return this._state[key];
  },

  isStored(slot, name) {
    return !!this._state[`${slot}::${name}`];
  },

  activeBuffs() {
    const buffs = [];
    for (const [key, active] of Object.entries(this._state)) {
      if (!active) continue;
      const [slot, name] = key.split('::');
      const cat = GEAR_DATABASE[slot];
      if (!cat) continue;
      const base = cat.baseTypes.find(b => b.name === name);
      if (base && base.wardrobeBuff) {
        const buff = { ...base.wardrobeBuff };
        if (typeof buff.stat === 'object') buff.stat = buff.stat[lang] || buff.stat.es || Object.values(buff.stat)[0];
        if (buff.condition && typeof buff.condition === 'object') buff.condition = buff.condition[lang] || buff.condition.es || buff.condition;
        buffs.push({ slot, name, buff });
      }
    }
    return buffs;
  },
};


// ============================================================
//  evaluateConditionals(item, playerStats)
//  playerStats: { STR, DEX, INT, hp_full }
// ============================================================
function evaluateConditionals(item, playerStats = {}) {
  if (!item.conditionals || !item.conditionals.length) return [];
  const { STR = 0, DEX = 0, INT = 0, hp_full = false } = playerStats;
  const active = [];
  for (const cond of item.conditionals) {
    let triggered = false;
    try {
      const expr = cond.if
        .replace(/\bSTR\b/g, STR)
        .replace(/\bDEX\b/g, DEX)
        .replace(/\bINT\b/g, INT)
        .replace(/\bhp_full\b/g, hp_full);
      triggered = Function('"use strict"; return (' + expr + ')')();
    } catch (_) { triggered = false; }
    if (triggered) {
      const labelText = cond.label[lang] || cond.label.es || cond.label;
      active.push({ ...cond, label: labelText });
    }
  }
  return active;
}


// ============================================================
//  validateGearSlots(ring1Name, ring2Name)
//  Prevents equipping two identical Unique rings.
// ============================================================
function validateGearSlots(ring1Name, ring2Name) {
  const errors = [];
  const noDupMsg = {
    es: `❌ No podés equipar dos "${ring1Name}" — es un Único. No se puede duplicar.`,
    en: `❌ Cannot equip two "${ring1Name}" — Unique items cannot be duplicated.`,
    ru: `❌ Нельзя экипировать два "${ring1Name}" — Уникальные предметы не дублируются.`,
    pt: `❌ Não pode equipar dois "${ring1Name}" — Únicos não podem ser duplicados.`
  };
  if (!ring1Name || !ring2Name || ring1Name === ring2Name) {
    const base = GEAR_DATABASE['Anillo']?.baseTypes.find(b => b.name === ring1Name);
    if (base?.unique && ring1Name === ring2Name) {
      errors.push(noDupMsg[lang] || noDupMsg.es);
    }
  }
  return errors;
}

