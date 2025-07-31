# CLI Website Portfolio

A command-line interface style portfolio website for computer scientists and programmers. This interactive terminal allows visitors to explore your professional information using familiar CLI commands.

## Features

- **Interactive Terminal Interface**: Authentic terminal look and feel with blinking cursor and command history
- **Command System**: Navigate through different sections using commands like `help`, `about`, `skills`, etc.
- **Command History**: Use arrow keys to navigate through previously entered commands
- **Auto-completion**: Press Tab to auto-complete commands
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Professional Styling**: Dark terminal theme with syntax highlighting

## Available Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Learn about the developer |
| `skills` | View technical skills and expertise |
| `projects` | See featured projects |
| `blogs --view` | Read blog posts |
| `experience` | View work experience |
| `education` | See educational background |
| `contact` | Get contact information |
| `resume` | Download resume (placeholder) |
| `clear` | Clear the terminal screen |
| `whoami` | Display current user info |
| `ls` | List available sections |
| `pwd` | Show current directory |
| `cat <file>` | Display file contents |
| `echo <text>` | Display text |

## Usage

1. Open `index.html` in a web browser
2. Type commands in the terminal input
3. Use Tab for auto-completion
4. Use ↑↓ arrow keys for command history
5. Type `help` to see all available commands

## Customization

### Updating Content

All content is stored in the `script.js` file within the command methods. To customize:

1. **Personal Information**: Update the methods like `showAbout()`, `showContact()`, etc.
2. **Skills**: Modify the `showSkills()` method with your technical skills
3. **Projects**: Update `showProjects()` with your actual projects
4. **Experience**: Customize `showExperience()` with your work history

### Styling

The terminal appearance can be customized in `styles.css`:

- **Colors**: Modify CSS color variables for different themes
- **Fonts**: Change the font family (currently using JetBrains Mono)
- **Layout**: Adjust terminal size and positioning
- **Animations**: Customize cursor blinking and other effects

### Adding New Commands

To add new commands:

1. Add the command to the `commands` object in the constructor
2. Create a new method to handle the command
3. Update the help text in `showHelp()` method

```javascript
// Example: Adding a new command
this.commands['newcommand'] = this.handleNewCommand.bind(this);

handleNewCommand() {
    const content = `<h2>New Command</h2><p>Your content here</p>`;
    this.addOutput(content);
}
```

## Technologies Used

- **HTML5**: Semantic structure and accessibility
- **CSS3**: Styling with animations and responsive design
- **JavaScript ES6+**: Interactive functionality and command handling
- **Google Fonts**: JetBrains Mono for authentic monospace terminal feel

## Browser Support

- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

Feel free to use this template for your own portfolio website. Customize it to match your personal brand and professional experience.

## Future Enhancements

- File system simulation with directory navigation
- Command flags and parameters support
- Syntax highlighting for code examples
- Integration with GitHub API for dynamic project data
- Multi-theme support (different terminal color schemes)
- Command aliases and custom shortcuts
- ASCII art animations and loading effects
