// Audio System for Matrix Owl Terminal

// Audio context for better control
let audioContext;
let gainNode;

// Initialize audio system
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);
        setVolume(config.volume);
    } catch (e) {
        console.warn('Web Audio API not supported:', e);
    }
}

// Set volume (0-100)
function setVolume(volume) {
    config.volume = Math.max(0, Math.min(100, volume));

    if (gainNode) {
        gainNode.gain.value = config.volume / 100;
    }

    // Also set HTML audio elements volume
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.volume = config.volume / 100;
    });

    saveConfig();
}

// Play typing sound
function playTypingSound() {
    if (!config.soundEnabled) return;

    const keySound = document.getElementById('key-sound');
    if (keySound) {
        keySound.currentTime = 0;
        keySound.volume = config.volume / 100;
        keySound.play().catch(() => { });
    }
}

// Play success sound (beep)
function playSuccessSound() {
    if (!config.soundEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const tempGain = audioContext.createGain();

    oscillator.connect(tempGain);
    tempGain.connect(gainNode);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    tempGain.gain.setValueAtTime(0.1, audioContext.currentTime);
    tempGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Play error sound
function playErrorSound() {
    if (!config.soundEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const tempGain = audioContext.createGain();

    oscillator.connect(tempGain);
    tempGain.connect(gainNode);

    oscillator.frequency.value = 200;
    oscillator.type = 'sawtooth';

    tempGain.gain.setValueAtTime(0.1, audioContext.currentTime);
    tempGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Play boot sound
function playBootSound() {
    if (!config.soundEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const tempGain = audioContext.createGain();

    oscillator.connect(tempGain);
    tempGain.connect(gainNode);

    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
    oscillator.type = 'sine';

    tempGain.gain.setValueAtTime(0.1, audioContext.currentTime);
    tempGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Ambient sound (cyberpunk atmosphere)
let ambientAudio;

function createAmbientSound() {
    // Create a simple ambient drone using Web Audio API
    if (!audioContext) return;

    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const ambientGain = audioContext.createGain();

    oscillator1.type = 'sine';
    oscillator2.type = 'sine';
    oscillator1.frequency.value = 55; // Low A
    oscillator2.frequency.value = 82.5; // E

    oscillator1.connect(ambientGain);
    oscillator2.connect(ambientGain);
    ambientGain.connect(gainNode);

    ambientGain.gain.value = 0.02; // Very quiet

    oscillator1.start();
    oscillator2.start();

    return {
        oscillators: [oscillator1, oscillator2],
        gain: ambientGain,
        stop: function () {
            oscillator1.stop();
            oscillator2.stop();
        }
    };
}

function toggleAmbientSound(enable) {
    config.ambientSound = enable;
    saveConfig();

    if (enable && !ambientAudio) {
        ambientAudio = createAmbientSound();
    } else if (!enable && ambientAudio) {
        ambientAudio.stop();
        ambientAudio = null;
    }
}

// Toggle all sounds
function toggleSound(enable) {
    config.soundEnabled = enable;
    saveConfig();

    if (!enable && ambientAudio) {
        ambientAudio.stop();
        ambientAudio = null;
        config.ambientSound = false;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize audio on first user interaction
    document.addEventListener('click', () => {
        if (!audioContext) {
            initAudio();
        }
    }, { once: true });

    document.addEventListener('keydown', () => {
        if (!audioContext) {
            initAudio();
        }
    }, { once: true });
});
