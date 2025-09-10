import java.util.Arrays;

class BirdWatcher {
    private final int[] birdsPerDay;
    private static final int[] LAST_WEEK = {0, 2, 5, 3, 7, 8, 4};

    public BirdWatcher(int[] birdsPerDay) {
        this.birdsPerDay = Arrays.copyOf(birdsPerDay, birdsPerDay.length);
    }

    public int[] getLastWeek() {
        return LAST_WEEK.clone();
    }

    public int getToday() {
        return birdsPerDay.length > 0 ? birdsPerDay[birdsPerDay.length - 1] : 0;
    }

    public void incrementTodaysCount() {
        if (birdsPerDay.length > 0) {
            birdsPerDay[birdsPerDay.length - 1]++;
        }
    }

    public boolean hasDayWithoutBirds() {
        for (int birds : birdsPerDay) {
            if (birds == 0) {
                return true;
            }
        }
        return false;
    }

    public int getCountForFirstDays(int numberOfDays) {
        int sum = 0;
        int days = Math.min(numberOfDays, birdsPerDay.length);
        for (int i = 0; i < days; i++) {
            sum += birdsPerDay[i];
        }
        return sum;
    }

    public int getBusyDays() {
        int count = 0;
        for (int birds : birdsPerDay) {
            if (birds > 4) {
                count++;
            }
        }
        return count;
    }
}