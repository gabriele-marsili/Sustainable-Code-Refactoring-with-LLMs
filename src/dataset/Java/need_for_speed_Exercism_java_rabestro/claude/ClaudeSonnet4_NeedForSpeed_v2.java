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
        int maxDrives = car.battery / car.batteryDrain;
        int maxDistance = maxDrives * car.speed;
        
        if (maxDistance >= distance) {
            int drivesNeeded = (distance + car.speed - 1) / car.speed;
            car.battery -= drivesNeeded * car.batteryDrain;
            car.distanceDriven += drivesNeeded * car.speed;
            return true;
        } else {
            car.battery = car.battery % car.batteryDrain;
            car.distanceDriven += maxDistance;
            return false;
        }
    }
}