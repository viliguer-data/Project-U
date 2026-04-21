# 🎮 Undecember Companion (Project U)

**Una herramienta web para dominar Undecember sin perder la paciencia (ni el teléfono).**

![Project U Banner](https://viliguer-data.github.io/Project-U/warrior_left.webp)

---

## 🌟 ¿Qué es esto?

**Undecember Companion** es una web de apoyo diseñada para jugadores que, como yo, se enfrentaron a este ARPG y pensaron *"¿por qué nadie me explicó esto antes?"*

Con **más de 7,000 líneas de código modulado**, la herramienta te ofrece:

- 🧭 **Tracker de progreso** (Act 1 al Epílogo)
- 🛠️ **Compendio de objetos** (Armas, Armaduras, Accesorios, Runas)
- 🌍 **Soporte para 7 idiomas** (ES, EN, PT, FR, KO, ZH, RU)
- 📦 **Sistema de Baúl / Wardrobe** (guardá objetos y activá sus buffos)
- 🎵 **Música ambiental** (con interruptor y control de volumen)
- 🌗 **Modo claro/oscuro** (para cuidar la vista de noche)

---

## ⚙️ Arquitectura Técnica

El proyecto está **modulado en 14+ archivos JavaScript** para mantener la cordura (y el código limpio):

- `lang.js` → Diccionario de 7 idiomas (1300+ líneas)
- `tracker.js` → Lógica del tracker y consejos
- `gear-ui.js` + `gear_matrix.js` → UI y datos de equipamiento
- `weapon_matrix.js` → Base de datos de armas
- `rune-builder.js` → Sistema de runas (skill + link)
- `audio.js`, `theme.js`, `shield.js`, etc.

**Si todo estuviera en un solo archivo, hablaríamos de ~7.500 líneas.** La modularidad no es un lujo, es una necesidad.

---

## 🚀 Demo en vivo

👉 [**Project U - Undecember Companion**](https://viliguer-data.github.io/Project-U/)

---

## 🧠 Filosofía

> *"No tengo la verdad, pero Conocimiento + Organización = Poder."*

No vengo a decirte cómo jugar. Vengo a contarte **mi camino**, con los errores, los pivotes de build, y el RNG que a veces es amigo y a veces no.

No es un juego difícil, pero hay mucho por hacer. Cada acción pequeña construye un personaje enorme.

Y también, te forma.

**El baúl es tu aliado. El RNG es neutral. Adaptarse no es rendirse.**

---

## 🛠️ Tecnologías usadas

- HTML5 / CSS3 (variables CSS, responsive)
- JavaScript (modular, sin frameworks)
- GitHub Pages (hosting definitivo)

---

## 📬 Contacto / Créditos

Creado por **Glitch Prophet** (un fan que se cansó de buscar guías en chino).

Si querés reportar un bug, sugerir una traducción, o simplemente decir "está buena la herramienta", podés abrir un *issue* en este repo.

---

## 📜 Licencia

Este proyecto es **open source** (MIT). El contenido del juego (nombres, imágenes de runas, etc.) pertenece a **LINE GAMES Corporation**. La web es un proyecto de fan, sin fines comerciales.

---

## 📅 Hito Fundacional

> **Desde el 14 de abril de 2026, esta página se convierte en la web oficial de Project U.**

Un antes y un después. Lo que empezó como un script de apoyo ahora es una herramienta con 7,000 líneas de código, 7 idiomas, y una comunidad (pequeña pero fiel). Que el RNG esté siempre de su lado

*"Play what you get, master what you play."* 🎮

PROJECT U · ROADMAP HACIA LA VERSIÓN 2.6
============================================

FECHA DE INICIO: 15 de abril de 2026
ÚLTIMA ACTUALIZACIÓN: 20 de abril de 2026
ESTADO: VERSIÓN 2.6 OFICIAL


🎯 OBJETIVOS CUMPLIDOS (v2.4 → v2.6)
-------------------------------------

✅ Sistema de internacionalización completo (updateText)
✅ Botón de idioma con clase active móvil
✅ Weapon Matrix con validación de compatibilidad
✅ Arcos → solo permiten Quiver
✅ Ballestas → solo permiten Magazine
✅ Armas de dos manos → sin mano secundaria ni escudo
✅ Grids de armaduras y accesorios funcionales
✅ Imágenes de ítems únicos visibles
✅ Tooltips con hover (nivel, requisitos, stats)
✅ Build Saver: guardar, cargar, exportar, eliminar
✅ Panel de validación con auto-ocultamiento
✅ Escudos genéricos agregados al COMPENDIUM


📁 ESTRUCTURA DE ARCHIVOS FINAL (v2.6)
---------------------------------------

⭐ index.html
⭐ styles.css

⭐ matrix_compendium.js        (datos de items)
⭐ matrix_compendium_assets.js (imágenes de items)
⭐ matrix_runes.js             (skill + link runes)
⭐ matrix_runes_assets.js      (imágenes de runas)

⭐ lang.js                     (traducciones + updateText)
⭐ main.js                     (sincronización + idioma)
⭐ ui_compendium.js            (toda la UI del compendio)
⭐ build-saver.js              (persistencia de builds)
⭐ rune-builder.js             (render de runas)
⭐ tracker.js                  (colección de items)
⭐ theme.js                    (modo claro/oscuro)
⭐ audio.js                    (música ambiental)
⭐ faq.js                      (acordeón de preguntas)
⭐ shield.js                   (lógica de escudos)


🛠️ FUNCIONALIDADES IMPLEMENTADAS (v2.6)
----------------------------------------

🌐 IDIOMAS:
  - 7 idiomas: ES, EN, PT, FR, KO, ZH, RU
  - Traducción dinámica sin recargar página
  - Botón activo con fondo dorado

⚔️ WEAPON MATRIX:
  - Selección de tipo y nombre de arma
  - Compatibilidad automática:
    * Arco → solo Quiver
    * Ballesta → solo Magazine
    * 2H → sin secundaria ni escudo
    * 1H → cualquier combinación
  - Validación con panel flotante
  - Imagen del arma con tooltip

🛡️ GEAR GRIDS:
  - Armaduras: casco, pechera, hombreras, guantes, botas
  - Accesorios: collar, cinturón, anillo
  - Imagen del item al seleccionar
  - Tooltip con stats y requisitos

📚 COMPENDIO:
  - Tabla completa de items
  - Búsqueda en tiempo real
  - Imágenes de items

💾 BUILD SAVER:
  - Guardar build con nombre
  - Cargar build guardada
  - Eliminar build
  - Exportar a texto

🎨 UI/UX:
  - Tema claro/oscuro (bombilla)
  - Tooltips responsive
  - Mensajes toast
  - Panel de validación auto-ocultable


🗂️ COLECCIÓN DE ÚNICOS (26 items)
----------------------------------

ARMAS (8):
  - Seeping Ray of Light (Bow)
  - Tipan's Long Bow (Bow)
  - Chasing Trajectory (Bow)
  - Zephyr Fang (Bow)
  - Sunset Brush (Bow)
  - Miraseti's Wave (Quiver)
  - Miraseti's Rip Current (Quiver)
  - House of Composure (Magazine)

ARMADURAS (11):
  - Sandglass (Helmet)
  - Sunrise Crown (Helmet)
  - Roaring Circlet (Helmet)
  - Tipan's Scale Armor (Body)
  - Awakened's Skin (Body)
  - Starprint (Gloves)
  - Tendril of Evergreen (Gloves)
  - Aquilla's Flight (Boots)
  - Dance of Desperation (Boots)
  - Duty of Flame (Spaulders)
  - Casthor's Gaze (Spaulders)

ACCESORIOS (7):
  - Celestial Orb (Necklace)
  - Valor Talisman (Necklace)
  - Trumpeter's Heart (Necklace)
  - Grave Robber King's Belt (Belt)
  - Hamal's Vine (Belt)
  - Settlement Ring (Ring)
  - Gold Collector's Loop (Ring)

ESCUDOS (3 - genéricos):
  - Light Shield
  - Heavy Shield
  - Tower Shield


📋 PENDIENTE PARA V2.7
----------------------

[ ] Agregar más ítems únicos al COMPENDIUM
[ ] Sistema de colección "Wardrobe" (items guardados en baúl)
[ ] Hover multilingüe completo (7 idiomas en tooltip)
[ ] Optimizar rendimiento de grids con muchos items
[ ] Agregar filtros avanzados al Compendio


🛠️ TECNOLOGÍAS
---------------
- HTML5 / CSS3 / JavaScript (ES6)
- 7 idiomas
- LocalStorage para builds y colección
- CSS Variables para temas claro/oscuro
- Audio ambiental


🎮 FRASE DE CIERRE
------------------
"Play what you get, master what you play"

Project U v2.6 ─── 20/04/2026

Lo que se viene y lo que ya está:
PROJECT U · ROADMAP HACIA LA VERSIÓN 2.8
============================================

FECHA DE INICIO: 15 de abril de 2026
ÚLTIMA ACTUALIZACIÓN: 20 de abril de 2026
ESTADO: v2.6 OFICIAL · PLANIFICANDO v2.7 → v2.8


🎯 OBJETIVOS POR VERSIÓN
------------------------

✅ v2.6 (COMPLETADO - 20/04/2026)
  - Sistema de internacionalización completo
  - Weapon Matrix con validación de compatibilidad
  - Arcos/ballestas/2H con restricciones correctas
  - Imágenes y tooltips de items
  - Build Saver completo (guardar/cargar/eliminar/exportar)

🔜 v2.7 (EN PLANIFICACIÓN)
  - AGREGAR: Japonés (JA) como 8vo idioma
  - AGREGAR: Kanji + Romaji (lectura fonética)
  - MEJORAR: Hover multilingüe para tooltips
  - MEJORAR: Traducciones de todos los items a japonés

🔜 v2.8 (EN PLANIFICACIÓN)
  - AGREGAR: Sistema de colección "Wardrobe"
  - AGREGAR: Filtros avanzados en Compendio
  - MEJORAR: Rendimiento con 100+ items
  - COMPLETAR: Traducción al japonés de toda la UI


🗾 JAPONÉS (JA) - ESTRUCTURA PROPUESTA
---------------------------------------

En lang.js, agregar:

ja: {
  // Kanji formal (para UI principal)
  'hero.sub': '初心者向けガイド',
  'tracker.title': '// トラッカー · 現在地',
  'btn.analyze': '⟶ 状況を分析',
  
  // Romaji (para tooltips o hover)
  '_romaji': {
    'hero.sub': 'Shoshinsha muke gaido',
    'tracker.title': 'Torakkā · Genzaichi'
  },
  
  // Items traducidos
  'item.tipans_long_bow': 'ティパンの長弓 (Tipan no chōkyū)',
  'item.awakeneds_skin': '目覚めし者の皮膜 (Mezameshimono no himaku)',
  'item.bound_celestial_orb': '束縛された天球 (Sokubakusareta tenkyū)'
}


🖼️ HOVER MULTILINGÜE (v2.7)
----------------------------

Tooltips que muestran información del item en:
- Español (ES)
- Inglés (EN)
- Portugués (PT)
- Francés (FR)
- Coreano (KO)
- Chino (ZH)
- Ruso (RU)
- Japonés (JA) ← NUEVO

Ejemplo de tooltip con 8 idiomas:

┌─────────────────────────────────────────┐
│ Tipan's Long Bow                        │
│ ├ ES: Arco Largo de Tipan               │
│ ├ EN: Tipan's Long Bow                  │
│ ├ JA: ティパンの長弓 (Tipan no chōkyū)   │
│ ├ KO: 티판의 장궁                        │
│ └ ...                                   │
│ Nivel: 40 · DEX: 124                    │
│ Daño: 278-332 · Vel: 1.35 · Crit: 11%   │
└─────────────────────────────────────────┘


📋 TAREAS v2.7 (JAPONÉS)
------------------------

[ ] 1. Agregar idioma 'ja' a lang.js (con kanji + romaji)
[ ] 2. Traducir toda la UI existente al japonés
[ ] 3. Traducir nombres de items (26 únicos actuales)
[ ] 4. Agregar botón JA al lang-toggle en index.html
[ ] 5. Probar hover multilingüe con el nuevo idioma
[ ] 6. Ajustar CSS para soporte de kanji (fuentes)


📋 TAREAS v2.8 (WARDROBE + RENDIMIENTO)
---------------------------------------

[ ] 1. Sistema "Wardrobe" (ítems guardados en baúl)
[ ] 2. Buffs pasivos por colección de items
[ ] 3. Filtros avanzados en Compendio (por tipo, tier, slot)
[ ] 4. Optimizar renderizado de grids (virtual scrolling)
[ ] 5. Sincronizar colección con localStorage
[ ] 6. Agregar más ítems únicos (50+)


🗂️ ESTRUCTURA DE LANG.JS CON JAPONÉS
-------------------------------------

const T_raw = {
  es: { ... },   // Español
  en: { ... },   // Inglés
  pt: { ... },   // Portugués
  fr: { ... },   // Francés
  ko: { ... },   // Coreano
  zh: { ... },   // Chino
  ru: { ... },   // Ruso
  ja: {          // Japonés (NUEVO)
    // Kanji para UI
    'hero.sub': '初心者向けガイド',
    'tracker.title': '// トラッカー · 現在地',
    'btn.analyze': '⟶ 状況を分析',
    
    // Items
    'item.tipans_long_bow': 'ティパンの長弓',
    'item.awakeneds_skin': '目覚めし者の皮膜',
    'item.bound_celestial_orb': '束縛された天球',
    
    // Romaji (lectura fonética, opcional)
    '_romaji': {
      'item.tipans_long_bow': 'Tipan no chōkyū'
    }
  }
};


🛠️ FUENTES PARA JAPONÉS
------------------------

Ya incluidas en index.html:
- Noto Sans JP (agregar a Google Fonts)
- Actualmente: Noto Sans KR (Coreano) y Noto Sans SC (Chino)
- Agregar: 'Noto Sans JP', sans-serif


📊 PROGRESO DE IDIOMAS
----------------------

| Idioma | Código | Estado | Versión |
|--------|--------|--------|---------|
| Español | ES | ✅ Completo | v2.4 |
| Inglés | EN | ✅ Completo | v2.4 |
| Portugués | PT | ✅ Completo | v2.4 |
| Francés | FR | ✅ Completo | v2.4 |
| Coreano | KO | ✅ Completo | v2.4 |
| Chino | ZH | ✅ Completo | v2.4 |
| Ruso | RU | ✅ Completo | v2.4 |
| Japonés | JA | 🔜 Planificado | v2.7 |


🎮 FRASE DE CIERRE
------------------
"Play what you get, master what you play"

Project U v2.6 ─── 20/04/2026
Próximo hito: v2.7 (Japonés) · v2.8 (Wardrobe)
