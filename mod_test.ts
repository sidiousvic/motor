import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { motor, Keys, MotorSpec } from "./mod.ts";

type Gears = Keys<
  | "idle"
  | "song_selected"
  | "paused"
  | "playing"
  | "paused_skipping"
  | "playing_skipping"
  | "loading"
>;

type Events = Keys<
  "SELECT_SONG" | "LOAD" | "PLAY" | "PAUSE" | "STOP" | "SKIP_START" | "SKIP_END"
>;

const musicPlayerMotor: MotorSpec<Gears, Events> = {
  gear: "idle",
  transmission: {
    idle: { on: { SELECT_SONG: "song_selected" } },
    song_selected: { on: { LOAD: "loading" } },
    paused: {
      on: {
        PLAY: "playing",
        SELECT_SONG: "song_selected",
        STOP: "idle",
        SKIP_START: "paused_skipping",
      },
    },
    loading: {
      on: { PLAY: "playing", SELECT_SONG: "song_selected", STOP: "idle" },
    },
    playing: {
      on: {
        SKIP_START: "playing_skipping",
        PAUSE: "paused",
        SELECT_SONG: "song_selected",
        STOP: "idle",
      },
    },
    playing_skipping: { on: { SKIP_END: "playing" } },
    paused_skipping: { on: { SKIP_END: "paused" } },
  },
};

Deno.test("Transitions correctly between states", () => {
  const { fire, gear, hook } = motor(musicPlayerMotor);
  assertEquals(gear(), "idle");

  fire("SELECT_SONG");
  assertEquals(gear(), "song_selected");

  fire("LOAD");
  assertEquals(gear(), "loading");

  fire("PLAY");
  assertEquals(gear(), "playing");

  fire("PAUSE");
  assertEquals(gear(), "paused");

  fire("STOP");
  assertEquals(gear(), "idle");

  fire("SELECT_SONG");
  assertEquals(gear(), "song_selected");

  fire("LOAD");
  assertEquals(gear(), "loading");

  fire("PLAY");
  assertEquals(gear(), "playing");

  fire("SKIP_START");
  assertEquals(gear(), "playing_skipping");

  fire("SKIP_END");
  assertEquals(gear(), "playing");
});

Deno.test("Calls hooked functions to changes in gear", () => {
  let timesCalled = 0;
  const callee = () => (timesCalled += 1);

  const { fire, gear, hook } = motor(musicPlayerMotor);
  assertEquals(gear(), "idle");

  hook(callee);

  fire("SELECT_SONG");
  assertEquals(timesCalled, 1);

  fire("LOAD");
  assertEquals(timesCalled, 2);

  fire("PLAY");
  assertEquals(timesCalled, 3);
});
