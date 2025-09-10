public class ElonsToyCar {
  private static final int DISTANCE_PER_CHARGE = 20;
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
    return "Driven " + this.distance + " meters";
  }

  public String batteryDisplay() {
    return this.battery > 0 ? "Battery at " + this.battery + "%" : "Battery empty";
  }

  public void drive() {
    if (this.battery > 0) {
      this.distance += DISTANCE_PER_CHARGE;
      this.battery = Math.max(0, this.battery - 1);
    }
  }
}