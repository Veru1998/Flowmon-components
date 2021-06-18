import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import postcssCopy from 'postcss-copy';
import autoprefixer from 'autoprefixer';

export default {
    input: pkg.source,
    output: [
        { file: pkg.main, format: 'cjs', sourcemap: true },
        { file: pkg.module, format: 'esm', sourcemap: true }
    ],
    plugins: [
        external(),
        nodeResolve(),
        babel({
            exclude: 
            [
                'node_modules/**',
                'src/*/*.stories.(js|jsx|ts|tsx)'
            ],
            babelHelpers: 'runtime',
        }),
        postcss({
            extract: true,
            plugins: [postcssCopy({ dest: 'dist' }), autoprefixer()],
            minimize: true,
            sourceMap: true,
            modules: false,
            extensions: ['.sass', '.css', '.scss']
        }),
        json({ compact: true }),
        del({ targets: ['dist/*'] }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
};