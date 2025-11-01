// Terminal Portfolio JavaScript - Full Bash-like Implementation
class TerminalPortfolio {
    constructor() {
        this.currentPath = '/home/samarth';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.suggestions = [];
        this.currentUser = 'samarth';
        this.hostname = 'portfolio';
        
        // File system structure
        this.fileSystem = {
            '/': {
                type: 'directory',
                children: {
                    'home': {
                        type: 'directory',
                        children: {
                            'samarth': {
                                type: 'directory',
                                children: {
                                    'about.md': { type: 'file', content: this.getAboutContent() },
                                    'skills.json': { type: 'file', content: this.getSkillsContent() },
                                    'experience.log': { type: 'file', content: this.getExperienceContent() },
                                    'education.txt': { type: 'file', content: this.getEducationContent() },
                                    'contact.info': { type: 'file', content: this.getContactContent() },
                                    'projects': {
                                        type: 'directory',
                                        children: {
                                            'insupred.md': { type: 'file', content: this.getProjectContent('insupred') },
                                            'brain-computer-interface.md': { type: 'file', content: this.getProjectContent('bci') },
                                            'ai-development.md': { type: 'file', content: this.getProjectContent('ai') },
                                            'oak-codefest.md': { type: 'file', content: this.getProjectContent('oak') },
                                            'terminal-portfolio.md': { type: 'file', content: this.getProjectContent('terminal') }
                                        }
                                    },
                                    'certifications': {
                                        type: 'directory',
                                        children: {
                                            'aws-cloud-practitioner.cert': { type: 'file', content: 'AWS Certified Cloud Practitioner\\nIssued: 2024\\nValid until: 2027' },
                                            'azure-fundamentals.cert': { type: 'file', content: 'Microsoft Azure Fundamentals\\nIssued: 2024\\nValid until: Does not expire' },
                                            'java-foundations.cert': { type: 'file', content: 'Oracle Java Certified Foundations Associate\\nIssued: 2023\\nValid until: Does not expire' }
                                        }
                                    },
                                    'accomplishments.txt': { type: 'file', content: this.getAccomplishmentsContent() },
                                    'resume.pdf': { type: 'file', content: 'Binary file - Resume PDF\\nTo view: Use a PDF viewer or contact me for the latest version.' },
                                    '.bashrc': { type: 'file', content: this.getBashrcContent() },
                                    '.profile': { type: 'file', content: this.getProfileContent() }
                                }
                            }
                        }
                    },
                    'usr': {
                        type: 'directory',
                        children: {
                            'bin': {
                                type: 'directory',
                                children: {
                                    'whoami': { type: 'executable', content: 'samarth' },
                                    'date': { type: 'executable', content: new Date().toString() },
                                    'uptime': { type: 'executable', content: 'System uptime: Portfolio loaded' }
                                }
                            }
                        }
                    },
                    'etc': {
                        type: 'directory',
                        children: {
                            'hostname': { type: 'file', content: 'portfolio' },
                            'passwd': { type: 'file', content: 'samarth:x:1000:1000:Samarth Kulkarni:/home/samarth:/bin/bash' }
                        }
                    }
                }
            }
        };

        // Available commands
        this.commands = {
            'help': this.helpCommand.bind(this),
            'ls': this.lsCommand.bind(this),
            'cd': this.cdCommand.bind(this),
            'pwd': this.pwdCommand.bind(this),
            'cat': this.catCommand.bind(this),
            'less': this.lessCommand.bind(this),
            'head': this.headCommand.bind(this),
            'tail': this.tailCommand.bind(this),
            'find': this.findCommand.bind(this),
            'grep': this.grepCommand.bind(this),
            'tree': this.treeCommand.bind(this),
            'whoami': this.whoamiCommand.bind(this),
            'date': this.dateCommand.bind(this),
            'uptime': this.uptimeCommand.bind(this),
            'history': this.historyCommand.bind(this),
            'clear': this.clearCommand.bind(this),
            'mkdir': this.mkdirCommand.bind(this),
            'touch': this.touchCommand.bind(this),
            'echo': this.echoCommand.bind(this),
            'which': this.whichCommand.bind(this),
            'man': this.manCommand.bind(this),
            'ps': this.psCommand.bind(this),
            'top': this.topCommand.bind(this),
            'df': this.dfCommand.bind(this),
            'free': this.freeCommand.bind(this),
            'uname': this.unameCommand.bind(this),
            'alias': this.aliasCommand.bind(this),
            'export': this.exportCommand.bind(this),
            'env': this.envCommand.bind(this),
            'exit': this.exitCommand.bind(this),
            'su': this.suCommand.bind(this),
            'sudo': this.sudoCommand.bind(this),
            'chmod': this.chmodCommand.bind(this),
            'chown': this.chownCommand.bind(this),
            'ping': this.pingCommand.bind(this),
            'wget': this.wgetCommand.bind(this),
            'curl': this.curlCommand.bind(this),
            'git': this.gitCommand.bind(this),
            'vim': this.vimCommand.bind(this),
            'nano': this.nanoCommand.bind(this),
            'ssh': this.sshCommand.bind(this),
            'scp': this.scpCommand.bind(this),
            'tar': this.tarCommand.bind(this),
            'zip': this.zipCommand.bind(this),
            'unzip': this.unzipCommand.bind(this),
            'python': this.pythonCommand.bind(this),
            'node': this.nodeCommand.bind(this),
            'java': this.javaCommand.bind(this),
            'gcc': this.gccCommand.bind(this),
            'make': this.makeCommand.bind(this),
            'docker': this.dockerCommand.bind(this),
            'kubectl': this.kubectlCommand.bind(this)
        };

        this.aliases = {
            'll': 'ls -la',
            'la': 'ls -a',
            'l': 'ls -CF',
            '..': 'cd ..',
            '...': 'cd ../..',
            'h': 'history',
            'c': 'clear',
            'q': 'exit'
        };

        this.environment = {
            'HOME': '/home/samarth',
            'USER': 'samarth',
            'PATH': '/usr/bin:/bin:/usr/local/bin',
            'SHELL': '/bin/bash',
            'TERM': 'xterm-256color',
            'PWD': '/home/samarth'
        };

        this.initializeTerminal();
    }

    initializeTerminal() {
        this.terminalContent = document.getElementById('terminal-content');
        this.terminalInput = document.getElementById('terminal-input');
        
        // Focus on input
        this.terminalInput.focus();
        
        // Event listeners
        this.terminalInput.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.terminalInput.addEventListener('input', this.handleInput.bind(this));
        
        // Click to focus
        document.addEventListener('click', () => {
            this.terminalInput.focus();
        });

        // Update cursor position
        this.updateCursor();
        setInterval(() => this.updateCursor(), 100);
        
        // Update prompt to show current directory
        this.updatePrompt();
    }

    updatePrompt() {
        const promptElement = document.getElementById('current-prompt');
        if (promptElement) {
            const path = this.currentPath.replace('/home/samarth', '~');
            promptElement.textContent = `${this.currentUser}@${this.hostname}:${path}$ `;
        }
    }

    handleKeyDown(event) {
        switch (event.key) {
            case 'Enter':
                event.preventDefault();
                this.executeCommand();
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.navigateHistory(-1);
                break;
            case 'ArrowDown':
                event.preventDefault();
                this.navigateHistory(1);
                break;
            case 'Tab':
                event.preventDefault();
                this.autoComplete();
                break;
            case 'l':
                if (event.ctrlKey) {
                    event.preventDefault();
                    this.clearCommand();
                }
                break;
            case 'c':
                if (event.ctrlKey) {
                    event.preventDefault();
                    this.addOutput('', 'command-line');
                    this.terminalInput.value = '';
                    this.updateCursor();
                }
                break;
        }
    }

    handleInput() {
        this.updateCursor();
    }

    updateCursor() {
        const cursor = document.querySelector('.cursor');
        const input = this.terminalInput;
        const inputRect = input.getBoundingClientRect();
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = window.getComputedStyle(input).font;
        const textWidth = context.measureText(input.value).width;
        
        cursor.style.left = `${input.offsetLeft + textWidth + 8}px`;
    }

    executeCommand() {
        const input = this.terminalInput.value.trim();
        if (!input) {
            this.addOutput('', 'command-line');
            return;
        }

        // Add to history
        this.commandHistory.push(input);
        this.historyIndex = this.commandHistory.length;

        // Display command
        this.addOutput(`${this.getPrompt()}${input}`, 'command-line');

        // Process aliases
        let command = input;
        for (const [alias, expansion] of Object.entries(this.aliases)) {
            if (command.startsWith(alias + ' ') || command === alias) {
                command = command.replace(alias, expansion);
                break;
            }
        }

        // Parse command
        const parts = this.parseCommand(command);
        const cmd = parts[0];
        const args = parts.slice(1);

        // Execute command
        if (this.commands[cmd]) {
            try {
                this.commands[cmd](args);
            } catch (error) {
                this.addOutput(`bash: ${cmd}: ${error.message}`, 'error-text');
            }
        } else {
            this.addOutput(`bash: ${cmd}: command not found`, 'error-text');
            this.addOutput(`Try 'help' to see available commands.`, 'info-text');
        }

        // Clear input
        this.terminalInput.value = '';
        this.updateCursor();
        this.scrollToBottom();
    }

    parseCommand(input) {
        // Simple command parsing (doesn't handle quotes perfectly, but good enough)
        return input.match(/\S+/g) || [];
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;

        this.historyIndex += direction;
        this.historyIndex = Math.max(-1, Math.min(this.commandHistory.length - 1, this.historyIndex));

        if (this.historyIndex === -1) {
            this.terminalInput.value = '';
        } else {
            this.terminalInput.value = this.commandHistory[this.historyIndex];
        }
        this.updateCursor();
    }

    autoComplete() {
        const input = this.terminalInput.value;
        const parts = input.split(' ');
        const lastPart = parts[parts.length - 1];

        if (parts.length === 1) {
            // Command completion
            const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(lastPart));
            const aliasMatches = Object.keys(this.aliases).filter(alias => alias.startsWith(lastPart));
            const allMatches = [...matches, ...aliasMatches].sort();

            if (allMatches.length === 1) {
                this.terminalInput.value = allMatches[0] + ' ';
            } else if (allMatches.length > 1) {
                this.addOutput(`${this.getPrompt()}${input}`, 'command-line');
                this.addOutput(allMatches.join('  '), 'output-text');
            }
        } else {
            // File/directory completion
            const currentDir = this.resolvePath(this.currentPath);
            if (currentDir && currentDir.type === 'directory') {
                const matches = Object.keys(currentDir.children || {}).filter(name => name.startsWith(lastPart));
                
                if (matches.length === 1) {
                    parts[parts.length - 1] = matches[0];
                    this.terminalInput.value = parts.join(' ') + ' ';
                } else if (matches.length > 1) {
                    this.addOutput(`${this.getPrompt()}${input}`, 'command-line');
                    this.addOutput(matches.join('  '), 'output-text');
                }
            }
        }
        this.updateCursor();
    }

    addOutput(text, className = 'output-text') {
        const line = document.createElement('div');
        line.className = `output-line ${className}`;
        line.innerHTML = text;
        this.terminalContent.appendChild(line);
    }

    scrollToBottom() {
        this.terminalContent.scrollTop = this.terminalContent.scrollHeight;
    }

    getPrompt() {
        const path = this.currentPath.replace('/home/samarth', '~');
        return `<span class="command-prompt">${this.currentUser}@${this.hostname}:${path}$ </span>`;
    }

    resolvePath(path) {
        if (path.startsWith('/')) {
            // Absolute path
            const parts = path.split('/').filter(p => p);
            let current = this.fileSystem['/'];
            
            for (const part of parts) {
                if (current.type !== 'directory' || !current.children || !current.children[part]) {
                    return null;
                }
                current = current.children[part];
            }
            return current;
        } else {
            // Relative path
            const absolutePath = this.joinPaths(this.currentPath, path);
            return this.resolvePath(absolutePath);
        }
    }

    joinPaths(...paths) {
        return '/' + paths.join('/').split('/').filter(p => p && p !== '.').reduce((acc, part) => {
            if (part === '..') {
                acc.pop();
            } else {
                acc.push(part);
            }
            return acc;
        }, []).join('/');
    }

    // Command implementations
    helpCommand(args) {
        const helpText = `
Available commands:

<span class="syntax-command">File Operations:</span>
  ls [options] [path]     - List directory contents
  cd [path]              - Change directory
  pwd                    - Print working directory
  cat [file]             - Display file contents
  less [file]            - View file with pagination
  head [file]            - Show first lines of file
  tail [file]            - Show last lines of file
  find [path] [pattern]  - Find files and directories
  tree [path]            - Display directory tree

<span class="syntax-command">System Information:</span>
  whoami                 - Display current user
  date                   - Show current date and time
  uptime                 - Show system uptime
  uname                  - System information
  ps                     - Show running processes
  top                    - Display running processes
  df                     - Show disk space usage
  free                   - Show memory usage

<span class="syntax-command">Text Processing:</span>
  grep [pattern] [file]  - Search text patterns
  echo [text]            - Display text

<span class="syntax-command">Utilities:</span>
  history                - Show command history
  clear                  - Clear terminal screen
  which [command]        - Locate command
  man [command]          - Show manual page
  alias                  - Show aliases
  env                    - Show environment variables

<span class="syntax-command">Portfolio Specific:</span>
  Type <span class="syntax-path">ls</span> to see available directories
  Navigate to <span class="syntax-path">projects/</span> to see my work
  Check <span class="syntax-path">contact.info</span> for contact details
  View <span class="syntax-path">skills.json</span> for technical skills

<span class="info-text">Tips:</span>
  - Use Tab for auto-completion
  - Use ↑/↓ arrows for command history
  - Use Ctrl+C to cancel current line
  - Use Ctrl+L to clear screen
        `;
        this.addOutput(helpText, 'output-text');
    }

    lsCommand(args) {
        let path = this.currentPath;
        let showHidden = false;
        let longFormat = false;
        let showAll = false;

        // Parse arguments
        for (const arg of args) {
            if (arg.startsWith('-')) {
                if (arg.includes('a')) showAll = true;
                if (arg.includes('l')) longFormat = true;
                if (arg.includes('A')) showHidden = true;
            } else {
                path = this.joinPaths(this.currentPath, arg);
            }
        }

        const dir = this.resolvePath(path);
        if (!dir) {
            this.addOutput(`ls: cannot access '${path}': No such file or directory`, 'error-text');
            return;
        }

        if (dir.type !== 'directory') {
            this.addOutput(path.split('/').pop(), 'output-text');
            return;
        }

        const items = Object.entries(dir.children || {}).filter(([name]) => {
            if (name.startsWith('.')) return showAll || showHidden;
            return true;
        });

        if (longFormat) {
            this.addOutput('total ' + items.length, 'output-text');
            for (const [name, item] of items) {
                const permissions = item.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--';
                const size = item.content ? item.content.length : 4096;
                const date = 'Jan 15 12:00';
                const className = this.getFileClass(item.type);
                this.addOutput(`${permissions} 1 samarth samarth ${size.toString().padStart(8)} ${date} <span class="${className}">${name}</span>`, 'output-text');
            }
        } else {
            const output = items.map(([name, item]) => {
                const className = this.getFileClass(item.type);
                return `<span class="${className}">${name}</span>`;
            }).join('  ');
            this.addOutput(output, 'output-text');
        }
    }

    getFileClass(type) {
        switch (type) {
            case 'directory': return 'file-directory';
            case 'executable': return 'file-executable';
            case 'link': return 'file-link';
            default: return 'file-text';
        }
    }

    cdCommand(args) {
        let targetPath = args[0] || this.environment.HOME;
        
        if (targetPath === '-') {
            this.addOutput(this.currentPath, 'output-text');
            return;
        }

        const absolutePath = this.joinPaths(this.currentPath, targetPath);
        const target = this.resolvePath(absolutePath);

        if (!target) {
            this.addOutput(`bash: cd: ${targetPath}: No such file or directory`, 'error-text');
            return;
        }

        if (target.type !== 'directory') {
            this.addOutput(`bash: cd: ${targetPath}: Not a directory`, 'error-text');
            return;
        }

        this.currentPath = absolutePath;
        this.environment.PWD = this.currentPath;
        this.updatePrompt();
    }

    pwdCommand(args) {
        this.addOutput(this.currentPath, 'output-text');
    }

    catCommand(args) {
        if (args.length === 0) {
            this.addOutput('cat: missing file operand', 'error-text');
            return;
        }

        for (const fileName of args) {
            const filePath = this.joinPaths(this.currentPath, fileName);
            const file = this.resolvePath(filePath);

            if (!file) {
                this.addOutput(`cat: ${fileName}: No such file or directory`, 'error-text');
                continue;
            }

            if (file.type === 'directory') {
                this.addOutput(`cat: ${fileName}: Is a directory`, 'error-text');
                continue;
            }

            this.addOutput(file.content || '', 'output-text');
        }
    }

    lessCommand(args) {
        if (args.length === 0) {
            this.addOutput('less: missing file operand', 'error-text');
            return;
        }

        const fileName = args[0];
        const filePath = this.joinPaths(this.currentPath, fileName);
        const file = this.resolvePath(filePath);

        if (!file) {
            this.addOutput(`less: ${fileName}: No such file or directory`, 'error-text');
            return;
        }

        if (file.type === 'directory') {
            this.addOutput(`less: ${fileName}: Is a directory`, 'error-text');
            return;
        }

        // Simple less implementation - just show content with "Press q to quit" message
        this.addOutput(`<span class="info-text">--- ${fileName} ---</span>`, 'output-text');
        this.addOutput(file.content || '', 'output-text');
        this.addOutput(`<span class="info-text">--- End of file (press 'q' + Enter to continue) ---</span>`, 'output-text');
    }

    headCommand(args) {
        let lines = 10;
        let fileName = '';

        for (let i = 0; i < args.length; i++) {
            if (args[i] === '-n' && i + 1 < args.length) {
                lines = parseInt(args[i + 1]);
                i++;
            } else if (args[i].startsWith('-') && !isNaN(parseInt(args[i].slice(1)))) {
                lines = parseInt(args[i].slice(1));
            } else {
                fileName = args[i];
            }
        }

        if (!fileName) {
            this.addOutput('head: missing file operand', 'error-text');
            return;
        }

        const filePath = this.joinPaths(this.currentPath, fileName);
        const file = this.resolvePath(filePath);

        if (!file) {
            this.addOutput(`head: ${fileName}: No such file or directory`, 'error-text');
            return;
        }

        if (file.type === 'directory') {
            this.addOutput(`head: ${fileName}: Is a directory`, 'error-text');
            return;
        }

        const content = file.content || '';
        const contentLines = content.split('\\n');
        const output = contentLines.slice(0, lines).join('\\n');
        this.addOutput(output, 'output-text');
    }

    tailCommand(args) {
        let lines = 10;
        let fileName = '';

        for (let i = 0; i < args.length; i++) {
            if (args[i] === '-n' && i + 1 < args.length) {
                lines = parseInt(args[i + 1]);
                i++;
            } else if (args[i].startsWith('-') && !isNaN(parseInt(args[i].slice(1)))) {
                lines = parseInt(args[i].slice(1));
            } else {
                fileName = args[i];
            }
        }

        if (!fileName) {
            this.addOutput('tail: missing file operand', 'error-text');
            return;
        }

        const filePath = this.joinPaths(this.currentPath, fileName);
        const file = this.resolvePath(filePath);

        if (!file) {
            this.addOutput(`tail: ${fileName}: No such file or directory`, 'error-text');
            return;
        }

        if (file.type === 'directory') {
            this.addOutput(`tail: ${fileName}: Is a directory`, 'error-text');
            return;
        }

        const content = file.content || '';
        const contentLines = content.split('\\n');
        const output = contentLines.slice(-lines).join('\\n');
        this.addOutput(output, 'output-text');
    }

    findCommand(args) {
        const startPath = args[0] || '.';
        const pattern = args[1] || '*';
        
        const results = [];
        this.findRecursive(this.joinPaths(this.currentPath, startPath), pattern, results);
        
        if (results.length === 0) {
            this.addOutput(`find: No files found matching '${pattern}'`, 'warning-text');
        } else {
            results.forEach(result => this.addOutput(result, 'output-text'));
        }
    }

    findRecursive(path, pattern, results) {
        const dir = this.resolvePath(path);
        if (!dir || dir.type !== 'directory') return;

        for (const [name, item] of Object.entries(dir.children || {})) {
            const fullPath = this.joinPaths(path, name);
            
            if (pattern === '*' || name.includes(pattern)) {
                results.push(fullPath);
            }
            
            if (item.type === 'directory') {
                this.findRecursive(fullPath, pattern, results);
            }
        }
    }

    grepCommand(args) {
        if (args.length < 2) {
            this.addOutput('grep: missing pattern or file', 'error-text');
            return;
        }

        const pattern = args[0];
        const fileName = args[1];
        const filePath = this.joinPaths(this.currentPath, fileName);
        const file = this.resolvePath(filePath);

        if (!file) {
            this.addOutput(`grep: ${fileName}: No such file or directory`, 'error-text');
            return;
        }

        if (file.type === 'directory') {
            this.addOutput(`grep: ${fileName}: Is a directory`, 'error-text');
            return;
        }

        const content = file.content || '';
        const lines = content.split('\\n');
        const matches = lines.filter(line => line.toLowerCase().includes(pattern.toLowerCase()));

        if (matches.length === 0) {
            this.addOutput(`grep: No matches found for '${pattern}'`, 'warning-text');
        } else {
            matches.forEach(match => {
                const highlighted = match.replace(new RegExp(pattern, 'gi'), `<span style="background: #ffff00; color: #000;">${pattern}</span>`);
                this.addOutput(highlighted, 'output-text');
            });
        }
    }

    treeCommand(args) {
        const startPath = args[0] || '.';
        const absolutePath = this.joinPaths(this.currentPath, startPath);
        const dir = this.resolvePath(absolutePath);

        if (!dir) {
            this.addOutput(`tree: ${startPath}: No such file or directory`, 'error-text');
            return;
        }

        if (dir.type !== 'directory') {
            this.addOutput(startPath, 'output-text');
            return;
        }

        this.addOutput(absolutePath, 'file-directory');
        this.treeRecursive(dir, '', true);
    }

    treeRecursive(dir, prefix, isLast) {
        if (!dir.children) return;

        const entries = Object.entries(dir.children);
        entries.forEach(([name, item], index) => {
            const isLastItem = index === entries.length - 1;
            const connector = isLastItem ? '└── ' : '├── ';
            const className = this.getFileClass(item.type);
            
            this.addOutput(`${prefix}${connector}<span class="${className}">${name}</span>`, 'output-text');
            
            if (item.type === 'directory') {
                const newPrefix = prefix + (isLastItem ? '    ' : '│   ');
                this.treeRecursive(item, newPrefix, isLastItem);
            }
        });
    }

    whoamiCommand(args) {
        this.addOutput(this.currentUser, 'output-text');
    }

    dateCommand(args) {
        this.addOutput(new Date().toString(), 'output-text');
    }

    uptimeCommand(args) {
        const uptime = Math.floor((Date.now() - performance.timeOrigin) / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;
        
        this.addOutput(`Portfolio has been running for ${hours}h ${minutes}m ${seconds}s`, 'output-text');
    }

    historyCommand(args) {
        this.commandHistory.forEach((cmd, index) => {
            this.addOutput(`${(index + 1).toString().padStart(4)} ${cmd}`, 'output-text');
        });
    }

    clearCommand(args) {
        this.terminalContent.innerHTML = '';
    }

    echoCommand(args) {
        this.addOutput(args.join(' '), 'output-text');
    }

    whichCommand(args) {
        if (args.length === 0) {
            this.addOutput('which: missing command', 'error-text');
            return;
        }

        const command = args[0];
        if (this.commands[command]) {
            this.addOutput(`/usr/bin/${command}`, 'output-text');
        } else {
            this.addOutput(`which: no ${command} in (/usr/bin:/bin:/usr/local/bin)`, 'error-text');
        }
    }

    manCommand(args) {
        if (args.length === 0) {
            this.addOutput('man: missing command', 'error-text');
            return;
        }

        const command = args[0];
        const manPages = {
            'ls': 'NAME\\n    ls - list directory contents\\n\\nSYNOPSIS\\n    ls [OPTION]... [FILE]...\\n\\nDESCRIPTION\\n    List information about files and directories.',
            'cd': 'NAME\\n    cd - change directory\\n\\nSYNOPSIS\\n    cd [DIRECTORY]\\n\\nDESCRIPTION\\n    Change the current working directory to DIRECTORY.',
            'cat': 'NAME\\n    cat - concatenate files and print on the standard output\\n\\nSYNOPSIS\\n    cat [OPTION]... [FILE]...\\n\\nDESCRIPTION\\n    Concatenate FILE(s) to standard output.',
            'help': 'NAME\\n    help - display available commands\\n\\nSYNOPSIS\\n    help\\n\\nDESCRIPTION\\n    Display a list of available commands and their descriptions.'
        };

        if (manPages[command]) {
            this.addOutput(manPages[command], 'output-text');
        } else {
            this.addOutput(`No manual entry for ${command}`, 'error-text');
        }
    }

    // Stub implementations for system commands
    psCommand(args) {
        this.addOutput('  PID TTY          TIME CMD', 'output-text');
        this.addOutput(' 1234 pts/0    00:00:01 bash', 'output-text');
        this.addOutput(' 1235 pts/0    00:00:00 portfolio', 'output-text');
    }

    topCommand(args) {
        this.addOutput('Tasks: 2 total, 1 running, 1 sleeping, 0 stopped, 0 zombie', 'output-text');
        this.addOutput('Portfolio system resources:', 'output-text');
        this.addOutput('  CPU: 0.1%  Memory: 15MB  Uptime: ' + Math.floor(performance.now() / 1000) + 's', 'output-text');
    }

    dfCommand(args) {
        this.addOutput('Filesystem     1K-blocks   Used Available Use% Mounted on', 'output-text');
        this.addOutput('/dev/portfolio    100000  15000     85000  15% /', 'output-text');
    }

    freeCommand(args) {
        this.addOutput('              total        used        free      shared', 'output-text');
        this.addOutput('Mem:        8000000      150000     7850000        1000', 'output-text');
    }

    unameCommand(args) {
        const info = {
            '': 'PortfolioOS',
            '-a': 'PortfolioOS portfolio 1.0.0 #1 Web Jan 15 12:00:00 UTC 2025 x86_64 GNU/Linux',
            '-s': 'PortfolioOS',
            '-r': '1.0.0',
            '-v': '#1 Web Jan 15 12:00:00 UTC 2025',
            '-m': 'x86_64'
        };
        
        const flag = args[0] || '';
        this.addOutput(info[flag] || info[''], 'output-text');
    }

    aliasCommand(args) {
        if (args.length === 0) {
            Object.entries(this.aliases).forEach(([alias, command]) => {
                this.addOutput(`alias ${alias}='${command}'`, 'output-text');
            });
        } else {
            this.addOutput('alias: setting aliases not implemented in this demo', 'warning-text');
        }
    }

    exportCommand(args) {
        if (args.length === 0) {
            this.envCommand([]);
        } else {
            this.addOutput('export: setting environment variables not implemented in this demo', 'warning-text');
        }
    }

    envCommand(args) {
        Object.entries(this.environment).forEach(([key, value]) => {
            this.addOutput(`${key}=${value}`, 'output-text');
        });
    }

    exitCommand(args) {
        this.addOutput('Thanks for visiting my portfolio!', 'success-text');
        this.addOutput('Redirecting to GUI mode...', 'info-text');
        setTimeout(() => {
            window.location.href = 'traditional.html';
        }, 2000);
    }

    // Stub implementations for advanced commands
    mkdirCommand(args) { this.addOutput('mkdir: read-only filesystem', 'error-text'); }
    touchCommand(args) { this.addOutput('touch: read-only filesystem', 'error-text'); }
    suCommand(args) { this.addOutput('su: Authentication failure', 'error-text'); }
    sudoCommand(args) { this.addOutput('sudo: not in sudoers file', 'error-text'); }
    chmodCommand(args) { this.addOutput('chmod: read-only filesystem', 'error-text'); }
    chownCommand(args) { this.addOutput('chown: read-only filesystem', 'error-text'); }
    
    pingCommand(args) {
        const host = args[0] || 'localhost';
        this.addOutput(`PING ${host} (127.0.0.1): 56 data bytes`, 'output-text');
        this.addOutput(`64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.1ms`, 'output-text');
        this.addOutput(`--- ${host} ping statistics ---`, 'output-text');
        this.addOutput(`1 packets transmitted, 1 received, 0% packet loss`, 'output-text');
    }

    wgetCommand(args) { this.addOutput('wget: command simulated - network operations not available', 'warning-text'); }
    curlCommand(args) { this.addOutput('curl: command simulated - network operations not available', 'warning-text'); }
    
    gitCommand(args) {
        if (args[0] === 'status') {
            this.addOutput('On branch main', 'output-text');
            this.addOutput('Your branch is up to date with \'origin/main\'.', 'output-text');
            this.addOutput('nothing to commit, working tree clean', 'output-text');
        } else {
            this.addOutput('git: command simulated - repository operations not available', 'warning-text');
        }
    }

    vimCommand(args) { this.addOutput('vim: editor not available in web terminal', 'warning-text'); }
    nanoCommand(args) { this.addOutput('nano: editor not available in web terminal', 'warning-text'); }
    sshCommand(args) { this.addOutput('ssh: network operations not available', 'warning-text'); }
    scpCommand(args) { this.addOutput('scp: network operations not available', 'warning-text'); }
    tarCommand(args) { this.addOutput('tar: archive operations simulated', 'warning-text'); }
    zipCommand(args) { this.addOutput('zip: archive operations simulated', 'warning-text'); }
    unzipCommand(args) { this.addOutput('unzip: archive operations simulated', 'warning-text'); }
    
    pythonCommand(args) {
        if (args.length === 0) {
            this.addOutput('Python 3.9.0 (default, Jan 15 2025, 12:00:00)', 'output-text');
            this.addOutput('Type "help", "copyright", "credits" or "license" for more information.', 'output-text');
            this.addOutput('>>> (Python REPL not implemented)', 'warning-text');
        } else {
            this.addOutput('python: script execution not available', 'warning-text');
        }
    }

    nodeCommand(args) { this.addOutput('node: JavaScript runtime not available', 'warning-text'); }
    javaCommand(args) { this.addOutput('java: JVM not available in web terminal', 'warning-text'); }
    gccCommand(args) { this.addOutput('gcc: compiler not available', 'warning-text'); }
    makeCommand(args) { this.addOutput('make: build system not available', 'warning-text'); }
    dockerCommand(args) { this.addOutput('docker: containerization not available', 'warning-text'); }
    kubectlCommand(args) { this.addOutput('kubectl: Kubernetes not available', 'warning-text'); }

    // Content generation methods
    getAboutContent() {
        return `# About Samarth Kulkarni

Computer Science Student & DevSecOps Intern

Hello! I'm a Computer Science student at The Pennsylvania State University 
with a passion for software development, artificial intelligence, and cloud technologies.

## What I Do:
• Software Development & DevSecOps Engineering
• Artificial Intelligence & Machine Learning Applications  
• Cloud Technologies (Azure, AWS) and DevOps
• Full-stack development with .NET, JavaScript, and Python
• Android App Development and Mobile Solutions

## Current Role:
Software/DevSecOps Intern at Constellation Energy, where I streamline 
cloud-hosted workflows and optimize deployment pipelines on Azure Cloud.

## Academic Focus:
Pursuing Bachelor of Science in Computer Science at Penn State (GPA: 3.71), 
graduating May 2025. Specialized in AI, machine learning, and cloud computing.

## Recent Achievements:
• Oak Codefest Runner-Up for ML project reducing food waste
• Multiple cloud and AI certifications (AWS, Azure, Oracle Java)  
• Published research on Brain-Computer Interfaces`;
    }

    getSkillsContent() {
        return `{
  "programming_languages": [
    "Java", "Python", "C#", "JavaScript", "SQL", ".NET", "Android SDK"
  ],
  "cloud_technologies": [
    "Azure DevOps", "Azure Cloud Services", "AWS", "YAML Pipelines", "CI/CD", "DevSecOps"
  ],
  "ai_machine_learning": [
    "TensorFlow", "Machine Learning", "Signal Processing", "NLP", "Data Visualization", "Brain-Computer Interface"
  ],
  "development_tools": [
    "Git", "Agile/Scrum", "Android Development", "Security Integration"
  ],
  "certifications": {
    "Oracle": "Java Certified Foundations Associate",
    "AWS": "Certified Cloud Practitioner", 
    "Microsoft": "Azure Fundamentals, Azure AI Engineer Associate",
    "TensorFlow": "Professional Certificate (In Progress)"
  }
}`;
    }

    getExperienceContent() {
        return `WORK EXPERIENCE LOG

[2024-Present] Software / DevSecOps Intern - Constellation Energy
• Streamlined cloud-hosted workflows, achieving reduction in team toil and enhanced task efficiency
• Optimized deployment pipelines on Azure Cloud to maximize release stability and improved security through YAML and Azure DevOps
• Developed applications using C#, Microsoft .NET, and JavaScript, streamlining repetitive tasks and cutting manual efforts
• Collaborated with cross-functional teams in an Agile environment, contributing to sprint planning, daily standups, and retrospectives
• Offered a part-time position during the academic year, demonstrating continued value to ongoing projects

[2024] Staff Photographer - Onward State, State College PA
• Covered campus events, boosting website engagement by 25% with compelling visuals
• Contributed to digital media content strategy and visual storytelling

[2023] IT Support Specialist - The Pennsylvania State University
• Resolved 100+ technical support cases with a 95% first-contact resolution rate
• Assisted students, faculty, and staff with software, hardware, and network issues
• Maintained high customer satisfaction while managing complex technical problems`;
    }

    getEducationContent() {
        return `EDUCATION

Bachelor of Science in Computer Science
The Pennsylvania State University
Expected May 2025 | GPA: 3.71

Focus Areas:
• AI and Machine Learning
• Software Engineering  
• Cloud Computing

Location: State College, PA
Status: Senior, graduating Spring 2025

Relevant Coursework:
• Data Structures and Algorithms
• Software Engineering
• Machine Learning
• Database Systems
• Computer Networks
• Cybersecurity Fundamentals`;
    }

    getContactContent() {
        return `CONTACT INFORMATION

Email: kulkarni.samarth@yahoo.com
Phone: (814) 441-0547
LinkedIn: https://linkedin.com/in/samarthkuls/
GitHub: https://github.com/SamarthK1239
Location: Chicago, IL

PROFESSIONAL STATUS:
Current Role: Software/DevSecOps Intern at Constellation Energy
Academic Status: Senior at Penn State (Graduating May 2025)
Open for: Full-time opportunities, internships, collaboration
Availability: Part-time during academic year, full-time after May 2025

CONNECT WITH ME:
I'm always interested in discussing new technologies, AI/ML projects, 
cloud computing, or potential opportunities!

Feel free to reach out via email or connect with me on LinkedIn. 
Check out my projects on GitHub!`;
    }

    getProjectContent(project) {
        const projects = {
            'insupred': `# InsuPred App (2021-22)

## Technologies:
Machine Learning, Android SDK, Java

## Description:
Developed a Machine Learning app that enables diabetics to accurately 
calculate insulin doses, significantly enhancing blood sugar control. 
Successfully launched on the Google Play Store with a functional ML 
model and intuitive interface.

## Achievement:
📱 Published on Google Play Store

## Key Features:
• ML-powered insulin dose calculation
• User-friendly Android interface
• Real-time blood sugar monitoring integration
• Personalized recommendations`,

            'bci': `# Brain-Computer Interfaces (2020-21)

## Technologies:
AI, Signal Processing, Machine Learning, 3D Visualization

## Description:
Mentored by Dr. Bruce Campbell, Brown University. Created an AI-driven 
application for real-time brain wave analysis enabling sentiment analysis 
across multiple domains including social media, gaming, and medicine.

## Achievement:
📄 Published Research Paper

## Key Features:
• Real-time EEG signal processing
• Multi-domain sentiment analysis
• 3D brain activity visualization
• Machine learning classification`,

            'ai': `# AI Development & Prompt Engineering (2019 – Present)

## Technologies:
Generative AI, NLP, AWS, Azure

## Description:
Specialized in AI development, enhancing Generative AI and NLP queries 
while delivering robust solutions on cloud platforms. Multiple ongoing 
projects showcasing expertise in modern AI technologies.

## Links:
GitHub: https://github.com/SamarthK1239

## Key Areas:
• Large Language Model optimization
• Prompt engineering techniques
• Cloud-based AI deployment
• Natural language processing`,

            'oak': `# Oak Codefest ML Project (Competition)

## Technologies:
Machine Learning, Data Analysis

## Description:
Created a Machine Learning project focused on reducing food waste, 
earning runner-up position at the Oak Codefest competition. 
Demonstrated innovation in sustainable technology solutions.

## Achievement:
🏆 Runner-Up Award

## Impact:
• Food waste reduction algorithm
• Sustainable technology focus
• Competition recognition
• Environmental impact`,

            'terminal': `# CLI Terminal Portfolio (2025)

## Technologies:
HTML5, CSS3, JavaScript

## Description:
An interactive terminal-style portfolio showcasing web development 
skills and providing an authentic command-line experience. Features 
command history, auto-completion, and responsive design.

## Features:
• Full bash-like command implementation
• File system simulation
• Command history and auto-completion
• Responsive terminal interface
• Real-time cursor positioning`
        };
        
        return projects[project] || 'Project not found.';
    }

    getAccomplishmentsContent() {
        return `ACCOMPLISHMENTS & ACHIEVEMENTS

COMPETITION & AWARDS:
• Oak Codefest Runner-Up - Created a Machine Learning project to reduce food waste
• Published Research - Brain-Computer Interfaces research paper (mentored by Dr. Bruce Campbell, Brown University)

COMMUNITY IMPACT:
• Akshaya Patra Fundraiser - Raised funds to provide 45,000+ meals for children in rural India
• Campus Photography - Boosted website engagement by 25% as Staff Photographer at Onward State

PROFESSIONAL RECOGNITION:
• Extended Internship - Offered part-time position at Constellation Energy post-summer internship
• High Performance - 95% first-contact resolution rate as IT Support Specialist
• Published App - InsuPred app successfully launched on Google Play Store

CERTIFICATIONS:
• AWS Certified Cloud Practitioner
• Microsoft Azure Fundamentals & AI Engineer Associate
• Oracle Java Certified Foundations Associate
• Google IT Support Professional (In Progress)
• TensorFlow Professional Certificate (In Progress)`;
    }

    getBashrcContent() {
        return `# ~/.bashrc: executed by bash(1) for non-login shells.

# Portfolio-specific aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias portfolio='cat about.md'
alias skills='cat skills.json'
alias projects='ls projects/'
alias contact='cat contact.info'

# Navigation shortcuts
alias ..='cd ..'
alias ...='cd ../..'
alias home='cd ~'

# Utility aliases
alias h='history'
alias c='clear'
alias q='exit'

# Custom prompt
export PS1='\\u@\\h:\\w\\$ '

# Welcome message
echo "Welcome to Samarth's Portfolio Terminal!"
echo "Type 'help' for available commands."`;
    }

    getProfileContent() {
        return `# ~/.profile: executed by the command interpreter for login shells.

# Portfolio environment variables
export PORTFOLIO_VERSION="1.0.0"
export DEVELOPER="Samarth Kulkarni"
export UNIVERSITY="Penn State"
export GRADUATION="May 2025"
export CURRENT_ROLE="DevSecOps Intern"
export COMPANY="Constellation Energy"

# Path configuration
export PATH="/usr/local/bin:/usr/bin:/bin:$HOME/bin"

# Terminal configuration
export TERM="xterm-256color"
export EDITOR="vim"
export PAGER="less"

# Source bashrc if it exists
if [ -f "$HOME/.bashrc" ]; then
    . "$HOME/.bashrc"
fi`;
    }
}

// Initialize the terminal when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TerminalPortfolio();
});
