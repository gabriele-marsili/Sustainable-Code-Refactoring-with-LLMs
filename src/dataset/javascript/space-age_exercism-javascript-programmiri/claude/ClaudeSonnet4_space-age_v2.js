const BASE_SECONDS = 31557600;

const PLANET_MULTIPLIERS = {
	earth: 31557600,
	mercury: 131059017.6,
	venus: 51267216.58,
	jupiter: 2661041808,
	mars: 59354023.7,
	saturn: 929292441.6,
	uranus: 2649786693,
	neptune: 5197781395,
};

export const age = (planet, seconds) => {
	return Math.round((seconds / PLANET_MULTIPLIERS[planet]) * 100) / 100;
};