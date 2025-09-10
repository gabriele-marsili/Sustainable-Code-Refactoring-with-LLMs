public class ElonsToyCar {
  private static final int DISTANCE_PER_CHARGE = 20;
  private static final String BATTERY_EMPTY = "Battery empty";
  private static final String BATTERY_AT = "Battery at ";
  private static final String PERCENT = "%";
  private static final String DRIVEN = "Driven ";
  private static final String METERS = " meters";

  private int battery;
  private int distance;

  private ElonsToyCar() {
    this.battery = 100;
    this.distance = 0;
  }


  public static ElonsToyCar buy() {
    return new ElonsToyCar();
  }

  public String distanceDisplay() {
    return DRIVEN + distance + METERS;
  }

  public String batteryDisplay() {
    return battery > 0 ? BATTERY_AT + battery + PERCENT : BATTERY_EMPTY;
  }

  public void drive() {
    if (battery > 0) {
      battery--;
      distance += DISTANCE_PER_CHARGE;
    }
  }
}