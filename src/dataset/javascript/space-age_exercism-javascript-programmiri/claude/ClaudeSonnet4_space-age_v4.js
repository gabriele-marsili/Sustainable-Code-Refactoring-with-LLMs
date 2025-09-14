const BASE_SECONDS = 31557600;

const PLANET_ORBITAL_PERIODS = {
	earth: 31557600,
	mercury: 7600543.81952,
	venus: 19414166.144,
	jupiter: 374355659.124,
	saturn: 929292362.884,
	uranus: 2651370019.3296,
	neptune: 5200418560.032,
	mars: 59354032.690016
};

export const age = (planet, seconds) => {
	return Math.round((seconds / PLANET_ORBITAL_PERIODS[planet]) * 100) / 100;
};