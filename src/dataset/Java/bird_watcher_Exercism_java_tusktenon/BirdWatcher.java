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
    // return hasDayWithoutBirdsLoop();
    return hasDayWithoutBirdsStream();
  }

  private boolean hasDayWithoutBirdsLoop() {
    for (int count : birdsPerDay) {
      if (count == 0) {
        return true;
      }
    }
    return false;
  }

  private boolean hasDayWithoutBirdsStream() {
    return Arrays.stream(birdsPerDay).anyMatch(c -> c == 0);
  }

  public int getCountForFirstDays(int numberOfDays) {
    // return getCountForFirstDaysLoop(numberOfDays);
    return getCountForFirstDaysStream(numberOfDays);
  }

  private int getCountForFirstDaysLoop(int numberOfDays) {
    int count = 0;
    for (int i = 0; i < Math.min(numberOfDays, birdsPerDay.length); i++) {
      count += birdsPerDay[i];
    }
    return count;
  }

  private int getCountForFirstDaysStream(int numberOfDays) {
    return Arrays.stream(birdsPerDay).limit(numberOfDays).sum();
  }

  public int getBusyDays() {
    // return getBusyDaysLoop();
    return getBusyDaysStream();
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

  private int getBusyDaysStream() {
    return (int) Arrays.stream(birdsPerDay).filter(c -> c >= BUSY_DAY_MINIMUM).count();
  }
}
