/* Project U — shield.js — Lógica escudo 2H */

// ══ SHIELD LOGIC (2H DISABLES SHIELD) ════════════════════════
(function(){
  const TWO_HAND_TYPES = ['Hacha a dos manos','Espada a dos manos','Martillo a dos manos','Bastón','Arco'];

  function actualizarEstadoEscudo() {
    const tipoArmaSelect = document.getElementById('wm-type1');
    const escudoSelect = document.getElementById('wm-shield');
    const shieldMsg = document.getElementById('shield-msg');
    if (!tipoArmaSelect || !escudoSelect) return;
    const es2M = TWO_HAND_TYPES.some(t => tipoArmaSelect.value.includes(t));
    escudoSelect.disabled = es2M;
    escudoSelect.classList.toggle('shield-disabled', es2M);
    if (shieldMsg) shieldMsg.style.display = es2M ? 'block' : 'none';
    if (es2M) escudoSelect.value = '';
  }

  document.addEventListener('DOMContentLoaded', () => {
    const tipoArmaSelect = document.getElementById('wm-type1');
    if (tipoArmaSelect) {
      tipoArmaSelect.addEventListener('change', actualizarEstadoEscudo);
    }
    setTimeout(actualizarEstadoEscudo, 600);
  });
})();

// ══ FAQ ACCORDION ══════════════════════════════════════════════
