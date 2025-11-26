// Enhanced Matrix Rain with Celestial Colors

function initMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01';

    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];

            // Alternate between purple and cyan
            const color = Math.random() > 0.5 ?
                `rgba(147, 51, 234, ${Math.random() * 0.5 + 0.5})` :
                `rgba(0, 255, 255, ${Math.random() * 0.5 + 0.5})`;

            ctx.fillStyle = color;
            ctx.font = fontSize + 'px monospace';
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMatrix);
} else {
    initMatrix();
}
