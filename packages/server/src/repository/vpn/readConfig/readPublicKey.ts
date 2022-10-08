import { readFile } from 'fs/promises';
import { resolve } from 'path';

const publicKeyPath = resolve(__dirname, '../../../../../../publickey');

export const readPublicKey = async () =>
    (await readFile(publicKeyPath)).toString();
