const SECONDS_PER_EARTH_YEAR = 31557600;

const ORBITAL_PERIODS = {
	mercury: 0.2408467,
	venus: 0.61519726,
	earth: 1.0,
	mars: 1.8808158,
	jupiter: 11.862615,
	saturn: 29.447498,
	uranus: 84.016846,
	neptune: 164.79132
};

export const age = (planet, ageInSeconds) => {
	const ageInEarthYears = ageInSeconds / SECONDS_PER_EARTH_YEAR;
	const planetAge = ageInEarthYears / ORBITAL_PERIODS[planet];
	return Math.round(planetAge * 100) / 100;
};