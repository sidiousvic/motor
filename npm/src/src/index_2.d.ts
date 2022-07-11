export type Keys<T extends string> = Record<T, string>;
export type MotorSpec<Gears extends string, Events extends string> = {
  gear: Gears;
  transmission: {
    [Gear in keyof Keys<Gears>]: {
      on: {
        [Event in keyof Keys<Events>]?: Gears;
      };
    };
  };
};
