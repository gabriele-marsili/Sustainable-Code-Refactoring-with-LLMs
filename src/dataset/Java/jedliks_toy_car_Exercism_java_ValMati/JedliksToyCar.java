public class JedliksToyCar {

    private static final int METERS_PER_DRIVE = 20;
    private static final int BATTERY_PER_DRIVE = 1;

    private int distance = 0;
    private int battery = 100;

    public static JedliksToyCar buy() {
        return new JedliksToyCar();
    }

    public String distanceDisplay() {
        return String.format("Driven %s meters", distance);
    }

    public String batteryDisplay() {
        return battery > 0 ? String.format("Battery at %s%%", battery) : "Battery empty";
    }

    public void drive() {
        if (battery <= 0) {
            return;
        }

        distance += METERS_PER_DRIVE;
        battery -= BATTERY_PER_DRIVE;
    }
}
