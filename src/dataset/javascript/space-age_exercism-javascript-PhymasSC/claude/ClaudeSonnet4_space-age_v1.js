//
// This is only a SKELETON file for the 'Space Age' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const AGE_IN_PLANETS_COMPARED_TO_EARTH = {
	mercury: 0.2408467,
	venus: 0.61519726,
	earth: 1.0,
	mars: 1.8808158,
	jupiter: 11.862615,
	saturn: 29.447498,
	uranus: 84.016846,
	neptune: 164.79132
};

const SECONDS_TO_YEAR_IN_EARTH = 31557600;

export const age = (planet, ageInSeconds) => {
	const planetRatio = AGE_IN_PLANETS_COMPARED_TO_EARTH[planet];
	const ageInYears = ageInSeconds / (SECONDS_TO_YEAR_IN_EARTH * planetRatio);
	return Math.round(ageInYears * 100) / 100;
};