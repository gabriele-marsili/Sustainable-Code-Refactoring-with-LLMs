const EARTH_YEAR_IN_SECONDS = 31557600;

const PLANET_YEAR_LENGTHS: Record<string, number> = {
    Earth: 1.0,
    Mercury: 0.2408467,
    Venus: 0.61519726,
    Mars: 1.8808158,
    Jupiter: 11.862615,
    Saturn: 29.447498,
    Uranus: 84.016846,
    Neptune: 164.79132,
};

export default class SpaceAge {
    public seconds: number;

    constructor(seconds: number) {
        this.seconds = seconds;
    }

    onEarth() {
        return this.calculateAge("Earth");
    }

    onMercury() {
        return this.calculateAge("Mercury");
    }

    onVenus() {
        return this.calculateAge("Venus");
    }

    onMars() {
        return this.calculateAge("Mars");
    }

    onJupiter() {
        return this.calculateAge("Jupiter");
    }

    onSaturn() {
        return this.calculateAge("Saturn");
    }

    onUranus() {
        return this.calculateAge("Uranus");
    }

    onNeptune() {
        return this.calculateAge("Neptune");
    }

    private calculateAge(planet: string) {
        return Math.round((this.seconds / (PLANET_YEAR_LENGTHS[planet] * EARTH_YEAR_IN_SECONDS)) * 100) / 100;
    }
}