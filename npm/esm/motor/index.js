export const motor = (machine) => {
    const transmission = [(_e) => { }];
    let _gear = machine.gear;
    return {
        hook: (e) => {
            transmission.push(e);
        },
        gear: () => _gear,
        fire: (event) => {
            if (event) {
                const toGear = machine.transmission[_gear].on[event] ?? "";
                if (toGear) {
                    _gear = toGear;
                    transmission.forEach((cylinder) => cylinder(event));
                }
                else
                    console.warn(`Event ${String(event)} does not exist in transmission. Aborting shift.`);
            }
        },
    };
};
