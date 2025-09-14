//
// This is only a SKELETON file for the 'Space Age' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const SECONDS_PER_EARTH_YEAR = 31557600;

const PLANET_YEAR_MULTIPLIERS = {
	mercury: 1 / (SECONDS_PER_EARTH_YEAR * 0.2408467),
	venus: 1 / (SECONDS_PER_EARTH_YEAR * 0.61519726),
	earth: 1 / SECONDS_PER_EARTH_YEAR,
	mars: 1 / (SECONDS_PER_EARTH_YEAR * 1.8808158),
	jupiter: 1 / (SECONDS_PER_EARTH_YEAR * 11.862615),
	saturn: 1 / (SECONDS_PER_EARTH_YEAR * 29.447498),
	uranus: 1 / (SECONDS_PER_EARTH_YEAR * 84.016846),
	neptune: 1 / (SECONDS_PER_EARTH_YEAR * 164.79132)
};

export const age = (planet, ageInSeconds) => {
	return Math.round(ageInSeconds * PLANET_YEAR_MULTIPLIERS[planet] * 100) / 100;
};