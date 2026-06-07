const commands = {
    help: {
        desc: 'Show available commands',
        hidden: false,
        action: () => {
            let out = 'Available commands:\n';
            for (const [name, cmd] of Object.entries(commands)) {
                if (!cmd.hidden) {
                    out += `  ${name.padEnd(18)} - ${cmd.desc}\n`;
                }
            }
            out += '\nType a command and press Enter.\nUse ↑↓ to navigate history.';
            return out;
        }
    },
    about: {
        desc: 'Go to About page',
        hidden: false,
        action: () => { window.location.href = 'about.html'; return 'Navigating...'; }
    },
    home: {
        desc: 'Go to Home page',
        hidden: false,
        action: () => { window.location.href = 'home.html'; return 'Already here.'; }
    },
    notes: {
        desc: 'Go to Study Notes',
        hidden: false,
        action: () => { window.location.href = 'notes.html'; return 'Navigating...'; }
    },
    gallery: {
        desc: 'Go to Photo Gallery',
        hidden: false,
        action: () => { window.location.href = 'gallery.html'; return 'Navigating...'; }
    },
    blog: {
        desc: 'Go to Blog',
        hidden: false,
        action: () => { window.location.href = 'blog.html'; return 'Navigating...'; }
    },
    github: {
        desc: 'Open GitHub profile',
        hidden: false,
        action: () => { window.open('https://github.com/William-f-12', '_blank'); return 'Opening GitHub...'; }
    },
    linkedin: {
        desc: 'Open LinkedIn profile',
        hidden: false,
        action: () => { window.open('https://www.linkedin.com/in/william-lu-0x57-0x4c/', '_blank'); return 'Opening LinkedIn...'; }
    },
    whoami: {
        desc: 'Who is William Lu',
        hidden: false,
        action: () => {
            return 'William Lu\nCS & Math @ UIUC | Sophomore | GPA 4.0\nInterests: AI, Game Dev, Systems\nLocation: Champaign, IL';
        }
    },
    projects: {
        desc: 'Scroll to project showcase',
        hidden: false,
        action: () => {
            const el = document.getElementById('projectSection');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            return 'Scrolling to project showcase...';
        }
    },
    clear: {
        desc: 'Clear the terminal',
        hidden: false,
        action: () => {
            document.getElementById('terminalOutput').innerHTML = '';
            return null;
        }
    },
    download: {
        desc: 'download <resume|cv|transcript>',
        hidden: false,
        action: (arg) => {
            const files = {
                resume: { url: '../asserts/docs/Resume.pdf', name: 'Lu_William_Resume.pdf' },
                cv: { url: '../asserts/docs/CV.pdf', name: 'Lu_William_CV.pdf' },
                transcript: { url: '../asserts/docs/Unofficial_Transcript.pdf', name: 'Lu_William_Transcript.pdf' }
            };
            if (!arg || !files[arg]) {
                return 'Usage: download <resume|cv|transcript>';
            }
            const a = document.createElement('a');
            a.href = files[arg].url;
            a.download = files[arg].name;
            a.click();
            return `Downloading ${arg}...`;
        }
    },

    // ===== Hidden / Easter eggs =====
    hello: {
        hidden: true,
        action: () => 'Well hello there! Try "help" to see what I can do.'
    },
    coffee: {
        hidden: true,
        action: () => '☕ Here, have a virtual coffee while you browse.\n  (  ( \n  )  ) \n(__(__)'
    }
};

let cmdHistory = [];
let historyIndex = -1;

function appendOutput(text, cls) {
    if (text === null) return;
    const out = document.getElementById('terminalOutput');
    const div = document.createElement('div');
    div.className = cls || 'line output';
    div.textContent = text;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
}

function handleCommand(input) {
    const trimmed = input.trim();
    if (!trimmed) return;

    cmdHistory.push(trimmed);
    historyIndex = cmdHistory.length;

    appendOutput('> ' + trimmed, 'line cmd');

    const parts = trimmed.split(/\s+/);
    const cmdName = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ') || null;

    if (commands[cmdName]) {
        const result = commands[cmdName].action(arg);
        if (result !== null) {
            appendOutput(result, 'line output');
        }
    } else {
        appendOutput(`Command not found: ${cmdName}. Type "help" for available commands.`, 'line error');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('terminalInput');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleCommand(input.value);
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = cmdHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < cmdHistory.length - 1) {
                historyIndex++;
                input.value = cmdHistory[historyIndex];
            } else {
                historyIndex = cmdHistory.length;
                input.value = '';
            }
        }
    });

    // Focus input when clicking anywhere in terminal
    document.getElementById('terminal').addEventListener('click', () => {
        input.focus();
    });

    input.focus();
});
