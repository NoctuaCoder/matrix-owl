// Animation System for Matrix Owl Terminal

// Auto-typing effect
function typeText(element, text, speed = 50, callback) {
    let i = 0;
    element.textContent = '';

    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;

            // Play typing sound
            if (typeof playTypingSound === 'function' && config.soundEnabled) {
                playTypingSound();
            }
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);

    return interval;
}

// Type multiple lines with delays
function typeLines(container, lines, speed = 50, lineDelay = 300) {
    let currentLine = 0;

    function typeLine() {
        if (currentLine < lines.length) {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'output-line';
            container.appendChild(lineDiv);

            typeText(lineDiv, lines[currentLine], speed, () => {
                currentLine++;
                setTimeout(typeLine, lineDelay);
            });
        }
    }

    typeLine();
}

// Glitch effect on element
function glitchEffect(element, duration = 300) {
    element.classList.add('glitch-active');

    setTimeout(() => {
        element.classList.remove('glitch-active');
    }, duration);
}

// Shake effect for errors
function shakeElement(element) {
    element.classList.add('shake');

    setTimeout(() => {
        element.classList.remove('shake');
    }, 500);
}

// Fade in animation
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-in`;

    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

// Matrix rain flash effect
function flashMatrixRain() {
    const canvas = document.getElementById('matrix');
    if (canvas) {
        canvas.style.opacity = '0.3';
        setTimeout(() => {
            canvas.style.opacity = '1';
        }, 100);
    }
}

// Boot sequence animation
function bootSequence(callback) {
    const bootMessages = [
        'Initializing Noctua Terminal v2.0.0...',
        'Loading quantum processors...',
        'Establishing secure connection...',
        'Calibrating owl vision systems...',
        'Ready. Type "help" to begin.'
    ];

    const output = document.getElementById('terminal-output');
    if (!output) return;

    typeLines(output, bootMessages, 30, 200);

    if (callback) {
        setTimeout(callback, bootMessages.length * 300 + 1000);
    }
}

// Cursor blink animation (handled by CSS, but can be controlled here)
function toggleCursor(show) {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.style.display = show ? 'inline-block' : 'none';
    }
}

// Smooth scroll to bottom
function smoothScrollToBottom(element) {
    if (element) {
        element.scrollTo({
            top: element.scrollHeight,
            behavior: 'smooth'
        });
    }
}

// Rainbow text effect (for easter eggs)
function rainbowText(element, duration = 2000) {
    const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
    let colorIndex = 0;

    const interval = setInterval(() => {
        element.style.color = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, duration / colors.length);

    setTimeout(() => {
        clearInterval(interval);
        element.style.color = ''; // Reset to default
    }, duration);
}

// Pulse animation
function pulseElement(element, times = 3) {
    let count = 0;

    const interval = setInterval(() => {
        element.style.transform = count % 2 === 0 ? 'scale(1.05)' : 'scale(1)';
        count++;

        if (count >= times * 2) {
            clearInterval(interval);
            element.style.transform = 'scale(1)';
        }
    }, 150);
}
