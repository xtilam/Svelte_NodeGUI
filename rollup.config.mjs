import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { existsSync, readFileSync, rmSync } from 'fs';
import path from 'path';
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import css from "rollup-plugin-import-css"
import { viteExternalsPlugin } from 'vite-plugin-externals';
import native from 'rollup-plugin-natives'
import url from '@rollup/plugin-url';

const production = !process.env.ROLLUP_WATCH;
const typescriptConfig = getTsConfig()

function getTsConfig() {
    let typescriptConfig = eval('(' + readFileSync(path.join(process.cwd(), 'tsconfig.json'), 'utf-8') + ')');

    typescriptConfig.compilerOptions = {
        ...typescriptConfig.compilerOptions,
        sourceMap: !production,
        inlineSources: !production,
    }

    return typescriptConfig
}

const build = [
    {
        input: 'src/app.ts',
        output: {
            sourcemap: !production,
            format: 'esm',
            name: 'app',
            file: 'dist/main.js'
        },
        plugins: [

            native({
                copyTo: 'dist/libs',
                destDir: './libs',
            }),
            svelte({
                preprocess: sveltePreprocess({ sourceMap: !production }),
                compilerOptions: {
                    dev: !production
                }
            }),
            viteExternalsPlugin({
                ...[
                    'fs',
                    'path',
                ].reduce((acc, cur) => {
                    acc[cur] = `require("${cur}")`
                    return acc
                }, {}),
                ...{
                    '@nodegui/nodegui': '_node_gui'
                }
            }, { useWindow: false }),
            css({ output: 'dist/style.css' }),
            nodeResolve(),
            commonjs(),
            typescript(typescriptConfig),
            production && terser()
        ],
        watch: {
            clearScreen: false
        }
    },
];

// rmSync('dist/index.js')

if (!existsSync('dist/index.js') || production) build.push({
    input: 'src/lib.ts',
    output: {
        sourcemap: !production,
        format: 'esm',
        name: 'app',
        file: 'dist/index.js'
    },
    plugins: [
        native({
            copyTo: 'dist/libs',
            destDir: './libs',
        }),
        nodeResolve({ 
            browser: false,
            mainFields: [
                '@nodegui/nodegui',
                'postcss'
            ]
        }),
        commonjs(),
        typescript(typescriptConfig),
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
})
export default build