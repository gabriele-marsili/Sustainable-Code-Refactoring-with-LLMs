const EARTH_YEAR_IN_SECONDS = 31557600

export default class SpaceAge {
    public seconds: number

    constructor(seconds: number) {
        this.seconds = seconds
    }

    onEarth() {
        return this.onPlanetWithYearLength(1.0)
    }

    onMercury() {
        return this.onPlanetWithYearLength(0.2408467)
    }

    onVenus() {
        return this.onPlanetWithYearLength(0.61519726)
    }

    onMars() {
        return this.onPlanetWithYearLength(1.8808158)
    }

    onJupiter() {
        return this.onPlanetWithYearLength(11.862615)
    }

    onSaturn() {
        return this.onPlanetWithYearLength(29.447498)
    }

    onUranus() {
        return this.onPlanetWithYearLength(84.016846)
    }

    onNeptune() {
        return this.onPlanetWithYearLength(164.79132)
    }

    private onPlanetWithYearLength(earthYears: number) {
        return round(this.seconds / (earthYears * EARTH_YEAR_IN_SECONDS))
    }
}

function round(x: number) {
    return Math.round(x * 100) / 100
}