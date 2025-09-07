public final class NeedForSpeed {
    private final int speed;
    private final int batteryDrain;
    private int battery;
    private int distanceDriven;

    NeedForSpeed(int speed, int batteryDrain) {
        this.speed = speed;
        this.batteryDrain = batteryDrain;
        this.battery = 100;
        this.distanceDriven = 0;
    }

    public boolean batteryDrained() {
        return battery < batteryDrain;
    }

    public int distanceDriven() {
        return distanceDriven;
    }

    public void drive() {
        if (!batteryDrained()) {
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

        int numDrivesNeeded = (int) Math.ceil((double) distance / car.speed);
        int batteryNeeded = numDrivesNeeded * car.batteryDrain;

        if (batteryNeeded > 100) {
            int maxDrives = 100 / car.batteryDrain;
            car.distanceDriven += maxDrives * car.speed;
            return false;
        }

        while (!car.batteryDrained() && car.distanceDriven() < distance) {
            car.drive();
        }

        return car.distanceDriven() >= distance;
    }
}