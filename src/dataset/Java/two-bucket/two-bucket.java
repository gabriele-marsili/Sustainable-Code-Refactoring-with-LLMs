public class Bucket {
    private int capacity;
    private int current;
    private String number;

    Bucket(int capacity, String number) {
        this.capacity = capacity;
        this.current = 0;
        this.number = number;
    }

    void setCurrent(int current) {
        this.current = current;
    }

    void fill() {
        this.current = this.capacity;
    }

    void empty() {
        this.current = 0;
    }

    int getCapacity() {
        return this.capacity;
    }

    int getCurrent() {
        return this.current;
    }

    String getNumber() {
        return this.number;
    }

    int getAvailable() {
        return this.capacity - this.current;
    }

    boolean isDesiredLiters(int desiredLiters) {
        return this.current == desiredLiters;
    }

    boolean isEmpty() {
        return this.current == 0;
    }

    boolean isFull() {
        return this.current == this.capacity;
    }

    /**
     * Recalculates the current liters for both this Bucket and fromBucket 
     * based on the available capacity of this bucket.
     * 
     * @param fromBucket the Bucket water is being transferred from
     */
    void transfer(Bucket fromBucket) {
        int availableLiters = this.getAvailable();
        int fromBucketCurrent = fromBucket.getCurrent();

        if (availableLiters > fromBucketCurrent) {
            this.current += fromBucketCurrent;
            fromBucket.setCurrent(0);
        } else {
            this.current = this.capacity;
            fromBucket.setCurrent(fromBucketCurrent - availableLiters);
        }
    }
}
