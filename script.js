class Terminal {
    constructor() {
        this.output = document.getElementById('output');
        this.input = document.getElementById('commandInput');
        this.inputText = document.getElementById('inputText');
        this.cursor = document.getElementById('cursor');
        this.commandHistory = [];
        this.historyIndex = -1;
        
        this.commands = {
            'help': this.showHelp.bind(this),
            'about': this.showAbout.bind(this),
            'skills': this.showSkills.bind(this),
            'projects': this.showProjects.bind(this),
            'blogs': this.showBlogs.bind(this),
            'contact': this.showContact.bind(this),
            'experience': this.showExperience.bind(this),
            'education': this.showEducation.bind(this),
            'clear': this.clearTerminal.bind(this),
            'resume': this.showResume.bind(this),
            'whoami': this.showWhoami.bind(this),
            'ls': this.listCommands.bind(this),
            'pwd': this.showPwd.bind(this),
            'cat': this.catCommand.bind(this),
            'echo': this.echoCommand.bind(this)
        };
        
        this.initializeEventListeners();
        this.focusInput();
        this.updateInputDisplay();
    }
    
    initializeEventListeners() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autoComplete();
            }
        });
        
        // Update display as user types
        this.input.addEventListener('input', () => {
            this.updateInputDisplay();
        });
        
        // Keep input focused
        document.addEventListener('click', () => {
            this.focusInput();
        });
        
        this.input.addEventListener('blur', () => {
            setTimeout(() => this.focusInput(), 0);
        });
    }
    
    focusInput() {
        this.input.focus();
    }
    
    updateInputDisplay() {
        this.inputText.textContent = this.input.value;
    }
    
    handleCommand() {
        const command = this.input.value.trim();
        if (command) {
            this.addToHistory(command);
            this.displayCommand(command);
            this.executeCommand(command);
        }
        this.input.value = '';
        this.updateInputDisplay();
        this.historyIndex = -1;
    }
    
    addToHistory(command) {
        this.commandHistory.unshift(command);
        if (this.commandHistory.length > 50) {
            this.commandHistory.pop();
        }
    }
    
    navigateHistory(direction) {
        if (direction === -1 && this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
        } else if (direction === 1 && this.historyIndex > -1) {
            this.historyIndex--;
        }
        
        if (this.historyIndex === -1) {
            this.input.value = '';
        } else {
            this.input.value = this.commandHistory[this.historyIndex];
        }
        
        this.updateInputDisplay();
    }
    
    autoComplete() {
        const input = this.input.value.toLowerCase();
        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            this.input.value = matches[0];
            this.updateInputDisplay();
        } else if (matches.length > 1) {
            this.addOutput(`Available commands: ${matches.join(', ')}`, 'output-text');
        }
    }
    
    displayCommand(command) {
        const commandDiv = document.createElement('div');
        commandDiv.className = 'command-line';
        commandDiv.innerHTML = `<span class="prompt">visitor@portfolio:~$ </span><span class="command">${command}</span>`;
        this.output.appendChild(commandDiv);
    }
    
    executeCommand(input) {
        const [command, ...args] = input.toLowerCase().split(' ');
        
        if (this.commands[command]) {
            this.commands[command](args);
        } else {
            this.addOutput(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
        }
        
        this.scrollToBottom();
    }
    
    addOutput(content, className = 'output-text') {
        const outputDiv = document.createElement('div');
        outputDiv.className = `command-output ${className}`;
        outputDiv.innerHTML = content;
        this.output.appendChild(outputDiv);
    }
    
    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }
    
    // Command implementations
    showHelp() {
        const helpText = `
<h2>Available Commands:</h2>
<ul>
    <li><span class="highlight">help</span> - Show this help message</li>
    <li><span class="highlight">about</span> - Learn about me</li>
    <li><span class="highlight">skills</span> - View my technical skills</li>
    <li><span class="highlight">projects</span> - See my projects</li>
    <li><span class="highlight">blogs --view</span> - Read my blog posts</li>
    <li><span class="highlight">experience</span> - View my work experience</li>
    <li><span class="highlight">education</span> - See my educational background</li>
    <li><span class="highlight">contact</span> - Get my contact information</li>
    <li><span class="highlight">resume</span> - Download my resume</li>
    <li><span class="highlight">clear</span> - Clear the terminal</li>
    <li><span class="highlight">whoami</span> - Display current user info</li>
    <li><span class="highlight">ls</span> - List available sections</li>
    <li><span class="highlight">pwd</span> - Show current directory</li>
</ul>
<p>Use <span class="highlight">Tab</span> for auto-completion and <span class="highlight">↑↓</span> for command history.</p>
        `;
        this.addOutput(helpText);
    }
    
    showAbout() {
        const aboutText = `
<h2>About Me</h2>
<p>Hello! I'm a passionate Computer Scientist and Full-Stack Developer with a love for creating innovative solutions and elegant code.</p>

<h3>🚀 What I Do:</h3>
<ul>
    <li>Full-stack web development with modern frameworks</li>
    <li>Algorithm design and data structure optimization</li>
    <li>Machine learning and AI applications</li>
    <li>System architecture and scalable solutions</li>
    <li>Open source contributions and community building</li>
</ul>

<h3>💡 Philosophy:</h3>
<p>I believe in writing clean, maintainable code and continuous learning. Every problem is an opportunity to innovate and improve.</p>

<h3>🎯 Current Focus:</h3>
<p>Working on cutting-edge projects involving distributed systems, cloud architecture, and emerging technologies.</p>
        `;
        this.addOutput(aboutText);
    }
    
    showSkills() {
        const skillsText = `
<h2>Technical Skills</h2>

<h3>Programming Languages:</h3>
<ul>
    <li><span class="skill-category">Primary:</span> Python, JavaScript/TypeScript, Java, C++</li>
    <li><span class="skill-category">Familiar:</span> Go, Rust, C#, SQL, R</li>
</ul>

<h3>Frontend Technologies:</h3>
<ul>
    <li>React.js, Vue.js, Angular</li>
    <li>HTML5, CSS3, SASS/SCSS</li>
    <li>Responsive Design, PWAs</li>
    <li>State Management (Redux, Vuex)</li>
</ul>

<h3>Backend Technologies:</h3>
<ul>
    <li>Node.js, Express.js, Django, Flask</li>
    <li>RESTful APIs, GraphQL</li>
    <li>Microservices Architecture</li>
    <li>Database Design (PostgreSQL, MongoDB, Redis)</li>
</ul>

<h3>DevOps & Tools:</h3>
<ul>
    <li>Docker, Kubernetes, AWS/GCP</li>
    <li>CI/CD Pipelines, Jenkins, GitHub Actions</li>
    <li>Git, Linux/Unix, Terminal/Shell Scripting</li>
    <li>Monitoring & Logging (ELK Stack, Prometheus)</li>
</ul>

<h3>Data Science & ML:</h3>
<ul>
    <li>TensorFlow, PyTorch, Scikit-learn</li>
    <li>Data Analysis, Visualization (Pandas, Matplotlib)</li>
    <li>Statistical Modeling, Neural Networks</li>
    <li>Big Data Processing (Spark, Hadoop)</li>
</ul>
        `;
        this.addOutput(skillsText);
    }
    
    showProjects() {
        const projectsText = `
<h2>Featured Projects</h2>

<h3><span class="project-title">1. Distributed Task Scheduler</span></h3>
<p><span class="project-tech">Technologies: Go, Redis, Docker, Kubernetes</span></p>
<p>Built a high-performance distributed task scheduling system capable of handling 10k+ concurrent jobs with automatic failover and load balancing.</p>

<h3><span class="project-title">2. Real-time Analytics Dashboard</span></h3>
<p><span class="project-tech">Technologies: React, Node.js, WebSocket, PostgreSQL, D3.js</span></p>
<p>Developed a real-time data visualization platform for monitoring system metrics and business KPIs with interactive charts and alerts.</p>

<h3><span class="project-title">3. ML-Powered Code Review Assistant</span></h3>
<p><span class="project-tech">Technologies: Python, TensorFlow, NLP, REST APIs</span></p>
<p>Created an AI assistant that analyzes code quality, suggests improvements, and detects potential bugs using machine learning models.</p>

<h3><span class="project-title">4. Blockchain Voting System</span></h3>
<p><span class="project-tech">Technologies: Solidity, Web3.js, React, Ethereum</span></p>
<p>Designed a secure, transparent voting platform using blockchain technology with cryptographic verification and audit trails.</p>

<h3><span class="project-title">5. CLI Website Portfolio</span></h3>
<p><span class="project-tech">Technologies: HTML5, CSS3, JavaScript</span></p>
<p>The website you're currently using! An interactive terminal-style portfolio showcasing web development skills.</p>

<p>Type <span class="highlight">'contact'</span> to get links to view these projects on GitHub!</p>
        `;
        this.addOutput(projectsText);
    }
    
    showBlogs(args) {
        if (args.includes('--view') || args.includes('-v')) {
            const blogsText = `
<h2>Recent Blog Posts</h2>

<h3><span class="project-title">📝 "Building Scalable Microservices with Go"</span></h3>
<p><span class="project-tech">Published: March 2024 | 12 min read</span></p>
<p>Deep dive into designing resilient microservices architecture using Go, covering service discovery, load balancing, and distributed tracing.</p>

<h3><span class="project-title">🤖 "Machine Learning in Production: Lessons Learned"</span></h3>
<p><span class="project-tech">Published: February 2024 | 8 min read</span></p>
<p>Practical insights from deploying ML models at scale, including monitoring, versioning, and A/B testing strategies.</p>

<h3><span class="project-title">🔐 "Modern Authentication Patterns for SPAs"</span></h3>
<p><span class="project-tech">Published: January 2024 | 10 min read</span></p>
<p>Comprehensive guide to implementing secure authentication in single-page applications using JWT, OAuth 2.0, and PKCE.</p>

<h3><span class="project-title">⚡ "Optimizing Database Performance at Scale"</span></h3>
<p><span class="project-tech">Published: December 2023 | 15 min read</span></p>
<p>Advanced techniques for database optimization including indexing strategies, query optimization, and caching patterns.</p>

<h3><span class="project-title">🎨 "CSS Grid vs Flexbox: When to Use What"</span></h3>
<p><span class="project-tech">Published: November 2023 | 7 min read</span></p>
<p>Practical comparison of CSS layout systems with real-world examples and decision-making frameworks.</p>

<p>Visit my blog for more articles on software engineering, best practices, and emerging technologies!</p>
            `;
            this.addOutput(blogsText);
        } else {
            this.addOutput('Usage: blogs --view (or blogs -v) to display blog posts', 'warning');
        }
    }
    
    showExperience() {
        const experienceText = `
<h2>Work Experience</h2>

<h3><span class="project-title">Senior Software Engineer</span> | TechCorp Inc.</h3>
<p><span class="project-tech">January 2022 - Present</span></p>
<ul>
    <li>Lead development of distributed systems serving 1M+ users</li>
    <li>Architect and implement microservices using Go and Docker</li>
    <li>Mentor junior developers and conduct technical interviews</li>
    <li>Reduced system latency by 40% through optimization initiatives</li>
</ul>

<h3><span class="project-title">Full-Stack Developer</span> | StartupXYZ</h3>
<p><span class="project-tech">June 2020 - December 2021</span></p>
<ul>
    <li>Built scalable web applications using React and Node.js</li>
    <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
    <li>Collaborated with product team on feature planning and delivery</li>
    <li>Established coding standards and best practices</li>
</ul>

<h3><span class="project-title">Software Engineering Intern</span> | BigTech Corp</h3>
<p><span class="project-tech">Summer 2019</span></p>
<ul>
    <li>Developed machine learning models for recommendation systems</li>
    <li>Optimized data processing pipelines using Apache Spark</li>
    <li>Contributed to open-source projects and internal tools</li>
    <li>Presented final project to senior engineering leadership</li>
</ul>
        `;
        this.addOutput(experienceText);
    }
    
    showEducation() {
        const educationText = `
<h2>Education</h2>

<h3><span class="project-title">Master of Science in Computer Science</span></h3>
<p><span class="project-tech">University of Technology | 2018-2020 | GPA: 3.8/4.0</span></p>
<ul>
    <li><span class="skill-category">Specialization:</span> Distributed Systems & Machine Learning</li>
    <li><span class="skill-category">Thesis:</span> "Optimizing Consensus Algorithms in Distributed Networks"</li>
    <li><span class="skill-category">Relevant Coursework:</span> Advanced Algorithms, Database Systems, AI/ML, Software Engineering</li>
</ul>

<h3><span class="project-title">Bachelor of Science in Computer Engineering</span></h3>
<p><span class="project-tech">State University | 2014-2018 | Magna Cum Laude</span></p>
<ul>
    <li><span class="skill-category">Minor:</span> Mathematics</li>
    <li><span class="skill-category">Activities:</span> ACM Programming Team, Computer Science Club President</li>
    <li><span class="skill-category">Relevant Coursework:</span> Data Structures, Computer Architecture, Operating Systems</li>
</ul>

<h3><span class="project-title">Certifications</span></h3>
<ul>
    <li>AWS Certified Solutions Architect - Professional (2023)</li>
    <li>Google Cloud Professional Cloud Architect (2022)</li>
    <li>Certified Kubernetes Administrator (CKA) (2021)</li>
    <li>TensorFlow Developer Certificate (2020)</li>
</ul>
        `;
        this.addOutput(educationText);
    }
    
    showContact() {
        const contactText = `
<h2>Contact Information</h2>

<h3>📧 Get In Touch:</h3>
<ul>
    <li><span class="skill-category">Email:</span> <span class="highlight">hello@yourname.dev</span></li>
    <li><span class="skill-category">LinkedIn:</span> <span class="highlight">linkedin.com/in/yourprofile</span></li>
    <li><span class="skill-category">GitHub:</span> <span class="highlight">github.com/yourusername</span></li>
    <li><span class="skill-category">Twitter:</span> <span class="highlight">@yourhandle</span></li>
    <li><span class="skill-category">Portfolio:</span> <span class="highlight">www.yourname.dev</span></li>
</ul>

<h3>💼 Professional:</h3>
<ul>
    <li><span class="skill-category">Open for:</span> Full-time opportunities, consulting, collaboration</li>
    <li><span class="skill-category">Location:</span> San Francisco, CA (Open to remote)</li>
    <li><span class="skill-category">Timezone:</span> PST (UTC-8)</li>
</ul>

<h3>🤝 Let's Connect:</h3>
<p>I'm always interested in discussing new technologies, potential collaborations, or just chatting about code!</p>
<p>Feel free to reach out via any of the channels above.</p>
        `;
        this.addOutput(contactText);
    }
    
    showResume() {
        const resumeText = `
<h2>Resume Download</h2>
<p>📄 Resume download functionality would be implemented here.</p>
<p>In a real implementation, this would trigger a PDF download.</p>
<p><span class="highlight">resume.pdf</span> - Updated January 2024</p>
<p>Type <span class="highlight">'contact'</span> for more ways to connect!</p>
        `;
        this.addOutput(resumeText);
    }
    
    showWhoami() {
        const whoamiText = `
<h2>Current User Information</h2>
<p><span class="skill-category">User:</span> visitor</p>
<p><span class="skill-category">Host:</span> portfolio</p>
<p><span class="skill-category">Shell:</span> WebTerminal v1.0</p>
<p><span class="skill-category">Directory:</span> /home/portfolio</p>
<p><span class="skill-category">Session:</span> Interactive Portfolio Browser</p>
        `;
        this.addOutput(whoamiText);
    }
    
    listCommands() {
        const lsText = `
<h2>Available Sections:</h2>
<ul>
    <li>📁 about.md</li>
    <li>📁 skills.json</li>
    <li>📁 projects/</li>
    <li>📁 blogs/</li>
    <li>📁 experience.log</li>
    <li>📁 education.txt</li>
    <li>📁 contact.info</li>
    <li>📁 resume.pdf</li>
</ul>
<p>Use command names to explore each section (e.g., 'about', 'skills', 'projects')</p>
        `;
        this.addOutput(lsText);
    }
    
    showPwd() {
        this.addOutput('/home/portfolio/terminal-website', 'output-text');
    }
    
    catCommand(args) {
        if (args.length === 0) {
            this.addOutput('Usage: cat <filename>\nAvailable files: about.md, skills.json, contact.info', 'warning');
            return;
        }
        
        const file = args[0];
        switch(file) {
            case 'about.md':
                this.showAbout();
                break;
            case 'skills.json':
                this.showSkills();
                break;
            case 'contact.info':
                this.showContact();
                break;
            default:
                this.addOutput(`cat: ${file}: No such file or directory`, 'error');
        }
    }
    
    echoCommand(args) {
        if (args.length === 0) {
            this.addOutput('', 'output-text');
        } else {
            this.addOutput(args.join(' '), 'output-text');
        }
    }
    
    clearTerminal() {
        this.output.innerHTML = '';
    }
}

// Initialize terminal when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});
