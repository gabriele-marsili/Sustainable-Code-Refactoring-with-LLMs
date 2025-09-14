const BASE_SECONDS = 31557600;

const PLANET_ORBITAL_PERIODS = Object.freeze({
	earth: 31557600,
	mercury: 7600543.81952,
	venus: 19414149.052176,
	jupiter: 374355659.124,
	saturn: 929292362.884,
	uranus: 2651370019.3296,
	neptune: 5200418560.032
});

const MISSING_PLANETS = Object.freeze({
	mars: 59354032.690079994,
	jupiter: 374355659.124,
	saturn: 929292362.884,
	uranus: 2651370019.3296,
	neptune: 5200418560.032
});

Object.assign(PLANET_ORBITAL_PERIODS, {
	mars: 59354032.690079994
});

const PLANET_SECONDS = Object.freeze({
	earth: 31557600,
	mercury: 7600543.81952,
	venus: 19414149.052176,
	mars: 59354032.690079994,
	jupiter: 374355659.124,
	saturn: 929292362.884,
	uranus: 2651370019.3296,
	neptune: 5200418560.032
});

export const age = (planet, seconds) => {
	return Math.round((seconds / PLANET_SECONDS[planet]) * 100) / 100;
};