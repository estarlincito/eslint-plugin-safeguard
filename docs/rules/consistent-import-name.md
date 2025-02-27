# ESLint Rule Consistent Import Name

This is an ESLint rule that ensures imported names match the original exported names, preventing inconsistencies and enforcing best practices in module imports.

## 📌 Features

• Detects renamed imports and enforces original names.
• Reports an error when a default import does not match the original exported name.
• Prevents unnecessary renaming of named imports.
• Helps maintain consistent and readable import statements.

## 🚀 Installation

1. Install the plugin using `pnpm`, `npm`, or `yarn`:

```sh
pnpm add -D eslint-plugin-safeguard
# or
npm install --save-dev eslint-plugin-safeguard
# or
yarn add -D eslint-plugin-safeguard
```

2. Add the rule to your ESLint configuration (eslint.config.js):

import safeguard from 'eslint-plugin-safeguard';

```json
{
plugins: {
safeguard,
},

"rules": {
"safeguard/consistent-import-name": "error"
}
}
```

## ⚡ Usage

This rule enforces that import names must match their original exported names to improve code clarity and maintainability.

## ❌ Incorrect Code

```tsx
import myFunc from './utils'; // 'myFunc' does not match the exported name

import { fetchData as getData } from './api'; // Renaming import is not allowed
```

## ✅ Correct Code

```tsx
import fetchData from './api'; // Matches the exported name

import helperFunction from './utils'; // Matches the exported name
```

## 🛠 How It Works

• The rule analyzes import declarations and verifies them against the original exported names.
• If an imported name does not match its export, ESLint reports an error.
• Ensures consistency in naming imports, reducing confusion and improving maintainability.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

**Author:** Estarlin R ([estarlincito.com](https://estarlincito.com))
