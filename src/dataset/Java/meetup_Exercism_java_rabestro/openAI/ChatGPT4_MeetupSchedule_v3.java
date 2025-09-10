enum MeetupSchedule {
    FIRST(1),
    SECOND(2),
    THIRD(3),
    FOURTH(4),
    LAST(-1),
    TEENTH(13);

    private final int value;

    MeetupSchedule(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}