import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,   // 👈 add this
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    // 👇 reduce noise here
    rules: {
      'react/react-in-jsx-scope': 'off',
  'no-unused-vars': 'warn',
  // Disable overly strict React rules
  'react-hooks/set-state-in-effect': 'off',
  'react/prop-types': 'off',
  'react-refresh/only-export-components': 'off',
      // 🔥 biggest noise maker
      'react-hooks/exhaustive-deps': 'warn',

      // React 17+ doesn’t need this
      'react/react-in-jsx-scope': 'off',
    },
  },
])