class BirdWatcher {
    private static final int MIN_BIRDS_BUSY_DAY = 5;
    private final int[] birdsPerDay;
    private final int length;

    public BirdWatcher(int[] birdsPerDay) {
        this.birdsPerDay = birdsPerDay.clone();
        this.length = this.birdsPerDay.length;
    }

    public int[] getLastWeek() {
        return birdsPerDay.clone(); // Return a copy to prevent external modification
    }

    public int getToday() {
        return birdsPerDay[length - 1];
    }

    public void incrementTodaysCount() {
        birdsPerDay[length - 1]++;
    }

    public boolean hasDayWithoutBirds() {
        for (int i = 0; i < length; i++) {
            if (birdsPerDay[i] == 0) {
                return true;
            }
        }
        return false;
    }

    public int getCountForFirstDays(int numberOfDays) {
        int result = 0;
        int maxIndex = Math.min(numberOfDays, length);
        for (int i = 0; i < maxIndex; i++) {
            result += birdsPerDay[i];
        }
        return result;
    }

    public int getBusyDays() {
        int result = 0;
        for (int i = 0; i < length; i++) {
            if (birdsPerDay[i] >= MIN_BIRDS_BUSY_DAY) {
                result++;
            }
        }
        return result;
    }
}