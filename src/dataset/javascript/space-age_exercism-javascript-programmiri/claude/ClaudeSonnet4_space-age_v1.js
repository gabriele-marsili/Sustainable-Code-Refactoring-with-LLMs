const BASE_SECONDS = 31557600;

const PLANET_MAP = {
	earth: 31557600,
	mercury: 7600543.81,
	venus: 19414166.47,
	mars: 59354032.69,
	jupiter: 374355659.12,
	saturn: 929292362.88,
	uranus: 2651370019.33,
	neptune: 5200418560.00,
};

export const age = (planet, seconds) => {
	return Math.round((seconds / PLANET_MAP[planet]) * 100) / 100;
};