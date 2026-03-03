import pluginNext from '@next/eslint-plugin-next';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import { getConfig } from './base.js';

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import('./base.js').getConfig}
 * */
export const getNextJsConfig = args => {
  const config = [
    ...getConfig(args),

    {
      ...pluginReact.configs.flat.recommended,
      languageOptions: {
        ...pluginReact.configs.flat.recommended.languageOptions,
        globals: {
          ...globals.serviceworker,
        },
      },
    },
    {
      plugins: {
        '@next/next': pluginNext,
      },
      rules: {
        ...pluginNext.configs.recommended.rules,
        ...pluginNext.configs['core-web-vitals'].rules,
      },
    },
    {
      plugins: {
        'react-hooks': pluginReactHooks,
      },
      settings: { react: { version: 'detect' } },
      rules: {
        ...pluginReactHooks.configs.recommended.rules,
        // React scope no longer necessary with new JSX transform.
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
      },
    },
    {
      ignores: ['**/.next', 'next-env.d.ts'],
    },
  ];
  return config;
};
