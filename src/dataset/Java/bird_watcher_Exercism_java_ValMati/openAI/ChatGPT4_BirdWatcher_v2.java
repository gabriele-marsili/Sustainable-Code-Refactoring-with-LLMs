import java.util.Arrays;

class BirdWatcher {
    private static final int MIN_BIRDS_BUSY_DAY = 5;
    private final int[] birdsPerDay;

    public BirdWatcher(int[] birdsPerDay) {
        this.birdsPerDay = Arrays.copyOf(birdsPerDay, birdsPerDay.length);
    }

    public int[] getLastWeek() {
        return Arrays.copyOf(birdsPerDay, birdsPerDay.length);
    }

    public int getToday() {
        return birdsPerDay[birdsPerDay.length - 1];
    }

    public void incrementTodaysCount() {
        birdsPerDay[birdsPerDay.length - 1]++;
    }

    public boolean hasDayWithoutBirds() {
        return Arrays.stream(birdsPerDay).anyMatch(birdsNumber -> birdsNumber == 0);
    }

    public int getCountForFirstDays(int numberOfDays) {
        return Arrays.stream(birdsPerDay, 0, Math.min(numberOfDays, birdsPerDay.length)).sum();
    }

    public int getBusyDays() {
        return (int) Arrays.stream(birdsPerDay).filter(birdsNumber -> birdsNumber >= MIN_BIRDS_BUSY_DAY).count();
    }
}