import java.util.Arrays;

class BirdWatcher {
    private final int[] birdsPerDay;

    public BirdWatcher(int[] birdsPerDay) {
        this.birdsPerDay = birdsPerDay.clone();
    }

    public int[] getLastWeek() {
//        throw new UnsupportedOperationException("Please implement the BirdCount.getLastWeek() method");
//        birdsPerDay = new int[]{0, 2, 5, 3, 7, 8, 4};

        return birdsPerDay;
    }

    public int getToday() {
//        throw new UnsupportedOperationException("Please implement the BirdCount.getToday() method");
        return birdsPerDay[birdsPerDay.length - 1];
    }

    public void incrementTodaysCount() {
//        throw new UnsupportedOperationException("Please implement the BirdCount.incrementTodaysCount() method");
//        getLastWeek()[getLastWeek().length - 1] = getToday()++;
        birdsPerDay[birdsPerDay.length - 1]++;
    }

    public boolean hasDayWithoutBirds() {
//        throw new UnsupportedOperationException("Please implement the BirdCount.hasDayWithoutBirds() method");
        return Arrays.binarySearch(birdsPerDay, 0) >= 0;
    }

    public int getCountForFirstDays(int numberOfDays) {
//        throw new UnsupportedOperationException("Please implement the BirdCount.getCountForFirstDays() method");
        if (numberOfDays > birdsPerDay.length) {
            numberOfDays = birdsPerDay.length;
        }
        int count = 0;
        for (int i = 0; i < numberOfDays; i++) {
            count += birdsPerDay[i];
        }
        return count;
    }

    public int getBusyDays() {
//        throw new UnsupportedOperationException("Please implement the BirdCount.getBusyDays() method");
        final int BIRDS_IN_BUSY_DAY = 5;
        int count = 0;
        for (int birdsByDay : birdsPerDay) {
            if (birdsByDay >= BIRDS_IN_BUSY_DAY) {
                count++;
            }
        }
        return count;
    }
}
