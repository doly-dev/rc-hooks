import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

function toCamel(str) {
  return str.replace(/-(.{1})/g, (m, p1) => {
    return /[a-z]/.test(p1) ? p1.toUpperCase() : p1;
  });
}

const globalVarName = toCamel(pkg.name);

export default {
  input: "./src/index.ts",
  external: ["react"],
  output: [
    {
      file: `dist/${globalVarName}.js`,
      format: "umd",
      name: globalVarName,
      globals: {
        react: "React"
      }
    },
    {
      file: `dist/${globalVarName}.min.js`,
      format: "umd",
      name: globalVarName,
      globals: {
        react: "React"
      },
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript()
  ]
}