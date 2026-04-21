/* main.js — Lógica de Sincronización v2.6 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Cerebro v2.6: Sistema de sincronización iniciado.");

    // 1. VARIABLE GLOBAL DE IDIOMA (Persistente)
    window.lang = window.lang || 'es';

    // 2. EL MOTOR DE REFRESCO
    function refreshUI() {
        // Ahora verificamos T_raw que es nuestra nueva base
        if (typeof T_raw === 'undefined') {
            console.warn("Esperando carga de T_raw...");
            return;
        }

        console.log(`Ejecutando refresco para: [${window.lang}]`);

        // Actualizamos los textos estáticos del Header/UI
        if (typeof updateText === 'function') {
            updateText();
        }

        // Poblamos los selects de equipo
        if (typeof populateGearSelects === 'function') {
            populateGearSelects();
        }

        // Refrescamos la tabla del compendio (La Cascada)
        if (typeof updateCompendiumTable === 'function') {
            updateCompendiumTable();
        }
        
        // Disparamos evento para otros scripts (como ui_compendium)
        document.dispatchEvent(new CustomEvent('langChange', { detail: { lang: window.lang } }));
    }

    // 3. ESCUCHA DE BANDERAS (Con movimiento de la clase active)
    const langBtns = document.querySelectorAll('.lang-btn, [data-lang]');
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedLang = e.currentTarget.getAttribute('data-lang');
            if (selectedLang) {
                window.lang = selectedLang;
                
                // Mover la clase active al botón clickeado
                langBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                console.log("Idioma cambiado a:", window.lang);
                
                // Ejecutamos el refresco
                refreshUI();
            }
        });
    });

    // 4. CARGA INICIAL
    setTimeout(refreshUI, 300);
});