const EARTH_YEAR_IN_SECONDS = 31557600;

// Pre-calculate reciprocals to avoid division in runtime
const PLANET_YEAR_RECIPROCALS = {
    EARTH: 1.0 / EARTH_YEAR_IN_SECONDS,
    MERCURY: 1.0 / (0.2408467 * EARTH_YEAR_IN_SECONDS),
    VENUS: 1.0 / (0.61519726 * EARTH_YEAR_IN_SECONDS),
    MARS: 1.0 / (1.8808158 * EARTH_YEAR_IN_SECONDS),
    JUPITER: 1.0 / (11.862615 * EARTH_YEAR_IN_SECONDS),
    SATURN: 1.0 / (29.447498 * EARTH_YEAR_IN_SECONDS),
    URANUS: 1.0 / (84.016846 * EARTH_YEAR_IN_SECONDS),
    NEPTUNE: 1.0 / (164.79132 * EARTH_YEAR_IN_SECONDS)
} as const;

export default class SpaceAge {
    public seconds: number;

    constructor(seconds: number) {
        this.seconds = seconds;
    }

    onEarth() {
        return Math.round(this.seconds * PLANET_YEAR_RECIPROCALS.EARTH * 100) / 100;
    }

    onMercury() {
        return Math.round(this.seconds * PLANET_YEAR_RECIPROCALS.MERCURY * 100) / 100;
    }

    onVenus() {
        return Math.round(this.seconds * PLANET_YEAR_RECIPROCALS.VENUS * 100) / 100;
    }

    onMars() {
        return Math.round(this.seconds * PLANET_YEAR_RECIPROCALS.MARS * 100) / 100;
    }

    onJupiter() {
        return Math.round(this.seconds * PLANET_YEAR_RECIPROCALS.JUPITER * 100) / 100;
    }

    onSaturn() {
        return Math.round(this.seconds * PLANET_YEAR_RECIPROCALS.SATURN * 100) / 100;
    }

    onUranus() {
        return Math.round(this.seconds * PLANET_YEAR_RECIPROCALS.URANUS * 100) / 100;
    }

    onNeptune() {
        return Math.round(this.seconds * PLANET_YEAR_RECIPROCALS.NEPTUNE * 100) / 100;
    }
}