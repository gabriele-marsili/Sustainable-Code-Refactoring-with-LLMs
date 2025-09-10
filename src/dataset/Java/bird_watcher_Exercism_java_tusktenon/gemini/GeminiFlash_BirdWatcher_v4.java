import java.util.Arrays;

class BirdWatcher {
  private final int[] birdsPerDay;
  private final int BUSY_DAY_MINIMUM = 5;
  private final int[] lastWeek = {0, 2, 5, 3, 7, 8, 4};

  public BirdWatcher(int[] birdsPerDay) {
    this.birdsPerDay = Arrays.copyOf(birdsPerDay, birdsPerDay.length);
  }

  public int[] getLastWeek() {
    return Arrays.copyOf(lastWeek, lastWeek.length);
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
    int days = Math.min(numberOfDays, birdsPerDay.length);
    for (int i = 0; i < days; i++) {
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