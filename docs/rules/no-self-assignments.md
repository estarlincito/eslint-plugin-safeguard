# ESLint Rule: No Self Assignments

## 📌 Features

- Prevents **self-assignment**, e.g., `obj.prop = obj.prop`.
- Detects **self-spreading in arrays**, e.g., `array.push(...array)`.
- Helps catch logical mistakes and improve code quality.

## 🚀 Installation

1. Install the plugin using `pnpm`, `npm`, or `yarn`:

```sh
pnpm add -D eslint-plugin-safeguard
# or
npm install --save-dev eslint-plugin-safeguard
# or
yarn add -D eslint-plugin-safeguard
```

2. Add the rule to your ESLint configuration (`eslint.config.js`):

```js
import safeguard from 'eslint-plugin-safeguard';
```

```js
{
  plugins: {
    safeguard,
  },

  "rules": {
    "safeguard/no-self-assignments": "error"
  }
}
```

## ⚡ Usage

### ❌ Incorrect Code

```ts
const obj = { a: '' };
obj.a = obj.a; // ❌ Self-assignment does nothing

const arr = [];
arr.push(...arr); // ❌ Spreading itself into push is redundant
```

### ✅ Correct Code

```ts
const obj = { a: '' };
obj.a = 'new value'; // ✅ Assigns a meaningful value

const arr = [1, 2, 3];
arr.push(4); // ✅ Pushes a new element
```

## 🛠 How It Works

- **Checks assignments (`=`)**: If `obj.prop = obj.prop` is detected, it reports an error.
- **Checks method calls (`.push()` with self-spreading)**: If `array.push(...array)` is detected, it reports an error.
- **Ignores computed properties (`obj[key] = obj[key]`)** to avoid false positives.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

---

**Author:** Estarlin R ([estarlincito.com](https://estarlincito.com))
