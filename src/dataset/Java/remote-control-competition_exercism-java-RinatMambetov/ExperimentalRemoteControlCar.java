public class ExperimentalRemoteControlCar implements RemoteControlCar {
    private int distance = 0;

    public void drive() {
        final int DISTANCE_BY_ONE_DRIVE = 20;
        distance += DISTANCE_BY_ONE_DRIVE;
    }

    public int getDistanceTravelled() {
        return distance;
    }
}
