class BirdWatcher {
    private static final int MIN_BIRDS_BUSY_DAY = 5;
    private final int[] birdsPerDay;
    private final int lastIndex;

    public BirdWatcher(int[] birdsPerDay) {
        this.birdsPerDay = birdsPerDay.clone();
        this.lastIndex = birdsPerDay.length - 1;
    }

    public int[] getLastWeek() {
        return birdsPerDay.clone();
    }

    public int getToday() {
        return birdsPerDay[lastIndex];
    }

    public void incrementTodaysCount() {
        birdsPerDay[lastIndex]++;
    }

    public boolean hasDayWithoutBirds() {
        for (int i = 0; i < birdsPerDay.length; i++) {
            if (birdsPerDay[i] == 0) {
                return true;
            }
        }
        return false;
    }

    public int getCountForFirstDays(int numberOfDays) {
        int result = 0;
        int maxIndex = Math.min(numberOfDays, birdsPerDay.length);
        for (int i = 0; i < maxIndex; i++) {
            result += birdsPerDay[i];
        }
        return result;
    }

    public int getBusyDays() {
        int result = 0;
        for (int i = 0; i < birdsPerDay.length; i++) {
            if (birdsPerDay[i] >= MIN_BIRDS_BUSY_DAY) {
                result++;
            }
        }
        return result;
    }
}