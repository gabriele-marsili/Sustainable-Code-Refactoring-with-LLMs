const BASE_SECONDS = 31557600;

const PLANET_MAP = {
	earth: BASE_SECONDS,
	mercury: BASE_SECONDS * 0.2408467,
	venus: BASE_SECONDS * 0.61519726,
	mars: BASE_SECONDS * 1.8808158,
	jupiter: BASE_SECONDS * 11.862615,
	saturn: BASE_SECONDS * 29.447498,
	uranus: BASE_SECONDS * 84.016846,
	neptune: BASE_SECONDS * 164.79132,
};

export const age = (planet, seconds) => 
	Number((seconds / PLANET_MAP[planet]).toFixed(2));