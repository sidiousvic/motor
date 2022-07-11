import { MotorSpec } from "./index_2";
export declare const motor: <E extends string, G extends string>(machine: MotorSpec<G, E>) => {
    hook: (e: (e: E) => void) => void;
    gear: () => G;
    fire: (event: E) => void;
};
