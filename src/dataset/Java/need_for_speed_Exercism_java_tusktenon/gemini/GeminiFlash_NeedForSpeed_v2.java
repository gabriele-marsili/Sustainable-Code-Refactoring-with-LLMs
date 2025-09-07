class NeedForSpeed {
  private final int speed;
  private final int batteryDrain;
  private int distanceDriven;
  private int batteryLevel = 100;

  NeedForSpeed(int speed, int batteryDrain) {
    this.speed = speed;
    this.batteryDrain = batteryDrain;
  }

  public boolean batteryDrained() {
    return batteryLevel < batteryDrain;
  }

  public int speed() {
    return speed;
  }

  public int batteryDrain() {
    return batteryDrain;
  }

  public int distanceDriven() {
    return distanceDriven;
  }

  public void drive() {
    if (batteryLevel >= batteryDrain) {
      distanceDriven += speed;
      batteryLevel -= batteryDrain;
    }
  }

  public static NeedForSpeed nitro() {
    return new NeedForSpeed(50, 4);
  }
}

class RaceTrack {
  private final int distance;
  private final double finishThreshold;

  RaceTrack(int distance) {
    this.distance = distance;
    this.finishThreshold = (double) distance;
  }

  public boolean canFinishRace(NeedForSpeed car) {
    return (double) car.speed() * (100.0 / car.batteryDrain()) >= finishThreshold;
  }
}