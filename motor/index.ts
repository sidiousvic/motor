import { Dict, MotorSpec } from "./index.d.ts";

export const motor = <E extends Dict, G extends Dict>(
  machine: MotorSpec<G, E>
) => {
  const transmission = [(_e: keyof E) => {}];
  let _gear = machine.gear;
  return {
    hook: (e: (e: keyof E) => void) => {
      transmission.push(e);
    },
    gear: () => _gear,
    fire: (event?: keyof E) => {
      if (event) {
        const toGear = machine.transmission[_gear].on[event] || "";
        if (toGear) {
          _gear = toGear as string;
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
