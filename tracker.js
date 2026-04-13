/* Project U — tracker.js — Lógica del tracker y weapon matrix */

const consejos = {
  en:{
    "1":{t:"Act 1 — First steps",p:[{i:"✦",x:"Focus on leveling up, not optimizing gear. Act 1 equipment gets replaced fast."},{i:"✦",x:"Equip the first runes you find even if they're not perfect — something is better than nothing."},{i:"✦",x:"Learn the rune link system. It's the most important mechanic in the game."},{i:"⚠",r:1,x:"Don't spend resources crafting items yet. Store everything in the chest."}],rng:"In Act 1 RNG doesn't matter much. Everything you get is useful for learning the system."},
    "2":{t:"Act 2 — Taking shape",p:[{i:"✦",x:"Start defining your build direction. Physical, elemental or poison — pick one and commit."},{i:"✦",x:"Prioritize raising basic resistances: Fire and Lightning to at least 50%."},{i:"✦",x:"If your build isn't clear, look at which runes dropped best and follow that line."},{i:"⚠",r:1,x:"Don't mix damage types. Focus on one so the scaling works."}],rng:"If the loot doesn't align with your intended build, consider pivoting. Act 2 is a good time."},
    "3":{t:"Act 3 — Consolidating",p:[{i:"✦",x:"Check your resistances. Fire, Lightning and Poison should be approaching 75%."},{i:"✦",x:"Start working on Critical Chance if your build requires it. Minimum base: 40%."},{i:"✦",x:"Rune links: make sure you have at least 3 runes connected to your main skill."},{i:"⚠",r:1,x:"If Chaos Resist is at 0, leave it for now. It gets worked on later."}],rng:"What drops in Act 3 starts to have real weight. Store in the chest everything you don't use today."},
    "4":{t:"Act 4 — Halfway",p:[{i:"✦",x:"Look for items with flat HP or HP%. Less than 3500 HP in Act 4+ is unnecessary risk."},{i:"✦",x:"If you have life leech (Hunger, Bloodthirst), high HP amplifies that sustain brutally."},{i:"✦",x:"Work on a second utility skill — mobility or buff — to have a clean loop."},{i:"⚠",r:1,x:"Don't advance without at least 3500 HP. Act 5+ enemies hit harder."}],rng:"If gear doesn't improve your HP, look in the chest for items with flat life even if other stats are lower."},
    "5":{t:"Act 5 — End of the tutorial",p:[{i:"✦",x:"Last act of Episode 1. Completing everything 100% here lays the foundation for Ep.2."},{i:"✦",x:"Check your Chaos Resist. Chaotic damage starts appearing in Episode 2."},{i:"✦",x:"HP target before moving to Ep.2: 4000+."},{i:"⚠",r:1,x:"Don't skip side quests. Complete Ep.1 achievements grant bonuses in Ep.2."}],rng:"Any item with Chaos Resist is welcome, even if it's not BiS in other slots."},
    "6":{t:"Act 6 — The real game begins",p:[{i:"✦",x:"Welcome to Episode 2. The game now assumes you've mastered the fundamentals."},{i:"✦",x:"With Whirlwind + Iron Will + Hunger you have the perfect base. Focus is now on defense."},{i:"✦",x:"Cold Resist at 57% is the most urgent gap. Look for Cold Resist items in chest or drops."},{i:"⚠",r:1,x:"HP 2636 is low for this point. Prioritize HP over DPS on your next gear upgrade."}],rng:"If items drop with resistances even if damage is lower, keep them. Survival first."},
    "7":{t:"Act 7 — Scaling up",p:[{i:"✦",x:"Rune Master should be close. That unlock activates your full AoE build potential."},{i:"✦",x:"With Spell Activation on Attack Hit + Thorn Explosion, Hunger will have double the sources."},{i:"✦",x:"Farm secondary maps to accumulate rune XP before Act 8."},{i:"⚠",r:1,x:"Chaos Resist urgent. Acts 8-9 use it a lot and 32% is dangerous."}],rng:"If loot doesn't improve your resistances, prioritize farming XP for Rune Master."},
    "8":{t:"Act 8 — Tough terrain",p:[{i:"✦",x:"Chaos Resist minimum 60%. This is the act where it appears most."},{i:"✦",x:"Check all defensive gaps. Cold Resist and Chaos are the most urgent."},{i:"✦",x:"If you have Rune Master active, the Whirlwind → Thorn Explosion loop should clear cleanly."},{i:"⚠",r:1,x:"Don't underestimate packs with chaotic damage. They can melt you if resistance is low."}],rng:"Any item with Chaos Resist is welcome here, even if not perfect in other slots."},
    "9":{t:"Act 9 — Hard pre-endgame",p:[{i:"✦",x:"The build should be consolidated. Use the free Zodiac reset before Episode 2 ends."},{i:"✦",x:"HP target: 5000+. With leech active that makes you practically untouchable."},{i:"✦",x:"Think about endgame Chaos Dungeons. Your AoE build is ideal for that content."},{i:"⚠",r:1,x:"Last chance for free Zodiac reset. Align it with your final build before Act 10."}],rng:"Act 9 loot is pre-endgame. Store everything in the chest to compare with Act 10 drops."},
    "10":{t:"Act 10 — End of Episode 2",p:[{i:"✦",x:"All resistances at cap (75%). The Celestial Orb (+35 Chaos Resist, +18 Element Resist) is exactly the piece you're looking for."},{i:"✦",x:"Icy Arrow with Illusion Arrow on Hit (Miraseti's Wave) is ideal — constant projectiles without manual effort."},{i:"✦",x:"Sustain comes from the Sandglass: 1% Max HP regen/sec and +200% regen below 40% HP."},{i:"⚠",r:1,x:"Don't replace the Quiver with generic stats. Miraseti's Wave activates the whole build synergy."},{i:"◈",c:1,x:"Completing Act 10 unlocks Episode 3. The real endgame begins."}],rng:"In endgame RNG becomes deliberate farming. It's no longer luck — it's strategic content rotation."},
    "11":{t:"Act 11 — Episode 3 begins",p:[{i:"✦",x:"You've reached Episode 3. Difficulty scales noticeably — review your full build."},{i:"✦",x:"Completionist: every 100% map in Ep.3 grants rewards that don't exist in previous episodes."},{i:"◈",c:1,x:"Breaking boxes, barrels and scene objects counts for achievements. Never ignore the environment."},{i:"⚠",r:1,x:"Don't advance with incomplete resistances. Elemental and chaotic damage in Ep.3 is higher."}],rng:"Episode 3 loot is the best in the game. Save everything even if you don't use it now."},
    "12":{t:"Act 12 — Going deeper",p:[{i:"✦",x:"100% map here starts unlocking exclusive Epilogue content. Don't skip anything."},{i:"✦",x:"Exploration achievements: every corner visited, every object broken, every event completed counts."},{i:"✦",x:"If you have Adventure of Traum in progress, Act 12 maps are among the most contributing."},{i:"◈",c:1,x:"Activate secondary map events even if they seem optional. Many grant unique achievements."},{i:"⚠",r:1,x:"Don't run out of potions on Act 12 bosses. Damage patterns change from Ep.2."}],rng:"At this point RNG no longer surprises you — you know what you need and farm with direction."},
    "13":{t:"Act 13 — End of the main path",p:[{i:"✦",x:"Last act before the Epilogue. Complete every side quest — many are prerequisites for final content."},{i:"✦",x:"Everything at 100%: Act 13 achievements are among the most valuable for Adventure of Traum Lv11."},{i:"◈",c:1,x:"Every broken box, every completed event, every 100% map in these acts unlocks Epilogue content."},{i:"⚠",r:1,x:"Don't finish Act 13 without completing all side quests. Some disappear when you advance."}],rng:"Act 13 RNG drops exclusive Epilogue materials. Farming here before advancing makes sense."},
    "epilogo":{t:"Epilogue — Everything unlocked",p:[{i:"◈",c:1,x:"You made it. All game content is available: full Chaos Dungeons, Lacrima, special events."},{i:"✦",x:"Judgement Executioner and Adventure of Traum Lv11 are the objectives now. Every achievement from 13 acts counts here."},{i:"✦",x:"Chaos Dungeon: Icy Arrow + Illusion Arrow is perfect for clearing waves fast. This is what the build was built for."},{i:"✦",x:"Completionist: the Epilogue rewards every achievement from previous acts — boxes, exploration, side quests."},{i:"◈",c:1,x:"The satisfaction of getting here is real. You're part of the endgame group — the one new players can't see."}],rng:"In the Epilogue RNG is your farming tool, not your enemy. You already know how to use it."},
  },
  es:{
    "1":{t:"Act 1 — Primeros pasos",p:[{i:"✦",x:"Enfocate en subir nivel, no en optimizar equipo. El gear de Act 1 se reemplaza rápido."},{i:"✦",x:"Equipá las primeras runas que te caigan aunque no sean perfectas — algo es mejor que nada."},{i:"✦",x:"Aprendé el sistema de links entre runas. Es la mecánica más importante del juego."},{i:"⚠",r:1,x:"No gastes recursos crafteando items todavía. Guardá todo en el baúl."}],rng:"En Act 1 el RNG no importa tanto. Todo lo que te caiga tiene utilidad para aprender el sistema."},
    "2":{t:"Act 2 — Tomando forma",p:[{i:"✦",x:"Empezá a definir tu dirección de build. Físico, elemental o veneno — elegí uno y comprometete."},{i:"✦",x:"Priorizá subir las resistencias básicas: Fire y Lightning al menos al 50%."},{i:"✦",x:"Si no tenés claro el build, mirá qué runas te cayeron mejor y seguí esa línea."},{i:"⚠",r:1,x:"No mezcles tipos de daño. Enfocate en uno solo para que el scaling funcione."}],rng:"Si el loot no se alinea con el build que querías, considerá pivotar. El Act 2 es buen momento."},
    "3":{t:"Act 3 — Consolidando",p:[{i:"✦",x:"Revisá tus resistencias. Fire, Lightning y Poison deberían acercarse al 75%."},{i:"✦",x:"Empezá a trabajar el Critical Chance si tu build lo requiere. Base mínima: 40%."},{i:"✦",x:"Links de runas: asegurate de tener al menos 3 runas conectadas en tu skill principal."},{i:"⚠",r:1,x:"Si el Chaos Resist está en 0, dejalo así por ahora. Se trabaja más adelante."}],rng:"Lo que te caiga en Act 3 empieza a tener peso real. Guardá en el baúl todo lo que no uses hoy."},
    "4":{t:"Act 4 — Mitad de camino",p:[{i:"✦",x:"Buscá items con HP flat o HP%. Menos de 3500 HP en Act 4+ es riesgo innecesario."},{i:"✦",x:"Si tenés vida leech (Hunger, Bloodthirst), el HP alto potencia ese sustain brutalmente."},{i:"✦",x:"Trabajá el segundo skill de utilidad — movilidad o buff — para tener un loop limpio."},{i:"⚠",r:1,x:"No sigas avanzando sin al menos 3500 HP. Los enemigos de Act 5+ duelen más."}],rng:"Si el gear no mejora tu HP, buscá en el baúl items con vida plana aunque otros stats sean menores."},
    "5":{t:"Act 5 — Fin del tutorial",p:[{i:"✦",x:"Último Act del Episodio 1. Completar todo al 100% acá sienta las bases para el Ep.2."},{i:"✦",x:"Revisá el Chaos Resist. En Episodio 2 empieza a aparecer daño caótico."},{i:"✦",x:"HP objetivo antes de pasar al Ep.2: 4000+."},{i:"⚠",r:1,x:"No te saltes misiones secundarias. Los logros de Ep.1 completos otorgan bonificaciones en Ep.2."}],rng:"Cualquier item con Chaos Resist es bienvenido, aunque no sea BiS en otros slots."},
    "6":{t:"Act 6 — El juego empieza de verdad",p:[{i:"✦",x:"Bienvenido al Episodio 2. Acá el juego asume que ya dominás los fundamentos."},{i:"✦",x:"Con Whirlwind + Iron Will + Hunger tenés la base perfecta. El foco ahora es defensa."},{i:"✦",x:"Cold Resist al 57% es el agujero más urgente. Buscá items con Cold Resist en baúl o drops."},{i:"⚠",r:1,x:"HP 2636 es bajo para este punto. Prioritizá vida sobre DPS en el próximo upgrade."}],rng:"Si te caen items con resistencias aunque el daño sea menor, guardalos. Supervivencia primero."},
    "7":{t:"Act 7 — Escalando",p:[{i:"✦",x:"Rune Master debería estar cerca. Ese unlock activa todo el potencial de tu build AoE."},{i:"✦",x:"Con Spell Activation on Attack Hit + Thorn Explosion el Hunger tendrá el doble de fuentes."},{i:"✦",x:"Farmeá maps secundarios para acumular XP de runa antes del Act 8."},{i:"⚠",r:1,x:"Chaos Resist urgente. Los Acts 8-9 lo usan mucho y el 32% es peligroso."}],rng:"Si el loot no mejora tus resistencias, priorizá farming de XP para Rune Master."},
    "8":{t:"Act 8 — Terreno duro",p:[{i:"✦",x:"Chaos Resist mínimo 60%. Es el act donde más aparece ese tipo de daño."},{i:"✦",x:"Revisá todos los gaps defensivos. Cold Resist y Chaos son los más urgentes."},{i:"✦",x:"Si ya tenés Rune Master activo, el loop Whirlwind → Thorn Explosion debería limpiar sin problemas."},{i:"⚠",r:1,x:"No subestimes los packs con daño caótico. Pueden derretirte si la resistencia está baja."}],rng:"Cualquier item con Chaos Resist es bienvenido, aunque no sea perfecto en otros slots."},
    "9":{t:"Act 9 — Pre-endgame duro",p:[{i:"✦",x:"El build debería estar consolidado. Usá el reset gratuito del Zodiaco antes del Episodio 2."},{i:"✦",x:"HP objetivo: 5000+. Con leech activo eso te hace prácticamente intocable."},{i:"✦",x:"Pensá en las Chaos Dungeon del endgame. Tu build AoE es ideal para ese contenido."},{i:"⚠",r:1,x:"Última oportunidad de resetear Zodiaco gratis. Alinealo con el build final antes del Act 10."}],rng:"El loot de Act 9 es pre-endgame. Guardá todo en el baúl para comparar con drops del Act 10."},
    "10":{t:"Act 10 — Fin del Episodio 2",p:[{i:"✦",x:"Todas las resistencias al cap (75%). El Celestial Orb (+35 Chaos Resist, +18 Element Resist) es exactamente el tipo de pieza que buscás acá."},{i:"✦",x:"Icy Arrow con Illusion Arrow on Hit (Miraseti's Wave) es ideal — proyectiles constantes sin esfuerzo manual."},{i:"✦",x:"El sustain lo da el Sandglass: 1% Max HP regen/seg y +200% regen por debajo del 40% HP."},{i:"⚠",r:1,x:"No cambies el Quiver por stats genéricos. Miraseti's Wave es lo que activa toda la sinergia."},{i:"◈",c:1,x:"Al completar el Act 10 se desbloquea el Episodio 3. El verdadero endgame empieza."}],rng:"En endgame el RNG se vuelve farming deliberado. Ya no es suerte — es rotación estratégica."},
    "11":{t:"Act 11 — Episodio 3 comienza",p:[{i:"✦",x:"Llegaste al Episodio 3. La dificultad escala notablemente — revisá el build completo."},{i:"✦",x:"Completionista: cada mapa al 100% en Ep.3 otorga recompensas que en episodios anteriores no existen."},{i:"◈",c:1,x:"Romper cajas, barriles y objetos del escenario cuenta para logros. Nunca ignorés el entorno."},{i:"⚠",r:1,x:"No avances con resistencias incompletas. El daño elemental y caótico del Ep.3 es mayor."}],rng:"El loot del Episodio 3 es el mejor del juego. Guardá todo aunque no lo uses ahora."},
    "12":{t:"Act 12 — Profundizando",p:[{i:"✦",x:"El 100% de mapa acá empieza a desbloquear contenido exclusivo del Epílogo. No te saltees nada."},{i:"✦",x:"Logros de exploración: cada rincón visitado, cada objeto roto, cada evento completado suma."},{i:"✦",x:"Si tenés Adventure of Traum en progreso, los mapas del Act 12 son de los que más contribuyen."},{i:"◈",c:1,x:"Activá los eventos de mapa secundarios aunque parezcan opcionales. Muchos otorgan logros únicos."},{i:"⚠",r:1,x:"No te quedes sin pociones en los jefes del Act 12. El patrón de daño cambia respecto al Ep.2."}],rng:"A esta altura el RNG ya no te sorprende — sabés qué necesitás y farmeás con dirección."},
    "13":{t:"Act 13 — El final del camino principal",p:[{i:"✦",x:"Último Act antes del Epílogo. Completá cada misión secundaria — muchas son prerequisito para el contenido final."},{i:"✦",x:"Todo al 100%: los logros del Act 13 son de los más valiosos para Adventure of Traum Lv11."},{i:"◈",c:1,x:"Cada caja rota, cada evento completado, cada mapa al 100% en estos acts desbloquea contenido del Epílogo."},{i:"⚠",r:1,x:"No termines el Act 13 sin completar todas las misiones secundarias. Algunas desaparecen al avanzar."}],rng:"El RNG del Act 13 dropea materiales exclusivos del Epílogo. Farmear acá antes de avanzar tiene sentido."},
    "epilogo":{t:"Epílogo — Todo desbloqueado",p:[{i:"◈",c:1,x:"Llegaste. Todo el contenido del juego está disponible: Chaos Dungeon completas, Lacrima, eventos especiales."},{i:"✦",x:"Judgement Executioner y Adventure of Traum Lv11 son los objetivos ahora. Cada logro acumulado en los 13 acts cuenta acá."},{i:"✦",x:"Chaos Dungeon: Icy Arrow + Illusion Arrow es ideal para limpiar waves rápido. Este es el contenido que el build espera."},{i:"✦",x:"Completionista: el Epílogo premia cada logro de los acts anteriores — cajas, exploración, misiones secundarias."},{i:"◈",c:1,x:"La satisfacción de llegar es real. Sos parte del grupo que está en el endgame — ese que los nuevos no ven."}],rng:"En el Epílogo el RNG es tu herramienta de farming, no tu enemigo. Ya sabés cómo usarlo."},
  }
};

// Asegurar que RU/PT siempre tengan consejos disponibles (fallback a EN).
consejos.ru = {
  "1":{t:"Акт 1 — Первые шаги",p:[{i:"✦",x:"Сосредоточьтесь на прокачке уровня, а не на оптимизации экипировки. Экипировка Акта 1 заменяется быстро."},{i:"✦",x:"Надевайте первые руны, которые найдёте, даже если они не идеальны — что-то лучше, чем ничего."},{i:"✦",x:"Изучите систему связей рун. Это самая важная механика в игре."},{i:"⚠",r:1,x:"Не тратьте ресурсы на крафт предметов. Храните всё в сундуке."}],rng:"В Акте 1 RNG не имеет большого значения. Всё, что вы получаете, полезно для изучения системы."},
  "2":{t:"Акт 2 — Принятие формы",p:[{i:"✦",x:"Начните определять направление билда. Физический, элементальный или яд — выберите одно и придерживайтесь."},{i:"✦",x:"Приоритизируйте повышение базовых сопротивлений: Огонь и Молния до 50%."},{i:"✦",x:"Если билд не ясен, посмотрите, какие руны падали лучше и следуйте той линии."},{i:"⚠",r:1,x:"Не смешивайте типы урона. Фокусируйтесь на одном, чтобы скейлинг работал."}],rng:"Если лут не соответствует выбранному билду, рассмотрите поворот. Акт 2 — хорошее время."},
  "3":{t:"Акт 3 — Консолидация",p:[{i:"✦",x:"Проверьте свои сопротивления. Огонь, Молния и Яд должны приближаться к 75%."},{i:"✦",x:"Начните работать над Критическим шансом, если ваш билд этого требует. Минимальная база: 40%."},{i:"✦",x:"Связи рун: убедитесь, что у вас есть хотя бы 3 руны, связанные с вашим основным навыком."},{i:"⚠",r:1,x:"Если Chaos Resist на 0, оставьте так на сейчас. Это прорабатывается позже."}],rng:"То, что падает в Акте 3, начинает иметь реальный вес. Храните в сундуке всё, что не используете сегодня."},
  "4":{t:"Акт 4 — Полпути",p:[{i:"✦",x:"Ищите предметы с плоским HP или HP%. Менее 3500 HP в Акте 4+ — ненужный риск."},{i:"✦",x:"Если у вас есть лifesteal (Hunger, Bloodthirst), высокий HP усиливает этот sustain brutalно."},{i:"✦",x:"Работайте над вторым utility навыком — мобильность или бафф — чтобы иметь чистый луп."},{i:"⚠",r:1,x:"Не продвигайтесь дальше без хотя бы 3500 HP. Враги Акта 5+ бьют сильнее."}],rng:"Если экипировка не улучшает ваш HP, поищите в сундуке предметы с плоским life, даже если другие статы ниже."},
  "5":{t:"Акт 5 — Конец туториала",p:[{i:"✦",x:"Последний акт Эпизода 1. Полное прохождение всего здесь закладывает основы для Эп.2."},{i:"✦",x:"Проверьте Chaos Resist. Хаотический урон начинает появляться в Эпизоде 2."},{i:"✦",x:"Цель HP перед переходом в Эп.2: 4000+."},{i:"⚠",r:1,x:"Не пропускайте side-квесты. Логи Эп.1 дают бонусы в Эп.2."}],rng:"Любой предмет с Chaos Resist приветствуется, даже если не BiS в других слотах."},
  "6":{t:"Акт 6 — Игра начинается по-настоящему",p:[{i:"✦",x:"Добро пожаловать в Эпизод 2. Теперь игра предполагает, что вы освоили основы."},{i:"✦",x:"С Whirlwind + Iron Will + Hunger у вас идеальная база. Фокус теперь на защите."},{i:"✦",x:"Cold Resist на 57% — самый срочный пробел. Ищите предметы с Cold Resist в сундуке или дропах."},{i:"⚠",r:1,x:"HP 2636 низко для этого момента. Приоритизируйте HP над DPS в следующем апгрейде."}],rng:"Если предметы падают с сопротивлениями, даже если урон ниже, храните их. Выживание прежде всего."},
  "7":{t:"Акт 7 — Масштабирование",p:[{i:"✦",x:"Rune Master должен быть близко. Этот анлок активирует полный потенциал вашего AoE билда."},{i:"✦",x:"С Spell Activation on Attack Hit + Thorn Explosion Hunger будет иметь двойные источники."},{i:"✦",x:"Фармите secondary карты, чтобы накопить XP рун перед Актом 8."},{i:"⚠",r:1,x:"Chaos Resist срочно. Акты 8-9 используют его много и 32% опасно."}],rng:"Если лут не улучшает ваши сопротивления, приоритизируйте фарм XP для Rune Master."},
  "8":{t:"Акт 8 — Жёсткая местность",p:[{i:"✦",x:"Chaos Resist минимум 60%. Это акт, где он появляется больше всего."},{i:"✦",x:"Проверьте все defensive пробелы. Cold Resist и Chaos самые срочные."},{i:"✦",x:"Если Rune Master активен, луп Whirlwind → Thorn Explosion должен чистить гладко."},{i:"⚠",r:1,x:"Не недооценивайте паки с хаотическим уроном. Они могут растопить вас, если сопротивление низкое."}],rng:"Любой предмет с Chaos Resist приветствуется здесь, даже если не идеален в других слотах."},
  "9":{t:"Акт 9 — Жёсткий pre-endgame",p:[{i:"✦",x:"Билд должен быть консолидирован. Используйте бесплатный ресет Zodiac перед окончанием Эпизода 2."},{i:"✦",x:"Цель HP: 5000+. С лifesteal активным это делает вас практически неуязвимым."},{i:"✦",x:"Думайте о endgame Chaos Dungeons. Ваш AoE билд идеален для этого контента."},{i:"⚠",r:1,x:"Последний шанс на бесплатный ресет Zodiac. Выровняйте его с финальным билдом перед Актом 10."}],rng:"Лут Акта 9 — pre-endgame. Храните всё в сундуке, чтобы сравнить с дропами Акта 10."},
  "10":{t:"Акт 10 — Конец Эпизода 2",p:[{i:"✦",x:"Все сопротивления на кап (75%). Celestial Orb (+35 Chaos Resist, +18 Element Resist) — именно та вещь, которую вы ищете."},{i:"✦",x:"Icy Arrow с Illusion Arrow on Hit (Miraseti's Wave) идеален — постоянные снаряды без ручного усилия."},{i:"✦",x:"Sustain даёт Sandglass: 1% Max HP regen/sec и +200% regen ниже 40% HP."},{i:"⚠",r:1,x:"Не заменяйте Quiver на generic статы. Miraseti's Wave активирует всю синергию билда."},{i:"◈",c:1,x:"Завершение Акта 10 открывает Эпизод 3. Настоящий endgame начинается."}],rng:"В endgame RNG становится deliberate farming. Это больше не удача — стратегическая ротация контента."},
  "11":{t:"Акт 11 — Эпизод 3 начинается",p:[{i:"✦",x:"Вы достигли Эпизода 3. Сложность масштабируется заметно — пересмотрите полный билд."},{i:"✦",x:"Completionist: каждые 100% карты в Эп.3 дают награды, которых нет в предыдущих эпизодах."},{i:"◈",c:1,x:"Разбивание ящиков, бочек и объектов сцены считается для достижений. Никогда не игнорируйте окружение."},{i:"⚠",r:1,x:"Не продвигайтесь с неполными сопротивлениями. Элементальный и хаотический урон в Эп.3 выше."}],rng:"Лут Эпизода 3 — лучший в игре. Храните всё, даже если не используете сейчас."},
  "12":{t:"Акт 12 — Углубление",p:[{i:"✦",x:"100% карты здесь начинает открывать exclusive Эпилог контент. Не пропускайте ничего."},{i:"✦",x:"Достижения exploration: каждый посещенный уголок, каждый разбитый объект, каждый завершённый event считается."},{i:"✦",x:"Если у вас Adventure of Traum в прогрессе, карты Акта 12 — среди самых contributing."},{i:"◈",c:1,x:"Активируйте secondary map events даже если они кажутся optional. Многие дают unique достижения."},{i:"⚠",r:1,x:"Не заканчивайтесь без potions на боссах Акта 12. Паттерны урона меняются по сравнению с Эп.2."}],rng:"На этой высоте RNG вас больше не удивляет — вы знаете, что вам нужно и фармите с направлением."},
  "13":{t:"Акт 13 — Конец основного пути",p:[{i:"✦",x:"Последний акт перед Эпилогом. Завершите каждый side-квест — многие являются prerequisites для финального контента."},{i:"✦",x:"Всё на 100%: достижения Акта 13 — среди самых ценных для Adventure of Traum Lv11."},{i:"◈",c:1,x:"Каждый разбитый ящик, каждый завершённый event, каждая 100% карта в этих актах открывает Эпилог контент."},{i:"⚠",r:1,x:"Не заканчивайте Акт 13 без завершения всех side-квестов. Некоторые исчезают при продвижении."}],rng:"RNG Акта 13 дропает exclusive Эпилог материалы. Фарм здесь перед продвижением имеет смысл."},
  "epilogo":{t:"Эпилог — Всё открыто",p:[{i:"◈",c:1,x:"Вы сделали это. Весь контент игры доступен: полные Chaos Dungeons, Lacrima, special events."},{i:"✦",x:"Judgement Executioner и Adventure of Traum Lv11 — теперь цели. Каждое достижение из 13 актов считается здесь."},{i:"✦",x:"Chaos Dungeon: Icy Arrow + Illusion Arrow идеален для быстрой очистки волн. Это контент, для которого билд был построен."},{i:"✦",x:"Completionist: Эпилог награждает каждое достижение из предыдущих актов — ящики, exploration, side-квесты."},{i:"◈",c:1,x:"Удовлетворение от достижения реально. Вы часть endgame группы — той, которую новые игроки не видят."}],rng:"В Эпилоге RNG — ваш инструмент farming, не враг. Вы уже знаете, как его использовать."},
};
consejos.pt = {
  "1":{t:"Ato 1 — Primeiros passos",p:[{i:"✦",x:"Concentre-se em subir de nível, não em otimizar equipamento. O equipamento do Ato 1 é substituído rápido."},{i:"✦",x:"Equipe as primeiras runas que encontrar, mesmo se não forem perfeitas — algo é melhor que nada."},{i:"✦",x:"Aprenda o sistema de links de runas. É a mecânica mais importante do jogo."},{i:"⚠",r:1,x:"Não gaste recursos craftando itens. Armazene tudo no baú."}],rng:"No Ato 1 o RNG não importa muito. Tudo que você ganha é útil para aprender o sistema."},
  "2":{t:"Ato 2 — Tomando forma",p:[{i:"✦",x:"Comece a definir a direção do build. Físico, elemental ou veneno — escolha um e comprometa-se."},{i:"✦",x:"Priorize aumentar as resistências básicas: Fogo e Raio para pelo menos 50%."},{i:"✦",x:"Se o build não estiver claro, veja quais runas caíram melhor e siga aquela linha."},{i:"⚠",r:1,x:"Não misture tipos de dano. Foque em um só para o scaling funcionar."}],rng:"Se o loot não se alinha com o build pretendido, considere pivotar. O Ato 2 é um bom momento."},
  "3":{t:"Ato 3 — Consolidando",p:[{i:"✦",x:"Verifique suas resistências. Fogo, Raio e Veneno devem se aproximar de 75%."},{i:"✦",x:"Comece a trabalhar no Chance Crítico se seu build exigir. Base mínima: 40%."},{i:"✦",x:"Links de runas: certifique-se de ter pelo menos 3 runas conectadas à sua habilidade principal."},{i:"⚠",r:1,x:"Se Chaos Resist estiver em 0, deixe assim por enquanto. É trabalhado depois."}],rng:"O que cai no Ato 3 começa a ter peso real. Armazene no baú tudo que não usar hoje."},
  "4":{t:"Ato 4 — Meio caminho",p:[{i:"✦",x:"Procure itens com HP plano ou HP%. Menos de 3500 HP no Ato 4+ é risco desnecessário."},{i:"✦",x:"Se você tiver life leech (Hunger, Bloodthirst), HP alto amplifica esse sustain brutalmente."},{i:"✦",x:"Trabalhe na segunda habilidade utility — mobilidade ou buff — para ter um loop limpo."},{i:"⚠",r:1,x:"Não avance sem pelo menos 3500 HP. Inimigos do Ato 5+ batem mais forte."}],rng:"Se o equipamento não melhorar seu HP, procure no baú itens com vida plana mesmo se outros stats forem menores."},
  "5":{t:"Ato 5 — Fim do tutorial",p:[{i:"✦",x:"Último ato do Episódio 1. Completar tudo em 100% aqui estabelece as bases para Ep.2."},{i:"✦",x:"Verifique Chaos Resist. Dano caótico começa a aparecer no Episódio 2."},{i:"✦",x:"Objetivo de HP antes de ir para Ep.2: 4000+."},{i:"⚠",r:1,x:"Não pule missões secundárias. Conquistas do Ep.1 concedem bônus no Ep.2."}],rng:"Qualquer item com Chaos Resist é bem-vindo, mesmo se não for BiS em outros slots."},
  "6":{t:"Ato 6 — O jogo começa de verdade",p:[{i:"✦",x:"Bem-vindo ao Episódio 2. Agora o jogo assume que você dominou os fundamentos."},{i:"✦",x:"Com Whirlwind + Iron Will + Hunger você tem a base perfeita. O foco agora é defesa."},{i:"✦",x:"Cold Resist em 57% é a lacuna mais urgente. Procure itens com Cold Resist no baú ou drops."},{i:"⚠",r:1,x:"HP 2636 é baixo para este ponto. Priorize HP sobre DPS no próximo upgrade."}],rng:"Se itens caem com resistências mesmo se dano for menor, guarde-os. Sobrevivência em primeiro lugar."},
  "7":{t:"Ato 7 — Escalando",p:[{i:"✦",x:"Rune Master deve estar próximo. Esse unlock ativa o potencial completo do seu build AoE."},{i:"✦",x:"Com Spell Activation on Attack Hit + Thorn Explosion, Hunger terá fontes duplas."},{i:"✦",x:"Farmei mapas secundários para acumular XP de runa antes do Ato 8."},{i:"⚠",r:1,x:"Chaos Resist urgente. Atos 8-9 usam muito e 32% é perigoso."}],rng:"Se loot não melhorar suas resistências, priorize farming de XP para Rune Master."},
  "8":{t:"Ato 8 — Terreno duro",p:[{i:"✦",x:"Chaos Resist mínimo 60%. Este é o ato onde aparece mais."},{i:"✦",x:"Verifique todas as lacunas defensivas. Cold Resist e Chaos são os mais urgentes."},{i:"✦",x:"Se Rune Master estiver ativo, o loop Whirlwind → Thorn Explosion deve limpar suavemente."},{i:"⚠",r:1,x:"Não subestime pacotes com dano caótico. Eles podem derretê-lo se resistência for baixa."}],rng:"Qualquer item com Chaos Resist é bem-vindo aqui, mesmo se não perfeito em outros slots."},
  "9":{t:"Ato 9 — Pré-endgame duro",p:[{i:"✦",x:"O build deve estar consolidado. Use o reset gratuito do Zodiaco antes do Episódio 2 acabar."},{i:"✦",x:"Objetivo de HP: 5000+. Com leech ativo isso o torna praticamente intocável."},{i:"✦",x:"Pense em Chaos Dungeons do endgame. Seu build AoE é ideal para esse conteúdo."},{i:"⚠",r:1,x:"Última chance para reset gratuito de Zodiaco. Alinhe-o com o build final antes do Ato 10."}],rng:"Loot do Ato 9 é pré-endgame. Armazene tudo no baú para comparar com drops do Ato 10."},
  "10":{t:"Ato 10 — Fim do Episódio 2",p:[{i:"✦",x:"Todas as resistências no cap (75%). O Celestial Orb (+35 Chaos Resist, +18 Element Resist) é exatamente a peça que você procura."},{i:"✦",x:"Icy Arrow com Illusion Arrow on Hit (Miraseti's Wave) é ideal — projéteis constantes sem esforço manual."},{i:"✦",x:"O sustain vem do Sandglass: 1% Max HP regen/seg e +200% regen abaixo de 40% HP."},{i:"⚠",r:1,x:"Não substitua o Quiver por stats genéricos. Miraseti's Wave ativa toda a sinergia do build."},{i:"◈",c:1,x:"Completar o Ato 10 desbloqueia o Episódio 3. O verdadeiro endgame começa."}],rng:"No endgame RNG se torna farming deliberado. Não é mais sorte — rotação estratégica de conteúdo."},
  "11":{t:"Ato 11 — Episódio 3 começa",p:[{i:"✦",x:"Você alcançou o Episódio 3. Dificuldade escala notavelmente — revise o build completo."},{i:"✦",x:"Completionist: cada mapa 100% no Ep.3 concede recompensas que não existem em episódios anteriores."},{i:"◈",c:1,x:"Quebrar caixas, barris e objetos da cena conta para conquistas. Nunca ignore o ambiente."},{i:"⚠",r:1,x:"Não avance com resistências incompletas. Dano elemental e caótico no Ep.3 é maior."}],rng:"Loot do Episódio 3 é o melhor do jogo. Armazene tudo mesmo se não usar agora."},
  "12":{t:"Ato 12 — Aprofundando",p:[{i:"✦",x:"100% de mapa aqui começa a desbloquear conteúdo exclusivo do Epílogo. Não pule nada."},{i:"✦",x:"Conquistas de exploração: cada canto visitado, cada objeto quebrado, cada evento completado conta."},{i:"✦",x:"Se você tiver Adventure of Traum em progresso, mapas do Ato 12 são entre os mais contributing."},{i:"◈",c:1,x:"Ative eventos de mapa secundário mesmo se parecerem opcionais. Muitos concedem conquistas únicas."},{i:"⚠",r:1,x:"Não fique sem poções nos chefes do Ato 12. Padrões de dano mudam em relação ao Ep.2."}],rng:"Neste ponto RNG não te surpreende mais — você sabe o que precisa e farmei com direção."},
  "13":{t:"Ato 13 — Fim do caminho principal",p:[{i:"✦",x:"Último ato antes do Epílogo. Complete cada missão secundária — muitas são pré-requisitos para conteúdo final."},{i:"✦",x:"Tudo em 100%: conquistas do Ato 13 são entre as mais valiosas para Adventure of Traum Lv11."},{i:"◈",c:1,x:"Cada caixa quebrada, cada evento completado, cada mapa 100% nestes atos desbloqueia conteúdo do Epílogo."},{i:"⚠",r:1,x:"Não termine o Ato 13 sem completar todas as missões secundárias. Algumas desaparecem ao avançar."}],rng:"RNG do Ato 13 dropa materiais exclusivos do Epílogo. Farmar aqui antes de avançar faz sentido."},
  "epilogo":{t:"Epílogo — Tudo desbloqueado",p:[{i:"◈",c:1,x:"Você conseguiu. Todo o conteúdo do jogo está disponível: Chaos Dungeons completas, Lacrima, eventos especiais."},{i:"✦",x:"Judgement Executioner e Adventure of Traum Lv11 são os objetivos agora. Cada conquista dos 13 atos conta aqui."},{i:"✦",x:"Chaos Dungeon: Icy Arrow + Illusion Arrow é ideal para limpar ondas rápido. Este é o conteúdo para o qual o build foi construído."},{i:"✦",x:"Completionist: o Epílogo recompensa cada conquista dos atos anteriores — caixas, exploração, missões secundárias."},{i:"◈",c:1,x:"A satisfação de chegar é real. Você faz parte do grupo endgame — aquele que os novos não veem."}],rng:"No Epílogo RNG é sua ferramenta de farming, não inimigo. Você já sabe como usá-lo."},
};

const rngConsejos = {
  en:{
    bien:"RNG is on your side. Take advantage to stock the chest and prepare your next character or build.",
    mal:"What you don't need today another character will need tomorrow. Everything in the chest — nothing gets discarded. Pivoting is not giving up.",
    confundido:"Look at what type of damage dominates the items that dropped and follow that line. RNG often shows you the path — listen to it."
  },
  ru:{
    bien:"RNG на вашей стороне. Используйте это, чтобы запастись сундуком и подготовить следующего персонажа или билд.",
    mal:"То, что вам не нужно сегодня, завтра понадобится другому персонажу. Всё в сундук — ничего не выбрасывайте. Перестраиваться — это не сдаваться.",
    confundido:"Смотрите, какой тип урона доминирует у предметов, которые вам выпали, и продолжайте эту линию. RNG часто показывает путь — прислушайтесь к нему."
  },
  pt:{
    bien:"O RNG está a seu favor. Aproveite para estocar o baú e preparar seu próximo personagem ou build.",
    mal:"O que você não precisa hoje outro personagem vai precisar amanhã. Tudo no baú — nada é descartado. Pivotar não é desistir.",
    confundido:"Veja qual tipo de dano domina os itens que você recebeu e siga essa linha. O RNG muitas vezes mostra o caminho — ouça-o."
  },
  es:{
    bien:"El RNG está de tu lado. Aprovechá para stockear el baúl y preparar el próximo personaje o build.",
    mal:"Lo que no necesitás hoy lo va a necesitar otro personaje mañana. Todo al baúl — nada se descarta. Pivotar no es rendirse.",
    confundido:"Mirá qué tipo de daño dominan los items que te cayeron y seguí esa línea. El RNG muchas veces te muestra el camino — escuchalo."
  }
};

let lang = 'es';

const situacionData = {
  en:{
    low_dmg:{i:'⚔️',x:'Prioritize leveling your flat damage Link Runes over gear upgrades. Rune scaling outpaces gear in early/mid game.',c:true},
    glass:{i:'🛡️',x:'Check your elemental resists. Don\'t push further without 75% resist to the current Act\'s dominant element.',r:true},
    stuck:{i:'🔄',x:'Do some backtracking. Farming the previous map 5 times gives you the XP to break the wall — plus extra chest drops.'},
    lucky:{i:'💎',x:'Don\'t hoard everything by reflex. If the loot is good but not for your build, consider switching now while it\'s cheap.',c:true},
  },
  ru:{
    low_dmg:{i:'⚔️',x:'Приоритезируйте прокачку рунических связок на плоском уроне (flat damage) вместо апгрейдов шмота. Масштабирование рун обгоняет экип в early/mid игре.',c:true},
    glass:{i:'🛡️',x:'Проверьте ваши элементальные сопротивления. Не продвигайтесь дальше без 75% резиста к доминирующему элементу текущего Акта.',r:true},
    stuck:{i:'🔄',x:'Сделайте backtrack. Фарм предыдущей карты 5 раз даёт нужную XP, чтобы пробить стену — плюс дополнительные дропы в сундук.'},
    lucky:{i:'💎',x:'Не прячьте всё по привычке. Если лут хорош, но не подходит вашему билду, рассмотрите переключение прямо сейчас — пока это дешево.',c:true},
  },
  pt:{
    low_dmg:{i:'⚔️',x:'Priorize aumentar o nível das runas de ligação de dano plano (flat damage) antes de trocar de equipamento. O scaling das runas supera o gear no early/mid game.',c:true},
    glass:{i:'🛡️',x:'Verifique suas resistências elementais. Não avance sem ter 75% de resistência ao elemento dominante do Act atual.',r:true},
    stuck:{i:'🔄',x:'Faça backtrack. Farmar a mapa anterior 5 vezes dá a XP necessária para quebrar a barreira — além de drops extras para o baú.'},
    lucky:{i:'💎',x:'Não guarde tudo por reflexo. Se o loot for bom, mas não for do seu build, considere trocar agora enquanto está barato.',c:true},
  },
  es:{
    low_dmg:{i:'⚔️',x:'Priorizá subir el nivel de tus runas de daño plano antes que el equipo. El scaling de runas supera al gear en early/mid game.',c:true},
    glass:{i:'🛡️',x:'Revisá tus resistencias elementales. No avances sin tener 75% al elemento predominante del Act actual.',r:true},
    stuck:{i:'🔄',x:'Hacé backtrack. Farmear el mapa anterior 5 veces te da la XP necesaria para romper el muro — y drops extras para el baúl.'},
    lucky:{i:'💎',x:'No guardes todo por inercia. Si el drop es bueno pero no es de tu build, considerá pivotar ahora que es barato.',c:true},
  }
};

function updateText() {
  console.log('updateText:', lang);
  
  // Mostrar/ocultar spans de idioma en la sección MI CAMINO y partes similares
  document.querySelectorAll('.lang-es, .lang-en, .lang-ru, .lang-pt, .lang-fr, .lang-ko, .lang-zh').forEach(el => {
    el.style.display = 'none';
  });
  const langClass = `.lang-${lang}`;
  document.querySelectorAll(langClass).forEach(el => {
    el.style.display = 'inline';
  });
  
  if (T[lang]) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && T[lang][key] !== undefined) {
        el.innerHTML = T[lang][key];
      }
    });

    document.querySelectorAll('[data-i18n-opt]').forEach(el => {
      const key = el.getAttribute('data-i18n-opt');
      if (key && T[lang][key] !== undefined) {
        el.textContent = T[lang][key];
      }
    });
  }

  const labels = document.querySelectorAll('label');
  if (labels.length >= 4) {
    labels[0].textContent = T[lang]['lbl.act'];
    labels[1].textContent = T[lang]['lbl.build'];
    labels[2].textContent = T[lang]['lbl.rng'];
    labels[3].textContent = T[lang]['lbl.sit'];
  }
  const analyzeBtn = document.querySelector('.btn-analizar');
  if (analyzeBtn) {
    analyzeBtn.textContent = T[lang]['btn.analyze'];
  }

  // Helper to update select options
  function updateSelect(selectId, options) {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.options[0].text = T[lang]['sel'];
    options.forEach((opt, i) => {
      if (select.options[i+1]) select.options[i+1].text = T[lang][opt];
    });
  }

  updateSelect('sel-acto', ['act.1', 'act.2', 'act.3', 'act.4', 'act.5', 'act.6', 'act.7', 'act.8', 'act.9', 'act.10', 'act.11', 'act.12', 'act.13', 'epilogo']);
  updateSelect('sel-build', ['b.fisico', 'b.veneno', 'b.crit', 'b.inv', 'b.noidea']);
  updateSelect('sel-rng', ['r.bien', 'r.mal', 'r.conf']);

  document.querySelectorAll('[data-i18n-optgroup]').forEach(el => {
    const key = el.getAttribute('data-i18n-optgroup');
    if (key && T[lang][key] !== undefined) {
      el.label = T[lang][key];
    }
  });

  // Update situacion
  const sitSelect = document.getElementById('sel-situacion');
  if (sitSelect) {
    sitSelect.options[0].text = T[lang]['sit.none'];
    sitSelect.options[1].text = T[lang]['sit.dmg'];
    sitSelect.options[2].text = T[lang]['sit.glass'];
    sitSelect.options[3].text = T[lang]['sit.stuck'];
    sitSelect.options[4].text = T[lang]['sit.lucky'];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateText();
document.querySelectorAll('.lang-toggle [data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.lang;
      lang = selected;
      document.documentElement.lang = selected;
      updateText();
      updateConditionals();
      // Close all FAQ items on lang change to avoid stale open state
      document.querySelectorAll('.faq-question').forEach(b => {
        b.classList.remove('open');
        const ans = b.nextElementSibling;
        if (ans) ans.style.display = 'none';
      });
      document.querySelectorAll('.lang-toggle [data-lang]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  const analyzeBtn = document.querySelector('.btn-analizar');
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', analizar);
  }

  // Music player with multiple tracks
  const tracks = [
    { name: 'Dungeon_Final_ProjectU.mp3', title: 'Dungeon Theme' },
    { name: 'ambiente.mp3', title: 'Ambient Theme' }
  ];
  let currentTrackIndex = 0;
  
  const bgMusic = new Audio(tracks[currentTrackIndex].name);
  bgMusic.loop = true;
  bgMusic.volume = 0.3;
  
  // Fade-in effect — using named function so it can be removed
  function onTrackLoaded() {
    bgMusic.volume = 0;
    const fadeIn = setInterval(() => {
      if (bgMusic.volume < 0.28) {
        bgMusic.volume = Math.min(0.3, bgMusic.volume + 0.01);
      } else {
        clearInterval(fadeIn);
        bgMusic.volume = 0.3;
      }
    }, 50);
  }
  bgMusic.addEventListener('loadeddata', onTrackLoaded);

  // Auto-start on first interaction
  document.addEventListener('click', () => {
    bgMusic.play().catch(() => {});
  }, { once: true });

  const musicBtn = document.getElementById('music-btn');
  const volDisplay = document.getElementById('vol-display');
  const volUp = document.getElementById('vol-up');
  const volDown = document.getElementById('vol-down');

  // Function to switch tracks
  function switchTrack(direction) {
    const wasPlaying = !bgMusic.paused;
    bgMusic.pause();

    if (direction === 'next') {
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    } else {
      currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    }

    bgMusic.src = tracks[currentTrackIndex].name;
    bgMusic.load();

    if (wasPlaying) {
      bgMusic.addEventListener('canplay', function playOnReady() {
        bgMusic.play().catch(() => {});
        bgMusic.removeEventListener('canplay', playOnReady);
      });
    }

    updateMusicButton();
  }

  // Update music button text
  function updateMusicButton() {
    const currentTrack = tracks[currentTrackIndex];
    if (bgMusic.paused) {
      musicBtn.textContent = `▶ ${currentTrack.title}`;
      musicBtn.style.color = '';
      musicBtn.style.borderColor = '';
    } else {
      musicBtn.textContent = `■ ${currentTrack.title}`;
      musicBtn.style.color = 'var(--red2)';
      musicBtn.style.borderColor = 'var(--red2)';
    }
  }

  // Play / Stop
  if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
      } else {
        bgMusic.pause();
      }
      updateMusicButton();
    });
  }

  // Volume controls — clamped between 0 and 1, step 10%
  function updateVol(delta) {
    const newVol = Math.min(1, Math.max(0, Math.round((bgMusic.volume + delta) * 10) / 10));
    bgMusic.volume = newVol;
    if (volDisplay) volDisplay.textContent = Math.round(newVol * 100) + '%';
    // Visual feedback at limits
    if (volDown) volDown.style.opacity = newVol <= 0 ? '0.3' : '1';
    if (volUp)   volUp.style.opacity   = newVol >= 1 ? '0.3' : '1';
  }

  if (volUp)   volUp.addEventListener('click',   (e) => { e.stopPropagation(); updateVol(0.1);  });
  if (volDown) volDown.addEventListener('click',  (e) => { e.stopPropagation(); updateVol(-0.1); });
  
  // Track navigation buttons
  const prevBtn = document.getElementById('prev-track');
  const nextBtn = document.getElementById('next-track');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => { 
      e.stopPropagation(); 
      switchTrack('prev'); 
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => { 
      e.stopPropagation(); 
      switchTrack('next'); 
    });
  }
  
  // Initialize music button display
  updateMusicButton();
});

function analizar(){
  const acto=document.getElementById('sel-acto').value;
  const build=document.getElementById('sel-build').value;
  const rng=document.getElementById('sel-rng').value;
  const res=document.getElementById('resultado');
  const errMsg=lang==='es'
    ?'⚠ Seleccioná el Act actual para continuar.'
    : lang==='ru'
      ?'⚠ Выберите текущий Акт чтобы продолжить.'
      : lang==='pt'
        ?'⚠ Selecione o Act atual para continuar.'
        : '⚠ Select your current Act to continue.';
  if(!acto){res.innerHTML=`<div style="color:var(--red2);font-size:11px;">${errMsg}</div>`;res.classList.add('show');return;}
  // Fallback RU/PT: si falta traducción en consejos, usar EN.
  let effectiveLang = lang;
  if((lang==='ru' || lang==='pt') && (!consejos[lang] || !consejos[lang][acto])) effectiveLang = 'en';

  const data=consejos[effectiveLang][acto];
  let html=`<div class="res-title">// ${data.t}</div>`;
  data.p.forEach(p=>{
    const color=p.r?'red':p.c?'cyan':'';
    html+=`<div class="res-item"><span class="res-icon ${color}">${p.i}</span><span>${p.x}</span></div>`;
  });
  const rngText = (rng && rngConsejos[lang] && rngConsejos[lang][rng]) ? rngConsejos[lang][rng]
                  : (rng && rngConsejos.en && rngConsejos.en[rng]) ? rngConsejos.en[rng]
                  : '';
  if(rngText){
    html+=`<div class="rng-nota"><strong>RNG · </strong>${rngText}</div>`;
  }
  if(build==='nolosé'||build==='noidea'){
    const buildMsg=lang==='es'
      ?'Mirá qué runas y gear te caen con más frecuencia. El RNG ya está sugiriendo una dirección — seguila.'
      : lang==='ru'
        ?'Посмотрите, какие руны и шмот падают чаще всего. RNG уже подсказывает направление — следуйте ему.'
        : lang==='pt'
          ?'Veja quais runas e gear caem com mais frequência. O RNG já está sugerindo uma direção — siga-a.'
          :'Look at which runes and gear drop most often. The RNG is already suggesting a direction — follow it.';
    html+=`<div class="rng-nota" style="border-left-color:var(--cyan);background:rgba(0,229,255,.04)"><strong style="color:var(--cyan)">BUILD · </strong>${buildMsg}</div>`;
  }
  const sitVal=document.getElementById('sel-situacion').value;

  const s = (sitVal && situacionData[lang] && situacionData[lang][sitVal]) ? situacionData[lang][sitVal]
          : (sitVal && situacionData.en && situacionData.en[sitVal]) ? situacionData.en[sitVal]
          : null;

  if(s){
    const sColor=s.r?'red':s.c?'cyan':'';
    const sitLabel=lang==='es'
      ?'PROBLEMA'
      : lang==='ru'
        ?'ПРОБЛЕМА'
        : lang==='pt'
          ?'PROBLEMA'
          :'ISSUE';
    html+=`<div class="rng-nota" style="border-left-color:var(--${s.r?'red2':s.c?'cyan':'amber'});background:rgba(${s.r?'192,57,43':s.c?'0,229,255':'255,176,0'},.05)"><strong style="color:var(--${s.r?'red2':s.c?'cyan':'amber'})">${sitLabel} · </strong>${s.x}</div>`;
  }
  res.innerHTML = html;
  res.classList.add('show');
}


// ══ WEAPON MATRIX UI ══════════════════════════════════════════
(function() {
  function wmInit() {
    if (typeof WEAPON_DATABASE === 'undefined') {
      console.warn('weapon_matrix.js not loaded yet — retrying in 300ms');
      setTimeout(wmInit, 300);
      return;
    }
    const types = Object.keys(WEAPON_DATABASE);
    ['wm-type1','wm-type2'].forEach(id => {
      const sel = document.getElementById(id);
      if (!sel) return;
      // keep existing first option(s)
      const keep = Array.from(sel.options).filter(o => o.value === '' || o.value === '__none__');
      sel.innerHTML = '';
      keep.forEach(o => sel.appendChild(o));
      types.forEach(t => {
        const o = document.createElement('option');
        o.value = t; o.textContent = t;
        sel.appendChild(o);
      });
    });
  }
  document.addEventListener('DOMContentLoaded', wmInit);
})();

function wmPopulateNames(hand) {
  setTimeout(wmShowLore, 50);
  if (typeof WEAPON_DATABASE === 'undefined') return;
  const typeId = 'wm-type' + hand;
  const nameId = 'wm-name' + hand;
  const typeSel = document.getElementById(typeId);
  const nameSel = document.getElementById(nameId);
  if (!typeSel || !nameSel) return;

  const type = typeSel.value;
  nameSel.innerHTML = '';

  if (!type || type === '__none__') {
    nameSel.innerHTML = '<option value="">— Sin arma —</option>';
    return;
  }

  const cat = WEAPON_DATABASE[type];
  if (!cat) return;

  const def = document.createElement('option');
  def.value = ''; def.textContent = '— Nombre —';
  nameSel.appendChild(def);

  cat.baseTypes.forEach(w => {
    const o = document.createElement('option');
    o.value = w.name;
    o.textContent = w.unique ? w.name + ' ★' : w.name;
    nameSel.appendChild(o);
  });
}

function wmValidate() {
  if (typeof validateBuild === 'undefined') {
    alert('weapon_matrix.js no está cargado. Asegurate de incluirlo antes de este script.');
    return;
  }

  const t1 = document.getElementById('wm-type1').value;
  const n1 = document.getElementById('wm-name1').value;
  const t2 = document.getElementById('wm-type2').value;
  const n2 = document.getElementById('wm-name2').value;

  if (!t1 || !n1) {
    wmShowResult({ valid: false, errors: ['Seleccioná el tipo y nombre del arma principal.'], warnings: [], runeAdvice: {} });
    return;
  }

  const w1 = { type: t1, name: n1 };
  const w2 = (t2 && t2 !== '__none__' && n2) ? { type: t2, name: n2 } : null;

  const result = validateBuild(w1, w2);
  wmShowResult(result);
  wmShowLore();
}

function wmShowResult(r) {
  const panel = document.getElementById('wm-result');
  const body  = document.getElementById('wm-result-body');
  if (!panel || !body) return;

  const RUNE_COLOR = { Rojo: '#e74c3c', Verde: '#00ff41', Azul: '#00e5ff' };

  let html = '';

  // ── Status badge ──
  if (r.valid) {
    html += '<div style="margin-bottom:.8rem;color:#00ff41;font-family:Cinzel,serif;letter-spacing:.1em;">✓ BUILD VÁLIDA</div>';
  } else {
    html += '<div style="margin-bottom:.8rem;color:var(--red2);font-family:Cinzel,serif;letter-spacing:.1em;">✕ BUILD INVÁLIDA</div>';
  }

  // ── Errors ──
  r.errors.forEach(e => {
    html += '<div style="display:flex;gap:.5rem;margin-bottom:.4rem;padding:.5rem .7rem;border-left:2px solid var(--red2);background:rgba(192,57,43,.07)">'
          + '<span style="color:var(--red2);flex-shrink:0">⚠</span>'
          + '<span style="color:#c0c0d8;line-height:1.7">' + e + '</span></div>';
  });

  // ── Warnings ──
  r.warnings.forEach(w => {
    html += '<div style="display:flex;gap:.5rem;margin-bottom:.4rem;padding:.5rem .7rem;border-left:2px solid var(--gold);background:rgba(201,168,76,.05)">'
          + '<span style="color:var(--gold);flex-shrink:0">⚡</span>'
          + '<span style="color:#c0c0d8;line-height:1.7">' + w + '</span></div>';
  });

  // ── Rune advice ──
  if (r.runeAdvice && Object.keys(r.runeAdvice).length) {
    html += '<div style="margin-top:.8rem;border-top:1px solid #1e1e3a;padding-top:.8rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:.6rem">';

    const labels = { mainHand: 'Mano Principal', offHand: 'Mano Secundaria' };
    Object.entries(r.runeAdvice).forEach(([slot, advice]) => {
      const col = RUNE_COLOR[advice.color] || '#c9a84c';
      html += '<div style="padding:.7rem .8rem;border:1px solid #1e1e3a;background:rgba(255,255,255,.02)">'
            + '<div style="font-family:Cinzel,serif;font-size:10px;letter-spacing:.12em;color:#666;margin-bottom:.4rem">' + (labels[slot] || slot).toUpperCase() + '</div>'
            + '<div style="font-size:12px;color:#d0d0e8;margin-bottom:.35rem">' + advice.weapon + '</div>'
            + '<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.3rem">'
            + '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:' + col + ';box-shadow:0 0 6px ' + col + ';flex-shrink:0"></span>'
            + '<span style="color:' + col + ';font-weight:600;font-size:11px">' + advice.color.toUpperCase() + ' · ' + advice.stat + '</span>'
            + '</div>'
            + '<div style="color:#666;font-style:italic;font-size:10px;line-height:1.6">' + advice.reason + '</div>'
            + '</div>';
    });

    html += '</div>';
  }

  body.innerHTML = html;
  panel.style.display = 'block';
}

// ── UNIQUE ITEM LORE ──────────────────────────────────────────
function wmGetUniqueData(type, name) {
  // flavorText and passive pulled from weapon_matrix.js WEAPON_DATABASE
  // We extend here with lore — add entries as you unlock more Uniques
  const LORE = {
    'Colmillo Sombrío':    { flavor: '"El que lo empuña no ve luz — pero tampoco la necesita."',            passive: 'Los ataques críticos aplican Veneno por 2s. No acumulable.' },
    'Ojo del Abismo':      { flavor: '"Mira lo que no existe y lo convoca."',                               passive: 'Cada cast tiene 15% de chance de no consumir maná.' },
    'Espada del Caos':     { flavor: '"El filo no distingue entre aliado y enemigo. Solo distingue carne."', passive: '+25% daño si el HP está por debajo del 40%.' },
    'Hacha Maldita':       { flavor: '"Tres dueños anteriores. Los tres murieron sonriendo."',               passive: 'Cada kill otorga un stack de Furia (máx 10). Se pierden al recibir daño.' },
    'Bastón del Caos':     { flavor: '"El caos no se aprende. Se sobrevive."',                              passive: 'Las habilidades de área tienen +20% de radio. Mana cost +10%.' },
    'Filo del Juicio':     { flavor: '"No hay sentencia. Solo hay golpe."',                                 passive: 'Ignora el 15% de la armadura del enemigo.' },
    'Hacha del Titán':     { flavor: '"Fue forjada para un dios. El dios ya no existe."',                   passive: 'Los ataques de área knockback con 100% de efectividad.' },
    'Puño del Dios':       { flavor: '"El sonido que hace al impactar no tiene nombre en ningún idioma."',  passive: 'Aturde al enemigo golpeado por 1.5s. CD: 8s.' },
    'Varita del Vacío':    { flavor: '"No emite luz. Absorbe la de alrededor."',                            passive: 'Los proyectiles atraviesan enemigos y ganan daño por cada uno atravesado.' },
    'Arco Estelar':        { flavor: '"Las flechas no caen. Orbitan."',                                     passive: '+30% velocidad de proyectil. Las flechas no pierden daño por distancia.' },
    'Arco del Cazador':    { flavor: '"El animal no escucha el disparo. Solo el silencio después."',        passive: 'El primer disparo después de estar quieto 2s es siempre crítico.' },
    'Ballesta Arcana':     { flavor: '"Dispara lo que la mente carga, no la mano."',                        passive: 'Los proyectiles mágicos tienen 20% de chance de split al impacto.' },
    'Carcaj Eterno':       { flavor: '"Nunca se vacía. Nadie sabe por qué."',                               passive: 'Las flechas tienen +15% de penetración de resistencias.' },
    'Cargador Omega':      { flavor: '"El último cargador que vas a necesitar."',                           passive: 'El último proyectil de cada secuencia hace 200% de daño.' },
  };

  if (typeof WEAPON_DATABASE === 'undefined') return null;
  const cat = WEAPON_DATABASE[type];
  if (!cat) return null;
  const base = cat.baseTypes.find(w => w.name === name);
  if (!base || !base.unique) return null;

  return {
    name:     base.name,
    type:     type,
    unique:   true,
    req:      base.requirements,
    lore:     LORE[name] || { flavor: '"Objeto de poder desconocido."', passive: 'Pasiva no documentada.' },
    rune:     cat.runeSlotSuggestion(base.requirements),
    handedness: cat.handedness,
  };
}

function wmRenderLore(data) {
  if (!data) return '';

  const RUNE_COLOR = { Rojo: '#e74c3c', Verde: '#00ff41', Azul: '#00e5ff' };
  const col = RUNE_COLOR[data.rune.color] || '#c9a84c';

  const reqPills = Object.entries(data.req).map(([stat, val]) => {
    const cls = stat === 'STR' ? 'str' : stat === 'DEX' ? 'dex' : 'int';
    return `<span class="item-req-pill ${cls}">${stat} ${val}</span>`;
  }).join('');

  return `
    <div class="unique-card">
      <div class="unique-card-header">
        <span class="unique-badge">Único</span>
        <span class="unique-name">${data.name}</span>
      </div>
      <div style="font-size:10px;color:var(--dim);letter-spacing:.08em;margin-bottom:.4rem">
        ${data.type} · ${data.handedness}
      </div>
      <div class="item-req">${reqPills}</div>
      <div style="display:flex;align-items:center;gap:.4rem;margin-top:.5rem">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${col};box-shadow:0 0 5px ${col}"></span>
        <span style="font-size:10px;color:${col}">Runa sugerida: ${data.rune.color} (${data.rune.stat})</span>
      </div>
      <div class="item-lore">
        <div class="item-lore-flavor">${data.lore.flavor}</div>
        <div class="item-lore-passive">${data.lore.passive}</div>
      </div>
    </div>`;
}

function wmShowLore() {
  const lorePanel = document.getElementById('wm-lore');
  if (!lorePanel) return;

  const slots = [
    { type: document.getElementById('wm-type1')?.value, name: document.getElementById('wm-name1')?.value },
    { type: document.getElementById('wm-type2')?.value, name: document.getElementById('wm-name2')?.value },
  ];

  let html = '';
  slots.forEach(s => {
    if (s.type && s.name && s.type !== '__none__') {
      const data = wmGetUniqueData(s.type, s.name);
      if (data) html += wmRenderLore(data);
    }
  });

  lorePanel.innerHTML = html;
  lorePanel.style.display = html ? 'block' : 'none';
}
// ── END UNIQUE ITEM LORE ──────────────────────────────────────

// ══ END WEAPON MATRIX UI ══════════════════════════════════════

// ══ GEAR MATRIX UI ════════════════════════════════════════════



// ── COMP TABS ─────────────────────────────────────────────────
function compTab(pane, btn) {
  document.querySelectorAll('.comp-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.comp-tab').forEach(b => b.classList.remove('active'));
  const target = document.getElementById('pane-' + pane);
  if (target) target.classList.add('active');
  if (btn) btn.classList.add('active');
  // Re-render rune panel if switching to runas tab
  if (pane === 'runas' && typeof renderRunePanel === 'function') {
    setTimeout(renderRunePanel, 50);
  }
}
