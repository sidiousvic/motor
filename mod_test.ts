import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";
import { motor, MotorSpec } from "./mod.ts";

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
