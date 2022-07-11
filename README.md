# ⚙ Motor

### A no-frills finite state machine module.

<br/>

[![Deno CI](https://github.com/sidiousvic/motor/workflows/Deno%20CI/badge.svg)](https://github.com/sidiousvic/motor/actions)
[![GitHub](https://img.shields.io/github/license/sidiousvic/motor)](https://github.com/sidiousvic/motor/blob/prod/LICENSE)
[![Contributors](https://img.shields.io/github/contributors/sidiousvic/motor)](https://github.com/sidiousvic/motor/graphs/contributors)
[![TypeScript](https://img.shields.io/badge/types-TypeScript-blue)](https://github.com/sidiousvic/motor)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

<br/>
<img src="./assets/MOTOR_FSM_TOGGLE_DIAGRAM.png">
<br/>

## Start the motor

```ts
import { motor } from "https://deno.land/x/motor@0.0/mod.ts";

type Gears = "stopped" | "paused" | "playing" | "loading";

type Events = "SELECT" | "LOAD" | "PLAY" | "PAUSE" | "STOP";

const musicPlayerMotor: MotorSpec<Gears, Events> = {
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

const { fire, gear } = motor(musicPlayer);

✅ assertEquals(gear(), "stopped");

fire("LOAD");

✅ assertEquals(gear(), "loading");

fire("PLAY");

✅ assertEquals(gear(), "playing");

fire("PAUSE");

✅ assertEquals(gear(), "paused");

fire("STOP");

✅ assertEquals(gear(), "stopped");
```

## Hook to changes in state

```ts
let counter = 0;

const count = () => (counter += 1);

const { fire, gear, hook } = motor(musicPlayerMotor);

✅ assertEquals(gear(), "stopped");

hook(count);

fire("LOAD");

✅ assertEquals(counter, 1);

fire("PLAY");

✅ assertEquals(counter, 2);

fire("STOP");

✅ assertEquals(counter, 3);
```

### 🧰 Development

Run tests:

```bash
deno test --allow-read
```

## 📄 License

MIT
