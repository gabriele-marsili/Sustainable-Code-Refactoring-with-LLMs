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

    onEarth = () => this.calculateAge("Earth");
    onMercury = () => this.calculateAge("Mercury");
    onVenus = () => this.calculateAge("Venus");
    onMars = () => this.calculateAge("Mars");
    onJupiter = () => this.calculateAge("Jupiter");
    onSaturn = () => this.calculateAge("Saturn");
    onUranus = () => this.calculateAge("Uranus");
    onNeptune = () => this.calculateAge("Neptune");

    private calculateAge(planet: string) {
        return Math.round((this.seconds / (PLANET_YEAR_LENGTHS[planet] * EARTH_YEAR_IN_SECONDS)) * 100) / 100;
    }
}