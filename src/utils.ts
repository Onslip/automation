import { execFile as _execFile } from 'child_process';
import { writeFile as _writeFile } from 'fs';
import { pipeline as _pipeline } from 'stream';
import { promisify } from 'util';

export const execFile = promisify(_execFile);
export const pipeline = promisify(_pipeline);
export const writeFile = promisify(_writeFile);

export function throwError(error: Error): never {
    throw error;
}

export function sleep(timeout: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}

