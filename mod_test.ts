import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { motor, MotorSpec } from "./mod.ts";

type Gears = "stopped" | "paused" | "playing" | "playing.skipping" | "loading";

type Events =
  | "SELECT"
  | "LOAD"
  | "PLAY"
  | "PAUSE"
  | "STOP"
  | "SKIP_START"
  | "SKIP_END";

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
      on: { PAUSE: "paused", STOP: "stopped", SKIP_START: "playing.skipping" },
    },
    "playing.skipping": {
      on: { SKIP_END: "playing" },
    },
  },
};

Deno.test("Transitions correctly between states", () => {
  const { fire, gear } = motor(musicPlayerMotor);
  assertEquals(gear(), "stopped");

  fire("LOAD");

  assertEquals(gear(), "loading");

  fire("PLAY");

  assertEquals(gear(), "playing");

  fire("PAUSE");

  assertEquals(gear(), "paused");

  fire("STOP");

  assertEquals(gear(), "stopped");
});

Deno.test("Calls hooked functions to changes in gear", () => {
  let counter = 0;

  const count = () => (counter += 1);

  const { fire, gear, hook } = motor(musicPlayerMotor);

  assertEquals(gear(), "stopped");

  hook(count);

  fire("LOAD");

  assertEquals(counter, 1);

  fire("PLAY");

  assertEquals(counter, 2);

  fire("STOP");

  assertEquals(counter, 3);
});

Deno.test("Should support heirarchical state nodes", () => {
  const { fire, gear, matches } = motor(musicPlayerMotor);

  fire("LOAD");

  assertEquals(gear(), "loading");

  fire("PLAY");

  assertEquals(gear(), "playing");

  fire("SKIP_START");

  assertEquals(matches("playing"), true);
  assertEquals(matches("playing.skipping"), true);
  assertEquals(matches("loading"), false);
});
