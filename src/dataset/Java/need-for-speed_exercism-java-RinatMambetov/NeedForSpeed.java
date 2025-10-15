class NeedForSpeed {
    private final int speed;
    private final int batteryDrain;
    private int distance = 0;
    private int battery = 100;

    NeedForSpeed(int speed, int batteryDrain) {
//        throw new UnsupportedOperationException("Please implement the NeedForSpeed constructor");
        this.speed = speed;
        this.batteryDrain = batteryDrain;
    }

    public boolean batteryDrained() {
//        throw new UnsupportedOperationException("Please implement the NeedForSpeed.batteryDrained() method");
        return battery <= 0;
    }

    public int distanceDriven() {
//        throw new UnsupportedOperationException("Please implement the NeedForSpeed.distanceDriven() method");
        return distance;
    }

    public void drive() {
//        throw new UnsupportedOperationException("Please implement the NeedForSpeed.drive() method");
        if (battery >= batteryDrain) {
            distance += speed;
            battery -= batteryDrain;
        }
    }

    public static NeedForSpeed nitro() {
//        throw new UnsupportedOperationException("Please implement the (static) NeedForSpeed.nitro() method");
        return new NeedForSpeed(50, 4);
    }
}

class RaceTrack {
    private final int distance;

    RaceTrack(int distance) {
//        throw new UnsupportedOperationException("Please implement the RaceTrack constructor");
        this.distance = distance;
    }

    public boolean tryFinishTrack(NeedForSpeed car) {
//        throw new UnsupportedOperationException("Please implement the RaceTrack.tryFinishTrack() method");
        while (!car.batteryDrained()) {
            car.drive();
        }
        return car.distanceDriven() >= distance;
    }
}
