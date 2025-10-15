class SpaceAge {
    private double spaceAge;
    private double earthYear = 31557600;

    SpaceAge(double seconds) {
        this.spaceAge = seconds;
    }

    double getSeconds() {
        return spaceAge;
    }

    double onEarth() {
        return (spaceAge / earthYear);
    }

    double onMercury() {
        double year = 0.2408467 * earthYear;
        return (spaceAge / year);
    }

    double onVenus() {
        double year = 0.61519726 * earthYear;
        return (spaceAge / year);
    }

    double onMars() {
        double year = 1.8808158 * earthYear;
        return (spaceAge / year);
    }

    double onJupiter() {
        double year = 11.862615 * earthYear;
        return (spaceAge / year);
    }

    double onSaturn() {
        double year = 29.447498 * earthYear;
        return (spaceAge / year);
    }

    double onUranus() {
        double year = 84.016846 * earthYear;
        return (spaceAge / year);
    }

    double onNeptune() {
        double year = 164.79132 * earthYear;
        return (spaceAge / year);
    }

}
