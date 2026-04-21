const COMPENDIUM = {
/* ======== BLOQUE 1: OFF-HANDS Y ARMAS INICIALES (v2.4) ======== */

  'mirasetis_rip_current': {
    id: 'mirasetis_rip_current',
    type: 'off-hand',
    slot: 'quiver',
    name: "Miraseti's Rip Current",
    tier: 27,
    requirements: { level: 63 },
    stats: { attack_spell_dmg: [55, 77], attack_speed_percent: 5.9, element_dmg_percent: 43 },
    lore: 'There are natural flows of life that cannot be opposed.'
  },

  'bound_mirasetis_wave': { // Sincronizado: Key bound + Archivo .webp
    id: 'bound_mirasetis_wave',
    type: 'off-hand',
    slot: 'quiver',
    name: "Bound Transcendent Miraseti's Wave",
    tier: 34,
    requirements: { level: 80 },
    stats: { attack_dmg_percent: 86, speed_percent: 18.5, crit_rate_percent: 104 },
    lore: 'A wave from the special collection that binds to its owner.'
  },

  'house_of_composure': {
    id: 'house_of_composure',
    type: 'off-hand',
    slot: 'magazine',
    name: 'House of Composure',
    tier: 22,
    requirements: { level: 50 },
    stats: { reload_speed_percent: 20, max_ammo_flat: 2, accuracy_flat: 120 },
    lore: 'Silence is the best ammunition.'
  },

  'zephyr_fang': {
    id: 'zephyr_fang',
    type: 'weapon',
    slot: 'bow',
    name: 'Zephyr Fang',
    tier: 11,
    requirements: { level: 23, DEX: 71 },
    stats: { attack_dmg: [148, 176], speed: 1.4, crit_rate: 11, attack_speed_percent: 12 },
    lore: 'As swift as a breeze, as deadly as a storm.'
  },

  'sunset_brush': {
    id: 'sunset_brush',
    type: 'weapon',
    slot: 'wand', // Se traduce como "Vara" en la UI
    name: 'Sunset Brush',
    tier: 18,
    requirements: { level: 40, INT: 124 },
    stats: { attack_spell_dmg: [159, 212], speed: 1.3, crit_rate: 9, element_dmg_percent: 20 },
    lore: 'Paint the sky with the colors of the end.'
  },

  'tipans_long_bow': {
    id: 'tipans_long_bow',
    type: 'weapon',
    slot: 'bow',
    name: "Tipan's Long Bow",
    tier: 18,
    requirements: { level: 40, DEX: 124 },
    stats: { attack_dmg: [278, 332], speed: 1.35, crit_rate: 11, phys_dmg_percent: 18 },
    lore: 'A single arrow to silence the forest.'
  },

  /* ======== BLOQUE 2: ARMAS DE MEDIA DISTANCIA Y CUERPO A CUERPO (v2.4) ======== */

  'chasing_trajectory': {
    id: 'chasing_trajectory',
    type: 'weapon',
    slot: 'bow',
    name: 'Chasing Trajectory',
    tier: 30,
    requirements: { level: 67, DEX: 204 },
    stats: { 
      attack_dmg: [317, 378], 
      speed: 1.4, 
      crit_rate: 22.2, 
      projectile_speed_percent: 12 
    },
    lore: 'The arrow knows its destination.'
  },

  'bound_seeping_ray_of_light': {
    id: 'bound_seeping_ray_of_light',
    type: 'weapon',
    slot: 'bow',
    name: 'Bound Seeping Ray of Light',
    tier: 33,
    requirements: { level: 82, DEX: 250 },
    stats: { 
      attack_dmg: [584, 730], 
      speed: 1.5, 
      crit_rate: 14.8, 
      projectile_speed_percent: 20 
    },
    lore: 'Light finds its way through even the smallest cracks.'
  },

  'purifiers_fang': {
    id: 'purifiers_fang',
    type: 'weapon',
    slot: 'dagger',
    name: "Purifier's Fang",
    tier: 13,
    requirements: { level: 29, STR: 36, DEX: 36, INT: 36 }, // Requisito triple confirmado
    stats: { 
      attack_spell_dmg: [102, 136], 
      speed: 1.75, 
      crit_rate: 13, 
      poison_dmg_percent: 24 
    },
    lore: 'Purity often requires a sharp edge.'
  },

  'iron_of_fate': {
    id: 'iron_of_fate',
    type: 'weapon',
    slot: 'blunt',
    name: 'Iron of Fate',
    tier: 20,
    requirements: { level: 48, STR: 160 },
    stats: { 
      attack_dmg: [310, 390], 
      speed: 1.2, 
      stun_chance_percent: 10, 
      phys_dmg_percent: 45 
    },
    lore: 'Destiny is forged in cold iron.'
  },

  'pendulum_of_truth': {
    id: 'pendulum_of_truth',
    type: 'weapon',
    slot: 'blunt',
    name: 'Pendulum of Truth',
    tier: 18,
    requirements: { level: 40, STR: 124 },
    stats: { 
      attack_dmg: [312, 412], 
      speed: 1.1, 
      crit_rate: 4, 
      stun_rate: 10 
    },
    lore: 'Truth is heavy, and it always swings back.'
  },

  'flaming_meteor_dawn_startail': {
    id: 'flaming_meteor_dawn_startail',
    type: 'weapon',
    slot: 'sword',
    name: 'Flaming Meteor Dawn Startail',
    tier: 30,
    requirements: { level: 67, STR: 68, DEX: 68, INT: 68 }, // Requisito cuádruple según imagen
    stats: { 
      attack_spell_dmg: [398, 540], 
      speed: 1.3, 
      crit_rate: 7, 
      attack_hit_rate: 400, 
      fire_dmg_percent: 81 
    },
    lore: 'When the sky falls, only the fire remains.'
  },
 
  /* ======== BLOQUE 3: CIERRE DE ARMAS Y COMIENZO DE GEAR (v2.4) ======== */

  'brilliant_crescent': {
    id: 'brilliant_crescent',
    type: 'weapon',
    slot: 'two-handed sword',
    name: 'Brilliant Crescent',
    tier: 8,
    requirements: { level: 17, STR: 32, DEX: 32 },
    stats: { attack_dmg: [135, 166], speed: 1.25, crit_rate: 11, movement_speed_percent: 14 },
    lore: 'A blade that reflects a moon no longer visible in our sky.'
  },

  'eternal_ember': {
    id: 'eternal_ember',
    type: 'weapon',
    slot: 'scepter',
    name: 'Eternal Ember',
    tier: 13,
    requirements: { level: 29, STR: 45, INT: 45 },
    stats: { attack_spell_dmg: [108, 138], speed: 1.3, crit_rate: 9, element_res: 9, element_dmg_percent: 18 },
    lore: 'A flame that never flickers.'
  },

  'fate_gatherer': {
    id: 'fate_gatherer',
    type: 'weapon',
    slot: 'scepter',
    name: 'Fate Gatherer',
    tier: 18,
    requirements: { level: 40, STR: 62, INT: 62 },
    stats: { attack_spell_dmg: [139, 185], speed: 1.47, crit_rate: 13.7, element_res: 9, element_dmg_percent: 20 },
    lore: 'The threads of destiny are easily tangled.'
  },

  'unwithering_rose': {
    id: 'unwithering_rose',
    type: 'weapon',
    slot: 'wand', // Esta es la "Vara" de tier alto
    name: 'Elemental Explosion Unwithering Rose',
    tier: 33,
    requirements: { level: 82, INT: 250 },
    stats: { attack_spell_dmg: [554, 738], speed: 1.3, crit_rate: 13.7, element_dmg_percent: 92 },
    lore: 'Beauty that consumes everything it touches.'
  },

  'night_heaven_guide': {
    id: 'night_heaven_guide',
    type: 'weapon',
    slot: 'bow',
    name: 'Night Heaven Guide',
    tier: 32,
    requirements: { level: 72, DEX: 220 },
    stats: { attack_dmg: [445, 532], speed: 1.4, crit_rate: 22.2, projectile_speed_percent: 15 },
    lore: 'Let the stars light your path to the end.'
  },

  'awakeneds_skin': {
    id: 'awakeneds_skin',
    type: 'gear',
    slot: 'armor',
    name: "Awakened's Skin",
    tier: 22,
    requirements: { level: 52, DEX: 146 },
    stats: { dodge_rate_flat: 2220, dexterity_flat: 19, hp_flat: 193, chaos_res: 26 },
    lore: 'Follow your instincts. That is the way to survive.'
  },

  /* ======== BLOQUE 4: EQUIPAMIENTO Y ARMADURAS (v2.4) ======== */

  'tipans_scale_armor': {
    id: 'tipans_scale_armor',
    type: 'gear',
    slot: 'armor',
    name: "Tipan's Scale Armor",
    tier: 18,
    requirements: { level: 40, STR: 56, DEX: 56 },
    stats: { armor_flat: 328, dodge_rate_flat: 318, hp_flat: 68, mana_flat: 40 },
    lore: "Light as a feather, hard as a dragon's scale."
  },

  'sunrise_crown': {
    id: 'sunrise_crown',
    type: 'gear',
    slot: 'helmet',
    name: 'Sunrise Crown',
    tier: 13,
    requirements: { level: 25, STR: 32, INT: 32 },
    stats: { armor_flat: 68, barrier: 33, hp_flat: 42, mana_flat: 25 },
    lore: 'The first light of dawn is the deadliest.'
  },

  'roaring_circlet': {
    id: 'roaring_circlet',
    type: 'gear',
    slot: 'helmet',
    name: 'Roaring Circlet',
    tier: 14,
    requirements: { level: 28, STR: 40, DEX: 40 },
    stats: { armor_flat: 112, dodge_rate_flat: 108, hp_flat: 48, mana_flat: 28 },
    lore: 'A crown for those who lead with a roar.'
  },

  'bound_sandglass': { // Sincronizado: Key bound + Archivo .webp
    id: 'bound_sandglass',
    type: 'gear',
    slot: 'helmet',
    name: 'Bound Sandglass',
    tier: 32,
    requirements: { level: 74 },
    stats: { 
      armor_flat: 1540, 
      dodge_rate_flat: 1540, 
      xp_gain_percent: 12.3, 
      status_effect_dodge_percent: 14.8 
    },
    lore: 'Time remains trapped within.'
  },

  'dance_of_desperation': {
    id: 'dance_of_desperation',
    type: 'gear',
    slot: 'boots',
    name: 'Dance of Desperation',
    tier: 20,
    requirements: { level: 43, STR: 110 },
    stats: { armor_flat: 439, movement_speed_percent: 15, hp_percent: 6, strength_flat: 9 },
    lore: 'Life is about heading towards death.'
  },

  'starprint': {
    id: 'starprint',
    type: 'gear',
    slot: 'gloves',
    name: 'Starprint',
    tier: 14,
    requirements: { level: 28, DEX: 40, INT: 40 },
    stats: { dodge_rate_flat: 112, barrier: 44, hp_flat: 48, mana_flat: 28 },
    lore: 'The constellations guide your strike.'
  },

  /* ======== BLOQUE 5: SPAULDERS Y ACCESORIOS (v2.4) ======== */

  'duty_of_flame': {
    id: 'duty_of_flame',
    type: 'gear',
    slot: 'spaulders', // Corregido a spaulders
    name: 'Duty of Flame',
    tier: 7,
    requirements: { level: 13, STR: 18, DEX: 18 },
    stats: { armor_flat: 56, dodge_rate_flat: 54, fire_dmg_taken_dampening_percent: 10.9, hp_flat: 42, fire_res: 59 },
    lore: 'The burden of the sun is not for the weak.'
  },

  'casthors_gaze': {
    id: 'casthors_gaze',
    type: 'gear',
    slot: 'spaulders', // Corregido a spaulders
    name: "Casthor's Gaze",
    tier: 9,
    requirements: { level: 19, DEX: 25, INT: 25 },
    stats: { dodge_rate: 28, barrier: 11, summon_duration_percent: 149, sentry_dmg_percent: 25 },
    lore: 'An unblinking eye that sees through the chaos of battle.'
  },

  'grave_robber_kings_belt': {
    id: 'grave_robber_kings_belt',
    type: 'accessory',
    slot: 'belt',
    name: "Grave Robber King's Belt",
    tier: 26,
    requirements: { level: 59 },
    stats: { item_rarity_percent: 95, hit_rate_percent: 20, mana_regen_sec_percent: 34, hp_flat: 50, movement_speed_percent: 15 },
    lore: 'Blind opportunities are treasures without owners.'
  },

  'hamals_vine': {
    id: 'hamals_vine',
    type: 'accessory',
    slot: 'belt',
    name: "Hamal's Vine",
    tier: 14,
    requirements: { level: 28 },
    stats: { element_dmg_percent: 10, poison_res: 19, hp_flat: 48, mana_flat: 26 },
    lore: 'Nature constricts as much as it provides.'
  },

  'valor_talisman': {
    id: 'valor_talisman',
    type: 'accessory',
    slot: 'necklace',
    name: 'Valor Talisman',
    tier: 8,
    requirements: { level: 14 },
    stats: { dmg_percent: 16, element_res: 5, hp_flat: 28, mana_flat: 15 },
    lore: 'Valor is mastery of fear.'
  },

  'trumpeters_heart': {
    id: 'trumpeters_heart',
    type: 'accessory',
    slot: 'necklace',
    name: "Trumpeter's Heart",
    tier: 14,
    requirements: { level: 28 },
    stats: { dmg_percent: 24, element_res: 9, hp_flat: 52, mana_flat: 29 },
    lore: 'Its beat echoes through the ranks.'
  },

  /* ======== BLOQUE 6: CIERRE DE ACCESORIOS (v2.4) ======== */

  'bound_celestial_orb': { // Sincronizado: Key bound + Archivo .webp
    id: 'bound_celestial_orb',
    type: 'accessory',
    slot: 'necklace',
    name: 'Bound Celestial Orb',
    tier: 33,
    requirements: { level: 74 },
    stats: { 
      dmg_percent: 101, 
      element_res: 18, 
      chaos_res: 35 
    },
    lore: 'Inscribing the place of the stars is like choosing a path to follow.'
  },

  'settlement_ring': {
    id: 'settlement_ring',
    type: 'accessory',
    slot: 'ring',
    name: 'Settlement Ring',
    tier: 14,
    requirements: { level: 28 },
    stats: { 
      gold_gain_amount_percent: 5, 
      inventory_weight_percent: 12.3, 
      hp_flat: 48, 
      mana_flat: 28 
    },
    lore: 'For those who find peace in possession.'
  },

  'gold_collectors_loop': {
    id: 'gold_collectors_loop',
    type: 'accessory',
    slot: 'ring',
    name: "Gold Collector's Loop",
    tier: 14,
    requirements: { level: 28 },
    stats: { 
      gold_gain_amount_percent: 5.3, 
      element_dmg_taken_decrease_percent: 4.3, 
      hp_flat: 52, 
      mana_flat: 29, 
      gold_gain_chance_percent: 55.8 
    },
    lore: 'Gold is a gift from Boreal, the Deity of Earth.'
  }// <--- Sin coma aquí porque es el último
}; // <--- ESTA ES LA LLAVE QUE CIERRA "const COMPENDIUM = {"
