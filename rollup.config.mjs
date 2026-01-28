import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const globalVarName = 'rcHooks';

const commonConfig = {
  input: 'src/index.ts',
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
      removeComments: true
    })
  ]
};

export default [
  {
    ...commonConfig,
    output: [
      {
        format: 'cjs',
        dir: 'lib',
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named'
      },
      {
        format: 'es',
        dir: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named'
      }
    ],
    external: ['react', 'tslib', 'ut2', 'util-helpers', 'cache2']
  },
  {
    ...commonConfig,
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
    ]
  }
];
