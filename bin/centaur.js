#!/usr/bin/env node

/**
 * CENTAUR LANG CLI
 * 
 * @centaur-generated false
 * @human Chris Conen - vision
 * @ai Claude - implementation
 * @version 0.1.0
 * 
 * Command-line interface for the CENTAUR LANG compiler.
 * 
 * Usage:
 *   centaur compile <input.centaur> [output-dir]
 *   centaur init [project-name]
 *   centaur watch <directory>
 *   centaur --help
 *   centaur --version
 */

const fs = require('fs');
const path = require('path');
const CentaurCompiler = require('../compiler.js');

// ============================================================
// CLI COLORS & STYLING
// ============================================================

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    gold: '\x1b[33m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m'
};

const c = {
    gold: (text) => `${colors.gold}${text}${colors.reset}`,
    green: (text) => `${colors.green}${text}${colors.reset}`,
    red: (text) => `${colors.red}${text}${colors.reset}`,
    cyan: (text) => `${colors.cyan}${text}${colors.reset}`,
    dim: (text) => `${colors.dim}${text}${colors.reset}`,
    bright: (text) => `${colors.bright}${text}${colors.reset}`
};

// ============================================================
// ASCII ART LOGO
// ============================================================

const logo = `
${colors.gold}   _____ ______ _   _ _______       _    _ _____  
  / ____|  ____| \\ | |__   __|/\\   | |  | |  __ \\ 
 | |    | |__  |  \\| |  | |  /  \\  | |  | | |__) |
 | |    |  __| | . \` |  | | / /\\ \\ | |  | |  _  / 
 | |____| |____| |\\  |  | |/ ____ \\| |__| | | \\ \\ 
  \\_____|______|_| \\_|  |_/_/    \\_\\\\____/|_|  \\_\\
                                                   
  ${colors.reset}${colors.dim}L A N G${colors.reset}  ${colors.gold}v0.1.0${colors.reset}
  
  ${colors.dim}The Language of Human+AI Collaboration${colors.reset}
`;

// ============================================================
// HELP TEXT
// ============================================================

const helpText = `
${logo}

${c.bright('USAGE:')}

  ${c.gold('centaur')} ${c.cyan('<command>')} [options]

${c.bright('COMMANDS:')}

  ${c.cyan('compile')} <file> [output]   Compile a .centaur file
  ${c.cyan('init')} [name]               Initialize a new CENTAUR project
  ${c.cyan('watch')} <directory>         Watch directory and auto-compile
  ${c.cyan('help')}                      Show this help message
  ${c.cyan('version')}                   Show version number

${c.bright('EXAMPLES:')}

  ${c.dim('# Compile a single file')}
  ${c.gold('centaur compile')} ContactForm.centaur ./dist

  ${c.dim('# Initialize new project')}
  ${c.gold('centaur init')} my-website

  ${c.dim('# Watch for changes')}
  ${c.gold('centaur watch')} ./src

${c.bright('DOCUMENTATION:')}

  Website:  ${c.cyan('https://centaur-lang.dev')}
  GitHub:   ${c.cyan('https://github.com/centaur-lang/centaur-lang')}
  Spec:     ${c.cyan('See SPECIFICATION.md')}

${c.bright('CREATED BY:')}

  🧑 Chris Conen ${c.dim('(Human - Founder & Creative Director)')}
  🤖 Claude ${c.dim('(AI - Co-Founder & CTO)')}
  
  ${c.dim('Neither human alone, nor AI alone — but something greater together.')}
`;

// ============================================================
// VERSION
// ============================================================

const packageJson = require('../package.json');
const version = packageJson.version;

// ============================================================
// COMMANDS
// ============================================================

/**
 * Compile command
 */
function commandCompile(args) {
    const inputFile = args[0];
    const outputDir = args[1] || './dist';
    
    if (!inputFile) {
        console.error(c.red('Error: No input file specified.'));
        console.log(`\nUsage: ${c.gold('centaur compile')} <file.centaur> [output-dir]\n`);
        process.exit(1);
    }
    
    if (!fs.existsSync(inputFile)) {
        console.error(c.red(`Error: File not found: ${inputFile}`));
        process.exit(1);
    }
    
    if (!inputFile.endsWith('.centaur')) {
        console.warn(c.gold('Warning: File does not have .centaur extension.'));
    }
    
    console.log(logo);
    console.log(c.bright('Compiling...\n'));
    
    try {
        const source = fs.readFileSync(inputFile, 'utf-8');
        const compiler = new CentaurCompiler({
            humanAuthor: 'Chris Conen',
            aiAuthor: 'Claude',
            outputDir: outputDir
        });
        
        const result = compiler.compileToFiles(source, outputDir);
        
        console.log(`\n${c.green('✓')} Compilation successful!`);
        console.log(`\n${c.bright('Generated files:')}`);
        console.log(`  ${c.cyan('→')} ${path.join(outputDir, result.component + '.html')}`);
        console.log(`  ${c.cyan('→')} ${path.join(outputDir, result.component + '.css')}`);
        console.log(`  ${c.cyan('→')} ${path.join(outputDir, result.component + '.js')}`);
        console.log(`\n${c.dim('Open the HTML file in your browser to see the result.')}\n`);
        
    } catch (error) {
        console.error(c.red(`\nCompilation failed: ${error.message}`));
        process.exit(1);
    }
}

/**
 * Init command - create new project
 */
function commandInit(args) {
    const projectName = args[0] || 'centaur-project';
    
    console.log(logo);
    console.log(c.bright(`Initializing new CENTAUR project: ${c.gold(projectName)}\n`));
    
    // Create directory structure
    const dirs = [
        projectName,
        `${projectName}/src`,
        `${projectName}/dist`
    ];
    
    for (const dir of dirs) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`  ${c.green('✓')} Created ${c.cyan(dir + '/')}`);
        }
    }
    
    // Create example .centaur file
    const exampleCentaur = `// ${projectName} - Main Component
// Created with CENTAUR LANG

@component Main
@theme dark
@accent gold
@responsive true

{
  Create a welcome section with:
  
  Fields:
  - Name input (required, placeholder "Enter your name")
  - Email input (required, validate email format)
  
  Submit button:
  - Text: "Get Started"
  
  Behavior:
  - Validate on submit
  - On success: show "Welcome aboard!" toast
}
`;
    
    fs.writeFileSync(`${projectName}/src/Main.centaur`, exampleCentaur);
    console.log(`  ${c.green('✓')} Created ${c.cyan('src/Main.centaur')}`);
    
    // Create centaur.config.json
    const config = {
        name: projectName,
        version: '1.0.0',
        srcDir: './src',
        outputDir: './dist',
        theme: 'dark',
        accent: 'gold',
        author: {
            human: 'Your Name',
            ai: 'Claude'
        }
    };
    
    fs.writeFileSync(`${projectName}/centaur.config.json`, JSON.stringify(config, null, 2));
    console.log(`  ${c.green('✓')} Created ${c.cyan('centaur.config.json')}`);
    
    // Create README
    const readme = `# ${projectName}

Built with [CENTAUR LANG](https://centaur-lang.dev) — The Language of Human+AI Collaboration.

## Getting Started

\`\`\`bash
# Compile all .centaur files
centaur compile src/Main.centaur dist/

# Watch for changes
centaur watch src/
\`\`\`

## Project Structure

\`\`\`
${projectName}/
├── src/
│   └── Main.centaur      # Your CENTAUR source files
├── dist/                  # Compiled output
├── centaur.config.json    # Project configuration
└── README.md
\`\`\`

## Learn More

- [CENTAUR LANG Documentation](https://centaur-lang.dev)
- [GitHub Repository](https://github.com/centaur-lang/centaur-lang)

---

🐴 *Neither human alone, nor AI alone — but something greater together.*
`;
    
    fs.writeFileSync(`${projectName}/README.md`, readme);
    console.log(`  ${c.green('✓')} Created ${c.cyan('README.md')}`);
    
    console.log(`\n${c.green('✓')} Project initialized successfully!\n`);
    console.log(c.bright('Next steps:\n'));
    console.log(`  ${c.dim('1.')} cd ${c.cyan(projectName)}`);
    console.log(`  ${c.dim('2.')} ${c.gold('centaur compile')} src/Main.centaur dist/`);
    console.log(`  ${c.dim('3.')} Open ${c.cyan('dist/Main.html')} in your browser\n`);
}

/**
 * Watch command - watch directory for changes
 */
function commandWatch(args) {
    const watchDir = args[0] || './src';
    
    if (!fs.existsSync(watchDir)) {
        console.error(c.red(`Error: Directory not found: ${watchDir}`));
        process.exit(1);
    }
    
    console.log(logo);
    console.log(c.bright(`Watching for changes in: ${c.cyan(watchDir)}\n`));
    console.log(c.dim('Press Ctrl+C to stop.\n'));
    
    const compiler = new CentaurCompiler({
        humanAuthor: 'Chris Conen',
        aiAuthor: 'Claude'
    });
    
    // Watch for file changes
    fs.watch(watchDir, { recursive: true }, (eventType, filename) => {
        if (filename && filename.endsWith('.centaur')) {
            const filePath = path.join(watchDir, filename);
            const outputDir = './dist';
            
            console.log(`\n${c.gold('→')} Change detected: ${c.cyan(filename)}`);
            
            try {
                const source = fs.readFileSync(filePath, 'utf-8');
                compiler.compileToFiles(source, outputDir);
                console.log(`${c.green('✓')} Compiled successfully at ${new Date().toLocaleTimeString()}`);
            } catch (error) {
                console.error(c.red(`✗ Compilation failed: ${error.message}`));
            }
        }
    });
    
    // Keep process alive
    process.stdin.resume();
}

// ============================================================
// MAIN CLI LOGIC
// ============================================================

function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const commandArgs = args.slice(1);
    
    // Handle flags
    if (!command || command === 'help' || command === '--help' || command === '-h') {
        console.log(helpText);
        process.exit(0);
    }
    
    if (command === 'version' || command === '--version' || command === '-v') {
        console.log(`\n🐴 CENTAUR LANG v${version}\n`);
        process.exit(0);
    }
    
    // Handle commands
    switch (command) {
        case 'compile':
            commandCompile(commandArgs);
            break;
            
        case 'init':
            commandInit(commandArgs);
            break;
            
        case 'watch':
            commandWatch(commandArgs);
            break;
            
        default:
            console.error(c.red(`\nUnknown command: ${command}`));
            console.log(`\nRun ${c.gold('centaur --help')} for usage information.\n`);
            process.exit(1);
    }
}

// Run CLI
main();
