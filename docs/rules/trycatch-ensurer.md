# ESLint Rule trycatch ensurer

This is an ESLint rule that ensures `await` expressions are inside `try-catch` blocks, helping to prevent unhandled promise rejections and improve code robustness.

## 📌 Features

- Detects `await` expressions that are not inside a `try-catch` block.
- Reports an error if an `await` is used without proper error handling.
- Helps enforce best practices for asynchronous error handling.

## 🚀 Installation

1. Install the plugin using `pnpm`, `npm`, or `yarn`:

```sh
pnpm add -D eslint-plugin-safeguard
# or
npm install --save-dev eslint-plugin-safeguard
# or
yarn add -D eslint-plugin-safeguard
```

2. Add the rule to your ESLint configuration(eslint.config.js):

```js
import safeguard from 'eslint-plugin-safeguard';
```

```js
{
  plugins: {
      safeguard,
  },

  "rules": {
    "safeguard/trycatch-ensurer": "error"
  }
}
```

## ⚡ Usage

This rule enforces that all `await` expressions are inside a `try-catch` block.

### ❌ Incorrect Code

```js
async function fetchData() {
  const data = await fetch('https://api.example.com');
  return data.json();
}
```

### ✅ Correct Code

```js
async function fetchData() {
  try {
    const data = await fetch('https://api.example.com');
    return data.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
```

## 🛠 How It Works

- The rule checks if an `await` expression appears inside a `try` block.
- If no `try-catch` block is found, ESLint will report an error.
- If a `try` block is found **but lacks a `catch` handler**, the rule will also trigger a warning.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

---

**Author:** Estarlin R ([estarlincito.com](https://estarlincito.com))
