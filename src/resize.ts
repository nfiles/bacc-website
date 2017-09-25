import * as path from 'path';
import * as sharp from 'sharp';

export const resizeImageFile = (
    maxWidth: number,
    maxHeight: number,
    out: string,
    file: string
): Promise<sharp.OutputInfo> => {
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

export const resizeImageBuffer = (
    maxWidth: number,
    maxHeight: number,
    buffer: Buffer
): Promise<Buffer> => {
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
