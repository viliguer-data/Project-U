/* Project U — tracker.js — Gestión de Progreso y Colección — v2.4 Final */

// ══ CONFIGURACIÓN DEL TRACKER ════════════════════════════════════
const TRACKER_CONFIG = {
    storageKey: 'projectU_user_collection',
    updateEvent: 'trackerUpdated'
};

// ══ LÓGICA DE COLECCIÓN (MODO "ÁLBUM DE FIGURITAS") ═══════════════

/**
 * Guarda un ítem como "Obtenido" en el localStorage.
 * Aplica la migración de IDs para evitar duplicados por errores de tipeo.
 */
function markAsObtained(itemId) {
    if (!itemId) return;

    // Usamos la misma lógica de migración que en build-saver.js
    const cleanId = migrateTrackerId(itemId);
    
    let collection = getCollection();
    
    if (!collection.includes(cleanId)) {
        collection.push(cleanId);
        saveCollection(collection);
        
        // Notificamos a la UI que hubo un cambio
        dispatchTrackerUpdate(cleanId, true);
        showTrackerMsg(`+ Agregado: ${cleanId}`);
    }
}

/**
 * Quita un ítem de la colección.
 */
function removeFromCollection(itemId) {
    const cleanId = migrateTrackerId(itemId);
    let collection = getCollection();
    
    if (collection.includes(cleanId)) {
        collection = collection.filter(id => id !== cleanId);
        saveCollection(collection);
        
        dispatchTrackerUpdate(cleanId, false);
        showTrackerMsg(`- Quitado: ${cleanId}`);
    }
}

// ══ UTILIDADES INTERNAS ══════════════════════════════════════════

function getCollection() {
    try {
        return JSON.parse(localStorage.getItem(TRACKER_CONFIG.storageKey) || '[]');
    } catch (e) {
        return [];
    }
}

function saveCollection(arr) {
    localStorage.setItem(TRACKER_CONFIG.storageKey, JSON.stringify(arr));
}

/**
 * Función espejo de migrateId para mantener consistencia en la base de datos
 */
function migrateTrackerId(id) {
    const map = {
        'want': 'wand',
        'big_saver': 'build_saver',
        'sandglass': 'bound_sandglass'
    };
    return map[id] || id;
}

function dispatchTrackerUpdate(id, status) {
    const event = new CustomEvent(TRACKER_CONFIG.updateEvent, {
        detail: { itemId: id, obtained: status }
    });
    window.dispatchEvent(event);
}

// ══ INTERFAZ Y VISUALIZACIÓN ═════════════════════════════════════

/**
 * Actualiza visualmente los elementos de la Matrix o Compendio 
 * basándose en lo que el usuario ya tiene.
 */
function refreshTrackerUI() {
    const collection = getCollection();
    
    // Buscamos elementos que tengan data-item-id para marcarlos
    document.querySelectorAll('[data-item-id]').forEach(el => {
        const id = migrateTrackerId(el.getAttribute('data-item-id'));
        if (collection.includes(id)) {
            el.classList.add('obtained');
            el.style.border = '1px solid var(--gold)';
            el.style.opacity = '1';
        } else {
            el.classList.remove('obtained');
            el.style.opacity = '0.6'; // Efecto "fantasma" para lo que falta
        }
    });
}

/**
 * Calcula el porcentaje de completitud de la Matrix
 */
function getCompletionStats() {
    const collection = getCollection();
    const totalItems = typeof COMPENDIUM !== 'undefined' ? Object.keys(COMPENDIUM).length : 0;
    
    if (totalItems === 0) return "0%";
    
    const percent = Math.round((collection.length / totalItems) * 100);
    return `${percent}%`;
}

function showTrackerMsg(txt) {
    // Reutiliza el estilo de mensajes de build-saver para coherencia visual
    if (typeof showMsg === 'function') {
        showMsg(txt);
    }
}

// ══ INICIALIZACIÓN ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    // Sincronizamos la UI al cargar
    setTimeout(refreshTrackerUI, 500);
    
    // Escuchamos actualizaciones para no tener que recargar la página
    window.addEventListener(TRACKER_CONFIG.updateEvent, () => {
        refreshTrackerUI();
        console.log(`Progreso actual: ${getCompletionStats()}`);
    });
});