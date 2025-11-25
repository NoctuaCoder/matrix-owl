// Keyboard Shortcuts Module
// Handles global keyboard shortcuts for terminal

const shortcuts = {
    'Ctrl+L': {
        description: 'Clear terminal',
        action: () => {
            const output = document.getElementById('terminal-output');
            output.innerHTML = '';
            printOutput('Terminal cleared', 'info');
        }
    },
    'Ctrl+C': {
        description: 'Cancel current command',
        action: () => {
            const input = document.getElementById('command-input');
            input.value = '';
            printOutput('^C', 'error');
        }
    },
    'Ctrl+D': {
        description: 'Exit terminal',
        action: () => {
            printOutput('logout', 'info');
            setTimeout(() => {
                window.location.href = 'https://noctuacoder.github.io/NoctuaCoder/portfolio.html';
            }, 500);
        }
    },
    'Ctrl+R': {
        description: 'Reverse search history',
        action: () => {
            printOutput('(reverse-i-search): Type to search command history', 'info');
            enableReverseSearch();
        }
    },
    'Ctrl+U': {
        description: 'Clear line',
        action: () => {
            const input = document.getElementById('command-input');
            input.value = '';
        }
    },
    'Ctrl+K': {
        description: 'Show keyboard shortcuts',
        action: () => {
            showShortcutsHelp();
        }
    }
};

// Handle keyboard events
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        const key = getKeyCombo(e);

        if (shortcuts[key]) {
            e.preventDefault();
            shortcuts[key].action();
        }
    });
}

// Get key combination string
function getKeyCombo(e) {
    const parts = [];
    if (e.ctrlKey) parts.push('Ctrl');
    if (e.altKey) parts.push('Alt');
    if (e.shiftKey) parts.push('Shift');

    if (e.key.length === 1) {
        parts.push(e.key.toUpperCase());
    } else if (e.key !== 'Control' && e.key !== 'Alt' && e.key !== 'Shift') {
        parts.push(e.key);
    }

    return parts.join('+');
}

// Show shortcuts help
function showShortcutsHelp() {
    printOutput('Keyboard Shortcuts:', 'info');
    printOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    Object.entries(shortcuts).forEach(([key, data]) => {
        printOutput(`  ${key.padEnd(12)} - ${data.description}`);
    });
    printOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    printOutput('Tip: Press Tab for command autocomplete', 'info');
}

// Reverse search functionality
let reverseSearchMode = false;
let searchQuery = '';

function enableReverseSearch() {
    reverseSearchMode = true;
    const input = document.getElementById('command-input');
    const originalValue = input.value;

    const searchHandler = (e) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
            reverseSearchMode = false;
            input.removeEventListener('input', updateSearch);
            document.removeEventListener('keydown', searchHandler);
            if (e.key === 'Escape') {
                input.value = originalValue;
            }
            return;
        }
    };

    const updateSearch = () => {
        searchQuery = input.value;
        const history = getHistory();
        const match = history.reverse().find(cmd => cmd.includes(searchQuery));
        if (match) {
            input.value = match;
        }
    };

    input.addEventListener('input', updateSearch);
    document.addEventListener('keydown', searchHandler);
}

// Initialize on load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', initKeyboardShortcuts);
}
