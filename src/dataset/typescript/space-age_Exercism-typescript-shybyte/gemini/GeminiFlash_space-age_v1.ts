const EARTH_YEAR_IN_SECONDS = 31557600;

const planetYearRatios = {
    mercury: 0.2408467,
    venus: 0.61519726,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132,
}

export default class SpaceAge {
    private readonly seconds: number;
    private readonly earthAge: number;

    constructor(seconds: number) {
        this.seconds = seconds;
        this.earthAge = this.calculateAge(1.0);
    }

    private calculateAge(earthYears: number): number {
        return Math.round((this.seconds / (earthYears * EARTH_YEAR_IN_SECONDS)) * 100) / 100;
    }

    onEarth(): number {
        return this.earthAge;
    }

    onMercury(): number {
        return this.calculateAge(planetYearRatios.mercury);
    }

    onVenus(): number {
        return this.calculateAge(planetYearRatios.venus);
    }

    onMars(): number {
        return this.calculateAge(planetYearRatios.mars);
    }

    onJupiter(): number {
        return this.calculateAge(planetYearRatios.jupiter);
    }

    onSaturn(): number {
        return this.calculateAge(planetYearRatios.saturn);
    }

    onUranus(): number {
        return this.calculateAge(planetYearRatios.uranus);
    }

    onNeptune(): number {
        return this.calculateAge(planetYearRatios.neptune);
    }
}