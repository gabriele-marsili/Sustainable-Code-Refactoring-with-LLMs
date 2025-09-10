const EARTH_YEAR_IN_SECONDS = 31557600;

export default class SpaceAge {
    public seconds: number;

    private static readonly PLANET_YEAR_LENGTHS = {
        Earth: 1.0,
        Mercury: 0.2408467,
        Venus: 0.61519726,
        Mars: 1.8808158,
        Jupiter: 11.862615,
        Saturn: 29.447498,
        Uranus: 84.016846,
        Neptune: 164.79132,
    };

    constructor(seconds: number) {
        this.seconds = seconds;
    }

    onEarth() {
        return this.calculateAge(SpaceAge.PLANET_YEAR_LENGTHS.Earth);
    }

    onMercury() {
        return this.calculateAge(SpaceAge.PLANET_YEAR_LENGTHS.Mercury);
    }

    onVenus() {
        return this.calculateAge(SpaceAge.PLANET_YEAR_LENGTHS.Venus);
    }

    onMars() {
        return this.calculateAge(SpaceAge.PLANET_YEAR_LENGTHS.Mars);
    }

    onJupiter() {
        return this.calculateAge(SpaceAge.PLANET_YEAR_LENGTHS.Jupiter);
    }

    onSaturn() {
        return this.calculateAge(SpaceAge.PLANET_YEAR_LENGTHS.Saturn);
    }

    onUranus() {
        return this.calculateAge(SpaceAge.PLANET_YEAR_LENGTHS.Uranus);
    }

    onNeptune() {
        return this.calculateAge(SpaceAge.PLANET_YEAR_LENGTHS.Neptune);
    }

    private calculateAge(earthYears: number) {
        return Math.round((this.seconds / (earthYears * EARTH_YEAR_IN_SECONDS)) * 100) / 100;
    }
}