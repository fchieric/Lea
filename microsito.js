// Gestione del pannello informazioni
const pannelloInfo = document.getElementById('pannello-info');
const pulsanteInfo = document.getElementById('pulsante-info');
const pulsanteAudio = document.getElementById('pulsante-audio');

// Toggle pannello informazioni
pulsanteInfo.addEventListener('click', () => {
    const isVisible = pannelloInfo.style.display === 'block';
    pannelloInfo.style.display = isVisible ? 'none' : 'block';
});

// Chiudi pannello con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pannelloInfo.style.display === 'block') {
        pannelloInfo.style.display = 'none';
    }
});

// Toggle audio con spazio
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.repeat && document.activeElement.tagName !== 'BUTTON') {
        e.preventDefault();
        toggleAudio();
    }
});

// Gestione pulsante audio
pulsanteAudio.addEventListener('click', toggleAudio);

// Funzione per toggle audio
function toggleAudio() {
    if (typeof togglePlay === 'function') {
        togglePlay();
        updateAudioButton();
    }
}

// Aggiorna l'icona del pulsante audio
function updateAudioButton() {
    if (typeof isPlaying === 'function') {
        pulsanteAudio.innerHTML = isPlaying() ? '❚❚' : '▶';
    }
}
