class NeedForSpeed {
  private final int speed;
  private final int batteryDrain;
  private int distanceDriven;
  private int batteryLevel = 100;
  private final int maxDistance;

  NeedForSpeed(int speed, int batteryDrain) {
    this.speed = speed;
    this.batteryDrain = batteryDrain;
    this.maxDistance = speed * (100 / batteryDrain);
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

  int getMaxDistance() {
    return maxDistance;
  }
}

class RaceTrack {
  private final int distance;

  RaceTrack(int distance) {
    this.distance = distance;
  }

  public boolean canFinishRace(NeedForSpeed car) {
    return car.getMaxDistance() >= distance;
  }
}