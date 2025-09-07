class NeedForSpeed {
    private final int speed;
    private final int batteryDrain;
    private final int maxRange;

    private int distanceDriven = 0;
    private int battery = 100;

    NeedForSpeed(int speed, int batteryDrain) {
        this.speed = speed;
        this.batteryDrain = batteryDrain;
        this.maxRange = (100 / batteryDrain) * speed;
    }

    public static NeedForSpeed nitro() {
        return new NeedForSpeed(50, 4);
    }

    public boolean batteryDrained() {
        return battery < batteryDrain;
    }

    public int distanceDriven() {
        return distanceDriven;
    }

    public void drive() {
        if (battery < batteryDrain) {
            return;
        }

        distanceDriven += speed;
        battery -= batteryDrain;
    }

    int getRange() {
        return maxRange;
    }
}

class RaceTrack {
    private final int distance;

    RaceTrack(int distance) {
        this.distance = distance;
    }

    public boolean canFinishRace(NeedForSpeed car) {
        return car.getRange() >= distance;
    }
}