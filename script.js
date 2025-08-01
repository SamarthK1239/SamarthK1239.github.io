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
            'accomplishments': this.showAccomplishments.bind(this),
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
        commandDiv.innerHTML = `<span class="prompt">samarth@portfolio:~$ </span><span class="command">${command}</span>`;
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
    <li><span class="highlight">about</span> - Learn about Samarth Kulkarni</li>
    <li><span class="highlight">skills</span> - View technical skills & certifications</li>
    <li><span class="highlight">projects</span> - See featured projects</li>
    <li><span class="highlight">experience</span> - View work experience</li>
    <li><span class="highlight">education</span> - See educational background</li>
    <li><span class="highlight">accomplishments</span> - View awards & achievements</li>
    <li><span class="highlight">blogs --view</span> - Read blog posts (placeholder)</li>
    <li><span class="highlight">contact</span> - Get contact information</li>
    <li><span class="highlight">resume</span> - View resume information</li>
    <li><span class="highlight">clear</span> - Clear the terminal</li>
    <li><span class="highlight">whoami</span> - Display current user info</li>
    <li><span class="highlight">ls</span> - List available sections</li>
    <li><span class="highlight">pwd</span> - Show current directory</li>
</ul>
<p>Use <span class="highlight">Tab</span> for auto-completion and <span class="highlight">↑↓</span> for command history.</p>
<p><span class="highlight">Pro tip:</span> Try 'accomplishments' to see awards and certifications!</p>
        `;
        this.addOutput(helpText);
    }
    
    showAbout() {
        const aboutText = `
<h2>About Samarth Kulkarni</h2>
<p>Hello! I'm a Computer Science student at The Pennsylvania State University with a passion for software development, artificial intelligence, and cloud technologies.</p>

<h3>🚀 What I Do:</h3>
<ul>
    <li>Software Development & DevSecOps Engineering</li>
    <li>Artificial Intelligence & Machine Learning Applications</li>
    <li>Cloud Technologies (Azure, AWS) and DevOps</li>
    <li>Full-stack development with .NET, JavaScript, and Python</li>
    <li>Android App Development and Mobile Solutions</li>
</ul>

<h3>💡 Current Role:</h3>
<p>Software/DevSecOps Intern at Constellation Energy, where I streamline cloud-hosted workflows and optimize deployment pipelines on Azure Cloud.</p>

<h3>🎯 Academic Focus:</h3>
<p>Pursuing Bachelor of Science in Computer Science at Penn State (GPA: 3.71), graduating May 2025. Specialized in AI, machine learning, and cloud computing.</p>

<h3>� Recent Achievements:</h3>
<ul>
    <li>Oak Codefest Runner-Up for ML project reducing food waste</li>
    <li>Multiple cloud and AI certifications (AWS, Azure, Oracle Java)</li>
    <li>Published research on Brain-Computer Interfaces</li>
</ul>
        `;
        this.addOutput(aboutText);
    }
    
    showSkills() {
        const skillsText = `
<h2>Technical Skills & Certifications</h2>

<h3>Programming Languages:</h3>
<ul>
    <li><span class="skill-category">Primary:</span> Java, Python, C#, JavaScript, SQL</li>
    <li><span class="skill-category">Frameworks:</span> .NET, Android SDK</li>
</ul>

<h3>Cloud Technologies:</h3>
<ul>
    <li><span class="skill-category">Azure:</span> Azure DevOps, Azure Cloud Services, YAML Pipelines</li>
    <li><span class="skill-category">AWS:</span> Cloud Services, Deployment & Management</li>
    <li><span class="skill-category">DevOps:</span> CI/CD Pipelines, Security Integration</li>
</ul>

<h3>AI & Machine Learning:</h3>
<ul>
    <li>Artificial Intelligence & Machine Learning</li>
    <li>TensorFlow (Professional Certificate in Progress)</li>
    <li>Signal Processing & Data Visualization</li>
    <li>Natural Language Processing</li>
    <li>Brain-Computer Interface Development</li>
</ul>

<h3>Development & Tools:</h3>
<ul>
    <li>Android App Development</li>
    <li>Git Version Control</li>
    <li>Agile & Scrum Methodologies</li>
    <li>DevSecOps & Security Integration</li>
</ul>

<h3>Certifications:</h3>
<ul>
    <li><span class="skill-category">Oracle:</span> Java Certified Foundations Associate</li>
    <li><span class="skill-category">AWS:</span> Certified Cloud Practitioner</li>
    <li><span class="skill-category">Microsoft:</span> Azure Fundamentals, Azure AI Engineer Associate</li>
    <li><span class="skill-category">In Progress:</span> TensorFlow in Practice Professional Certificate</li>
</ul>
        `;
        this.addOutput(skillsText);
    }
    
    showProjects() {
        const projectsText = `
<h2>Featured Projects</h2>

<h3><span class="project-title">1. InsuPred App</span></h3>
<p><span class="project-tech">Technologies: Machine Learning, Android SDK, Java | 2021-22</span></p>
<p>Developed a Machine Learning app that enables diabetics to accurately calculate insulin doses, significantly enhancing blood sugar control. Successfully launched a functional ML model with a calibration algorithm and an intuitive interface on the Google Play Store.</p>

<h3><span class="project-title">2. Brain-Computer Interfaces</span></h3>
<p><span class="project-tech">Technologies: AI, Signal Processing, Machine Learning, 3D Data Visualization | 2020-21</span></p>
<p>Mentored by Dr. Bruce Campbell, Brown University. Created an AI-driven application for real-time brain wave analysis on low-end systems, enabling sentiment analysis to better understand user emotions across social media, gaming, psychology, medicine, and education. Culminated in a published research paper.</p>

<h3><span class="project-title">3. AI Development & Prompt Engineering</span></h3>
<p><span class="project-tech">Technologies: Generative AI, NLP, AWS, Microsoft Azure | 2019 – Present</span></p>
<p>Specialized in AI development, enhancing Generative AI and NLP queries while delivering robust solutions on AWS and Microsoft Azure. Multiple projects available at GitHub.com/SamarthK1239.</p>

<h3><span class="project-title">4. Oak Codefest ML Project</span></h3>
<p><span class="project-tech">Technologies: Machine Learning, Data Analysis | Runner-Up Award</span></p>
<p>Created a Machine Learning project to reduce food waste, earning runner-up position at Oak Codefest competition.</p>

<h3><span class="project-title">5. CLI Terminal Portfolio</span></h3>
<p><span class="project-tech">Technologies: HTML5, CSS3, JavaScript</span></p>
<p>The website you're currently using! An interactive terminal-style portfolio showcasing web development skills and providing an authentic command-line experience.</p>

<p>Visit <span class="highlight">github.com/SamarthK1239</span> to explore more projects and contributions!</p>
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

<h3><span class="project-title">Software / DevSecOps Intern</span> | Constellation Energy</h3>
<p><span class="project-tech">June 2024 – Present</span></p>
<ul>
    <li>Streamlined cloud-hosted workflows, achieving reduction in team toil and enhanced task efficiency</li>
    <li>Optimized deployment pipelines on Azure Cloud to maximize release stability and improved security through YAML and Azure DevOps</li>
    <li>Developed applications using C#, Microsoft .NET, and JavaScript, streamlining repetitive tasks and cutting manual efforts</li>
    <li>Collaborated with cross-functional teams in an Agile environment, contributing to sprint planning, daily standups, and retrospectives</li>
    <li>Offered a part-time position during the academic year, demonstrating continued value to ongoing projects</li>
</ul>

<h3><span class="project-title">Staff Photographer</span> | Onward State, State College PA</h3>
<p><span class="project-tech">2024</span></p>
<ul>
    <li>Covered campus events, boosting website engagement by 25% with compelling visuals</li>
    <li>Contributed to digital media content strategy and visual storytelling</li>
</ul>

<h3><span class="project-title">IT Support Specialist</span> | The Pennsylvania State University</h3>
<p><span class="project-tech">2023</span></p>
<ul>
    <li>Resolved 100+ technical support cases with a 95% first-contact resolution rate</li>
    <li>Assisted students, faculty, and staff with software, hardware, and network issues</li>
    <li>Maintained high customer satisfaction while managing complex technical problems</li>
</ul>
        `;
        this.addOutput(experienceText);
    }
    
    showEducation() {
        const educationText = `
<h2>Education & Certifications</h2>

<h3><span class="project-title">Bachelor of Science in Computer Science</span></h3>
<p><span class="project-tech">The Pennsylvania State University | Expected May 2025 | GPA: 3.71</span></p>
<ul>
    <li><span class="skill-category">Focus Areas:</span> Artificial Intelligence, Machine Learning, Software Engineering</li>
    <li><span class="skill-category">Location:</span> State College, PA</li>
    <li><span class="skill-category">Current Status:</span> Senior, graduating Spring 2025</li>
</ul>

<h3><span class="project-title">Professional Certifications</span></h3>
<ul>
    <li><span class="skill-category">Oracle:</span> Java Certified Foundations Associate</li>
    <li><span class="skill-category">AWS:</span> Certified Cloud Practitioner</li>
    <li><span class="skill-category">Microsoft:</span> Azure Fundamentals</li>
    <li><span class="skill-category">Microsoft:</span> Azure AI Engineer Associate</li>
    <li><span class="skill-category">In Progress:</span> TensorFlow in Practice Professional Certificate</li>
</ul>

<h3><span class="project-title">Notable Achievements</span></h3>
<ul>
    <li>Oak Codefest Runner-Up - Machine Learning project for food waste reduction</li>
    <li>Akshaya Patra Fundraiser - Raised funds to provide 45,000+ meals for children in rural India</li>
    <li>Published research on Brain-Computer Interfaces (mentored by Dr. Bruce Campbell, Brown University)</li>
    <li>Offered part-time position at Constellation Energy following successful internship</li>
</ul>
        `;
        this.addOutput(educationText);
    }
    
    showAccomplishments() {
        const accomplishmentsText = `
<h2>Accomplishments & Achievements</h2>

<h3>🏆 Competition & Awards:</h3>
<ul>
    <li><span class="project-title">Oak Codefest Runner-Up</span> - Created a Machine Learning project to reduce food waste</li>
    <li><span class="project-title">Published Research</span> - Brain-Computer Interfaces research paper (mentored by Dr. Bruce Campbell, Brown University)</li>
</ul>

<h3>🌟 Community Impact:</h3>
<ul>
    <li><span class="project-title">Akshaya Patra Fundraiser</span> - Raised funds to provide 45,000+ meals for children in rural India</li>
    <li><span class="project-title">Campus Photography</span> - Boosted website engagement by 25% as Staff Photographer at Onward State</li>
</ul>

<h3>💼 Professional Recognition:</h3>
<ul>
    <li><span class="project-title">Extended Internship</span> - Offered part-time position at Constellation Energy post-summer internship</li>
    <li><span class="project-title">High Performance</span> - 95% first-contact resolution rate as IT Support Specialist</li>
    <li><span class="project-title">Published App</span> - InsuPred app successfully launched on Google Play Store</li>
</ul>

<h3>📜 Professional Certifications:</h3>
<ul>
    <li>Oracle Java Certified Foundations Associate</li>
    <li>AWS Certified Cloud Practitioner</li>
    <li>Microsoft Azure Fundamentals</li>
    <li>Microsoft Azure AI Engineer Associate</li>
    <li>TensorFlow in Practice Professional Certificate (In Progress)</li>
</ul>

<h3>🎯 Academic Excellence:</h3>
<ul>
    <li><span class="project-title">GPA:</span> 3.71 at The Pennsylvania State University</li>
    <li><span class="project-title">Expected Graduation:</span> May 2025 - Bachelor of Science in Computer Science</li>
</ul>
        `;
        this.addOutput(accomplishmentsText);
    }
    
    showContact() {
        const contactText = `
<h2>Contact Information</h2>

<h3>📧 Get In Touch:</h3>
<ul>
    <li><span class="skill-category">Email:</span> <span class="contact-hidden" data-copy="kulkarni.samarth@yahoo.com"><span class="hidden-content">kulkarni.samarth@yahoo.com</span></span></li>
    <li><span class="skill-category">Phone:</span> <span class="contact-hidden" data-copy="(814) 441-0547"><span class="hidden-content">(814) 441-0547</span></span></li>
    <li><span class="skill-category">LinkedIn:</span> <span class="highlight">linkedin.com/in/samarthkuls/</span></li>
    <li><span class="skill-category">GitHub:</span> <span class="highlight">github.com/SamarthK1239</span></li>
    <li><span class="skill-category">Location:</span> <span class="highlight">Chicago, IL</span></li>
</ul>

<h3>💼 Professional Status:</h3>
<ul>
    <li><span class="skill-category">Current Role:</span> Software/DevSecOps Intern at Constellation Energy</li>
    <li><span class="skill-category">Academic Status:</span> Senior at Penn State (Graduating May 2025)</li>
    <li><span class="skill-category">Open for:</span> Full-time opportunities, internships, collaboration</li>
    <li><span class="skill-category">Availability:</span> Part-time during academic year, full-time after May 2025</li>
</ul>

<h3>🤝 Let's Connect:</h3>
<p>I'm always interested in discussing new technologies, AI/ML projects, cloud computing, or potential opportunities!</p>
<p>Feel free to reach out via email or connect with me on LinkedIn. Check out my projects on GitHub!</p>

<h3>🏆 Quick Facts:</h3>
<ul>
    <li>Multiple cloud certifications (AWS, Azure)</li>
    <li>Published research in Brain-Computer Interfaces</li>
    <li>Oak Codefest Runner-Up</li>
    <li>Active in community service and fundraising</li>
</ul>
        `;
        this.addOutput(contactText);
        
        // Add click-to-copy functionality after the content is added
        setTimeout(() => {
            this.addCopyListeners();
        }, 100);
    }
    
    showResume() {
        const resumeText = `
<h2>Resume Information</h2>
<p>📄 <span class="project-title">Samarth Kulkarni - Resume Highlights</span></p>
<p><span class="project-tech">Last Updated: January 2025</span></p>

<h3>📊 Quick Stats:</h3>
<ul>
    <li><span class="skill-category">GPA:</span> 3.71 at Penn State</li>
    <li><span class="skill-category">Graduation:</span> May 2025</li>
    <li><span class="skill-category">Certifications:</span> 4+ Professional Certifications</li>
    <li><span class="skill-category">Experience:</span> Current DevSecOps Intern</li>
</ul>

<p>💡 <span class="highlight">Note:</span> This terminal portfolio contains all my resume information!</p>
<p>Use commands like <span class="highlight">'experience'</span>, <span class="highlight">'education'</span>, and <span class="highlight">'skills'</span> to explore.</p>
<p>For a traditional format, contact me at <span class="highlight">kulkarni.samarth@yahoo.com</span></p>
        `;
        this.addOutput(resumeText);
    }
    
    showWhoami() {
        const whoamiText = `
<h2>Current User Information</h2>
<p><span class="skill-category">User:</span> visitor</p>
<p><span class="skill-category">Host:</span> samarth-kulkarni-portfolio</p>
<p><span class="skill-category">Owner:</span> Samarth Kulkarni</p>
<p><span class="skill-category">Shell:</span> WebTerminal v1.0</p>
<p><span class="skill-category">Directory:</span> /home/samarth/portfolio</p>
<p><span class="skill-category">Session:</span> Interactive Portfolio Browser</p>
<p><span class="skill-category">Location:</span> Chicago, IL</p>
<p><span class="skill-category">Status:</span> Computer Science Graduate & DevSecOps Analyst</p>
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
    <li>📁 experience.log</li>
    <li>📁 education.txt</li>
    <li>📁 accomplishments.txt</li>
    <li>📁 blogs/</li>
    <li>📁 contact.info</li>
    <li>📁 resume.pdf</li>
</ul>
<p>Use command names to explore each section (e.g., 'about', 'skills', 'accomplishments')</p>
        `;
        this.addOutput(lsText);
    }
    
    showPwd() {
        this.addOutput('/home/samarth/portfolio-terminal', 'output-text');
    }
    
    catCommand(args) {
        if (args.length === 0) {
            this.addOutput('Usage: cat <filename>\nAvailable files: about.md, skills.json, contact.info, accomplishments.txt', 'warning');
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
            case 'accomplishments.txt':
                this.showAccomplishments();
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
    
    addCopyListeners() {
        const copyElements = document.querySelectorAll('.contact-hidden[data-copy]');
        copyElements.forEach(element => {
            element.addEventListener('click', async (e) => {
                const textToCopy = element.getAttribute('data-copy');
                
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    
                    // Visual feedback
                    element.classList.add('contact-copied');
                    element.classList.remove('contact-hidden');
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        element.classList.remove('contact-copied');
                        element.classList.add('contact-hidden');
                    }, 2000);
                    
                } catch (err) {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    textArea.style.top = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    
                    try {
                        document.execCommand('copy');
                        
                        // Visual feedback
                        element.classList.add('contact-copied');
                        element.classList.remove('contact-hidden');
                        
                        // Reset after 2 seconds
                        setTimeout(() => {
                            element.classList.remove('contact-copied');
                            element.classList.add('contact-hidden');
                        }, 2000);
                        
                    } catch (fallbackErr) {
                        console.error('Copy failed:', fallbackErr);
                    }
                    
                    document.body.removeChild(textArea);
                }
            });
        });
    }
    
    clearTerminal() {
        this.output.innerHTML = '';
    }
}

// Initialize terminal when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});
