// /* eslint-disable no-undef */
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import path from 'path';
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//     plugins: [react(), tailwindcss()],
//     resolve: {
//         alias: {
//             '~': path.resolve(process.cwd(), 'src'),
//         },
//     },
//     server: {
//         port: 9999,
//     },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src'),
        },
    },
    server: {
        port: 9999,
    },
});
