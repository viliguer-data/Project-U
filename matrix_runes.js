/*
 ██████  ██    ██ ███    ██ ███████ ███████ 
 ██   ██ ██    ██ ████   ██ ██      ██      
 ██████  ██    ██ ██ ██  ██ █████   ███████ 
 ██   ██ ██    ██ ██  ██ ██ ██           ██ 
 ██   ██  ██████  ██   ████ ███████ ███████ 

 Matrix Runes — Project U · Beta 2.0
 Build: VientoSje · WindBreaker · Lv.82
 Referencia: https://undecember.thein.ru/en/runes/
*/

// ══ SKILL RUNES ═══════════════════════════════════════════════

const skillRunes = [
  {
    id: 's_001',
    name: {
      es: 'Flecha Gélida', en: 'Icy Arrow', fr: 'Flèche Glacée',
      ko: '얼음 화살', zh: '寒冰箭', ru: 'Ледяная стрела', pt: 'Flecha Gélida'
    },
    image: RUNE_IMAGES.ICY_ARROW,
    color: 'green',
    level: 35,
    grade: 'Legendary',
    tags: ['Attack', 'Bow', 'Cold', 'Projectile', 'Overheat', 'Strike', 'Area'],
    stats: { dps: '721,679', mana_cost: 46 },
    logic: {
      es: 'Principal fuente de daño. Genera Overheat para activar el combo de críticos con Heat Cycle.',
      en: 'Main damage source. Generates Overheat to activate the critical combo with Heat Cycle.',
      ru: 'Основной источник урона. Генерирует Перегрев для активации комбо критических ударов с Heat Cycle.',
      pt: 'Principal fonte de dano. Gera Overheat para ativar o combo de críticos com Heat Cycle.',
      fr: 'Source de dégâts principale. Génère de la Surchauffe pour activer le combo de critiques avec Heat Cycle.',
      ko: '주요 피해 소스. 히트 사이클과 함께 치명타 콤보를 활성화하는 과열을 생성합니다.',
      zh: '主要伤害来源。产生过热效果，配合热循环激活暴击连击。'
    }
  },
  {
    id: 's_002',
    name: {
      es: 'Rodar', en: 'Roll', fr: 'Roulade',
      ko: '구르기', zh: '翻滚', ru: 'Перекат', pt: 'Rolagem'
    },
    image: RUNE_IMAGES.ROLL,
    color: 'green',
    level: 33,
    tags: ['Attack', 'Movement', 'Duration'],
    stats: { charges: 3, dodge_amp: '7.1%', mana_cost: 17.7 },
    logic: {
      es: 'Movilidad triple gracias a la Link Rune Use Count. Vital para esquivar áreas en peleas de jefes.',
      en: 'Triple mobility thanks to the Use Count Link Rune. Vital for dodging AoE in boss fights.',
      ru: 'Тройная мобильность благодаря Link Rune Use Count. Жизненно важна для уклонения в боях с боссами.',
      pt: 'Mobilidade tripla graças à Link Rune Use Count. Vital para esquivar AoE em lutas de chefes.',
      fr: 'Triple mobilité grâce à la Link Rune Use Count. Vital pour esquiver les zones lors des combats de boss.',
      ko: 'Use Count 링크 룬 덕분에 세 번 구르기가 가능합니다. 보스전에서 범위 피해를 피하는 데 필수적입니다.',
      zh: '通过使用次数链接符文实现三次翻滚，在BOSS战中躲避范围攻击至关重要。'
    }
  },
  {
    id: 's_003',
    name: {
      es: 'Centinela de Escarcha', en: 'Frost Sentry', fr: 'Sentinelle de Givre',
      ko: '서리 파수꾼', zh: '霜冻哨兵', ru: 'Морозная турель', pt: 'Sentinela Gélida'
    },
    image: RUNE_IMAGES.FROST_SENTRY,
    color: 'green',
    level: 35,
    tags: ['Attack', 'Sentry', 'Cold'],
    stats: { mana_cost: 72.8, freeze_rate: '+21' },
    logic: {
      es: 'Control de masas y daño pasivo. Con Life Imbued escala con la vida de la torreta. Con Precise Sentry mete críticos constantes y congela a los enemigos.',
      en: 'Crowd control and passive damage. With Life Imbued it scales with the sentry HP. With Precise Sentry it lands constant crits and freezes enemies.',
      ru: 'Контроль толпы и пассивный урон. С Life Imbued масштабируется от HP турели. С Precise Sentry наносит постоянные крит. удары и замораживает врагов.',
      pt: 'Controle de grupo e dano passivo. Com Life Imbued escala com o HP da torre. Com Precise Sentry acerta críticos constantes e congela inimigos.',
      fr: 'Contrôle de foule et dégâts passifs. Avec Life Imbued, scale avec les PV de la tourelle. Avec Precise Sentry, elle inflige des critiques constants et gèle les ennemis.',
      ko: '군중 제어 및 패시브 피해. Life Imbued와 함께 포탑 HP로 스케일됩니다. Precise Sentry와 함께 지속적인 치명타를 가하고 적을 얼립니다.',
      zh: '群体控制和被动伤害。配合生命注入以哨兵生命值为基础缩放。配合精准哨兵持续暴击并冻结敌人。'
    }
  },
  {
    id: 's_004',
    name: {
      es: 'Sello de Resistencia al Caos', en: 'Seal of Chaos Resist', fr: 'Sceau de Résistance au Chaos',
      ko: '혼돈 저항의 문장', zh: '混沌抗性印记', ru: 'Печать сопротивления хаосу', pt: 'Selo de Resistência ao Caos'
    },
    image: RUNE_IMAGES.SEAL_CHAOS,
    color: 'blue',
    level: 36,
    grade: 'Rare',
    tags: ['Spell', 'Defense Seal', 'Toggle'],
    stats: { chaos_resist: '+36', cost_amp: '13.7%' },
    logic: {
      es: 'Elegido por sobre Cold Armor para sobrevivir al daño de Caos que ignora la armadura física. Sacrificamos defensa física plana por supervivencia pura en el endgame.',
      en: 'Chosen over Cold Armor to survive Chaos damage that bypasses physical armor. We trade flat physical defense for pure endgame survivability.',
      ru: 'Выбран вместо Cold Armor для выживания против урона Хаоса, игнорирующего физическую броню. Меняем плоскую физическую защиту на чистое выживание в эндгейме.',
      pt: 'Escolhido em vez de Cold Armor para sobreviver ao dano de Caos que ignora a armadura física. Trocamos defesa física plana por sobrevivência pura no endgame.',
      fr: 'Choisi plutôt que Cold Armor pour survivre aux dégâts de Chaos qui ignorent l\'armure physique. On sacrifie la défense physique brute pour une survie pure en endgame.',
      ko: '물리 방어구를 무시하는 혼돈 피해에서 살아남기 위해 Cold Armor 대신 선택했습니다. 순수한 엔드게임 생존력을 위해 물리 방어를 포기합니다.',
      zh: '选择此印记而非冰冷护甲，以抵御绕过物理防御的混沌伤害。以纯粹的终局生存能力换取平板物理防御。'
    }
  }
];

// ══ LINK RUNES ════════════════════════════════════════════════

const linkRunes = [
  {
    id: 'l_001',
    name: 'Heat Cycle',
    image: RUNE_IMAGES.LINK_HEAT_CYCLE,
    color: 'blue',
    linkedTo: ['s_001'], // Icy Arrow
    tags: ['Overheat', 'Cold'],
    stats: { crit_rate: '+126.9% (High Temp)', crit_dmg: '+24%' },
    logic: {
      es: 'El motor de críticos de la build. Cuando el Overheat supera el 40%, el bonus de Critical Rate explota.',
      en: 'The build\'s critical engine. When Overheat exceeds 40%, the Critical Rate bonus spikes massively.',
      ru: 'Критический движок билда. Когда Перегрев превышает 40%, бонус к крит. рейту резко возрастает.',
      pt: 'O motor de críticos da build. Quando o Overheat supera 40%, o bônus de Critical Rate dispara.',
      fr: 'Le moteur de critiques du build. Quand la Surchauffe dépasse 40%, le bonus de Taux de Critique explose.',
      ko: '빌드의 치명타 엔진. 과열이 40%를 초과하면 치명타율 보너스가 크게 급등합니다.',
      zh: '构建的暴击引擎。当过热超过40%时，暴击率奖励大幅飙升。'
    }
  },
  {
    id: 'l_002',
    name: 'Find Weakness',
    image: RUNE_IMAGES.LINK_FIND_WEAKNESS,
    color: 'green',
    linkedTo: ['s_001'],
    tags: ['Attack', 'Strike'],
    stats: { crit_rate: '+134.9%' },
    logic: {
      es: 'Stackea con Heat Cycle para asegurar críticos constantes. Juntos superan el 260% de Critical Rate base.',
      en: 'Stacks with Heat Cycle to ensure constant crits. Together they exceed 260% base Critical Rate.',
      ru: 'Стакается с Heat Cycle для стабильных критов. Вместе превышают 260% базового крит. рейта.',
      pt: 'Empilha com Heat Cycle para garantir críticos constantes. Juntos superam 260% de Critical Rate base.',
      fr: 'Se cumule avec Heat Cycle pour assurer des critiques constants. Ensemble, ils dépassent 260% de Taux de Critique de base.',
      ko: 'Heat Cycle과 겹쳐져 지속적인 치명타를 보장합니다. 함께 기본 치명타율 260%를 초과합니다.',
      zh: '与热循环叠加确保持续暴击。两者合计基础暴击率超过260%。'
    }
  },
  {
    id: 'l_003',
    name: 'Use Count',
    image: RUNE_IMAGES.LINK_USE_COUNT,
    color: 'blue',
    linkedTo: ['s_002'], // Roll
    tags: ['Movement', 'Duration'],
    stats: { max_use_count: '+3' },
    logic: {
      es: 'Permite el triple uso de Roll. Reposicionamiento extremo en jefes con áreas grandes.',
      en: 'Enables triple use of Roll. Extreme repositioning in bosses with large AoE.',
      ru: 'Позволяет использовать Roll трижды. Экстремальное перемещение в боях с боссами.',
      pt: 'Permite o uso triplo de Roll. Reposicionamento extremo em chefes com grandes áreas.',
      fr: 'Permet l\'utilisation triple de Roulade. Repositionnement extrême contre les boss avec de grandes zones.',
      ko: '구르기를 세 번 사용할 수 있게 합니다. 넓은 범위를 가진 보스에서 극단적인 재배치가 가능합니다.',
      zh: '允许翻滚三次使用。在大范围BOSS战中实现极端重新定位。'
    }
  },
  {
    id: 'l_004',
    name: 'Life Imbued Sentry',
    image: RUNE_IMAGES.LINK_LIFE_IMBUED,
    color: 'red',
    linkedTo: ['s_003'], // Frost Sentry
    tags: ['Sentry', 'Strike'],
    stats: { dmg_amp: '+1% per 2500 Sentry HP' },
    logic: {
      es: 'Convierte la supervivencia de la torreta en daño bruto. Cuanto más vida tenga la Frost Sentry, más pega.',
      en: 'Converts sentry survivability into raw damage. The more HP the Frost Sentry has, the harder it hits.',
      ru: 'Конвертирует живучесть турели в чистый урон. Чем больше HP у Frost Sentry, тем сильнее удар.',
      pt: 'Converte a sobrevivência da torre em dano bruto. Quanto mais HP a Frost Sentry tiver, mais dano ela causa.',
      fr: 'Convertit la survie de la tourelle en dégâts bruts. Plus la Sentinelle de Givre a de PV, plus elle frappe fort.',
      ko: '포탑 생존력을 순수 피해로 변환합니다. 서리 파수꾼의 HP가 많을수록 더 강하게 타격합니다.',
      zh: '将哨兵生存能力转化为原始伤害。霜冻哨兵HP越多，伤害越高。'
    }
  },
  {
    id: 'l_005',
    name: 'Precise Sentry',
    image: RUNE_IMAGES.LINK_PRECISE_SENTRY,
    color: 'green',
    linkedTo: ['s_003'],
    tags: ['Sentry', 'Cold'],
    stats: { crit_rate_sentry: '+80%', freeze_amp: '+15%' },
    logic: {
      es: 'La torreta mete críticos constantes y congela enemigos. Los enemigos congelados son rematados por la Icy Arrow.',
      en: 'The sentry lands constant crits and freezes enemies. Frozen enemies get finished off by Icy Arrow.',
      ru: 'Турель наносит постоянные критические удары и замораживает врагов. Замороженных добивает Ледяная стрела.',
      pt: 'A torre acerta críticos constantes e congela inimigos. Inimigos congelados são finalizados pela Flecha Gélida.',
      fr: 'La tourelle inflige des critiques constants et gèle les ennemis. Les ennemis gelés sont achevés par la Flèche Glacée.',
      ko: '포탑이 지속적인 치명타를 가하고 적을 얼립니다. 얼어붙은 적들은 얼음 화살로 처치됩니다.',
      zh: '哨兵持续暴击并冻结敌人。被冻结的敌人被寒冰箭击杀。'
    }
  },
  {
    id: 'l_006',
    name: 'Sturdy Sentry',
    image: RUNE_IMAGES.LINK_STURDY_SENTRY,
    color: 'red',
    linkedTo: ['s_003'],
    tags: ['Sentry'],
    stats: { sentry_hp: '+80%' },
    logic: {
      es: 'Amplifica la vida de la Frost Sentry, potenciando directamente a Life Imbued Sentry.',
      en: 'Amplifies Frost Sentry HP, directly boosting Life Imbued Sentry\'s damage conversion.',
      ru: 'Увеличивает HP Frost Sentry, напрямую усиливая конвертацию урона Life Imbued Sentry.',
      pt: 'Amplifica o HP da Frost Sentry, potencializando diretamente a conversão de dano de Life Imbued Sentry.',
      fr: 'Amplifie les PV de la Sentinelle de Givre, boostant directement la conversion de dégâts de Life Imbued Sentry.',
      ko: '서리 파수꾼의 HP를 증폭시켜 생명력 주입 파수꾼의 피해 변환을 직접 강화합니다.',
      zh: '增强霜冻哨兵HP，直接提升生命注入哨兵的伤害转换。'
    }
  },
  {
    id: 'l_007',
    name: 'Frost Explosion',
    image: RUNE_IMAGES.LINK_FROST_EXPLOSION,
    color: 'blue',
    linkedTo: ['s_001'],
    tags: ['Cold', 'Area', 'Strike'],
    stats: { aoe_dmg: '+45%', freeze_on_crit: 'yes' },
    logic: {
      es: 'Explosión de área fría al hacer crítico. Sinergia directa con Find Weakness y Heat Cycle.',
      en: 'Cold AoE explosion on critical hit. Direct synergy with Find Weakness and Heat Cycle.',
      ru: 'Взрыв холода по области при крите. Прямая синергия с Find Weakness и Heat Cycle.',
      pt: 'Explosão de área fria ao acertar crítico. Sinergia direta com Find Weakness e Heat Cycle.',
      fr: 'Explosion de zone froide au coup critique. Synergie directe avec Find Weakness et Heat Cycle.',
      ko: '치명타 시 냉기 범위 폭발. Find Weakness 및 Heat Cycle과 직접적인 시너지.',
      zh: '暴击时触发冰冷范围爆炸。与寻找弱点和热循环直接协同。'
    }
  },
  {
    id: 'l_008',
    name: 'Additional Cold DMG',
    image: RUNE_IMAGES.LINK_ADDITIONAL_COLD,
    color: 'blue',
    linkedTo: ['s_001', 's_003'],
    tags: ['Cold'],
    stats: { cold_dmg: '+38%' },
    logic: {
      es: 'Daño frío extra para Icy Arrow y Frost Sentry. Refuerza el elemento principal de la build.',
      en: 'Extra cold damage for Icy Arrow and Frost Sentry. Reinforces the build\'s main element.',
      ru: 'Дополнительный урон холодом для Icy Arrow и Frost Sentry. Усиливает основной элемент билда.',
      pt: 'Dano frio extra para Flecha Gélida e Sentinela Gélida. Reforça o elemento principal da build.',
      fr: 'Dégâts de froid supplémentaires pour Flèche Glacée et Sentinelle de Givre. Renforce l\'élément principal du build.',
      ko: '얼음 화살과 서리 파수꾼에 추가 냉기 피해. 빌드의 주요 원소를 강화합니다.',
      zh: '为寒冰箭和霜冻哨兵提供额外冰冷伤害，强化构建的主要元素。'
    }
  },
  {
    id: 'l_009',
    name: 'Attack DMG Increase',
    image: RUNE_IMAGES.LINK_ATTACK_DMG,
    color: 'red',
    linkedTo: ['s_001'],
    tags: ['Attack', 'Strike'],
    stats: { atk_dmg: '+55%' },
    logic: {
      es: 'Amplificador de daño de ataque plano. Escala con cualquier runa de ataque.',
      en: 'Flat attack damage amplifier. Scales with any attack rune.',
      ru: 'Плоский усилитель урона атаки. Масштабируется с любой руной атаки.',
      pt: 'Amplificador de dano de ataque plano. Escala com qualquer runa de ataque.',
      fr: 'Amplificateur de dégâts d\'attaque bruts. Scale avec n\'importe quelle rune d\'attaque.',
      ko: '평탄한 공격 피해 증폭기. 모든 공격 룬과 함께 스케일됩니다.',
      zh: '平板攻击伤害放大器，与任何攻击符文协同缩放。'
    }
  },
  {
    id: 'l_010',
    name: 'Quick Attack',
    image: RUNE_IMAGES.LINK_QUICK_ATTACK,
    color: 'green',
    linkedTo: ['s_001'],
    tags: ['Attack', 'Projectile'],
    stats: { atk_speed: '+35%' },
    logic: {
      es: 'Velocidad de ataque extra para mantener el Overheat activo más fácilmente.',
      en: 'Extra attack speed to maintain Overheat more easily.',
      ru: 'Дополнительная скорость атаки для более легкого поддержания Перегрева.',
      pt: 'Velocidade de ataque extra para manter o Overheat mais facilmente.',
      fr: 'Vitesse d\'attaque supplémentaire pour maintenir la Surchauffe plus facilement.',
      ko: '과열을 더 쉽게 유지하기 위한 추가 공격 속도.',
      zh: '额外攻击速度，更容易维持过热状态。'
    }
  },
  {
    id: 'l_011',
    name: 'Decrease Duration',
    image: RUNE_IMAGES.LINK_DECREASE_DURATION,
    color: 'blue',
    linkedTo: ['s_002'],
    tags: ['Movement', 'Duration'],
    stats: { cooldown_reduction: '-30%' },
    logic: {
      es: 'Reduce el cooldown de Roll. Combinado con Use Count, la movilidad de la build es casi continua.',
      en: 'Reduces Roll cooldown. Combined with Use Count, the build\'s mobility is nearly continuous.',
      ru: 'Уменьшает откат Roll. В сочетании с Use Count мобильность билда почти непрерывна.',
      pt: 'Reduz o cooldown de Roll. Combinado com Use Count, a mobilidade da build é quase contínua.',
      fr: 'Réduit le temps de recharge de Roulade. Combiné avec Use Count, la mobilité du build est quasi continue.',
      ko: '구르기 쿨다운을 줄입니다. Use Count와 결합하면 빌드의 기동성이 거의 지속적으로 유지됩니다.',
      zh: '减少翻滚冷却时间。与使用次数结合，构建的机动性几乎连续不断。'
    }
  }
];

// ── AUTO-RENDER al cargar ─────────────────────────────────────
// Se ejecuta después de que ambos scripts están disponibles
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof renderRunePanel === 'function') renderRunePanel();
  });
} else {
  // DOM ya listo
  if (typeof renderRunePanel === 'function') renderRunePanel();
}
