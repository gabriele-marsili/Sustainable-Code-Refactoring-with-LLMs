import java.util.Arrays;

class BirdWatcher {
  private final int[] birdsPerDay;
  private final int BUSY_DAY_MINIMUM = 5;

  public BirdWatcher(int[] birdsPerDay) {
    this.birdsPerDay = birdsPerDay.clone();
  }

  public int[] getLastWeek() {
    return new int[] {0, 2, 5, 3, 7, 8, 4};
  }

  public int getToday() {
    return birdsPerDay[birdsPerDay.length - 1];
  }

  public void incrementTodaysCount() {
    birdsPerDay[birdsPerDay.length - 1]++;
  }

  public boolean hasDayWithoutBirds() {
    return hasDayWithoutBirdsLoop();
  }

  private boolean hasDayWithoutBirdsLoop() {
    for (int count : birdsPerDay) {
      if (count == 0) {
        return true;
      }
    }
    return false;
  }

  public int getCountForFirstDays(int numberOfDays) {
    return getCountForFirstDaysLoop(numberOfDays);
  }

  private int getCountForFirstDaysLoop(int numberOfDays) {
    int count = 0;
    int days = Math.min(numberOfDays, birdsPerDay.length);
    for (int i = 0; i < days; i++) {
      count += birdsPerDay[i];
    }
    return count;
  }

  public int getBusyDays() {
    return getBusyDaysLoop();
  }

  private int getBusyDaysLoop() {
    int busyDays = 0;
    for (int count : birdsPerDay) {
      if (count >= BUSY_DAY_MINIMUM) {
        busyDays++;
      }
    }
    return busyDays;
  }
}