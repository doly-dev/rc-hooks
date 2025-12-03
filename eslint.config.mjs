import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig(
  {
    ignores: ['.dumi', 'site/', 'dist/', 'lib/', 'es/', 'coverage/']
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-refresh': reactRefresh,
      'react-hooks': reactHooks
    },
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      'prefer-spread': 0,
      ...reactHooks.configs.recommended.rules

      // '@typescript-eslint/explicit-function-return-type': 0,
      // '@typescript-eslint/explicit-module-boundary-types': 0,
      // '@typescript-eslint/no-empty-function': 0,
    }
  }
);
