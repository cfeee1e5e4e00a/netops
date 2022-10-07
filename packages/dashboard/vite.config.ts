import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import preact from '@preact/preset-vite';

export default defineConfig({
    plugins: [preact()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        host: '10.0.0.2',
        port: 3000,
    },
});
