// Command Autocomplete Module
// Provides Tab completion for commands and file paths

const autocomplete = {
    commands: null, // Will be populated from main script
    files: null,    // Will be populated from file system

    init(commandsList, filesList) {
        this.commands = Object.keys(commandsList);
        this.files = filesList;
    },

    // Get completions for current input
    getCompletions(input) {
        const parts = input.trim().split(' ');
        const lastPart = parts[parts.length - 1];

        // If first word, complete command
        if (parts.length === 1) {
            return this.commands.filter(cmd => cmd.startsWith(lastPart));
        }

        // Otherwise, complete file path
        return this.files.filter(file => file.startsWith(lastPart));
    },

    // Apply completion
    complete(input) {
        const completions = this.getCompletions(input);

        if (completions.length === 0) {
            return { value: input, message: null };
        }

        if (completions.length === 1) {
            const parts = input.trim().split(' ');
            parts[parts.length - 1] = completions[0];
            return { value: parts.join(' ') + ' ', message: null };
        }

        // Multiple completions - show them
        return {
            value: input,
            message: completions.join('  ')
        };
    }
};

// Handle Tab key for autocomplete
function initAutocomplete() {
    const input = document.getElementById('command-input');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();

            const result = autocomplete.complete(input.value);
            input.value = result.value;

            if (result.message) {
                printOutput(result.message, 'info');
            }
        }
    });
}

// Initialize autocomplete with commands and files
function setupAutocomplete(commandsList, filesList) {
    autocomplete.init(commandsList, filesList);
    initAutocomplete();
}

// Export for use in main script
if (typeof window !== 'undefined') {
    window.setupAutocomplete = setupAutocomplete;
}
