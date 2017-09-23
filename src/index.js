const commandLineArgs = require('command-line-args');
const fs = require('fs');
const path = require('path');

const { resizeImageBuffer, resizeImageFile } = require('./resize');

const cliArgsDefinition = [
    { name: 'width', alias: 'w', type: Number },
    { name: 'height', alias: 'h', type: Number },
    { name: 'in', alias: 'i', type: String },
    { name: 'out', alias: 'o', type: String },
    { name: 'stdio', type: Boolean, defaultValue: false },
    { name: 'verbose', alias: 'v', type: Boolean, defaultValue: false }
];

const {
    width: MAX_WIDTH,
    height: MAX_HEIGHT,
    in: IN_DIR,
    out: OUT_DIR,
    stdio,
    verbose
} = commandLineArgs(cliArgsDefinition);

if (stdio) {
    const chunks = [];
    process.stdin.on('data', (data) => {
        if (!data) { return; }

        if (Buffer.isBuffer(data)) {
            chunks.push(data);
        } else {
            console.error('unexpected data type from stdin');
        }
    });
    process.stdin.on('end', () => {
        const image = Buffer.concat(chunks);
        resizeImageBuffer(MAX_WIDTH, MAX_HEIGHT, OUT_DIR)(image)
            .then(buffer => process.stdout.write(buffer))
            .catch(err => console.error(err));
    });
} else {
    if (fs.existsSync(OUT_DIR)) {
        if (!fs.statSync(OUT_DIR).isDirectory) {
            console.error(`--out must be a directory: '${OUT_DIR}'`);
            return;
        }
    } else {
        fs.mkdirSync(OUT_DIR);
    }

    if (!fs.existsSync(IN_DIR) || !fs.statSync(IN_DIR).isDirectory()) {
        console.error('--in must be a valid directory')
        return;
    }

    const files = fs.readdirSync(IN_DIR)
        .map(file => path.join(IN_DIR, file))
        .filter(file => fs.statSync(file).isFile())
        .map(file => {
            if (verbose) {
                console.log(` * Resizing: ${file}`);
            }
            return resizeImageFile(MAX_WIDTH, MAX_HEIGHT, OUT_DIR)(file);
        });

    Promise.all(files)
        .catch(err => console.error(err));
}
