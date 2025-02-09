# ESLint Rule No Raw Error

This is an ESLint rule that ensures `Error` and `error` constructors are not used directly, enforcing the use of custom error classes for better error handling and debugging.

## 📌 Features

- Detects usage of `new Error()` and `new error()`.
- Reports an error when `throw new Error()` or `throw new error()` is used.
- Enforces the use of structured custom error classes like `AppError`.
- Helps enforce best practices for structured error handling.

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
import noRawError from 'eslint-plugin-safeguard';
```

```js
{
  plugins: {
    noRawError,
  },

  "rules": {
    "safeguard/no-raw-error": "error"
  }
}
```

## ⚡ Usage

This rule enforces that `Error` or `error` constructors are not used directly. Instead, users must define and use a custom error class.

### ❌ Incorrect Code

```js
throw new Error('Something went wrong');

const err = new error('This should not be used');
```

### ✅ Correct Code

```js
class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

const handleError = (message: string, code?: string): never => {
  throw new AppError(message, code);
};

export default handleError;
//Usage
handleError('Something went wrong', 'SOME_ERROR_CODE');
```

## 🛠 How It Works

- The rule checks for `new Error()` and `new error()` usage.
- If found, ESLint will report an error.
- Encourages using `AppError` or other structured custom error classes for more descriptive error handling.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

---

**Author:** Estarlin R ([estarlincito.com](https://estarlincito.com))
