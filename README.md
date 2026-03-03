# `@hoonoh/eslint-config`

opinionated eslint configurations.

## esm

requires esm

## usage

### args

```js
getConfig({
  args: {
    turbo: {
      // list of undeclared env vars to allow
      noUndeclaredEnvVarsAllowList: ['FOO', 'BAR'],
    },
  },
});
```

### common

```js
// eslint.config.js
import { getConfig } from '@hoonoh/eslint-config';

export default getConfig();
```

### next.js

```js
// eslint.config.js
import { getNextJsConfig } from '@hoonoh/eslint-config/next-js';

export default getNextJsConfig();
```

### react-internals

configuration for libraries that use React

```js
// eslint.config.js
import { getReactInternalConfig } from '@hoonoh/eslint-config/react-internal';

export default getReactInternalConfig();
```

## jest

```js
// eslint.config.js
import globals from 'globals';

import { getConfig } from '@hoonoh/eslint-config';

export default [
  ...getConfig(),
  {
    files: ['**/*.spec.ts'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
```
