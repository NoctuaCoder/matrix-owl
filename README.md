# 🦉 Matrix Owl Terminal

An interactive cyberpunk terminal experience with matrix rain effects, multiple themes, and easter eggs.

[![Live Demo](https://img.shields.io/badge/demo-live-00FFFF?style=for-the-badge)](https://noctuacoder.github.io/matrix-owl/)
[![GitHub](https://img.shields.io/badge/github-NoctuaCoder-00BFFF?style=for-the-badge&logo=github)](https://github.com/NoctuaCoder)

## 🌟 Features

### 💻 Interactive CLI
Type commands like `help`, `whoami`, `projects`, `neofetch`, and more. Full command history with ↑↓ navigation.

### 🎨 Dynamic Themes
Switch between 6 beautiful themes:
- **Matrix** - Classic cyan cyberpunk
- **Dark Purple** - Material Design inspired
- **Light Mode** - For daytime coding
- **Cyberpunk** - Neon pink and yellow
- **Ocean** - Deep blue aesthetics
- **Sunset** - Warm purple and orange

### 🌊 Matrix Rain Animation
Custom canvas animation with "digital rain" effects that sync with your theme.

### 🔊 Sound System
- Mechanical keyboard typing sounds
- Success/error audio feedback
- Ambient drone (optional)
- Volume control (0-100)

### ✨ Animations
- Auto-typing boot sequence
- Glitch effects on title
- Smooth theme transitions
- Rainbow text effects
- Pulse animations

### 🥚 Easter Eggs
Try finding secret commands! Hints: `owl`, `sudo`, `hack`, `matrix [color]`

### 📱 Fully Responsive
Optimized for desktop, tablet, and mobile devices with touch-friendly controls.

## 🚀 Quick Start

### Try it Online
👉 **[Launch Terminal](https://noctuacoder.github.io/matrix-owl/)**

### Run Locally
```bash
git clone https://github.com/NoctuaCoder/matrix-owl.git
cd matrix-owl
python3 -m http.server 8000
# Visit http://localhost:8000
```

## ⌨️ Available Commands

### Navigation & Files
```bash
help              # Show all commands
ls                # List files
cat [file]        # Read a file
cd [dir]          # Change directory
pwd               # Print working directory
clear             # Clear terminal
history           # Show command history
```

### Information
```bash
whoami            # About the user
about             # Detailed bio with ASCII art
projects          # List featured projects
neofetch          # System information
date              # Current date/time
```

### Customization
```bash
theme list        # List available themes
theme [name]      # Apply a theme
theme random      # Random theme

sound on/off      # Toggle sounds
sound volume [N]  # Set volume (0-100)
sound ambient on  # Enable ambient sound
```

### Special
```bash
exit              # Return to portfolio
owl               # 🦉 Easter egg
sudo [cmd]        # Try it and see...
hack              # Hacking simulation
matrix [color]    # Change matrix rain color
```

## 🛠️ Tech Stack

- **HTML5** - Canvas API for matrix rain
- **CSS3** - Custom properties for theming, animations, flexbox
- **JavaScript (ES6+)** - Modular architecture
- **Web Audio API** - Dynamic sound generation
- **localStorage** - Configuration persistence

## 📁 Project Structure

```
matrix-owl/
├── index.html       # Main HTML structure
├── style.css        # Responsive styles with CSS variables
├── script.js        # Command system and terminal logic
├── themes.js        # Theme definitions and switching
├── config.js        # Configuration and localStorage
├── animations.js    # Animation effects
├── audio.js         # Web Audio API integration
├── matrix.js        # Matrix rain canvas effect
└── README.md        # This file
```

## 🎯 Key Features Explained

### Theme System
Themes use CSS custom properties for instant switching. All colors, shadows, and glows update dynamically.

### Command History
Navigate previous commands with ↑ and ↓ arrow keys. History persists across sessions.

### Sound System
Uses Web Audio API for synthesized sounds (beeps, boops) and HTML5 Audio for typing effects.

### Responsive Design
Media queries optimize the experience for:
- Desktop (1920px+)
- Laptop (1366px)
- Tablet (768px)
- Mobile (480px)
- Mobile landscape

## 🤝 Contributing

Feel free to fork and add your own commands or themes!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💡 Ideas for Expansion

- [ ] Blog system (`blog list`, `blog read [id]`)
- [ ] GitHub API integration for live stats
- [ ] Custom theme creator
- [ ] More easter eggs
- [ ] Tab completion
- [ ] Command aliases
- [ ] Export terminal session

## 📜 License

This project is open source and available under the MIT License.

## 🦉 About NoctuaCoder

Digital Alchemist crafting celestial web experiences.

- 🐙 GitHub: [@NoctuaCoder](https://github.com/NoctuaCoder)
- 🌐 Portfolio: [noctuacoder.github.io](https://noctuacoder.github.io)
- ✨ Motto: *"Code by night, create by instinct"*

---

<div align="center">

**Made with 🦉 by NoctuaCoder**

*Beauty in every byte*

</div>
