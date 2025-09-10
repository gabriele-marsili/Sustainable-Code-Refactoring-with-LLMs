public class JedliksToyCar {

    private static final int METERS_PER_DRIVE = 20;
    private static final int BATTERY_PER_DRIVE = 1;
    private static final String BATTERY_EMPTY_MESSAGE = "Battery empty";

    private int distance = 0;
    private int battery = 100;

    private JedliksToyCar() {}

    public static JedliksToyCar buy() {
        return new JedliksToyCar();
    }

    public String distanceDisplay() {
        return "Driven " + distance + " meters";
    }

    public String batteryDisplay() {
        return battery > 0 ? "Battery at " + battery + "%" : BATTERY_EMPTY_MESSAGE;
    }

    public void drive() {
        if (battery > 0) {
            distance += METERS_PER_DRIVE;
            battery -= BATTERY_PER_DRIVE;
        }
    }
}