# ⚙**️** Motor

This is a starter template for building Deno packages in TypeScript, with GitHub Actions-powered CI, tests, CLI, and Semantic Release on GitHub and npm.

[![Deno CI](https://github.com/sidiousvic/motor/workflows/Deno%20CI/badge.svg)](https://github.com/sidiousvic/motor/actions)
[![GitHub](https://img.shields.io/github/license/sidiousvic/motor)](https://github.com/sidiousvic/motor/blob/master/LICENSE)
[![Contributors](https://img.shields.io/github/contributors/sidiousvic/motor)](https://github.com/sidiousvic/motor/graphs/contributors)
[![Deno Starter](https://img.shields.io/badge/deno-starter-brightgreen)](https://denorg.github.io/starter/)
[![Made by Denorg](https://img.shields.io/badge/made%20by-denorg-0082fb)](https://github.com/denorg)
[![TypeScript](https://img.shields.io/badge/types-TypeScript-blue)](https://github.com/sidiousvic/motor)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## 🔑 Start the motor

```ts
// Example here
```

### CLI with [DPX](https://github.com/denorg/dpx)

After [installing DPX](https://github.com/denorg/dpx), you can directly use the CLI using the `dpx` command:

```bash
dpx --allow-read starter <arguments>
```

### CLI

Alternatively, you can use it directly from the CLI by using `deno run`:

```bash
deno run --allow-read https://raw.githubusercontent.com/sidiousvic/motor/master/cli.ts <arguments>
```

You can also install it globally using the following:

```bash
deno install --allow-read -n starter https://raw.githubusercontent.com/sidiousvic/motor/master/cli.ts
```

Then, the package is available to run:

```bash
starter <arguments>
```

### Configuration

Required permissions:

1. `--allow-read`

## 👩‍💻 Development

Run tests:

```bash
deno test --allow-read
```

## 📄 License

MIT
