"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dntShim = __importStar(require("./_dnt.test_shims.js"));
const asserts_js_1 = require("./deps/deno.land/std@0.147.0/testing/asserts.js");
const mod_js_1 = require("./mod.js");
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
    const { fire, gear } = (0, mod_js_1.motor)(musicPlayerMotor);
    (0, asserts_js_1.assertEquals)(gear(), "stopped");
    fire("LOAD");
    (0, asserts_js_1.assertEquals)(gear(), "loading");
    fire("PLAY");
    (0, asserts_js_1.assertEquals)(gear(), "playing");
    fire("PAUSE");
    (0, asserts_js_1.assertEquals)(gear(), "paused");
    fire("STOP");
    (0, asserts_js_1.assertEquals)(gear(), "stopped");
});
dntShim.Deno.test("Calls hooked functions to changes in gear", () => {
    const counter = (count = 0) => () => (count += 1);
    const { fire, gear, hook } = (0, mod_js_1.motor)(musicPlayerMotor);
    (0, asserts_js_1.assertEquals)(gear(), "stopped");
    const hooked = counter();
    hook(counter());
    fire("LOAD");
    (0, asserts_js_1.assertEquals)(hooked(), 1);
    fire("PLAY");
    (0, asserts_js_1.assertEquals)(hooked(), 2);
    fire("STOP");
    (0, asserts_js_1.assertEquals)(hooked(), 3);
});