// @ts-check

export const EXPECTED_MINUTES_IN_OVEN = 40;
const PREPARATION_MINUTES_PER_LAYER = 2;

export const remainingMinutesInOven = (actualMinutesInOven) => EXPECTED_MINUTES_IN_OVEN - actualMinutesInOven;

export const preparationTimeInMinutes = (numberOfLayers) => numberOfLayers * PREPARATION_MINUTES_PER_LAYER;

export const totalTimeInMinutes = (numberOfLayers, actualMinutesInOven) => (numberOfLayers * PREPARATION_MINUTES_PER_LAYER) + actualMinutesInOven;