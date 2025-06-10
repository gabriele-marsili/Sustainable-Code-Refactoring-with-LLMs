class NeedForSpeed {
    private final int speed;
    private final int batteryDrain;
    private int distanceDriven;
    private int batteryLevel;

    NeedForSpeed(int speed, int batteryDrain) {
        this.speed = speed;
        this.batteryDrain = batteryDrain;
        this.distanceDriven = 0;
        this.batteryLevel = 100;
    }

    public int getSpeed() {
        return this.speed;
    }

    public int getBatteryDrain() {
        return this.batteryDrain;
    }

    public int getBatteryLevel() {
        return this.batteryLevel;
    }

    public boolean batteryDrained() {
        return this.batteryLevel == 0 ? true : false;
    }

    public int distanceDriven() {
        return this.distanceDriven;
    }

    public void drive() {
        if (this.batteryLevel >= this.batteryDrain) {
            this.distanceDriven += this.speed;
            this.batteryLevel -= this.batteryDrain;
        } else {
            System.out.println("Insufficient battery level.");
        }
    }

    public static NeedForSpeed nitro() {
        return new NeedForSpeed(50, 4);
    }
}

class RaceTrack {
    int distance;

    RaceTrack(int distance) {
        this.distance = distance;
    }

    public boolean tryFinishTrack(NeedForSpeed car) {
        double trackBatteryDrain = (this.distance / (double)car.getSpeed()) * car.getBatteryDrain();
        return trackBatteryDrain <= car.getBatteryLevel() ? true : false;
    }
}
