# ⚙ Motor

This is a starter template for building Deno packages in TypeScript, with GitHub Actions-powered CI, tests, CLI, and Semantic Release on GitHub and npm.

[![Deno CI](https://github.com/sidiousvic/motor/workflows/Deno%20CI/badge.svg)](https://github.com/sidiousvic/motor/actions)
[![GitHub](https://img.shields.io/github/license/sidiousvic/motor)](https://github.com/sidiousvic/motor/blob/master/LICENSE)
[![Contributors](https://img.shields.io/github/contributors/sidiousvic/motor)](https://github.com/sidiousvic/motor/graphs/contributors)
[![TypeScript](https://img.shields.io/badge/types-TypeScript-blue)](https://github.com/sidiousvic/motor)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Start the motor

```ts
import { motor } from "https://deno.land/x/motor@0.0/mod.ts";

type Gears = Keys<"stopped" | "paused" | "playing" | "loading">;

type Events = Keys<"SELECT" | "LOAD" | "PLAY" | "PAUSE" | "STOP">;

const musicPlayer: MotorSpec<Gears, Events> = {
  gear: "stopped",
  transmission: {
    stopped: {
      on: { LOAD: "loading" },
    },
    paused: {
      on: { PLAY: "playing", STOP: "stopped" },
    },
    loading: {
      on: { PLAY: "playing", STOP: "stopped" },
    },
    playing: {
      on: { PAUSE: "paused", STOP: "stopped" },
    },
  },
};
```

## Development

Run tests:

```bash
deno test --allow-read
```

## 📄 License

MIT
