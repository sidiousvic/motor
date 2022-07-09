/**
 * @note This will be released as a separate module. Coming soon. 
import { useState, useEffect } from "preact/hooks";
import { motor } from "./index.ts";

export function useMotor<E extends Dict, G extends Dict>(
  machine: MachineSpec<G, E>
): {
  hook: (cylinder: (e: keyof E) => void) => void;
  gear: () => keyof G;
  fire: (event?: keyof E | undefined) => void;
} {
  const [{ fire, gear, hook }, setShifter] = useState(motor<E, G>(machine));
  const [fired, setFired] = useState<(keyof E)[]>([""] as (keyof E)[]);
  hook((e: keyof E) => {
    setFired([...fired, e]);
  });
  useEffect(() => {
    const shift = motor<E, G>(machine);
    setShifter(shift);
    fired.forEach((e: keyof E) => shift.fire(e));
  }, [fired]);
  return {
    fire,
    gear,
    hook,
  };
}
 */
