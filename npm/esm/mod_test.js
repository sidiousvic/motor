import * as dntShim from "./_dnt.test_shims.js";
import { assertEquals } from "./deps/deno.land/std@0.147.0/testing/asserts.js";
import { motor } from "./mod.js";
const musicPlayerMotor = {
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
dntShim.Deno.test("Transitions correctly between states", () => {
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
dntShim.Deno.test("Calls hooked functions to changes in gear", () => {
    const counter = (count = 0) => () => (count += 1);
    const { fire, gear, hook } = motor(musicPlayerMotor);
    assertEquals(gear(), "stopped");
    const hooked = counter();
    hook(counter());
    fire("LOAD");
    assertEquals(hooked(), 1);
    fire("PLAY");
    assertEquals(hooked(), 2);
    fire("STOP");
    assertEquals(hooked(), 3);
});
