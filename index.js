import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import commandLineArgs from 'command-line-args';

const cliArgsDefinition = [
    { name: 'width', alias: 'w', type: Number },
    { name: 'height', alias: 'h', type: Number }
];
const { width: MAX_WIDTH, height: MAX_HEIGHT } = commandLineArgs(cliArgsDefinition);


const files = fs.readdirSync()