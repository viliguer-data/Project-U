/* Project U — audio.js — Reproductor de música */
/* Volúmenes: Dungeon = 0.9 , Ambient = 0.6 */

document.addEventListener('DOMContentLoaded', () => {
  // Pistas con sus volúmenes individuales
  const tracks = [
    { name: 'Dungeon_Final_ProjectU.mp3', title: 'Dungeon Theme', volume: 0.9 },
    { name: 'ambiente.mp3',               title: 'Ambient Theme', volume: 0.6 }
  ];
  let currentTrackIndex = 0;

  const bgMusic = new Audio(tracks[currentTrackIndex].name);
  bgMusic.loop = true;
  bgMusic.volume = tracks[currentTrackIndex].volume;

  // Fade-in solo para Dungeon Theme
  let fadeInterval = null;
  
  function startFadeIn() {
    if (fadeInterval) clearInterval(fadeInterval);
    const targetVol = tracks[currentTrackIndex].volume;
    if (targetVol >= 0.8) {
      bgMusic.volume = 0;
      fadeInterval = setInterval(() => {
        if (bgMusic.volume < targetVol - 0.05) {
          bgMusic.volume = Math.min(targetVol, bgMusic.volume + 0.05);
        } else {
          clearInterval(fadeInterval);
          bgMusic.volume = targetVol;
          fadeInterval = null;
        }
      }, 50);
    } else {
      bgMusic.volume = targetVol;
    }
  }

  function onTrackLoaded() {
    startFadeIn();
  }
  bgMusic.addEventListener('loadeddata', onTrackLoaded);

  // Auto-start en primer click
  let autoStarted = false;
  document.addEventListener('click', () => {
    if (!autoStarted) {
      bgMusic.play().catch(() => {});
      autoStarted = true;
    }
  }, { once: true });

  const musicBtn  = document.getElementById('music-btn');
  const volDisplay = document.getElementById('vol-display');
  const volUp     = document.getElementById('vol-up');
  const volDown   = document.getElementById('vol-down');
  const prevBtn   = document.getElementById('prev-track');
  const nextBtn   = document.getElementById('next-track');

  function updateVolDisplay() {
    if (volDisplay) {
      volDisplay.textContent = Math.round(bgMusic.volume * 100) + '%';
    }
  }

  function updateMusicButton() {
    if (!musicBtn) return;
    const t = tracks[currentTrackIndex];
    if (bgMusic.paused) {
      musicBtn.textContent = `▶ ${t.title}`;
      musicBtn.style.color = '';
      musicBtn.style.borderColor = '';
    } else {
      musicBtn.textContent = `■ ${t.title}`;
      musicBtn.style.color = 'var(--red2)';
      musicBtn.style.borderColor = 'var(--red2)';
    }
  }

  function switchTrack(direction) {
    const wasPlaying = !bgMusic.paused;
    bgMusic.pause();
    if (fadeInterval) clearInterval(fadeInterval);
    
    currentTrackIndex = direction === 'next'
      ? (currentTrackIndex + 1) % tracks.length
      : (currentTrackIndex - 1 + tracks.length) % tracks.length;
    
    bgMusic.src = tracks[currentTrackIndex].name;
    bgMusic.volume = tracks[currentTrackIndex].volume;
    bgMusic.load();
    
    if (wasPlaying) {
      bgMusic.addEventListener('canplay', function playOnReady() {
        bgMusic.play().catch(() => {});
        bgMusic.removeEventListener('canplay', playOnReady);
      });
    }
    updateVolDisplay();
    updateMusicButton();
  }

  function updateVol(delta) {
    const currentVol = bgMusic.volume;
    const newVol = Math.min(1, Math.max(0, Math.round((currentVol + delta) * 10) / 10));
    bgMusic.volume = newVol;
    updateVolDisplay();
    
    if (volDown) volDown.style.opacity = newVol <= 0 ? '0.3' : '1';
    if (volUp)   volUp.style.opacity   = newVol >= 1 ? '0.3' : '1';
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
        startFadeIn();
      } else {
        bgMusic.pause();
      }
      updateMusicButton();
    });
  }

  if (volUp) {
    volUp.addEventListener('click', (e) => {
      e.stopPropagation();
      updateVol(0.1);
    });
  }

  if (volDown) {
    volDown.addEventListener('click', (e) => {
      e.stopPropagation();
      updateVol(-0.1);
    });
  }

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

  updateVolDisplay();
  updateMusicButton();
});