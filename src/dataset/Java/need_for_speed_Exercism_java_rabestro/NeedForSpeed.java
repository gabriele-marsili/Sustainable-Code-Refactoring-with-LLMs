public final class NeedForSpeed {
    private final int speed;
    private final int batteryDrain;
    private int battery = 100;
    private int distanceDriven;

    NeedForSpeed(int speed, int batteryDrain) {
        this.speed = speed;
        this.batteryDrain = batteryDrain;
    }

    public boolean batteryDrained() {
        return battery < batteryDrain;
    }

    public int distanceDriven() {
        return distanceDriven;
    }

    public void drive() {
        if (battery > 0) {
            battery -= batteryDrain;
            distanceDriven += speed;
        }
    }

    public static NeedForSpeed nitro() {
        return new NeedForSpeed(50, 4);
    }
}

record RaceTrack(int distance) {
    public boolean canFinishRace(NeedForSpeed car) {
        do {
            car.drive();
        } while (!car.batteryDrained() && car.distanceDriven() < distance);
        return car.distanceDriven() >= distance;
    }
}
