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
    for (int count : birdsPerDay) {
      if (count == 0) {
        return true;
      }
    }
    return false;
  }

  public int getCountForFirstDays(int numberOfDays) {
    int count = 0;
    int limit = Math.min(numberOfDays, birdsPerDay.length);
    for (int i = 0; i < limit; i++) {
      count += birdsPerDay[i];
    }
    return count;
  }

  public int getBusyDays() {
    int busyDays = 0;
    for (int count : birdsPerDay) {
      if (count >= BUSY_DAY_MINIMUM) {
        busyDays++;
      }
    }
    return busyDays;
  }
}