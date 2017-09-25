"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const sharp = require("sharp");
exports.resizeImageFile = (maxWidth, maxHeight, out, file) => {
    const ext = path.extname(file);
    const name = path.basename(file, ext);
    const outFile = path.join(out, name + ext);
    // remove the leading '.' from the extension
    let format = ext.slice(1).toLowerCase();
    if (format === 'jpg') {
        format = 'jpeg';
    }
    if (!sharp.format[format]) {
        return Promise.reject(`Invalid extension: '${format}'`);
    }
    return sharp(file)
        .resize(maxWidth, maxHeight)
        .max()
        .withoutEnlargement()
        .toFormat(format)
        .toFile(outFile);
};
exports.resizeImageBuffer = (maxWidth, maxHeight, buffer) => {
    if (!Buffer.isBuffer(buffer)) {
        return Promise.reject('Not a Buffer');
    }
    return sharp(buffer)
        .resize(maxWidth, maxHeight)
        .max()
        .withoutEnlargement()
        .toFormat(sharp.format.jpeg)
        .toBuffer();
};
//# sourceMappingURL=resize.js.map