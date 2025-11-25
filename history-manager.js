// History Manager Module
// Export/import command history and manage sessions

const historyManager = {
    // Export history to JSON
    exportJSON() {
        const history = getHistory();
        const data = {
            exported: new Date().toISOString(),
            terminal: 'Matrix Owl Terminal',
            version: '2.0',
            commands: history
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        this.download(blob, `history-${Date.now()}.json`);
        printOutput('History exported to JSON', 'success');
    },

    // Export history to TXT
    exportTXT() {
        const history = getHistory();
        const content = [
            '# Matrix Owl Terminal - Command History',
            `# Exported: ${new Date().toLocaleString()}`,
            '# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            '',
            ...history.map((cmd, i) => `${i + 1}. ${cmd}`)
        ].join('\n');

        const blob = new Blob([content], { type: 'text/plain' });
        this.download(blob, `history-${Date.now()}.txt`);
        printOutput('History exported to TXT', 'success');
    },

    // Import history from JSON
    importHistory(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.commands && Array.isArray(data.commands)) {
                    localStorage.setItem('commandHistory', JSON.stringify(data.commands));
                    printOutput(`Imported ${data.commands.length} commands`, 'success');
                } else {
                    printOutput('Invalid history file format', 'error');
                }
            } catch (err) {
                printOutput('Error parsing history file', 'error');
            }
        };
        reader.readAsText(file);
    },

    // Clear history
    clearHistory() {
        localStorage.removeItem('commandHistory');
        printOutput('Command history cleared', 'info');
    },

    // Download helper
    download(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
};

// Session Recorder
const sessionRecorder = {
    recording: false,
    session: [],
    startTime: null,

    // Start recording session
    start() {
        this.recording = true;
        this.session = [];
        this.startTime = Date.now();
        printOutput('Session recording started', 'success');
    },

    // Stop recording
    stop() {
        this.recording = false;
        printOutput('Session recording stopped', 'info');
        return this.session;
    },

    // Record command
    record(command, output) {
        if (this.recording) {
            this.session.push({
                timestamp: Date.now() - this.startTime,
                command,
                output
            });
        }
    },

    // Export session
    export() {
        if (this.session.length === 0) {
            printOutput('No session to export', 'error');
            return;
        }

        const data = {
            exported: new Date().toISOString(),
            duration: Date.now() - this.startTime,
            terminal: 'Matrix Owl Terminal',
            version: '2.0',
            session: this.session
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        historyManager.download(blob, `session-${Date.now()}.json`);
        printOutput('Session exported', 'success');
    },

    // Export as text
    exportText() {
        if (this.session.length === 0) {
            printOutput('No session to export', 'error');
            return;
        }

        const content = [
            '# Matrix Owl Terminal - Session Recording',
            `# Exported: ${new Date().toLocaleString()}`,
            `# Duration: ${Math.floor((Date.now() - this.startTime) / 1000)}s`,
            '# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            '',
            ...this.session.map(entry => {
                const time = `[${Math.floor(entry.timestamp / 1000)}s]`;
                return `${time} $ ${entry.command}\n${entry.output}`;
            })
        ].join('\n');

        const blob = new Blob([content], { type: 'text/plain' });
        historyManager.download(blob, `session-${Date.now()}.txt`);
        printOutput('Session exported as text', 'success');
    }
};

// Add commands to main terminal
if (typeof commands !== 'undefined') {
    commands['export'] = {
        desc: 'Export history or session',
        action: (args) => {
            if (!args[0]) {
                printOutput('Usage: export [history|session] [json|txt]', 'info');
                return;
            }

            if (args[0] === 'history') {
                if (args[1] === 'txt') {
                    historyManager.exportTXT();
                } else {
                    historyManager.exportJSON();
                }
            } else if (args[0] === 'session') {
                if (args[1] === 'txt') {
                    sessionRecorder.exportText();
                } else {
                    sessionRecorder.export();
                }
            }
        }
    };

    commands['record'] = {
        desc: 'Record session',
        action: (args) => {
            if (!args[0]) {
                printOutput('Usage: record [start|stop|export]', 'info');
                return;
            }

            if (args[0] === 'start') {
                sessionRecorder.start();
            } else if (args[0] === 'stop') {
                sessionRecorder.stop();
            } else if (args[0] === 'export') {
                sessionRecorder.export();
            }
        }
    };
}
