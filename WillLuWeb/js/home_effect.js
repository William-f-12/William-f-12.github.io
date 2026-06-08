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
    },
    sudo: {
        hidden: true,
        action: () => 'Permission denied. You are not in the sudoers file.\nThis incident will be reported to the admin.'
    },
    rm: {
        hidden: true,
        action: (arg) => {
            if (!arg) return 'rm: missing operand\nTry \'rm -rf /\' to destroy everything. (Or don\'t.)';
            return 'Nice try. The multiverse is safe... for now.\n(But seriously, this is a browser. rm -rf does nothing here. You\'re good.)';
        }
    },
    ls: {
        hidden: true,
        action: () => 'about    blog    gallery    home    notes\n(These are the pages of this site. Explore them with the navbar above!)'
    },
    exit: {
        hidden: true,
        action: () => 'You can check out any time you like, but you can never leave.\n—— Eagles, "Hotel California"\n(Type "home" if you want to navigate somewhere.)'
    },
    cat: {
        hidden: true,
        action: () => '      /\\_/\\\n     ( o.o )\n      > ^ <\n\nMeow! You found the hidden cat.\n(try "sl" too, if you dare...)'
    },
    sl: {
        hidden: true,
        action: () => '      🚂 CHOO CHOO! 🚂\n      ______\n    _||____||____\n   (____________)\n   /  ( o )  ( o ) \\\n  /                \\\n /__________________\\\n\nYou typed "sl" instead of "ls". Here comes the penalty train!'
    },
    42: {
        hidden: true,
        action: () => 'The Answer to the Ultimate Question of Life, the Universe, and Everything.\n—— Douglas Adams, "The Hitchhiker\'s Guide to the Galaxy"\n(Now all you need is the question...)'
    },
    matrix: {
        hidden: true,
        action: () => 'Wake up, Neo...\nThe Matrix has you.\nFollow the white rabbit.\nKnock, knock, Neo.\n(╯°□°)╯︵ ┻━┻'
    },
    sleep: {
        hidden: true,
        action: () => 'sleep: command not found.\nYou\'re at UIUC. There is no sleep.\nOnly coffee, deadlines, and the sweet embrace of ECE 391.\n(Type "coffee" to get some fuel.)'
    },
    theme: {
        desc: 'switch themes <bright|dark|sakura|candy|cyberpunk>',
        hidden: false,
        action: (arg) => {
            const themes = {
                bright: 'bright-mode',
                dark: 'dark-mode',
                sakura: 'sakura-mode',
                candy: 'cottonCandy-mode',
                cottoncandy: 'cottonCandy-mode',
                cyberpunk: 'cyberpunk-mode'
            };
            const storageKeys = {
                bright: 'bright',
                dark: 'dark',
                sakura: 'sakura',
                candy: 'cottonCandy',
                cottoncandy: 'cottonCandy',
                cyberpunk: 'cyberpunk'
            };
            if (!arg || !themes[arg.toLowerCase()]) {
                return 'Usage: theme <bright|dark|sakura|candy|cyberpunk>\n(Try switching themes — some have hidden terminal colors!)';
            }
            const key = arg.toLowerCase();
            document.body.className = themes[key];
            localStorage.setItem('theme', storageKeys[key]);
            return `Theme switched to ${key}. Looking good!`;
        }
    },
    date: {
        hidden: true,
        action: () => {
            const now = new Date();
            return now.toString() + '\n(Server time: whenever you loaded this page. This is a static website, remember?)';
        }
    },
    hack: {
        hidden: true,
        action: () => {
            appendOutput('INITIALIZING HACK PROTOCOL...', 'line output');
            setTimeout(() => { appendOutput('BYPASSING FIREWALL.............. [ OK ]', 'line output'); }, 600);
            setTimeout(() => { appendOutput('ACCESSING MAINFRAME............ [ OK ]', 'line output'); }, 1200);
            setTimeout(() => { appendOutput('DECRYPTING PASSWORDS........... [ OK ]', 'line output'); }, 1800);
            setTimeout(() => { appendOutput('DOWNLOADING SECRETS............ [████████████████████] 100%', 'line output'); }, 2400);
            setTimeout(() => { appendOutput('', 'line output'); }, 3000);
            setTimeout(() => { appendOutput('...', 'line output'); }, 3100);
            setTimeout(() => { appendOutput('...', 'line output'); }, 3200);
            setTimeout(() => { appendOutput('Just kidding. This is a static website hosted on GitHub Pages.', 'line output'); }, 3800);
            setTimeout(() => { appendOutput('There is literally nothing to hack. But you looked cool doing it.', 'line output'); }, 4400);
            return null;
        }
    },

    // ===== CTF chain =====
    flag: {
        hidden: true,
        action: () => 'flag{n0t_th3_r34l_0n3}\nHint: Try \'ssh william@localhost\'. Maybe there\'s a message of the day...'
    },
    ssh: {
        hidden: true,
        action: (arg) => {
            if (!arg) return 'Usage: ssh <user@host>';
            const lower = arg.toLowerCase();
            if (lower.includes('william@localhost') || lower.includes('localhost')) {
                return 'The authenticity of host \'localhost (127.0.0.1)\' can\'t be established.\n' +
                    'ED25519 key fingerprint is SHA256:th1sIsT0t4llyF4k3D0nTTrY.\n' +
                    'Are you sure you want to continue connecting (yes/no)?\n' +
                    '[simulating \'yes\'...]\n\n' +
                    'Warning: Permanently added \'localhost\' to the list of known hosts.\n' +
                    'william@localhost: Permission denied (publickey).\n\n' +
                    'MOTD:\n' +
                    '\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n' +
                    '\u2502 PBATENGHYNGVBAF. GUR ARKG FGRC:          \u2502\n' +
                    '\u2502 ERIREFR GUVF FGEVAT: RPEHBFJRVI            \u2502\n' +
                    '\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n' +
                    'Connection to localhost closed.';
            }
            return `ssh: Could not resolve hostname: ${arg}\nPermission denied (publickey).`;
        }
    },
    rot13: {
        hidden: true,
        action: (arg) => {
            if (!arg) return 'Usage: rot13 <text>';
            let result = '';
            for (let i = 0; i < arg.length; i++) {
                const ch = arg[i];
                const code = ch.charCodeAt(0);
                if (code >= 65 && code <= 90) {
                    result += String.fromCharCode(((code - 65 + 13) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    result += String.fromCharCode(((code - 97 + 13) % 26) + 97);
                } else {
                    result += ch;
                }
            }
            return result;
        }
    },
    rev: {
        hidden: true,
        action: (arg) => {
            if (!arg) return 'Usage: rev <text>';
            const reversed = arg.split('').reverse().join('');
            if (arg.toUpperCase() === 'ECRUOSWEIV') {
                return reversed + '\n\nGood progress! One more step.\nXOR this hex with key \'K\':\n0D070A0C6B02056B22252F2E3365233F26276B18041E19080E';
            }
            return reversed;
        }
    },
    reverse: {
        hidden: true,
        action: (arg) => {
            if (!arg) return 'Usage: reverse <text>';
            const reversed = arg.split('').reverse().join('');
            if (arg.toUpperCase() === 'ECRUOSWEIV') {
                return reversed + '\n\nGood progress! One more step.\nXOR this hex with key \'K\':\n0D070A0C6B02056B22252F2E3365233F26276B18041E19080E';
            }
            return reversed;
        }
    },
    xor: {
        hidden: true,
        action: (arg) => {
            if (!arg) return 'Usage: xor <hex> <key_char>';
            const parts = arg.split(/\s+/);
            const hex = parts[0];
            const key = parts[1];
            if (!hex || !key || key.length !== 1) return 'Usage: xor <hex> <key_char>';
            if (hex.length % 2 !== 0) return 'Invalid hex string. Must have even length.';
            let result = '';
            const keyCode = key.charCodeAt(0);
            for (let i = 0; i < hex.length; i += 2) {
                const byte = parseInt(hex.substring(i, i + 2), 16);
                if (isNaN(byte)) return `Invalid hex character at position ${i}.`;
                result += String.fromCharCode(byte ^ keyCode);
            }
            return result;
        }
    },
    curl: {
        hidden: true,
        action: (arg) => {
            if (!arg) return 'Usage: curl <url>';
            const lower = arg.toLowerCase();
            if (lower.includes('index') || lower === '/' || lower.includes('localhost')) {
                return 'HTTP/1.1 200 OK\n' +
                    'Server: nginx/1.24.0\n' +
                    'Content-Type: text/html; charset=UTF-8\n' +
                    'X-Flag: flag{there_is_a_flag_just_for_fun}\n' +
                    'Connection: keep-alive\n\n' +
                    '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n' +
                    '  <meta http-equiv="refresh" content="0; url=WillLuWeb/pages/home.html">\n' +
                    '  <title>William Lu</title>\n</head>\n<body>\n' +
                    '  <!--flag{there_is_a_flag_just_for_fun}-->\n' +
                    '  Redirecting to <a href="WillLuWeb/pages/home.html">home</a>...\n' +
                    '</body>\n</html>';
            }
            return 'HTTP/1.1 200 OK\nServer: Cloudflare\nContent-Type: text/html; charset=UTF-8\n\n' +
                '<!DOCTYPE html>\n<html>\n<head><title>' + arg + '</title></head>\n' +
                '<body><p>This is a static site. You can\'t actually curl anything here.</p></body>\n</html>';
        }
    },
    base64: {
        hidden: true,
        action: (arg) => {
            if (!arg) return 'Usage: base64 <encoded_text>';
            try {
                return atob(arg);
            } catch (e) {
                return 'Invalid base64 string. Check your input.';
            }
        }
    },
    hackerman: {
        hidden: true,
        action: () => {
            appendOutput('      .-----.\n     /  o o  \\\n    |    ^    |\n     \\ \'---\' /\n      \'-----\'', 'line output');
            appendOutput('', 'line output');
            setTimeout(() => { appendOutput('I\'m in.', 'line output'); }, 800);
            return null;
        }
    },
    submit: {
        hidden: true,
        action: (arg) => {
            if (!arg) return 'Usage: submit <flag>';
            if (arg === 'flag{there_is_a_flag_just_for_fun}') {
                return 'Congratulations! You found the real flag!\n\n' +
                    'flag{there_is_a_flag_just_for_fun}\n\n' +
                    'You have completed the CTF challenge. Well done!';
            }
            if (arg === 'flag{n0t_th3_r34l_0n3}') {
                return 'That\'s the fake flag. You knew that already, right?\nKeep digging — the real one is out there...';
            }
            return 'Invalid flag. Keep trying!';
        }
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
