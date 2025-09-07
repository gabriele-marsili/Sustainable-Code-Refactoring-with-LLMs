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
        if (battery >= batteryDrain) {
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
        if (car.batteryDrained()) {
            return false;
        }

        int numDrives = Math.min(distance / car.speed, car.battery / car.batteryDrain);
        car.distanceDriven += (long) car.speed * numDrives;
        car.battery -= (long) car.batteryDrain * numDrives;

        return car.distanceDriven() >= distance;
    }
}