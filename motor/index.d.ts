export type Keys<T extends string> = Record<T, string>;
export type Dict = Record<string, string>;

export type MotorSpec<Gears extends Dict, Events extends Dict> = {
  gear: keyof Gears;
  transmission: {
    [Gear in keyof Gears]: {
      on: {
        [Event in keyof Events]?: keyof Gears;
      };
    };
  };
};
