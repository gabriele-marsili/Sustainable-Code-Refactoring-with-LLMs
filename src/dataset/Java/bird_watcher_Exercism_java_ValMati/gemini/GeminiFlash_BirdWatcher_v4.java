class BirdWatcher {
    private static final int MIN_BIRDS_BUSY_DAY = 5;
    private final int[] birdsPerDay;

    public BirdWatcher(int[] birdsPerDay) {
        this.birdsPerDay = birdsPerDay.clone();
    }

    public int[] getLastWeek() {
        return birdsPerDay.clone();
    }

    public int getToday() {
        return birdsPerDay[birdsPerDay.length - 1];
    }

    public void incrementTodaysCount() {
        birdsPerDay[birdsPerDay.length - 1]++;
    }

    public boolean hasDayWithoutBirds() {
        for (int birdsNumber : birdsPerDay) {
            if (birdsNumber == 0) {
                return true;
            }
        }
        return false;
    }

    public int getCountForFirstDays(int numberOfDays) {
        int result = 0;
        int length = Math.min(numberOfDays, birdsPerDay.length);
        for (int i = 0; i < length; i++) {
            result += birdsPerDay[i];
        }
        return result;
    }

    public int getBusyDays() {
        int result = 0;
        for (int birdsNumber : birdsPerDay) {
            if (birdsNumber >= MIN_BIRDS_BUSY_DAY) {
                result++;
            }
        }
        return result;
    }
}