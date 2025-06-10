import java.util.Arrays;

class BirdWatcher {
    private int[] birdsPerDay;

    public BirdWatcher(int[] birdsPerDay) {        
        this.birdsPerDay = birdsPerDay.clone();
    }

    public int[] getLastWeek() {
        return this.birdsPerDay;
    }

    public int getToday() {
        return this.birdsPerDay[this.birdsPerDay.length - 1];
    }

    public void incrementTodaysCount() {
        this.birdsPerDay[this.birdsPerDay.length - 1] += 1;
    }

    public boolean hasDayWithoutBirds() {
        boolean isFound = false;
        if (Arrays.binarySearch(this.birdsPerDay, 0) > -1) {
            isFound = true;
        }
        return isFound;
    }

    public int getCountForFirstDays(int numberOfDays) {
        int sum = 0;
        if (numberOfDays > this.birdsPerDay.length) numberOfDays = this.birdsPerDay.length;
        for (int i = 0; i < numberOfDays; i++) {
            sum += this.birdsPerDay[i];
        }
        return sum;
    }

    public int getBusyDays() {
        int tally = 0;
        for (int day : this.birdsPerDay) {
            if (day >= 5) tally += 1;
        }
        return tally;
    }
}
