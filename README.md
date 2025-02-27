# ESLint Plugin Safeguard

A custom ESLint plugin that provides multiple rules to enforce best practices and code safety.

## 🚀 Features

- Ensures `await` expressions are inside `try-catch` blocks.
- Helps enforce best practices for asynchronous error handling.
- Expandable with additional safety rules in the future.

## 📦 Installation

Install the plugin using `pnpm`, `npm`, or `yarn`:

```sh
pnpm add -D eslint-plugin-safeguard
# or
npm install --save-dev eslint-plugin-safeguard
# or
yarn add -D eslint-plugin-safeguard
```

## 🛠 Available Rules

### 🔹 [trycatch-ensurer](/docs/rules/trycatch-ensurer.md)

### 🔹 [no-raw-error](/docs/rules/no-raw-error.md)

### 🔹 [consistent-import-name](/docs/rules/consistent-import-name.md)

## 📝 Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue at [GitHub Issues](https://github.com/estarlincito/eslint-plugin-safeguard/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Author:** Estarlin R ([estarlincito.com](https://estarlincito.com))
