import { MotorSpec } from "./index.d.ts";

export const motor = <E extends string, G extends string>(
  machine: MotorSpec<G, E>
) => {
  const transmission = [(_e: E) => {}];
  let _gear = machine.gear;
  return {
    hook: (e: (e: E) => void) => {
      transmission.push(e);
    },
    gear: () => _gear,
    fire: (event: E) => {
      if (event) {
        const toGear = machine.transmission[_gear].on[event] ?? "";
        if (toGear) {
          _gear = toGear;
          transmission.forEach((cylinder) => cylinder(event));
        } else
          console.warn(
            `Event ${String(
              event
            )} does not exist in transmission. Aborting shift.`
          );
      }
    },
  };
};
