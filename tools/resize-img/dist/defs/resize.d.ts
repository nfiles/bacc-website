/// <reference types="sharp" />
/// <reference types="node" />
import * as sharp from 'sharp';
export declare const resizeImageFile: (maxWidth: number, maxHeight: number, out: string, file: string) => Promise<sharp.OutputInfo>;
export declare const resizeImageBuffer: (maxWidth: number, maxHeight: number, buffer: Buffer) => Promise<Buffer>;
