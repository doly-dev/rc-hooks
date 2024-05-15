import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const globalVarName = 'rcHooks';

export default {
  input: './src/index.ts',
  external: ['react'],
  output: [
    {
      file: `dist/${globalVarName}.js`,
      format: 'umd',
      name: globalVarName,
      globals: {
        react: 'React'
      },
      sourcemap: true
    },
    {
      file: `dist/${globalVarName}.min.js`,
      format: 'umd',
      name: globalVarName,
      globals: {
        react: 'React'
      },
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [resolve(), commonjs(), typescript({ tsconfig: 'tsconfig.build.json' })]
};
