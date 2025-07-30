public class ElonsToyCar {
  private static final int DISTANCE_PER_CHARGE = 20;
  private int battery = 100;
  private int distance;

  public static ElonsToyCar buy() {
    return new ElonsToyCar();
  }

  public String distanceDisplay() {
    return "Driven " + distance + " meters";
  }

  public String batteryDisplay() {
    return battery > 0 ? "Battery at " + battery + "%" : "Battery empty";
  }

  public void drive() {
    if (battery > 0) {
      battery--;
      distance += DISTANCE_PER_CHARGE;
    }
  }
}
