public class JedliksToyCar {

    private static final int METERS_PER_DRIVE = 20;
    private static final int BATTERY_PER_DRIVE = 1;
    private static final String BATTERY_EMPTY_MSG = "Battery empty";
    private static final String DISTANCE_FORMAT = "Driven %d meters";
    private static final String BATTERY_FORMAT = "Battery at %d%%";

    private int distance = 0;
    private int battery = 100;

    public static JedliksToyCar buy() {
        return new JedliksToyCar();
    }

    public String distanceDisplay() {
        return String.format(DISTANCE_FORMAT, distance);
    }

    public String batteryDisplay() {
        return battery > 0 ? String.format(BATTERY_FORMAT, battery) : BATTERY_EMPTY_MSG;
    }

    public void drive() {
        if (battery <= 0) {
            return;
        }

        distance += METERS_PER_DRIVE;
        battery -= BATTERY_PER_DRIVE;
    }
}