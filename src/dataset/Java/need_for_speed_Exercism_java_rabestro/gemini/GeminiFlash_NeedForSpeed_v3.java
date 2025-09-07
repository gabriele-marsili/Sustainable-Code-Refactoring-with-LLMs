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
        if (car.batteryDrain() >= 100) return false;

        int numDrivesNeeded = distance / car.speed();
        int batteryNeeded = numDrivesNeeded * car.batteryDrain();

        if (batteryNeeded > distance || car.batteryDrain() <= 0) {
            while (!car.batteryDrained() && car.distanceDriven() < distance) {
                car.drive();
            }
            return car.distanceDriven() >= distance;
        }

        int possibleDrives = 100 / car.batteryDrain();
        int possibleDistance = possibleDrives * car.speed();

        if (possibleDistance < distance && car.batteryDrain() > 0) {
            while (!car.batteryDrained() && car.distanceDriven() < distance) {
                car.drive();
            }
            return car.distanceDriven() >= distance;
        }

        while (!car.batteryDrained() && car.distanceDriven() < distance) {
            car.drive();
        }

        return car.distanceDriven() >= distance;
    }
}