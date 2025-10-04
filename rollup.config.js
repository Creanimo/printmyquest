import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from 'rollup-plugin-copy'

export default {
    input: "./src/app.js",
    output: [
        {
            file: "./dist/app.esm.js",
            format: "esm",
            sourcemap: true,
        },
    ],
    plugins: [
        nodeResolve({
            browser: true
        }),
        commonjs(),
        copy({
            targets: [
                { src: './src/index.html', dest: './dist/' },
                { src: './src/style.css', dest: './dist/'}
            ]
        })
    ],
};
